
const urlParams = new URLSearchParams(window.location.search);

const activeTab = urlParams.get('tab') || 'login';


const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authTabsContainer = document.querySelector('.auth-tabs');

// Chuyển tab
function switchTab(tabName) {
    authTabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
    });
    authForms.forEach(form => {
        form.classList.toggle('active', form.id === `${tabName}Form`);
    });
    authTabsContainer.setAttribute('data-active-tab', tabName);
}
// Kiểm tra trạng thái đăng nhập
const isLoggedIn = localStorage.getItem('isLoggedIn');
const guestActions = document.getElementById('guestActions');
const userProfile = document.getElementById('userProfile');
const logoutBtn = document.getElementById('logoutBtn');
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        switchTab(tabName);
        window.history.replaceState({}, '', `${window.location.pathname}?tab=${tabName}`);
    });
});
document.querySelectorAll('.form-footer .auth-tab').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        switchTab('login');
        window.history.replaceState({}, '', `${window.location.pathname}?tab=login`);
    });
});

// Hiện/ẩn mật khẩu
document.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const icon = this.querySelector('i');
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Hiển thị/ẩn lỗi
function showError(input, message) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    input.classList.add('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}
function hideError(input) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    input.classList.remove('error');
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
}
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => hideError(input));
});
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Đăng nhập
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    let valid = true;
    hideError(email); hideError(password);

    if (!email.value.trim()) {
        showError(email, 'Email không được để trống');
        valid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, 'Email không hợp lệ');
        valid = false;
    }
    if (!password.value.trim()) {
        showError(password, 'Mật khẩu không được để trống');
        valid = false;
    }
    if (!valid) return;

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email.value.trim());
    localStorage.setItem('userName', email.value.trim().split('@')[0]); // Nếu chưa đăng ký, lấy phần trước @ làm tên
    alert('Đăng nhập thành công!');
    window.location.href = 'index.html';
});

// Đăng ký
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName');
    const email = document.getElementById('registerEmail');
    const password = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('registerConfirmPassword');
    let valid = true;
    hideError(name); hideError(email); hideError(password); hideError(confirmPassword);

    if (!name.value.trim()) {
        showError(name, 'Họ tên không được để trống');
        valid = false;
    }
    if (!email.value.trim()) {
        showError(email, 'Email không được để trống');
        valid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, 'Email không hợp lệ');
        valid = false;
    }

    if (!password.value.trim()) {
        showError(password, 'Mật khẩu không được để trống');
        valid = false;
    } else if (password.value.length < 6) {
        showError(password, 'Mật khẩu phải có ít nhất 6 ký tự');
        valid = false;
    }
    
    if (!confirmPassword.value.trim()) {
        showError(confirmPassword, 'Xác nhận mật khẩu không được để trống');
        valid = false;
    } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Mật khẩu xác nhận không khớp');
        valid = false;
    }
    if (!valid) return;

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email.value.trim());
    localStorage.setItem('userName', name.value.trim());
    alert('Đăng ký thành công!');
    window.location.href = 'index.html';
});

// Thiết lập tab active khi tải trang
document.addEventListener('DOMContentLoaded', function() {
    switchTab(activeTab);
});