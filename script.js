// Khai báo các biến DOM
const guestActions = document.getElementById('guestActions');
const userProfile = document.getElementById('userProfile');
const logoutBtn = document.getElementById('logoutBtn');
const preloader = document.getElementById('preloader');
const navbar = document.querySelector('.navbar');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navContainer = document.querySelector('.nav-container');

// Hàm xử lý Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
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
    
    // Đóng menu mobile khi cuộn
    if (navContainer.classList.contains('active')) {
        navContainer.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

scrollToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Xử lý menu mobile
if (mobileMenuBtn && navContainer) {
    mobileMenuBtn.addEventListener('click', () => {
        navContainer.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Xử lý click ngoài menu để đóng
document.addEventListener('click', (e) => {
    if (navContainer.classList.contains('active') && 
        !navContainer.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        navContainer.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Xử lý logic đăng xuất
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Giả lập đăng xuất: xóa trạng thái đăng nhập trong localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        guestActions.style.display = 'flex';
        userProfile.style.display = 'none';
        
        // Hiệu ứng thông báo
        showNotification('Đã đăng xuất thành công!', 'success');
    });
}

// Hiển thị thông báo
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Tự động xóa sau 3 giây
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Kiểm tra trạng thái đăng nhập
const isLoggedIn = localStorage.getItem('isLoggedIn');
if (isLoggedIn === 'true') {
    if (guestActions) guestActions.style.display = 'none';
    if (userProfile) userProfile.style.display = 'flex';
    
    // Hiển thị tên người dùng nếu có
    const userNameSpan = document.getElementById('userNameDisplay');
    const userName = localStorage.getItem('userName');
    if (userNameSpan && userName) {
        userNameSpan.textContent = userName;
    }
}

// Thêm hiệu ứng cho các card khi chúng xuất hiện trên màn hình
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Quan sát các phần tử cần hiệu ứng
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .category-card, .testimonial-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});

// Thêm class visible khi element trong viewport
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .category-card, .testimonial-card');
    cards.forEach(card => {
        card.classList.add('animate-on-scroll');
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Thêm style cho hiệu ứng xuất hiện
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: var(--border-radius);
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        z-index: 1000;
        box-shadow: var(--box-shadow-lg);
        animation: slideIn 0.3s ease;
    }
    
    .notification.success {
        background: var(--primary-color);
    }
    
    .notification.error {
        background: #f44336;
    }
    
    .notification button {
        background: transparent;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);