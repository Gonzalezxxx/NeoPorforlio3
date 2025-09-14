#!/bin/bash

# 修复交互问题的脚本
# 使用方法: ./fix-interactions.sh

echo "🔧 修复 TechPhone 交互问题..."

# 检查是否在正确的目录
if [ ! -f "index.html" ]; then
    echo "❌ 请在项目根目录中运行此脚本"
    exit 1
fi

# 创建修复后的 JavaScript 文件
echo "📝 修复 JavaScript 文件..."

# 备份原文件
cp script.js script.js.backup

# 创建修复版本
cat > script.js << 'EOF'
// 确保DOM加载完成后再执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('TechPhone JavaScript 已加载');

    // 滚动时导航栏效果
    const header = document.getElementById('header');
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
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');

    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            if (this.parentElement) {
                this.parentElement.style.transform = 'scale(1.02)';
            }
        });

        searchInput.addEventListener('blur', function() {
            if (this.parentElement) {
                this.parentElement.style.transform = 'scale(1)';
            }
        });
    }

    // 购物车动画
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            this.style.transform = 'scale(0.8)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

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
            const categoryName = this.querySelector('h4');
            if (categoryName) {
                console.log(`点击了分类: ${categoryName.textContent}`);
                showNotification(`点击了分类: ${categoryName.textContent}`);
            }
        });
    });

    // 产品动作按钮
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.textContent;
            const productCard = this.closest('.product-card');

            if (productCard) {
                const productName = productCard.querySelector('.product-name');
                if (productName) {
                    if (action === '❤️') {
                        this.style.color = this.style.color === 'red' ? '' : 'red';
                        showNotification(`${productName.textContent} 已${this.style.color === 'red' ? '添加到' : '从'}收藏夹${this.style.color === 'red' ? '' : '移除'}`);
                    } else if (action === '🛒') {
                        addToCart(productName.textContent);
                    } else if (action === '👁️') {
                        viewProduct(productName.textContent);
                    }
                }
            }
        });
    });

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
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // 添加到购物车功能
    function addToCart(productName) {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            let currentCount = parseInt(cartCount.textContent) || 0;
            cartCount.textContent = currentCount + 1;

            // 添加动画效果
            cartCount.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 200);
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
});

// 添加错误处理
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// 添加加载完成提示
window.addEventListener('load', function() {
    console.log('🚀 TechPhone 页面加载完成');
});
EOF

echo "✅ JavaScript 文件已修复"

# 提交更改
git add script.js
git commit -m "修复交互问题：改进JavaScript事件监听和错误处理"

echo "🚀 推送到GitHub..."
git push origin main

echo "🌿 切换到gh-pages分支并同步..."
git checkout gh-pages
git checkout main -- script.js
git add script.js
git commit -m "同步修复的JavaScript文件"
git push origin gh-pages

echo "✅ 修复完成！"
echo "📝 更改说明："
echo "   1. 添加了DOMContentLoaded事件监听"
echo "   2. 增强了错误处理"
echo "   3. 改进了元素查找逻辑"
echo "   4. 添加了控制台日志"
echo ""
echo "🔄 请清除浏览器缓存后重新访问网站："
echo "   https://gonzalezxxx.github.io/TechPhone/"
echo ""
echo "⏳ 等待1-2分钟让GitHub Pages完成部署"

# 切换回main分支
git checkout main