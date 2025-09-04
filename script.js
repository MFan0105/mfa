// Khai báo các biến DOM
const guestActions = document.getElementById('guestActions');
const userProfile = document.getElementById('userProfile');
const logoutBtn = document.getElementById('logoutBtn');
const preloader = document.getElementById('preloader');
const navbar = document.querySelector('.navbar');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Hàm xử lý Preloader
window.addEventListener('load', () => {
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Hàm xử lý Sticky Navbar và nút cuộn lên đầu trang
window.addEventListener('scroll', () => {
    // Sticky Navbar
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }

    // Scroll to Top Button
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Xử lý logic đăng xuất
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Giả lập đăng xuất: xóa trạng thái đăng nhập trong localStorage
    localStorage.removeItem('isLoggedIn');
    
    guestActions.style.display = 'flex';
    userProfile.style.display = 'none';
    alert('Đã đăng xuất!');
});

// Kiểm tra trạng thái đăng nhập (giả lập)
// Trong thực tế, bạn sẽ kiểm tra cookie hoặc localStorage
const isLoggedIn = localStorage.getItem('isLoggedIn');
if (isLoggedIn === 'true') {
    guestActions.style.display = 'none';
    userProfile.style.display = 'flex';
}

// Giả lập logic đăng nhập để kiểm tra
// Để đăng nhập, bạn có thể mở Console trong trình duyệt (F12) và gõ:
// localStorage.setItem('isLoggedIn', 'true');
// Sau đó tải lại trang.