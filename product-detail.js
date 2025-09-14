// 产品详情页专用JavaScript

// 图片缩略图切换
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // 移除所有active类
            thumbnails.forEach(t => t.classList.remove('active'));
            // 添加active类到当前点击的缩略图
            this.classList.add('active');
            // 更换主图
            mainImage.src = this.dataset.main;
        });
    });

    // 放大镜效果
    const mainImageContainer = document.querySelector('.main-image-container');
    const zoomLens = document.getElementById('zoomLens');

    mainImageContainer.addEventListener('mouseenter', function() {
        zoomLens.style.opacity = '1';
    });

    mainImageContainer.addEventListener('mouseleave', function() {
        zoomLens.style.opacity = '0';
    });

    mainImageContainer.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 限制放大镜在图片范围内
        const lensX = Math.max(50, Math.min(x, rect.width - 50));
        const lensY = Math.max(50, Math.min(y, rect.height - 50));

        zoomLens.style.left = (lensX - 50) + 'px';
        zoomLens.style.top = (lensY - 50) + 'px';

        // 计算放大比例
        const zoomLevel = 2;
        mainImage.style.transformOrigin = `${(lensX / rect.width) * 100}% ${(lensY / rect.height) * 100}%`;
        mainImage.style.transform = `scale(${zoomLevel})`;
    });

    // 360度查看按钮
    const view360Btn = document.getElementById('view360Btn');
    let is360Mode = false;

    view360Btn.addEventListener('click', function() {
        if (!is360Mode) {
            this.textContent = '退出360°';
            this.style.background = 'var(--error-color)';
            start360View();
            is360Mode = true;
        } else {
            this.textContent = '360° 查看';
            this.style.background = 'var(--primary-color)';
            stop360View();
            is360Mode = false;
        }
    });

    let rotationInterval;
    let currentRotation = 0;

    function start360View() {
        // 这里可以替换为实际的360度图片序列
        const images360 = [
            'https://picsum.photos/seed/iphone360-1/600/600.jpg',
            'https://picsum.photos/seed/iphone360-2/600/600.jpg',
            'https://picsum.photos/seed/iphone360-3/600/600.jpg',
            'https://picsum.photos/seed/iphone360-4/600/600.jpg',
            'https://picsum.photos/seed/iphone360-5/600/600.jpg',
            'https://picsum.photos/seed/iphone360-6/600/600.jpg',
            'https://picsum.photos/seed/iphone360-7/600/600.jpg',
            'https://picsum.photos/seed/iphone360-8/600/600.jpg'
        ];

        let imageIndex = 0;
        rotationInterval = setInterval(() => {
            mainImage.src = images360[imageIndex];
            imageIndex = (imageIndex + 1) % images360.length;
        }, 100);

        // 鼠标拖拽功能
        let isDragging = false;
        let startX = 0;

        mainImageContainer.addEventListener('mousedown', function(e) {
            isDragging = true;
            startX = e.clientX;
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                const deltaX = e.clientX - startX;
                if (Math.abs(deltaX) > 10) {
                    if (deltaX > 0) {
                        imageIndex = (imageIndex - 1 + images360.length) % images360.length;
                    } else {
                        imageIndex = (imageIndex + 1) % images360.length;
                    }
                    mainImage.src = images360[imageIndex];
                    startX = e.clientX;
                }
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
    }

    function stop360View() {
        clearInterval(rotationInterval);
        mainImage.src = 'https://picsum.photos/seed/iphone15pro-max/600/600.jpg';
    }

    // 颜色选择
    const colorBtns = document.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            colorBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const selectedColor = this.dataset.color;
            showNotification(`已选择颜色: ${selectedColor}`);
        });
    });

    // 存储容量选择
    const storageBtns = document.querySelectorAll('.storage-btn');
    storageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            storageBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const selectedStorage = this.textContent;
            updatePrice(selectedStorage);
        });
    });

    // 根据存储容量更新价格
    function updatePrice(storage) {
        const basePrice = 9999;
        let newPrice = basePrice;

        switch(storage) {
            case '256GB':
                newPrice = 9999;
                break;
            case '512GB':
                newPrice = 10999;
                break;
            case '1TB':
                newPrice = 12999;
                break;
        }

        const currentPriceElement = document.querySelector('.current-price');
        const originalPriceElement = document.querySelector('.original-price');

        currentPriceElement.textContent = `¥${newPrice.toLocaleString()}`;
        originalPriceElement.textContent = `¥${(newPrice + 1000).toLocaleString()}`;

        showNotification(`已选择存储容量: ${storage}`);
    }

    // 数量选择器
    const quantityInput = document.querySelector('.quantity-input');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');

    minusBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });

    quantityInput.addEventListener('change', function() {
        let value = parseInt(this.value);
        if (value < 1) this.value = 1;
        if (value > 10) this.value = 10;
    });

    // 操作按钮
    const buyNowBtn = document.querySelector('.btn-buy-now');
    const addCartBtn = document.querySelector('.btn-add-cart');
    const favoriteBtn = document.querySelector('.btn-favorite');

    buyNowBtn.addEventListener('click', function() {
        const selectedColor = document.querySelector('.color-btn.active').dataset.color;
        const selectedStorage = document.querySelector('.storage-btn.active').textContent;
        const quantity = quantityInput.value;

        showNotification(`正在跳转到结算页面...`);
        console.log('立即购买:', { color: selectedColor, storage: selectedStorage, quantity: quantity });
    });

    addCartBtn.addEventListener('click', function() {
        const selectedColor = document.querySelector('.color-btn.active').dataset.color;
        const selectedStorage = document.querySelector('.storage-btn.active').textContent;
        const quantity = quantityInput.value;

        // 更新购物车数量
        const cartCount = document.querySelector('.cart-count');
        let currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + parseInt(quantity);

        showNotification('已添加到购物车');
        console.log('加入购物车:', { color: selectedColor, storage: selectedStorage, quantity: quantity });
    });

    let isFavorited = false;
    favoriteBtn.addEventListener('click', function() {
        isFavorited = !isFavorited;
        if (isFavorited) {
            this.style.background = 'var(--error-color)';
            this.style.color = 'white';
            showNotification('已添加到收藏夹');
        } else {
            this.style.background = 'var(--bg-gray)';
            this.style.color = 'var(--medium-gray)';
            showNotification('已从收藏夹移除');
        }
    });

    // 标签页切换
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;

            // 移除所有active类
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // 添加active类
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // 评价互动
    const helpfulBtns = document.querySelectorAll('.helpful-btn');
    helpfulBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const match = this.textContent.match(/\((\d+)\)/);
            if (match) {
                const currentCount = parseInt(match[1]);
                const newCount = currentCount + 1;
                this.innerHTML = `👍 有用 (${newCount})`;
                this.style.background = 'var(--success-color)';
                this.style.color = 'white';
                this.disabled = true;
            }
        });
    });

    // 图片点击放大
    const reviewImages = document.querySelectorAll('.review-images img');
    reviewImages.forEach(img => {
        img.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
            `;

            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 8px;
            `;

            lightbox.appendChild(enlargedImg);
            document.body.appendChild(lightbox);

            lightbox.addEventListener('click', function() {
                document.body.removeChild(this);
            });
        });
    });

    // 产品对比功能
    function addToCompare() {
        showNotification('已添加到产品对比');
    }

    // 通知系统 (重用主页的showNotification函数)
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

    // 页面滚动时固定某些元素
    window.addEventListener('scroll', function() {
        const productInfo = document.querySelector('.product-info');
        const productImages = document.querySelector('.product-images');

        if (window.innerWidth > 768) {
            const scrollY = window.scrollY;
            const productLayout = document.querySelector('.product-layout');
            const layoutTop = productLayout.offsetTop;

            if (scrollY > layoutTop + 100) {
                productImages.style.position = 'sticky';
                productImages.style.top = '100px';
                productImages.style.height = 'fit-content';
            } else {
                productImages.style.position = 'relative';
                productImages.style.top = 'auto';
            }
        }
    });

    // 懒加载图片
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});