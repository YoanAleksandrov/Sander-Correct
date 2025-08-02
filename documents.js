// Documents Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize document interactions
    initDocumentInteractions();
    
    // Initialize header scroll effects
    initHeaderScroll();
});

// Animation initialization
function initAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for document cards
                if (entry.target.classList.contains('document-card')) {
                    const cards = document.querySelectorAll('.document-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
                
                // Add staggered animation for info items
                if (entry.target.classList.contains('info-item')) {
                    const items = document.querySelectorAll('.info-item');
                    const index = Array.from(items).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.2}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
}

// Document interactions
function initDocumentInteractions() {
    const documentCards = document.querySelectorAll('.document-card');
    
    documentCards.forEach(card => {
        // Add click effect
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons
            if (e.target.closest('.document-actions')) {
                return;
            }
            
            // Add ripple effect
            createRippleEffect(e, card);
        });
        
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', function() {
            // You can add subtle hover sounds here if desired
        });
    });
    

}

// Create ripple effect
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Header scroll effects
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Mobile menu toggle (if not already in common.js)
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (navMenu && mobileBtn) {
        navMenu.classList.toggle('active');
        mobileBtn.classList.toggle('active');
        
        // Update button text
        if (navMenu.classList.contains('active')) {
            mobileBtn.textContent = '✕';
        } else {
            mobileBtn.textContent = '☰';
        }
    }
}

// Document search functionality (if needed)
function searchDocuments(query) {
    const documentCards = document.querySelectorAll('.document-card');
    const searchTerm = query.toLowerCase();
    
    documentCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
}

// Document filter functionality
function filterDocuments(type) {
    const documentCards = document.querySelectorAll('.document-card');
    
    documentCards.forEach(card => {
        const documentType = card.querySelector('.document-type').textContent;
        
        if (type === 'all' || documentType === type.toUpperCase()) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #8b4513, #cd853f);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Add click event
    scrollBtn.addEventListener('click', scrollToTop);
}

// Initialize scroll to top button
addScrollToTopButton();

// Add CSS for ripple effect
const rippleCSS = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(139, 69, 19, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll handling logic here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

 