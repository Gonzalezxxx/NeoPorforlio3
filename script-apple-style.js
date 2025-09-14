// Apple Style TechPhone JavaScript
// Clean, minimal, no alerts - direct navigation

console.log('🍎 TechPhone Apple Style Loading...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Apple-style interactions...');

    // Initialize all interactions
    initializeAppleStyleInteractions();
});

function initializeAppleStyleInteractions() {
    console.log('Setting up Apple-style user experience...');

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Scroll effects
    setupScrollEffects();

    // Navigation
    setupNavigation();

    // Product interactions
    setupProductInteractions();

    // Shopping cart
    setupShoppingCart();

    // Search functionality
    setupSearch();

    // Category navigation
    setupCategories();

    // Main buttons
    setupMainButtons();

    console.log('✅ Apple-style interactions initialized');
}

// Scroll effects for navigation
function setupScrollEffects() {
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Navigation - Apple style smooth transitions
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const cartIcon = document.querySelector('.bag-icon');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const linkText = this.textContent.trim();

            // Add subtle feedback
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 150);

            // Handle different types of navigation
            if (href.startsWith('#')) {
                // Internal anchor link - smooth scroll
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else if (href.includes('#')) {
                // Page with anchor - navigate to page then scroll
                e.preventDefault();
                const [pageUrl, anchorId] = href.split('#');
                if (pageUrl === window.location.pathname || pageUrl === '') {
                    // Same page, just scroll
                    const targetElement = document.querySelector('#' + anchorId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                } else {
                    // Different page - navigate and let page handle scroll
                    window.location.href = href;
                }
            } else {
                // External page - normal navigation
                // Let the browser handle the navigation
                // Only prevent default if we want custom handling
                if (linkText === 'Products') {
                    e.preventDefault();
                    window.location.href = 'product-detail.html';
                }
            }
        });
    });

    // Shopping cart - direct navigation
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            // Subtle scale animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);

            // Direct navigation to cart
            window.location.href = 'cart.html';
        });
    }
}

// Product interactions - no alerts, direct navigation
function setupProductInteractions() {
    const productCards = document.querySelectorAll('.product-card');
    const accessoryCards = document.querySelectorAll('.accessory-card');

    // Handle product cards
    productCards.forEach(card => {
        // Product card click - direct to product detail
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking action buttons
            if (e.target.closest('.action-btn')) {
                return;
            }

            const productName = this.querySelector('.product-name');
            const name = productName ? productName.textContent.trim() : 'Product';

            // Add subtle lift effect
            this.style.transform = 'translateY(-8px)';
            setTimeout(() => {
                this.style.transform = 'translateY(0)';
                window.location.href = `product-detail.html?product=${encodeURIComponent(name)}`;
            }, 200);
        });

        // Action buttons
        const actionButtons = card.querySelectorAll('.action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const action = this.textContent.trim();
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('.product-name');
                const name = productName ? productName.textContent.trim() : 'Product';

                // Add button feedback
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);

                if (action === '❤️') {
                    // Toggle like state
                    const isLiked = this.style.color === 'rgb(255, 59, 48)'; // Apple red
                    this.style.color = isLiked ? '' : 'rgb(255, 59, 48)';

                    // Update UI without alert
                    updateWishlistCounter(!isLiked);

                } else if (action === '🛒') {
                    // Add to cart
                    addToCart(name);

                } else if (action === '👁️') {
                    // Direct navigation to product detail
                    window.location.href = `product-detail.html?product=${encodeURIComponent(name)}`;
                }
            });
        });
    });

    // Handle accessory cards
    accessoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking the learn more link
            if (e.target.closest('.accessory-link')) {
                return;
            }

            const accessoryName = this.querySelector('.accessory-name');
            const name = accessoryName ? accessoryName.textContent.trim() : 'Accessory';

            // Add subtle lift effect
            this.style.transform = 'translateY(-4px)';
            setTimeout(() => {
                this.style.transform = 'translateY(0)';
                window.location.href = `product-detail.html?product=${encodeURIComponent(name)}`;
            }, 200);
        });
    });
}

// Shopping cart functionality
function setupShoppingCart() {
    updateCartCount();
}

function addToCart(productName) {
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        let count = parseInt(cartCount.textContent) || 0;
        count++;
        cartCount.textContent = count;

        // Apple-style subtle animation
        cartCount.style.transform = 'scale(1.3)';
        cartCount.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 300);
    }

    // Update cart in localStorage
    updateCartStorage(productName);
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const cartItems = JSON.parse(localStorage.getItem('techphone-cart') || '[]');
        cartCount.textContent = cartItems.length;
    }
}

function updateCartStorage(productName) {
    const cartItems = JSON.parse(localStorage.getItem('techphone-cart') || '[]');
    cartItems.push({
        name: productName,
        added: new Date().toISOString()
    });
    localStorage.setItem('techphone-cart', JSON.stringify(cartItems));
}

function updateWishlistCounter(added) {
    // Update wishlist UI if needed
    console.log(`Product ${added ? 'added to' : 'removed from'} wishlist`);
}

// Search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-input');

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    // Navigate to search results
                    window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    }
}

// Category navigation
function setupCategories() {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h4');
            const category = categoryName ? categoryName.textContent.trim() : 'Category';

            // Apple-style subtle hover effect before navigation
            this.style.transform = 'translateY(-4px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';

                // Navigate based on category
                if (category.includes('Phone') || category.includes('手机')) {
                    window.location.href = 'index.html#iphone-section';
                } else if (category.includes('Accessory') || category.includes('配件')) {
                    window.location.href = 'index.html#accessories-section';
                } else if (category.includes('Watch') || category.includes('穿戴')) {
                    window.location.href = 'index.html#watch-section';
                } else {
                    window.location.href = 'index.html#products-section';
                }
            }, 150);
        });
    });
}

// Main buttons (Buy Now, Learn More)
function setupMainButtons() {
    const mainButtons = document.querySelectorAll('.link-primary, .link-secondary');

    mainButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const buttonText = this.textContent.trim();

            // Apple-style button feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);

            // Direct navigation
            if (buttonText.includes('Buy') || buttonText.includes('购买')) {
                window.location.href = 'checkout.html';
            } else if (buttonText.includes('Learn') || buttonText.includes('了解更多')) {
                // Extract product name from parent context for navigation
                const parentSection = this.closest('.product-section, .hero, .accessories-section');
                if (parentSection) {
                    const titleElement = parentSection.querySelector('.hero-title, .product-title, .accessory-name');
                    if (titleElement) {
                        const productName = titleElement.textContent.trim();
                        window.location.href = `product-detail.html?product=${encodeURIComponent(productName)}`;
                        return;
                    }
                }
                window.location.href = 'product-detail.html';
            }
        });
    });
}

// Page loading enhancement
window.addEventListener('load', function() {
    console.log('🎉 Apple-style TechPhone fully loaded');

    // Remove any loading indicators
    document.body.style.opacity = '1';

    // Initialize cart count
    updateCartCount();

    // Add smooth entrance animations
    addEntranceAnimations();
});

function addEntranceAnimations() {
    const elements = document.querySelectorAll('.product-card, .category-card, .hero-content > div');

    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Error handling (silent, no alerts)
window.addEventListener('error', function(e) {
    console.error('TechPhone Error:', e.error);
    // Silently log errors without user-facing alerts
});

console.log('🍎 Apple-style TechPhone script ready');