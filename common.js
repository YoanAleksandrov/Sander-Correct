// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileBtn.textContent = '☰';
        document.body.style.overflow = ''; // Restore scroll
    } else {
        navMenu.classList.add('active');
        mobileBtn.textContent = '✕';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navMenu = document.getElementById('navMenu');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileBtn.textContent = '☰';
            document.body.style.overflow = '';
        }
    }
});

// Initialize animations with mobile optimizations
function initializeAnimations() {
    const observerOptions = {
        threshold: window.innerWidth <= 768 ? 0.1 : 0.15, // Lower threshold on mobile
        rootMargin: window.innerWidth <= 768 ? '50px' : '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = window.innerWidth <= 768 ? index * 50 : index * 150; // Faster on mobile
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
        observer.observe(el);
    });
}

// Enhanced notification with mobile optimizations
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.textContent = message;
    
    // Mobile-optimized positioning
    const isMobile = window.innerWidth <= 768;
    notification.style.cssText = `
        position: fixed;
        top: ${isMobile ? '90px' : '100px'};
        right: 1rem;
        left: 1rem;
        max-width: ${isMobile ? '100%' : '400px'};
        margin: 0 auto;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)' : 
                    type === 'error' ? 'linear-gradient(135deg, #f44336 0%, #e53935 100%)' : 
                    'linear-gradient(135deg, #8b4513 0%, #d2691e 100%)'};
        color: white;
        padding: ${isMobile ? '1rem 1.2rem' : '1rem 1.5rem'};
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1500;
        transform: translateY(-100px);
        transition: transform 0.3s ease;
        font-weight: 500;
        line-height: 1.4;
        text-align: center;
        font-size: ${isMobile ? '0.9rem' : '1rem'};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    const duration = isMobile ? 3000 : 4000; // Shorter on mobile
    setTimeout(() => {
        notification.style.transform = 'translateY(-100px)';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Header scroll effect with mobile optimizations
let lastScrollY = 0;
let scrollDirection = 'up';

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScrollY = window.scrollY;
    
    // Determine scroll direction
    if (currentScrollY > lastScrollY) {
        scrollDirection = 'down';
    } else {
        scrollDirection = 'up';
    }
    
    if (window.innerWidth <= 768) {
        // Mobile: Hide header on scroll down, show on scroll up
        if (scrollDirection === 'down' && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else if (scrollDirection === 'up' || currentScrollY <= 100) {
            header.style.transform = 'translateY(0)';
        }
    } else {
        // Desktop: Keep original behavior
        header.style.transform = 'translateY(0)';
    }
    
    // Add scrolled class
    if (currentScrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
});

// Create property card HTML with mobile optimizations
function createPropertyCard(property) {
    const isMobile = window.innerWidth <= 768;
    
    return `
        <div class="property-card fade-in" onclick="showPropertyModal('${property.title}', '${property.price}', '${property.location}', '${property.description}')">
            <div class="property-image">
                <img src="${property.image || 'images/default.jpg'}" alt="${property.title}" loading="lazy">
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
                    <button class="property-btn btn-primary" onclick="event.stopPropagation(); contactAboutProperty('${property.title}')">
                        <i class="fas fa-phone"></i>
                        ${isMobile ? '' : '<span>Свържи се</span>'}
                    </button>
                    <button class="property-btn btn-secondary" onclick="event.stopPropagation(); scheduleViewing('${property.title}')">
                        <i class="fas fa-calendar"></i>
                        ${isMobile ? '' : '<span>Оглед</span>'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Enhanced toggle favorite with mobile optimizations
function toggleFavorite(propertyId) {
    const heart = event.target;
    const card = heart.closest('.property-card');
    
    if (heart.classList.contains('fas')) {
        heart.classList.remove('fas');
        heart.classList.add('far');
        heart.style.color = '';
        showNotification('Премахнато от любими', 'info');
        
        // Mobile-optimized animation
        if (window.innerWidth <= 768) {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        } else {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        }
    } else {
        heart.classList.remove('far');
        heart.classList.add('fas');
        heart.style.color = '#d2691e';
        showNotification('Добавено в любими', 'success');
        
        // Mobile-optimized animation
        const scale = window.innerWidth <= 768 ? '1.2' : '1.3';
        const duration = window.innerWidth <= 768 ? 200 : 300;
        
        heart.style.transform = `scale(${scale})`;
        setTimeout(() => {
            heart.style.transform = '';
        }, duration);
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

// Enhanced property modal with mobile optimizations
function showPropertyModal(title, price, location, description) {
    const isMobile = window.innerWidth <= 768;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, ${isMobile ? '0.9' : '0.8'});
        display: flex;
        align-items: ${isMobile ? 'flex-start' : 'center'};
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: ${isMobile ? '1rem 0.5rem' : '1rem'};
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: ${isMobile ? '1.5rem' : '2rem'};
        border-radius: ${isMobile ? '20px' : '25px'};
        max-width: ${isMobile ? '100%' : '600px'};
        width: ${isMobile ? '100%' : '90%'};
        max-height: ${isMobile ? 'none' : '80vh'};
        overflow-y: ${isMobile ? 'visible' : 'auto'};
        text-align: center;
        transform: ${isMobile ? 'translateY(20px)' : 'scale(0.8)'};
        transition: transform 0.3s ease;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        margin: ${isMobile ? '1rem 0' : '0'};
    `;

    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <h3 style="color: #3e2723; margin: 0; font-size: ${isMobile ? '1.3rem' : '1.5rem'}; text-align: left; flex: 1;">${title}</h3>
            <button onclick="this.closest('.modal').remove()" style="background: none; border: none; font-size: ${isMobile ? '1.8rem' : '1.5rem'}; color: #999; cursor: pointer; padding: 0; margin-left: 1rem; line-height: 1;">×</button>
        </div>
        ${price ? `<p style="color: #8b4513; font-size: ${isMobile ? '1.2rem' : '1.3rem'}; font-weight: 700; margin-bottom: 0.5rem; text-align: left;">${price}</p>` : ''}
        ${location ? `<p style="color: #5d4e37; margin-bottom: 2rem; text-align: left; display: flex; align-items: center; gap: 0.5rem; font-size: ${isMobile ? '0.9rem' : '1rem'};"><i class="fas fa-map-marker-alt" style="color: #8b4513;"></i>${location}</p>` : ''}
        <p style="color: #5d4e37; margin-bottom: 2rem; line-height: 1.6; text-align: left; font-size: ${isMobile ? '0.9rem' : '1rem'};">${description}</p>
        <div style="display: ${isMobile ? 'flex' : 'flex'}; gap: ${isMobile ? '0.8rem' : '1rem'}; justify-content: center; flex-wrap: wrap; margin-top: 2rem; ${isMobile ? 'flex-direction: column;' : ''}">
            <a href="tel:+359888123456" style="background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%); color: white; padding: ${isMobile ? '1.2rem 1.5rem' : '1rem 1.5rem'}; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.3s ease; font-size: ${isMobile ? '1rem' : '0.9rem'};" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">
                <i class="fas fa-phone"></i> Обадете се
            </a>
            <a href="mailto:info@sandercorrect.com" style="background: transparent; color: #8b4513; border: 2px solid #8b4513; padding: ${isMobile ? '1.2rem 1.5rem' : '1rem 1.5rem'}; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.3s ease; font-size: ${isMobile ? '1rem' : '0.9rem'};" onmouseover="this.style.background='#8b4513'; this.style.color='white'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='transparent'; this.style.color='#8b4513'; this.style.transform=''">
                <i class="fas fa-envelope"></i> Имейл
            </a>
            <a href="properties.html" style="background: #f8f6f3; color: #5d4e37; border: none; padding: ${isMobile ? '1.2rem 1.5rem' : '1rem 1.5rem'}; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.3s ease; font-size: ${isMobile ? '1rem' : '0.9rem'};" onmouseover="this.style.background='#8b4513'; this.style.color='white'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#f8f6f3'; this.style.color='#5d4e37'; this.style.transform=''">
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
        modalContent.style.transform = isMobile ? 'translateY(0)' : 'scale(1)';
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
    
    // Add swipe-to-close on mobile
    if (isMobile) {
        let startY = 0;
        let currentY = 0;
        let isDragging = false;
        
        modalContent.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            isDragging = true;
        }, { passive: true });
        
        modalContent.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;
            
            if (deltaY > 0) { // Only allow downward swipe
                modalContent.style.transform = `translateY(${deltaY * 0.5}px)`;
            }
        }, { passive: true });
        
        modalContent.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const deltaY = currentY - startY;
            if (deltaY > 100) { // Close if swiped down more than 100px
                modal.remove();
            } else {
                modalContent.style.transform = 'translateY(0)';
            }
            
            isDragging = false;
        }, { passive: true });
    }
}

// Close all modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.remove();
        });
    }
});

// Enhanced anchor links handling
function handleAnchorLinks() {
    // Check if there's a hash in the URL on page load
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const offset = window.innerWidth <= 768 ? 100 : 120; // Account for mobile header
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
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
                    const offset = window.innerWidth <= 768 ? 100 : 120;
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Add highlight effect
                    target.style.animation = 'highlight 2s ease';
                }
            }
        });
    });
}

// Performance optimization for mobile
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Reduce animations on low-end devices
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) {
            document.body.classList.add('reduced-motion');
        }
        
        // Add mobile class for CSS targeting
        document.body.classList.add('mobile-device');
        
        // Optimize images for mobile
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.loading !== 'lazy') {
                img.loading = 'lazy';
            }
        });
        
        // Add mobile-specific touch optimizations
        document.body.style.touchAction = 'manipulation'; // Prevents zoom on double tap
        
        // Optimize scroll performance
        document.documentElement.style.overflowScrolling = 'touch';
    } else {
        document.body.classList.remove('mobile-device');
        document.body.style.touchAction = '';
        document.documentElement.style.overflowScrolling = '';
    }
}

// Initialize animations on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    handleAnchorLinks();
    optimizeForMobile();
});

// Re-optimize on resize
window.addEventListener('resize', () => {
    clearTimeout(window.optimizeTimeout);
    window.optimizeTimeout = setTimeout(() => {
        optimizeForMobile();
        initializeAnimations(); // Reinitialize with new viewport settings
    }, 100);
});