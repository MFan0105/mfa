// Lấy tham số từ URL để xác định tab nào sẽ active
const urlParams = new URLSearchParams(window.location.search);
const activeTab = urlParams.get('tab') || 'login';

// Khai báo các biến DOM
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Hàm để chuyển đổi tab
function switchTab(tabName) {
    authTabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    authForms.forEach(form => {
        if (form.id === `${tabName}Form`) {
            form.classList.add('active');
        } else {
            form.classList.remove('active');
        }
    });
}

// Xử lý sự kiện chuyển đổi tab
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        switchTab(tabName);
        // Cập nhật URL mà không cần reload trang
        const newUrl = `${window.location.pathname}?tab=${tabName}`;
        window.history.replaceState({}, '', newUrl);
    });
});

// Xử lý logic đăng nhập
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', username);
    alert('Đăng nhập thành công!');
    window.location.href = 'index.html';
});

// Xử lý logic đăng ký
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Mật khẩu nhập lại không khớp!');
        return;
    }
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);
    alert('Đăng ký thành công!');
    window.location.href = 'index.html';
});

// Thiết lập tab active dựa trên tham số URL
switchTab(activeTab);