// Banking Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactions
    initializeBankingPage();
    setupIntersectionObserver();
    setupBankCardInteractions();
    setupScrollAnimations();
});

function initializeBankingPage() {
    // Add loading class to prevent flash of unstyled content
    document.body.classList.add('loading');
    
    // Remove loading class after page is ready
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 100);
    
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupIntersectionObserver() {
    // Enhanced intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // Observe statistics for counter animation
    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });
}

function setupBankCardInteractions() {
    const bankCards = document.querySelectorAll('.bank-card');
    
    bankCards.forEach(card => {
        // Add hover effects and interactions
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Add subtle animation to features
            const features = this.querySelectorAll('.feature-item');
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(5px)';
                    feature.style.transition = 'transform 0.3s ease';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Reset feature animations
            const features = this.querySelectorAll('.feature-item');
            features.forEach(feature => {
                feature.style.transform = 'translateX(0)';
            });
        });
        
        // Add click interaction for mobile
        card.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                this.classList.toggle('active');
            }
        });
    });
}

function setupScrollAnimations() {
    // Parallax effect for hero section
    const hero = document.querySelector('.banking-hero');
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && heroContent && heroVisual) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${rate * 0.5}px)`;
                heroVisual.style.transform = `translateY(${rate * 0.3}px)`;
            }
        });
    }
    
    // Floating cards animation
    animateFloatingCards();
}

function animateFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Create unique animation for each card
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 30 - 15;
            
            card.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + (index * 1000));
    });
}

// Statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                
                // Handle different number formats
                if (counter.textContent.includes('%')) {
                    counter.textContent = Math.ceil(current) + '%';
                } else if (counter.textContent.includes('+')) {
                    counter.textContent = Math.ceil(current) + '+';
                } else {
                    counter.textContent = Math.ceil(current);
                }
                
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.getAttribute('data-target') || target;
            }
        };
        
        updateCounter();
    });
}

// Contact button enhancement
function enhanceContactButtons() {
    const contactBtns = document.querySelectorAll('.cta-btn');
    
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (navMenu && mobileBtn) {
        navMenu.classList.toggle('active');
        mobileBtn.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

// Performance optimization - throttled scroll listener
let ticking = false;

function updateOnScroll() {
    revealOnScroll();
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = ['.banking-hero', '.banks-grid', '.cta-section'];
    
    requiredElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Banking page: Required element ${selector} is missing`);
        }
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    handleMissingElements();
    enhanceContactButtons();
    lazyLoadImages();
    
    // Add custom CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
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
        
        .loading * {
            animation-play-state: paused !important;
        }
        
        .animate-in {
            animation-play-state: running !important;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Export functions for potential external use
window.BankingPage = {
    toggleMobileMenu,
    animateCounters,
    revealOnScroll
};