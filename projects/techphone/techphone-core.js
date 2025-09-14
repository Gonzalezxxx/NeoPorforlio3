/**
 * TechPhone Core JavaScript Library
 * Professional Apple-style interactions and utilities
 * @version 2.0.0
 * @author TechPhone Team
 */

console.log('🚀 TechPhone Core v2.0.0 Loading...');

class TechPhoneCore {
    constructor() {
        this.version = '2.0.0';
        this.isInitialized = false;
        this.currentPage = this.getCurrentPage();
        this.cartItems = [];
        this.userPreferences = this.loadUserPreferences();
    }

    // Initialize the core system
    initialize() {
        if (this.isInitialized) return;

        console.log('✨ Initializing TechPhone Core...');

        // Set up page transition system
        this.setupPageTransitions();

        // Initialize navigation
        this.setupNavigation();

        // Set up shopping cart
        this.setupShoppingCart();

        // Set up search functionality
        this.setupSearch();

        // Set up scroll effects
        this.setupScrollEffects();

        // Set up accessibility
        this.setupAccessibility();

        // Set up animations
        this.setupAnimations();

        // Set up error handling
        this.setupErrorHandling();

        // Load cart data
        this.loadCartData();

        this.isInitialized = true;
        console.log(`🎯 TechPhone Core v${this.version} initialized successfully`);
    }

    // Get current page information
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index-pro.html';
        return {
            name: page.replace('.html', '').replace('-', ' '),
            path: page,
            url: window.location.href
        };
    }

    // Page transition system
    setupPageTransitions() {
        // Add page transition overlay
        const overlay = document.createElement('div');
        overlay.id = 'page-transition-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: white;
            z-index: 10000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(overlay);

        // Handle page load animations
        window.addEventListener('load', () => {
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.pointerEvents = 'none';
                }, 300);
            }, 100);

            this.announcePageChange();
        });
    }

    // Navigation system
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const bagIcon = document.querySelector('.bag-icon');
        const logo = document.querySelector('.nav-logo a');

        // Handle navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Skip if it's an external link
                if (href.startsWith('http')) return;

                // Add visual feedback
                link.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                }, 150);

                // Handle internal navigation
                if (href && !href.startsWith('#')) {
                    e.preventDefault();
                    this.navigateTo(href);
                } else if (href.startsWith('#')) {
                    // Handle anchor links
                    e.preventDefault();
                    this.scrollToAnchor(href);
                }
            });
        });

        // Handle logo click
        if (logo) {
            logo.addEventListener('click', (e) => {
                const href = logo.getAttribute('href');
                if (href && href !== window.location.pathname) {
                    e.preventDefault();
                    this.navigateTo(href);
                }
            });
        }

        // Handle shopping cart
        if (bagIcon) {
            bagIcon.addEventListener('click', () => {
                bagIcon.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    bagIcon.style.transform = 'scale(1)';
                    this.navigateTo('cart.html');
                }, 150);
            });
        }
    }

    // Shopping cart system
    setupShoppingCart() {
        this.updateCartCount();

        // Listen for cart updates across tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'techphone-cart') {
                this.loadCartData();
                this.updateCartCount();
            }
        });
    }

    // Load cart data from localStorage
    loadCartData() {
        try {
            this.cartItems = JSON.parse(localStorage.getItem('techphone-cart') || '[]');
        } catch (error) {
            console.error('Error loading cart data:', error);
            this.cartItems = [];
        }
    }

    // Save cart data to localStorage
    saveCartData() {
        try {
            localStorage.setItem('techphone-cart', JSON.stringify(this.cartItems));
        } catch (error) {
            console.error('Error saving cart data:', error);
        }
    }

    // Add item to cart
    addToCart(productName, price = 0, quantity = 1, options = {}) {
        const item = {
            id: Date.now() + Math.random(),
            name: productName,
            price: price,
            quantity: quantity,
            options: options,
            added: new Date().toISOString()
        };

        this.cartItems.push(item);
        this.saveCartData();
        this.updateCartCount();

        // Show success notification
        this.showNotification(`${productName} added to cart!`, 'success');

        console.log('🛒 Item added to cart:', item);
        return item;
    }

    // Remove item from cart
    removeFromCart(itemId) {
        const index = this.cartItems.findIndex(item => item.id === itemId);
        if (index > -1) {
            const removedItem = this.cartItems.splice(index, 1)[0];
            this.saveCartData();
            this.updateCartCount();
            this.showNotification(`${removedItem.name} removed from cart`, 'info');
        }
    }

    // Update cart count display
    updateCartCount() {
        const cartCount = document.querySelector('.bag-count');
        if (cartCount) {
            const totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';

            if (totalItems > 0) {
                // Animate badge
                cartCount.style.animation = 'pulse 0.3s ease';
                setTimeout(() => {
                    cartCount.style.animation = '';
                }, 300);
            }
        }
    }

    // Search functionality
    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const searchTerm = searchInput.value.trim();
                    if (searchTerm) {
                        this.navigateTo(`search.html?q=${encodeURIComponent(searchTerm)}`);
                    }
                }
            });

            // Auto-suggest functionality (simplified)
            searchInput.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value.length > 2) {
                    this.showSearchSuggestions(value);
                } else {
                    this.hideSearchSuggestions();
                }
            });
        }
    }

    // Show search suggestions (placeholder)
    showSearchSuggestions(query) {
        // In a real implementation, this would fetch from an API
        console.log('🔍 Search suggestions for:', query);
    }

    // Hide search suggestions
    hideSearchSuggestions() {
        // Remove suggestions dropdown
        const existingDropdown = document.querySelector('.search-suggestions');
        if (existingDropdown) {
            existingDropdown.remove();
        }
    }

    // Scroll effects
    setupScrollEffects() {
        const nav = document.querySelector('.nav');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add/remove scrolled class
            if (currentScroll > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            // Hide/show nav on scroll (optional)
            if (currentScroll > lastScroll && currentScroll > 100) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;

            // Handle scroll animations
            this.handleScrollAnimations();
        });
    }

    // Handle scroll-triggered animations
    handleScrollAnimations() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const windowHeight = window.innerHeight;

        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < windowHeight * 0.8;

            if (isVisible && !element.classList.contains('animated')) {
                element.classList.add('animated');
                this.animateElement(element);
            }
        });
    }

    // Animate individual element
    animateElement(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    // Accessibility features
    setupAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });

        // Focus management
        this.manageFocus();
    }

    // Focus management for accessibility
    manageFocus() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: #007aff;
            color: white;
            padding: 8px;
            z-index: 10000;
            text-decoration: none;
        `;
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Animation system
    setupAnimations() {
        // Add entrance animations to page sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            section.classList.add('animate-on-scroll');
            section.style.transitionDelay = `${index * 0.1}s`;
        });

        // Initialize hover effects
        this.initializeHoverEffects();
    }

    // Initialize hover effects
    initializeHoverEffects() {
        const interactiveElements = document.querySelectorAll('a, button, .card, .product-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-2px)';
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0)';
            });
        });
    }

    // Error handling
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('TechPhone Error:', e.error);
            this.trackError(e.error);
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
            this.trackError(e.reason);
        });
    }

    // Track errors (placeholder for analytics)
    trackError(error) {
        // In a real implementation, this would send to an error tracking service
        console.error('🚨 Error tracked:', error);
    }

    // Load user preferences
    loadUserPreferences() {
        try {
            return JSON.parse(localStorage.getItem('techphone-preferences') || '{}');
        } catch (error) {
            console.error('Error loading user preferences:', error);
            return {};
        }
    }

    // Save user preferences
    saveUserPreferences() {
        try {
            localStorage.setItem('techphone-preferences', JSON.stringify(this.userPreferences));
        } catch (error) {
            console.error('Error saving user preferences:', error);
        }
    }

    // Navigation functions
    navigateTo(url) {
        console.log('🧭 Navigating to:', url);

        // Show transition overlay
        const overlay = document.getElementById('page-transition-overlay');
        if (overlay) {
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
        }

        // Add page transition effect
        document.body.style.opacity = '0.7';
        document.body.style.transform = 'translateY(10px)';

        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }

    // Smooth scroll to anchor
    scrollToAnchor(anchor) {
        const target = document.querySelector(anchor);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Show notification
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `techphone-notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${type === 'success' ? '#34c759' : type === 'error' ? '#ff3b30' : '#007aff'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 14px;
            max-width: 300px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Remove after duration
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, duration);
    }

    // Announce page changes for screen readers
    announcePageChange() {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;

        const pageTitle = document.title;
        announcement.textContent = `Page loaded: ${pageTitle}`;

        document.body.appendChild(announcement);
        setTimeout(() => {
            if (document.body.contains(announcement)) {
                document.body.removeChild(announcement);
            }
        }, 1000);
    }

    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Format currency
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    // Format date
    formatDate(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
    }

    // Get URL parameters
    getUrlParams() {
        const params = {};
        const urlParams = new URLSearchParams(window.location.search);
        for (const [key, value] of urlParams) {
            params[key] = value;
        }
        return params;
    }

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Copy to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification('Copied to clipboard!', 'success');
            return true;
        } catch (err) {
            console.error('Failed to copy text: ', err);
            this.showNotification('Failed to copy text', 'error');
            return false;
        }
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Validate email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Get device info
    getDeviceInfo() {
        const userAgent = navigator.userAgent;
        return {
            userAgent: userAgent,
            platform: navigator.platform,
            language: navigator.language,
            isMobile: /Mobi|Android/i.test(userAgent),
            isTablet: /Tablet|iPad/i.test(userAgent),
            isDesktop: !/Mobi|Android|Tablet|iPad/i.test(userAgent)
        };
    }
}

// Initialize TechPhone Core when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Create global instance
    window.techphone = new TechPhoneCore();

    // Initialize the system
    window.techphone.initialize();

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }

        .techphone-notification {
            animation: slideIn 0.3s ease;
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

        .keyboard-nav *:focus {
            outline: 2px solid #007aff !important;
            outline-offset: 2px !important;
        }

        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    console.log('🎉 TechPhone Core ready!');
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TechPhoneCore;
}