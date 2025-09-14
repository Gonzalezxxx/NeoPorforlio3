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
            alert('购物车功能：点击成功！');
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
            console.log('分类卡片被点击了：' + index);
            alert('分类卡片：点击成功！');
        });
    });
    console.log('✓ 分类卡片事件已添加，数量：' + categoryCards.length);

    // 产品卡片
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            console.log('产品卡片被点击了：' + index);
            alert('产品卡片：点击成功！');
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

            // 根据按钮内容显示不同提示
            const action = this.textContent.trim();
            if (action === '❤️') {
                alert('❤️ 收藏功能：点击成功！');
            } else if (action === '🛒') {
                alert('🛒 购物车功能：点击成功！');
            } else if (action === '👁️') {
                alert('👁️ 查看功能：点击成功！');
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
            alert('主要按钮：点击成功！');
        });
    });
    console.log('✓ 主要按钮事件已添加，数量：' + mainButtons.length);

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