// 购物车页面专用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 商品选择功能
    const itemSelects = document.querySelectorAll('.item-select');
    const checkoutBtn = document.getElementById('checkoutBtn');

    function updateCheckoutButton() {
        const selectedItems = document.querySelectorAll('.item-select:checked');
        const selectedCount = selectedItems.length;

        if (selectedCount > 0) {
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = `去结算 (${selectedCount}件商品)`;
        } else {
            checkoutBtn.disabled = true;
            checkoutBtn.textContent = '请选择商品';
        }

        updateTotals();
    }

    itemSelects.forEach(select => {
        select.addEventListener('change', updateCheckoutButton);
    });

    // 数量调整功能
    const quantitySelectors = document.querySelectorAll('.quantity-selector');

    quantitySelectors.forEach(selector => {
        const minusBtn = selector.querySelector('.minus');
        const plusBtn = selector.querySelector('.plus');
        const input = selector.querySelector('.quantity-input');
        const cartItem = selector.closest('.cart-item');
        const priceElement = cartItem.querySelector('.current-price');
        const subtotalElement = cartItem.querySelector('.item-subtotal');

        minusBtn.addEventListener('click', function() {
            let currentValue = parseInt(input.value);
            if (currentValue > 1) {
                input.value = currentValue - 1;
                updateSubtotal();
            }
        });

        plusBtn.addEventListener('click', function() {
            let currentValue = parseInt(input.value);
            if (currentValue < 10) {
                input.value = currentValue + 1;
                updateSubtotal();
            }
        });

        input.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (value < 1) this.value = 1;
            if (value > 10) this.value = 10;
            updateSubtotal();
        });

        function updateSubtotal() {
            const price = parseFloat(priceElement.textContent.replace('¥', '').replace(',', ''));
            const quantity = parseInt(input.value);
            const subtotal = price * quantity;
            subtotalElement.textContent = `¥${subtotal.toLocaleString()}`;
            updateTotals();
        }
    });

    // 删除商品
    const deleteBtns = document.querySelectorAll('.action-btn.delete');

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const productName = cartItem.querySelector('.item-name').textContent;

            if (confirm(`确定要删除 "${productName}" 吗？`)) {
                // 添加删除动画
                cartItem.style.transition = 'all 0.3s ease';
                cartItem.style.transform = 'translateX(-100%)';
                cartItem.style.opacity = '0';

                setTimeout(() => {
                    cartItem.remove();
                    updateCartCount();
                    updateTotals();
                    updateCheckoutButton();

                    // 检查购物车是否为空
                    const remainingItems = document.querySelectorAll('.cart-item');
                    if (remainingItems.length === 0) {
                        showEmptyCart();
                    }
                }, 300);

                showNotification(`已删除 "${productName}"`);
            }
        });
    });

    // 收藏功能
    const favoriteBtns = document.querySelectorAll('.action-btn.favorite');

    favoriteBtns.forEach(btn => {
        let isFavorited = false;

        btn.addEventListener('click', function() {
            isFavorited = !isFavorited;

            if (isFavorited) {
                this.style.color = 'var(--error-color)';
                this.textContent = '❤️';
                showNotification('已添加到收藏夹');
            } else {
                this.style.color = '';
                this.textContent = '🤍';
                showNotification('已从收藏夹移除');
            }
        });
    });

    // 推荐商品添加
    const addRecommendationBtns = document.querySelectorAll('.add-recommendation');

    addRecommendationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const recommendationItem = this.closest('.recommendation-item');
            const productName = recommendationItem.querySelector('h4').textContent;
            const price = recommendationItem.querySelector('p').textContent;

            // 模拟添加到购物车
            this.textContent = '✓';
            this.style.background = 'var(--success-color)';
            this.disabled = true;

            updateCartCount();
            showNotification(`已添加 "${productName}" 到购物车`);

            setTimeout(() => {
                this.textContent = '+';
                this.style.background = 'var(--primary-color)';
                this.disabled = false;
            }, 2000);
        });
    });

    // 优惠券功能
    const couponInput = document.querySelector('.coupon-code');
    const applyCouponBtn = document.querySelector('.apply-coupon');
    const useCouponBtns = document.querySelectorAll('.use-coupon');

    applyCouponBtn.addEventListener('click', function() {
        const couponCode = couponInput.value.trim();

        if (couponCode) {
            // 模拟优惠券验证
            if (couponCode === 'NEWUSER100' || couponCode === 'SAVE200') {
                applyCoupon(couponCode);
                couponInput.value = '';
            } else {
                showNotification('优惠券代码无效', 'error');
            }
        } else {
            showNotification('请输入优惠券代码', 'error');
        }
    });

    useCouponBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const couponItem = this.closest('.coupon-item');
            const couponCode = couponItem.querySelector('.coupon-code').textContent;

            applyCoupon(couponCode);
        });
    });

    function applyCoupon(couponCode) {
        // 移除已应用的优惠券
        document.querySelectorAll('.applied-coupon').forEach(el => el.remove());

        // 添加应用标记
        const appliedCoupon = document.createElement('div');
        appliedCoupon.className = 'applied-coupon';
        appliedCoupon.innerHTML = `
            <div class="coupon-applied">
                <span>✓ 已应用优惠券: ${couponCode}</span>
                <button class="remove-coupon">移除</button>
            </div>
        `;

        const couponSection = document.querySelector('.coupon-section');
        couponSection.appendChild(appliedCoupon);

        // 添加移除功能
        const removeBtn = appliedCoupon.querySelector('.remove-coupon');
        removeBtn.addEventListener('click', function() {
            appliedCoupon.remove();
            updateTotals();
            showNotification('已移除优惠券');
        });

        updateTotals();
        showNotification('优惠券已应用');
    }

    // 总价计算
    function updateTotals() {
        const selectedItems = document.querySelectorAll('.item-select:checked');
        let subtotal = 0;

        selectedItems.forEach(item => {
            const subtotalText = item.closest('.cart-item').querySelector('.item-subtotal').textContent;
            const subtotalValue = parseFloat(subtotalText.replace('¥', '').replace(',', ''));
            subtotal += subtotalValue;
        });

        // 检查是否有优惠券
        const hasCoupon = document.querySelector('.applied-coupon');
        let discount = 0;

        if (hasCoupon) {
            const couponCode = hasCoupon.querySelector('.coupon-applied span').textContent;
            if (couponCode.includes('NEWUSER100')) {
                discount = 100;
            } else if (couponCode.includes('SAVE200') && subtotal >= 2000) {
                discount = 200;
            }
        }

        const total = subtotal - discount;

        // 更新显示
        document.getElementById('subtotal').textContent = `¥${subtotal.toLocaleString()}`;
        document.querySelector('.discount').textContent = `-¥${discount.toLocaleString()}`;
        document.getElementById('total').textContent = `¥${total.toLocaleString()}`;
    }

    // 更新购物车数量
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = Math.max(0, currentCount - 1);
    }

    // 结算按钮
    checkoutBtn.addEventListener('click', function() {
        if (!this.disabled) {
            const selectedItems = document.querySelectorAll('.item-select:checked');
            const items = [];

            selectedItems.forEach(item => {
                const name = item.closest('.cart-item').querySelector('.item-name').textContent;
                const quantity = item.closest('.cart-item').querySelector('.quantity-input').value;
                items.push({ name, quantity });
            });

            console.log('结算商品:', items);
            window.location.href = 'checkout.html';
        }
    });

    // 修改地址
    const changeAddressBtn = document.querySelector('.change-address');
    changeAddressBtn.addEventListener('click', function() {
        showNotification('地址修改功能正在开发中');
    });

    // 空购物车状态
    function showEmptyCart() {
        const cartItems = document.querySelector('.cart-items');
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>购物车是空的</h3>
                <p>快去选购您喜欢的商品吧！</p>
                <a href="index.html" class="continue-shopping">继续购物</a>
            </div>
        `;
    }

    // 通知系统
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        const bgColor = type === 'error' ? 'var(--error-color)' : 'var(--primary-color)';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${bgColor};
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

    // 初始化
    updateCheckoutButton();
    updateTotals();

    // 添加键盘快捷键
    document.addEventListener('keydown', function(e) {
        // Ctrl + Enter 快速结算
        if (e.ctrlKey && e.key === 'Enter') {
            if (!checkoutBtn.disabled) {
                checkoutBtn.click();
            }
        }

        // Delete 键删除选中商品
        if (e.key === 'Delete') {
            const selectedItems = document.querySelectorAll('.item-select:checked');
            if (selectedItems.length > 0 && confirm('确定要删除选中的商品吗？')) {
                selectedItems.forEach(item => {
                    const deleteBtn = item.closest('.cart-item').querySelector('.action-btn.delete');
                    deleteBtn.click();
                });
            }
        }
    });

    // 添加拖拽排序功能（高级功能）
    let draggedItem = null;

    document.querySelectorAll('.cart-item').forEach(item => {
        item.draggable = true;

        item.addEventListener('dragstart', function(e) {
            draggedItem = this;
            this.style.opacity = '0.5';
        });

        item.addEventListener('dragend', function() {
            this.style.opacity = '';
        });

        item.addEventListener('dragover', function(e) {
            e.preventDefault();
            const afterElement = getDragAfterElement(this.parentElement, e.clientY);
            if (afterElement == null) {
                this.parentElement.appendChild(draggedItem);
            } else {
                this.parentElement.insertBefore(draggedItem, afterElement);
            }
        });
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.cart-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // 本地存储同步
    function saveCartToLocalStorage() {
        const cartItems = [];
        document.querySelectorAll('.cart-item').forEach(item => {
            const select = item.querySelector('.item-select');
            const name = item.querySelector('.item-name').textContent;
            const spec = item.querySelector('.item-spec').textContent;
            const price = item.querySelector('.current-price').textContent;
            const quantity = item.querySelector('.quantity-input').value;

            cartItems.push({
                selected: select.checked,
                name,
                spec,
                price,
                quantity
            });
        });

        localStorage.setItem('techphone_cart', JSON.stringify(cartItems));
    }

    // 定期保存购物车状态
    setInterval(saveCartToLocalStorage, 5000);

    // 页面卸载时保存
    window.addEventListener('beforeunload', saveCartToLocalStorage);
});