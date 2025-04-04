const profileImageContainer = document.getElementById('profile-image-container');
const profileImage = document.getElementById('profile-image');
const changePhotoBtn = document.getElementById('change-photo-btn');
const fileInput = document.getElementById('file-input');
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementById('close-modal');

// متغیر برای تشخیص اینکه آیا کاربر می‌خواهد عکس را تغییر دهد یا نمایش دهد
let isChangingPhoto = false;

// نمایش عکس پروفایل در مدال بزرگ
profileImage.addEventListener('click', function(e) {
    if (!isChangingPhoto) {
        modalImage.src = profileImage.src;
        imageModal.style.display = 'flex';
    }
    isChangingPhoto = false;
});

// بستن مدال
closeModal.addEventListener('click', function() {
    imageModal.style.display = 'none';
});

// کلیک خارج از مدال برای بستن آن
imageModal.addEventListener('click', function(e) {
    if (e.target === imageModal) {
        imageModal.style.display = 'none';
    }
});

// تغییر عکس پروفایل
changePhotoBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    isChangingPhoto = true;
    fileInput.click();
});

fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});