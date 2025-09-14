// TechPhone 交互功能 - 修复版本
console.log('TechPhone JavaScript 开始加载');

// 简化的事件监听器添加函数
function addEventListeners() {
    console.log('开始添加事件监听器...');

    // 购物车图标点击
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            console.log('购物车被点击了！');
            alert('🛒 即将跳转到购物车页面...');

            // 跳转到购物车页面
            window.location.href = 'cart.html';
        });
        console.log('✓ 购物车图标事件已添加');
    }

    // 搜索框
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                console.log('搜索：' + this.value);
                alert('搜索：' + this.value);
            }
        });
        console.log('✓ 搜索框事件已添加');
    }

    // 分类卡片
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h4');
            let category = '未知分类';
            if (categoryName) {
                category = categoryName.textContent.trim();
            }

            console.log('分类卡片被点击了：' + category);
            alert('📱 即将跳转到 ' + category + ' 分类页面...');

            // 根据不同分类跳转到不同页面
            if (category.includes('手机') || category.includes('智能')) {
                window.location.href = 'index.html#products';
            } else if (category.includes('配件')) {
                window.location.href = 'index.html#accessories';
            } else if (category.includes('穿戴')) {
                window.location.href = 'index.html#wearables';
            } else {
                // 默认跳转到主页并滚动到产品区域
                window.location.href = 'index.html#categories';
            }
        });
    });
    console.log('✓ 分类卡片事件已添加，数量：' + categoryCards.length);

    // 产品卡片
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // 如果点击的是动作按钮，不执行卡片点击事件
            if (event.target.closest('.action-btn')) {
                return;
            }

            const productName = this.querySelector('.product-name');
            let product = '未知产品';
            if (productName) {
                product = productName.textContent.trim();
            }

            console.log('产品卡片被点击了：' + product);
            alert('📱 即将跳转到 ' + product + ' 详情页...');

            // 跳转到产品详情页面
            window.location.href = 'product-detail.html?product=' + encodeURIComponent(product);
        });
    });
    console.log('✓ 产品卡片事件已添加，数量：' + productCards.length);

    // 动作按钮（最重要）
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach((btn, index) => {
        // 确保按钮可点击
        btn.style.cursor = 'pointer';

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('动作按钮被点击了：' + index + ' - ' + this.textContent);

            // 获取产品名称
            const productCard = this.closest('.product-card');
            let productName = '未知产品';
            if (productCard) {
                const nameElement = productCard.querySelector('.product-name');
                if (nameElement) {
                    productName = nameElement.textContent.trim();
                }
            }

            // 根据按钮内容执行不同操作
            const action = this.textContent.trim();
            if (action === '❤️') {
                // 收藏功能
                alert('❤️ ' + productName + ' 已添加到收藏夹！');
            } else if (action === '🛒') {
                // 添加到购物车
                alert('🛒 ' + productName + ' 已添加到购物车！');

                // 更新购物车数量
                const cartCount = document.querySelector('.cart-count');
                if (cartCount) {
                    let count = parseInt(cartCount.textContent) || 0;
                    cartCount.textContent = count + 1;
                }
            } else if (action === '👁️') {
                // 跳转到产品详情页
                console.log('跳转到产品详情页：' + productName);
                alert('👁️ 即将跳转到 ' + productName + ' 详情页...');

                // 跳转到产品详情页面
                window.location.href = 'product-detail.html?product=' + encodeURIComponent(productName);
            } else {
                alert('按钮点击成功！');
            }
        });
    });
    console.log('✓ 动作按钮事件已添加，数量：' + actionButtons.length);

    // 主要按钮
    const mainButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    mainButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            console.log('主要按钮被点击了：' + index);

            // 检查按钮文本内容
            const buttonText = this.textContent.trim();

            if (buttonText.includes('立即购买') || buttonText.includes('购买')) {
                alert('🛒 即将跳转到购买页面...');
                window.location.href = 'checkout.html';
            } else if (buttonText.includes('了解更多')) {
                alert('📱 即将跳转到产品详情页...');
                window.location.href = 'product-detail.html';
            } else if (buttonText.includes('注册') || buttonText.includes('登录')) {
                alert('👤 即将跳转到登录页面...');
                // 这里可以添加登录页面
            } else {
                alert('🎉 主要按钮：点击成功！');
            }
        });
    });
    console.log('✓ 主要按钮事件已添加，数量：' + mainButtons.length);

    // 导航链接点击
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('导航链接被点击了：' + index + ' - ' + this.textContent);

            const linkText = this.textContent.trim();
            alert('🔗 即将跳转到：' + linkText);

            // 根据链接文本跳转
            if (linkText === '首页') {
                window.location.href = 'index.html';
            } else if (linkText === '智能手机') {
                window.location.href = 'index.html#products';
            } else if (linkText === '配件') {
                window.location.href = 'index.html#accessories';
            } else if (linkText === '智能穿戴') {
                window.location.href = 'index.html#wearables';
            } else if (linkText === '服务') {
                window.location.href = 'index.html#services';
            }
        });
    });
    console.log('✓ 导航链接事件已添加，数量：' + navLinks.length);

    console.log('所有事件监听器添加完成！');
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addEventListeners);
} else {
    // 页面已经加载完成
    addEventListeners();
}

// 备用初始化方法
window.addEventListener('load', function() {
    console.log('页面完全加载完成，重新检查...');

    // 延迟再次初始化确保所有元素都存在
    setTimeout(addEventListeners, 500);

    // 检查元素
    const elements = {
        'cart-icon': document.querySelector('.cart-icon'),
        'search-input': document.querySelector('.search-input'),
        'category-cards': document.querySelectorAll('.category-card').length,
        'product-cards': document.querySelectorAll('.product-card').length,
        'action-buttons': document.querySelectorAll('.action-btn').length,
        'main-buttons': document.querySelectorAll('.btn-primary, .btn-secondary').length
    };

    console.log('元素检查结果：', elements);

    // 如果发现按钮，强制添加点击事件
    const allButtons = document.querySelectorAll('button, .action-btn, .btn-primary, .btn-secondary, .category-card, .product-card');
    allButtons.forEach((element, index) => {
        if (!element.hasAttribute('data-click-added')) {
            element.addEventListener('click', function(e) {
                console.log('备用点击事件：' + index + ' - ' + this.className);
                alert('元素点击成功！');
            });
            element.setAttribute('data-click-added', 'true');
        }
    });

    console.log('备用事件添加完成，总元素数：' + allButtons.length);
});

console.log('TechPhone JavaScript 加载完成');