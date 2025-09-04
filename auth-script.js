
const urlParams = new URLSearchParams(window.location.search);
const activeTab = urlParams.get('tab') || 'login';


const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authTabsContainer = document.querySelector('.auth-tabs');

// Thiết lập tab active ban đầu
authTabsContainer.setAttribute('data-active-tab', activeTab);



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
    authTabsContainer.setAttribute('data-active-tab', tabName);
}

switchTab(activeTab);
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        switchTab(tabName);
        window.history.replaceState({}, '', `${window.location.pathname}?tab=${tabName}`);
    });
});

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    input.classList.add('error');
    errorMessage.innerText = message;
    errorMessage.style.display = 'block';
}

function hideError(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    input.classList.remove('error');
    errorMessage.style.display = 'none';
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

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

const isLoggedIn = localStorage.getItem('isLoggedIn');
const userProfile = document.getElementById('userProfile');
const guestActions = document.getElementById('guestActions');
const logoutBtn = document.getElementById('logoutBtn');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    hideError(email);
    hideError(password);

    if (!email.value.trim()) {
        showError(email, 'Email không được để trống');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, 'Email không hợp lệ');
        isValid = false;
    }
    if (!password.value.trim()) {
        showError(password, 'Mật khẩu không được để trống');
        isValid = false;
    }
    if (isValid) {
        const submitBtn = loginForm.querySelector('.btn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
        submitBtn.disabled = true;
        setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email.value.trim());
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Thành công!';
            submitBtn.style.background = 'linear-gradient(90deg, #4caf50, #2e7d32)';
            setTimeout(() => {
                alert('Đăng nhập thành công!');
                window.location.href = 'index.html';
            }, 1000);
        }, 1500);
    }
});

// Fixed register form event listener
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const email = document.getElementById('registerEmail');
    const password = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('registerConfirmPassword');
    
    hideError(email);
    hideError(password);
    hideError(confirmPassword);

    if (!email.value.trim()) {
        showError(email, 'Email không được để trống');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, 'Email không hợp lệ');
        isValid = false;
    }
    
    if (!password.value.trim()) {
        showError(password, 'Mật khẩu không được để trống');
        isValid = false;
    } else if (password.value.length < 6) {
        showError(password, 'Mật khẩu phải có ít nhất 6 ký tự');
        isValid = false;
    }
    
    if (!confirmPassword.value.trim()) {
        showError(confirmPassword, 'Xác nhận mật khẩu không được để trống');
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Mật khẩu xác nhận không khớp');
        isValid = false;
    }
    
    if (isValid) {
        const submitBtn = registerForm.querySelector('.btn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
        submitBtn.disabled = true;
        setTimeout(() => {
            // Lưu thông tin đăng ký (trong thực tế sẽ gửi đến server)
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Thành công!';
            submitBtn.style.background = 'linear-gradient(90deg, #4caf50, #2e7d32)';
            setTimeout(() => {
                alert('Đăng ký thành công! Vui lòng đăng nhập.');
                switchTab('login');
                window.history.replaceState({}, '', `${window.location.pathname}?tab=login`);
                // Reset form
                registerForm.reset();
                // Reset button state
                setTimeout(() => {
                    submitBtn.innerHTML = 'Đăng ký';
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 1000);
            }, 1000);
        }, 1500);
    }
});