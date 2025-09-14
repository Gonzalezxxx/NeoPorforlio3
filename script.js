// 确保DOM和所有资源加载完成后再执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('TechPhone JavaScript 已加载');

    // 等待一小段时间确保所有元素都已渲染
    setTimeout(initializeInteractions, 100);
});

function initializeInteractions() {
    console.log('初始化交互功能...');

    // 检查必要的元素是否存在
    const header = document.getElementById('header');
    const searchInput = document.querySelector('.search-input');
    const cartIcon = document.querySelector('.cart-icon');
    const productCards = document.querySelectorAll('.product-card');
    const categoryCards = document.querySelectorAll('.category-card');
    const actionButtons = document.querySelectorAll('.action-btn');

    console.log('元素检查结果:');
    console.log('- Header:', header ? '✓' : '✗');
    console.log('- Search input:', searchInput ? '✓' : '✗');
    console.log('- Cart icon:', cartIcon ? '✓' : '✗');
    console.log('- Product cards:', productCards.length);
    console.log('- Category cards:', categoryCards.length);
    console.log('- Action buttons:', actionButtons.length);

    // 滚动时导航栏效果
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 搜索框功能
    if (searchInput) {
        console.log('设置搜索框功能...');

        searchInput.addEventListener('focus', function() {
            console.log('搜索框获得焦点');
            if (this.parentElement) {
                this.parentElement.style.transform = 'scale(1.02)';
            }
        });

        searchInput.addEventListener('blur', function() {
            console.log('搜索框失去焦点');
            if (this.parentElement) {
                this.parentElement.style.transform = 'scale(1)';
            }
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    console.log(`搜索: ${searchTerm}`);
                    showNotification(`搜索功能: ${searchTerm}`);
                }
            }
        });
    }

    // 购物车动画
    if (cartIcon) {
        console.log('设置购物车功能...');

        cartIcon.addEventListener('click', function() {
            console.log('点击了购物车图标');
            this.style.transform = 'scale(0.8)';
            this.style.transition = 'transform 0.15s ease';

            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            const cartCount = document.querySelector('.cart-count');
            const count = cartCount ? cartCount.textContent : '0';
            showNotification(`购物车中有 ${count} 件商品`);
        });
    }

    // 产品卡片交互
    if (productCards.length > 0) {
        console.log(`设置 ${productCards.length} 个产品卡片的交互功能...`);

        productCards.forEach((card, index) => {
            card.style.transition = 'transform 0.3s ease';

            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });

            card.addEventListener('click', function(e) {
                // 如果点击的不是动作按钮，则显示产品信息
                if (!e.target.closest('.action-btn')) {
                    const productName = this.querySelector('.product-name');
                    if (productName) {
                        console.log(`点击了产品卡片: ${productName.textContent}`);
                        showNotification(`查看产品: ${productName.textContent}`);
                    }
                }
            });
        });
    }

    // 分类卡片交互
    const categoryCards = document.querySelectorAll('.category-card');
    console.log(`找到 ${categoryCards.length} 个分类卡片`);

    categoryCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryName = this.querySelector('h4');
            if (categoryName) {
                const name = categoryName.textContent.trim();
                console.log(`点击了分类 ${index}: ${name}`);
                showNotification(`点击了分类: ${name}`);
            }
        });
    });

    // 产品动作按钮
    const actionButtons = document.querySelectorAll('.action-btn');
    console.log(`找到 ${actionButtons.length} 个产品动作按钮`);

    actionButtons.forEach((btn, index) => {
        btn.style.cursor = 'pointer';
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(`点击了按钮 ${index}: ${this.textContent}`);

            const action = this.textContent.trim();
            const productCard = this.closest('.product-card');

            if (productCard) {
                const productName = productCard.querySelector('.product-name');
                if (productName) {
                    const name = productName.textContent.trim();
                    console.log(`产品名称: ${name}, 动作: ${action}`);

                    if (action === '❤️') {
                        const isLiked = this.style.color === 'red';
                        this.style.color = isLiked ? '' : 'red';
                        showNotification(`${name} 已${isLiked ? '从收藏夹移除' : '添加到收藏夹'}`);
                    } else if (action === '🛒') {
                        addToCart(name);
                    } else if (action === '👁️') {
                        viewProduct(name);
                    }
                }
            } else {
                console.log('未找到产品卡片');
                showNotification('产品信息获取失败');
            }
        });

        // 添加视觉反馈
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // 通知系统
    function showNotification(message) {
        console.log(`显示通知: ${message}`);

        // 移除已存在的通知
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => {
            if (document.body.contains(notif)) {
                document.body.removeChild(notif);
            }
        });

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
            max-width: 300px;
            word-wrap: break-word;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 3000);
    }

    // 添加到购物车功能
    function addToCart(productName) {
        console.log(`添加到购物车: ${productName}`);

        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            let currentCount = parseInt(cartCount.textContent) || 0;
            const newCount = currentCount + 1;
            cartCount.textContent = newCount;

            console.log(`购物车数量: ${currentCount} -> ${newCount}`);

            // 添加动画效果
            cartCount.style.transform = 'scale(1.3)';
            cartCount.style.transition = 'transform 0.2s ease';

            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 200);
        } else {
            console.log('未找到购物车计数器');
        }

        showNotification(`${productName} 已添加到购物车`);
    }

    // 查看产品详情
    function viewProduct(productName) {
        showNotification(`正在查看 ${productName} 详情`);
        // 这里可以添加跳转到产品详情页的逻辑
    }

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

    console.log('✅ TechPhone 交互功能已修复');
}

// 添加错误处理
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// 添加加载完成提示
window.addEventListener('load', function() {
    console.log('🚀 TechPhone 页面加载完成');

    // 延迟检查确保所有资源都加载完成
    setTimeout(() => {
        const finalCheck = {
            header: document.getElementById('header') ? '✓' : '✗',
            searchInput: document.querySelector('.search-input') ? '✓' : '✗',
            cartIcon: document.querySelector('.cart-icon') ? '✓' : '✗',
            productCards: document.querySelectorAll('.product-card').length,
            categoryCards: document.querySelectorAll('.category-card').length,
            actionButtons: document.querySelectorAll('.action-btn').length
        };

        console.log('=== 最终检查结果 ===');
        Object.entries(finalCheck).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });

        if (finalCheck.actionButtons === 0) {
            console.warn('警告: 未找到任何动作按钮！');
        }

        console.log('=== 交互功能初始化完成 ===');
    }, 500);
});

// 全局错误处理
window.addEventListener('unhandledrejection', function(event) {
    console.error('未处理的 Promise 拒绝:', event.reason);
});

window.addEventListener('error', function(event) {
    console.error('全局错误:', event.error);
});
