let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
  
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null);
    

}

if (darkmode === "active") enableDarkmode()




const fetchSchedules = async (apiUrl) => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        
        const daysMapping = {
            saturday: { element: ".saturday", persianDay: "شنبه" },
            sunday: { element: ".sunday", persianDay: "یکشنبه" },
            monday: { element: ".monday", persianDay: "دوشنبه" },
            tuesday: { element: ".tuesday", persianDay: "سه شنبه" },
            wednesday: { element: ".wednesday", persianDay: "چهارشنبه" },
            thursday: { element: ".thursday", persianDay: "پنجشنبه" },
            friday: { element: ".friday", persianDay: "جمعه" }
        };

        for (const [dayKey, dayInfo] of Object.entries(daysMapping)) {
            if (data[dayKey]) {
               sion
                addDataToHTML(data[dayKey].schedules, document.querySelector(dayInfo.element));

               
                const mobileContent = document.querySelector(`.day-content[data-day="${dayInfo.persianDay}"]`);
                if (mobileContent) {
                    addDataToHTML(data[dayKey].schedules, mobileContent);
                }

            }
        }

    } catch (error) {
        console.error("error:", error)
    }
}
const addDataToHTML = (schedules, dayElement) => {

    if (!dayElement || !schedules) {
        return;
    }
    dayElement.innerHTML = "";
    const row = document.createElement("div");
    row.className = "row";

    dayElement.appendChild(row);



    schedules.forEach(schedule => {
        const scheduleElement = document.createElement("div");
        scheduleElement.className = "schedule-item mb-2 col-md-6 col-12 ";

        scheduleElement.innerHTML = `
        
            <a href="../downloadSerie/imdex.html?id=${schedule.id}" class="link  ">
            <div class="row bg py-2 px-0">
                <div class="col-4">
                    <img src="${schedule.series_image}" class="rounded-3 w-100" style="max-width:150px" />
                </div>
                <div class="col-8 pt-md-2 pt-0 colors">
                    <div class="pb-md-5 pb-2">
                        <span class="fs-md-5 fs-6">${schedule.series_title}</span>
                    </div>
                    <div>
                        <span style="font-size:13px">${schedule.notes.replace(/\r\n/g, '<br>')}</span>
                    </div>
                </div>
                </div>
            </a>
        `;

        row.appendChild(scheduleElement);
    });
}
// Initialize
document.addEventListener('DOMContentLoaded', function () {
    const daysOfWeek = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
    const today = new Date();
    const dayOfWeek = today.getDay();
    const persianDayIndex = (dayOfWeek + 1) % 7;
    const todayPersianDay = daysOfWeek[persianDayIndex];

    
    fetchSchedules("https://api.dramoir.com/main/weeklist/?format=json").then(() => {
        ng
        setupDaySwitcher(todayPersianDay);
    }); 
});

function setupDaySwitcher(todayPersianDay) {
   
    showDayContent(todayPersianDay);

   
    const desktopWeekElements = document.querySelectorAll('.week');
    desktopWeekElements.forEach(week => {
        const dayName = week.querySelector('span').textContent.trim();

        if (dayName === todayPersianDay) {
            week.classList.add('today');
        }

        week.addEventListener('click', function () {
            desktopWeekElements.forEach(w => w.classList.remove('today'));
            this.classList.add('today');
            showDayContent(dayName);
        });
    });

   
    const mobileDateElements = document.querySelectorAll(".date");
    mobileDateElements.forEach(date => {
        const dayName = date.querySelector("span").textContent.trim();

        if (dayName === todayPersianDay) {
            date.classList.add("today");
        }

        date.addEventListener("click", function () {
            mobileDateElements.forEach(d => d.classList.remove("today"));
            this.classList.add("today");
            showDayContent(dayName);
        });
    });
}

function showDayContent(dayName) {
    const contents = document.querySelectorAll('.day-content');
    contents.forEach(content => {
        content.style.display = 'none';
        if (content.dataset.day === dayName) {
            content.style.display = 'block';
        }
    });
}