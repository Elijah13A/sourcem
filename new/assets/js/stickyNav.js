const options = document.querySelectorAll(".opt");

options.forEach(option => {
  option.addEventListener("click", () => {
    document.querySelectorAll(".opt img").forEach(img => {
      img.classList.remove("purple");

    });
    document.querySelectorAll(".opt span").forEach(span => {
        span.classList.remove("white-sp");
  
      });
    const optionImage = option.querySelector("img");
    const optionSpan=option.querySelector("span");
    optionImage.classList.add("purple");
    optionSpan.classList.add("white-sp");
  });
});