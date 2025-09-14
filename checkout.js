// 结算页面专用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 地址选择
    const addressRadios = document.querySelectorAll('input[name="address"]');
    const addressItems = document.querySelectorAll('.address-item');

    addressRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            addressItems.forEach(item => item.classList.remove('selected'));
            this.closest('.address-item').classList.add('selected');
        });
    });

    // 地址操作
    const editBtns = document.querySelectorAll('.btn-edit');
    const deleteBtns = document.querySelectorAll('.btn-delete');

    editBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const addressItem = this.closest('.address-item');
            showAddressModal('edit', addressItem);
        });
    });

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('确定要删除这个地址吗？')) {
                const addressItem = this.closest('.address-item');
                addressItem.style.transition = 'all 0.3s ease';
                addressItem.style.transform = 'translateX(-100%)';
                addressItem.style.opacity = '0';

                setTimeout(() => {
                    addressItem.remove();
                    showNotification('地址已删除');
                }, 300);
            }
        });
    });

    // 添加地址
    const addAddressBtn = document.getElementById('addAddressBtn');
    const addressModal = document.getElementById('addressModal');
    const modalClose = document.querySelector('.modal-close');
    const btnCancel = document.querySelector('.btn-cancel');
    const btnSave = document.querySelector('.btn-save');

    addAddressBtn.addEventListener('click', function() {
        showAddressModal('add');
    });

    modalClose.addEventListener('click', hideAddressModal);
    btnCancel.addEventListener('click', hideAddressModal);

    // 点击模态框外部关闭
    addressModal.addEventListener('click', function(e) {
        if (e.target === this) {
            hideAddressModal();
        }
    });

    function showAddressModal(mode, addressItem = null) {
        const modalTitle = addressModal.querySelector('h3');

        if (mode === 'add') {
            modalTitle.textContent = '添加收货地址';
            clearAddressForm();
        } else {
            modalTitle.textContent = '编辑收货地址';
            populateAddressForm(addressItem);
        }

        addressModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function hideAddressModal() {
        addressModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function clearAddressForm() {
        const inputs = addressModal.querySelectorAll('input, select, textarea');
        inputs.forEach(input => input.value = '');
    }

    function populateAddressForm(addressItem) {
        // 这里可以根据实际情况填充表单数据
        console.log('填充地址表单数据');
    }

    // 保存地址
    btnSave.addEventListener('click', function() {
        const formData = new FormData();
        const inputs = addressModal.querySelectorAll('input, select');

        let isValid = true;
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'var(--error-color)';
            } else {
                input.style.borderColor = '';
            }
        });

        if (!isValid) {
            showNotification('请填写必填项', 'error');
            return;
        }

        // 模拟保存成功
        hideAddressModal();
        showNotification('地址保存成功');
    });

    // 表单验证
    const formInputs = document.querySelectorAll('.form-input[required], .form-select[required]');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = 'var(--error-color)';
            } else {
                this.style.borderColor = '';
            }
        });
    });

    // 手机号验证
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            const value = this.value.replace(/\D/g, '');
            if (value.length > 11) {
                this.value = value.slice(0, 11);
            } else {
                this.value = value;
            }
        });
    });

    // 配送方式选择
    const shippingRadios = document.querySelectorAll('input[name="shipping"]');
    const shippingFeeElement = document.getElementById('shippingFee');
    const totalAmountElement = document.getElementById('totalAmount');
    const finalTotalElement = document.getElementById('finalTotal');

    shippingRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateShippingFee(this.value);
        });
    });

    function updateShippingFee(shippingType) {
        let fee = 0;
        let feeText = '免费';

        switch(shippingType) {
            case 'standard':
                fee = 0;
                feeText = '免费';
                break;
            case 'express':
                fee = 15;
                feeText = '¥15';
                break;
            case 'same-day':
                fee = 30;
                feeText = '¥30';
                break;
        }

        shippingFeeElement.textContent = feeText;
        updateTotalAmount(fee);
    }

    function updateTotalAmount(shippingFee = 0) {
        const baseTotal = 10797; // 基础总价
        const discount = 1000; // 折扣
        const total = baseTotal - discount + shippingFee;

        totalAmountElement.textContent = `¥${total.toLocaleString()}`;
        finalTotalElement.textContent = `¥${total.toLocaleString()}`;
    }

    // 支付方式选择
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updatePaymentMethod(this.value);
        });
    });

    function updatePaymentMethod(method) {
        console.log('选择的支付方式:', method);
        // 这里可以添加支付方式特定的逻辑
    }

    // 发票信息
    const invoiceRadios = document.querySelectorAll('input[name="invoice"]');
    const invoiceForm = document.getElementById('invoiceForm');

    invoiceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'none') {
                invoiceForm.style.display = 'none';
            } else {
                invoiceForm.style.display = 'block';
            }
        });
    });

    // 提交订单
    const submitOrderBtn = document.getElementById('submitOrderBtn');
    const agreementCheckbox = document.querySelector('.agreement-label input');

    submitOrderBtn.addEventListener('click', function() {
        // 验证协议勾选
        if (!agreementCheckbox.checked) {
            showNotification('请先同意购买协议和隐私政策', 'error');
            agreementCheckbox.focus();
            return;
        }

        // 验证收货地址
        const selectedAddress = document.querySelector('input[name="address"]:checked');
        if (!selectedAddress) {
            showNotification('请选择收货地址', 'error');
            return;
        }

        // 验证支付方式
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if (!selectedPayment) {
            showNotification('请选择支付方式', 'error');
            return;
        }

        // 显示处理状态
        this.disabled = true;
        this.textContent = '处理中...';

        // 模拟订单提交
        setTimeout(() => {
            this.disabled = false;
            this.textContent = '提交订单';

            // 跳转到支付页面
            const orderId = generateOrderId();
            window.location.href = `payment.html?orderId=${orderId}`;
        }, 2000);
    });

    // 协议勾选状态监听
    agreementCheckbox.addEventListener('change', function() {
        submitOrderBtn.disabled = !this.checked;
    });

    // 生成订单ID
    function generateOrderId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `TP${timestamp}${random}`;
    }

    // 地址编辑功能
    function editAddress(addressItem) {
        const name = addressItem.querySelector('.address-name').textContent;
        const phone = addressItem.querySelector('.address-phone').textContent;
        const detail = addressItem.querySelector('.address-detail').textContent;

        // 填充到编辑表单
        const modal = document.getElementById('addressModal');
        modal.querySelector('input[type="text"]').value = name;
        modal.querySelector('input[type="tel"]').value = phone;
        modal.querySelector('input[placeholder*="详细地址"]').value = detail;

        showAddressModal('edit', addressItem);
    }

    // 订单金额实时计算
    function calculateOrderTotal() {
        const orderItems = document.querySelectorAll('.order-item');
        let subtotal = 0;

        orderItems.forEach(item => {
            const priceText = item.querySelector('.order-item-price').textContent;
            const price = parseFloat(priceText.replace('¥', '').replace(',', ''));
            const quantityText = item.querySelector('.order-item-quantity').textContent;
            const quantity = parseInt(quantityText.replace('x', ''));
            subtotal += price * quantity;
        });

        return subtotal;
    }

    // 页面加载时的初始化
    function initializePage() {
        // 设置默认选中第一个地址
        if (addressItems.length > 0) {
            addressItems[0].classList.add('selected');
        }

        // 初始化订单金额
        updateTotalAmount();

        // 添加键盘快捷键
        document.addEventListener('keydown', function(e) {
            // Ctrl + Enter 快速提交订单
            if (e.ctrlKey && e.key === 'Enter') {
                if (!submitOrderBtn.disabled) {
                    submitOrderBtn.click();
                }
            }

            // Escape 关闭模态框
            if (e.key === 'Escape') {
                hideAddressModal();
            }
        });
    }

    initializePage();

    // 自动保存功能
    let autoSaveTimer;
    const formElements = document.querySelectorAll('input, select, textarea');

    formElements.forEach(element => {
        element.addEventListener('change', function() {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(() => {
                saveFormData();
            }, 1000);
        });
    });

    function saveFormData() {
        const formData = {
            address: document.querySelector('input[name="address"]:checked')?.value,
            shipping: document.querySelector('input[name="shipping"]:checked')?.value,
            payment: document.querySelector('input[name="payment"]:checked')?.value,
            invoice: document.querySelector('input[name="invoice"]:checked')?.value,
            note: document.querySelector('.form-textarea').value
        };

        localStorage.setItem('checkout_form_data', JSON.stringify(formData));
    }

    // 恢复表单数据
    function restoreFormData() {
        const savedData = localStorage.getItem('checkout_form_data');
        if (savedData) {
            const formData = JSON.parse(savedData);

            // 恢复各选项的选中状态
            if (formData.address) {
                document.querySelector(`input[name="address"][value="${formData.address}"]`).checked = true;
            }
            if (formData.shipping) {
                document.querySelector(`input[name="shipping"][value="${formData.shipping}"]`).checked = true;
                updateShippingFee(formData.shipping);
            }
            if (formData.payment) {
                document.querySelector(`input[name="payment"][value="${formData.payment}"]`).checked = true;
            }
            if (formData.invoice) {
                document.querySelector(`input[name="invoice"][value="${formData.invoice}"]`).checked = true;
                if (formData.invoice !== 'none') {
                    document.getElementById('invoiceForm').style.display = 'block';
                }
            }
            if (formData.note) {
                document.querySelector('.form-textarea').value = formData.note;
            }
        }
    }

    restoreFormData();

    // 清理本地存储（页面卸载时）
    window.addEventListener('beforeunload', function() {
        // 可选：在页面卸载时清理或保存数据
    });

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
});