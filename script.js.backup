// 滚动时导航栏效果
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 搜索框功能
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');

searchInput.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.02)';
});

searchInput.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
});

// 购物车动画
const cartIcon = document.querySelector('.cart-icon');
cartIcon.addEventListener('click', function() {
    this.style.transform = 'scale(0.8)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
});

// 产品卡片交互
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 分类卡片交互
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', function() {
        const categoryName = this.querySelector('h4').textContent;
        console.log(`点击了分类: ${categoryName}`);
        // 这里可以添加跳转到对应分类页面的逻辑
    });
});

// 产品动作按钮
const actionButtons = document.querySelectorAll('.action-btn');
actionButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const action = this.textContent;
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;

        if (action === '❤️') {
            this.style.color = this.style.color === 'red' ? '' : 'red';
            console.log(`${productName} 已${this.style.color === 'red' ? '添加到' : '从'}收藏夹移除`);
        } else if (action === '🛒') {
            addToCart(productName);
        } else if (action === '👁️') {
            viewProduct(productName);
        }
    });
});

// 添加到购物车功能
function addToCart(productName) {
    const cartCount = document.querySelector('.cart-count');
    let currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount + 1;

    // 添加动画效果
    cartCount.style.transform = 'scale(1.3)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 200);

    console.log(`${productName} 已添加到购物车`);
    showNotification(`${productName} 已添加到购物车`);
}

// 查看产品详情
function viewProduct(productName) {
    console.log(`查看产品详情: ${productName}`);
    // 这里可以添加跳转到产品详情页的逻辑
    showNotification(`正在查看 ${productName} 详情`);
}

// 通知系统
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #1a73e8;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 产品3D效果
const product3D = document.querySelector('.product-3d');
if (product3D) {
    product3D.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    product3D.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 滚动显示动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有产品卡片和分类卡片
document.querySelectorAll('.product-card, .category-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 模拟产品数据
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 7999,
        originalPrice: 8999,
        image: "https://picsum.photos/seed/iphone15pro/400/400.jpg",
        rating: 5,
        reviews: 128,
        badge: "新品"
    },
    {
        id: 2,
        name: "AirPods Pro",
        price: 1899,
        originalPrice: 1999,
        image: "https://picsum.photos/seed/airpods/300/300.jpg",
        rating: 5,
        reviews: 256,
        badge: "热卖"
    }
];

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('TechPhone 网站已加载完成');

    // 添加加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 响应式菜单切换（移动端）
function createMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: var(--dark-gray);
    `;

    navContainer.insertBefore(mobileMenuBtn, navContainer.firstChild);

    mobileMenuBtn.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'white';
        navMenu.style.flexDirection = 'column';
        navMenu.style.padding = '1rem';
        navMenu.style.boxShadow = 'var(--shadow-lg)';
    });
}

// 在移动端显示菜单按钮
function checkMobileMenu() {
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
}

window.addEventListener('resize', checkMobileMenu);
checkMobileMenu();