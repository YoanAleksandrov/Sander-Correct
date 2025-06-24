// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileBtn.textContent = '☰';
    } else {
        navMenu.classList.add('active');
        mobileBtn.textContent = '✕';
    }
}

// Initialize animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
        observer.observe(el);
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Create property card HTML
function createPropertyCard(property) {
    return `
        <div class="property-card fade-in" onclick="showPropertyModal('${property.title}', '${property.price}', '${property.location}', '${property.description}')">
            <div class="property-image">
                <img src="${property.image || 'images/default.jpg'}" alt="${property.title}">
                <div class="property-badge">${property.badge || ''}</div>
                <div class="property-heart" onclick="event.stopPropagation(); toggleFavorite(${property.id})">
                    <i class="far fa-heart"></i>
                </div>
            </div>
            <div class="property-content">
                <div class="property-price">${property.price}</div>
                <div class="property-title">${property.title}</div>
                <div class="property-location">${property.location}</div>
                <div class="property-details">
                    <div class="detail-item">
                        <div class="detail-icon"></div>
                        <span>${property.area}</span>
                    </div>
                    <div class="detail-item">
                        <div class="detail-icon"></div>
                        <span>${property.floor}</span>
                    </div>
                    <div class="detail-item">
                        <div class="detail-icon"></div>
                        <span>${property.rooms}</span>
                    </div>
                    <div class="detail-item">
                        <div class="detail-icon"></div>
                        <span>${property.bathrooms}</span>
                    </div>
                </div>
                <p class="property-description">${property.description}</p>
                <div class="property-actions">
                    <button class="property-btn btn-primary" onclick="event.stopPropagation(); contactAboutProperty('${property.title}')">Свържи се</button>
                    <button class="property-btn btn-secondary" onclick="event.stopPropagation(); scheduleViewing('${property.title}')">Оглед</button>
                </div>
            </div>
        </div>
    `;
}


// Toggle favorite
function toggleFavorite(propertyId) {
    const heart = event.target;
    if (heart.classList.contains('fas')) {
        heart.classList.remove('fas');
        heart.classList.add('far');
        showNotification('Премахнато от любими', 'info');
    } else {
        heart.classList.remove('far');
        heart.classList.add('fas');
        heart.style.color = '#d2691e';
        showNotification('Добавено в любими', 'success');
    }
}

// Contact about property
function contactAboutProperty(propertyTitle) {
    window.location.href = 'contact.html?property=' + encodeURIComponent(propertyTitle);
}

// Schedule viewing
function scheduleViewing(propertyTitle) {
    showPropertyModal(
        propertyTitle, 
        '', 
        '', 
        `За да насрочите оглед на "${propertyTitle}", моля свържете се с нас на +359 888 123 456 или попълнете формата за контакт.`
    );
}

// Show property modal
function showPropertyModal(title, price, location, description) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 25px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        text-align: center;
        transform: scale(0.8);
        transition: transform 0.3s ease;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    `;

    modalContent.innerHTML = `
        <h3 style="color: #3e2723; margin-bottom: 1rem; font-size: 1.5rem;">${title}</h3>
        ${price ? `<p style="color: #8b4513; font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">${price}</p>` : ''}
        ${location ? `<p style="color: #5d4e37; margin-bottom: 2rem;">${location}</p>` : ''}
        <p style="color: #5d4e37; margin-bottom: 2rem; line-height: 1.6; text-align: left;">${description}</p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem;">
            <a href="tel:+359888123456" style="background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%); color: white; padding: 0.8rem 1.5rem; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-phone"></i> Обадете се
            </a>
            <a href="mailto:info@sandercorrect.com" style="background: transparent; color: #8b4513; border: 2px solid #8b4513; padding: 0.8rem 1.5rem; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-envelope"></i> Имейл
            </a>
            <button onclick="this.closest('.modal').remove()" style="background: #f5f5f5; color: #5d4e37; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; font-weight: 600; cursor: pointer;">Затвори</button>
        </div>
    `;

    modal.className = 'modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Animate modal appearance
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Close all modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.remove();
        });
    }
});

// Initialize animations on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    
    // Handle smooth scrolling for anchor links
    handleAnchorLinks();
});

// Handle anchor links with smooth scrolling
function handleAnchorLinks() {
    // Check if there's a hash in the URL on page load
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Add highlight effect
                target.style.animation = 'highlight 2s ease';
            }
        }, 500);
    }
    
    // Handle all anchor links
    document.querySelectorAll('a[href*="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an external link with hash
            if (href.includes('.html#')) {
                // Let the browser handle navigation
                return;
            }
            
            // Handle internal anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Add highlight effect
                    target.style.animation = 'highlight 2s ease';
                }
            }
        });
    });
}

// Add highlight animation
const highlightStyle = document.createElement('style');
highlightStyle.textContent = `
    @keyframes highlight {
        0% { background-color: transparent; }
        50% { background-color: rgba(210, 105, 30, 0.1); }
        100% { background-color: transparent; }
    }
`;
document.head.appendChild(highlightStyle);

// Enhanced functions to add to your existing common.js

// Global functions for property scrolling (add these to your common.js)
window.scrollProperties = function(direction) {
    if (typeof scrollProperties !== 'undefined') {
        scrollProperties(direction);
    }
};

window.toggleAutoScroll = function() {
    if (typeof toggleAutoScroll !== 'undefined') {
        toggleAutoScroll();
    }
};

window.scrollToProperty = function(index) {
    if (typeof scrollToProperty !== 'undefined') {
        scrollToProperty(index);
    }
};

// Enhanced toggle favorite with better visual feedback
function toggleFavorite(propertyId) {
    const heart = event.target;
    const card = heart.closest('.property-card');
    
    if (heart.classList.contains('fas')) {
        heart.classList.remove('fas');
        heart.classList.add('far');
        heart.style.color = '';
        showNotification('Премахнато от любими', 'info');
        
        // Add removal animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    } else {
        heart.classList.remove('far');
        heart.classList.add('fas');
        heart.style.color = '#d2691e';
        showNotification('Добавено в любими', 'success');
        
        // Add favorite animation
        heart.style.transform = 'scale(1.3)';
        setTimeout(() => {
            heart.style.transform = '';
        }, 300);
    }
}

// Enhanced property modal with better mobile support
function showPropertyModal(title, price, location, description) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 1rem;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 25px;
        max-width: 600px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        text-align: center;
        transform: scale(0.8);
        transition: transform 0.3s ease;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    `;

    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <h3 style="color: #3e2723; margin: 0; font-size: 1.5rem; text-align: left; flex: 1;">${title}</h3>
            <button onclick="this.closest('.modal').remove()" style="background: none; border: none; font-size: 1.5rem; color: #999; cursor: pointer; padding: 0; margin-left: 1rem;">×</button>
        </div>
        ${price ? `<p style="color: #8b4513; font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem; text-align: left;">${price}</p>` : ''}
        ${location ? `<p style="color: #5d4e37; margin-bottom: 2rem; text-align: left; display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-map-marker-alt" style="color: #8b4513;"></i>${location}</p>` : ''}
        <p style="color: #5d4e37; margin-bottom: 2rem; line-height: 1.6; text-align: left;">${description}</p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem;">
            <a href="tel:+359888123456" style="background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%); color: white; padding: 1rem 1.5rem; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">
                <i class="fas fa-phone"></i> Обадете се
            </a>
            <a href="mailto:info@sandercorrect.com" style="background: transparent; color: #8b4513; border: 2px solid #8b4513; padding: 1rem 1.5rem; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease;" onmouseover="this.style.background='#8b4513'; this.style.color='white'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='transparent'; this.style.color='#8b4513'; this.style.transform=''">
                <i class="fas fa-envelope"></i> Имейл
            </a>
            <a href="properties.html" style="background: #f8f6f3; color: #5d4e37; border: none; padding: 1rem 1.5rem; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease;" onmouseover="this.style.background='#8b4513'; this.style.color='white'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#f8f6f3'; this.style.color='#5d4e37'; this.style.transform=''">
                <i class="fas fa-search"></i> Още имоти
            </a>
        </div>
    `;

    modal.className = 'modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Animate modal appearance
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Restore body scroll when modal is closed
    const originalRemove = modal.remove;
    modal.remove = function() {
        document.body.style.overflow = '';
        originalRemove.call(this);
    };
}

// Enhanced notification with better positioning for mobile
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.textContent = message;
    
    // Better positioning for mobile
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 1rem;
        left: 1rem;
        max-width: 400px;
        margin: 0 auto;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)' : 
                    type === 'error' ? 'linear-gradient(135deg, #f44336 0%, #e53935 100%)' : 
                    'linear-gradient(135deg, #8b4513 0%, #d2691e 100%)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1500;
        transform: translateY(-100px);
        transition: transform 0.3s ease;
        font-weight: 500;
        line-height: 1.4;
        text-align: center;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateY(-100px)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Enhanced smooth scrolling for anchor links
function handleAnchorLinks() {
    // Check if there's a hash in the URL on page load
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Add highlight effect
                target.style.animation = 'highlight 2s ease';
            }
        }, 500);
    }
    
    // Handle all anchor links
    document.querySelectorAll('a[href*="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an external link with hash
            if (href.includes('.html#')) {
                // Let the browser handle navigation
                return;
            }
            
            // Handle internal anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Add highlight effect
                    target.style.animation = 'highlight 2s ease';
                }
            }
        });
    });
}

// Performance optimization for mobile
function optimizeForMobile() {
    // Reduce animations on low-end devices
    if (window.DeviceMotionEvent && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) {
            document.body.classList.add('reduced-motion');
        }
    }
    
    // Optimize images for mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.loading !== 'lazy') {
            img.loading = 'lazy';
        }
    });
}

// Initialize mobile optimizations
document.addEventListener('DOMContentLoaded', () => {
    optimizeForMobile();
});