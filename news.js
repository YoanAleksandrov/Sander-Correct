// News Page JavaScript - Updated without Newsletter

// Mobile menu toggle function
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

// News data - всички новини от оригиналния сайт
const newsData = [
    {
        id: 1,
        title: "Румяна Александрова – член на Управителния съвет на Софийската структура на Националното сдружение",
        subtitle: "Румяна Александрова: Хора, които имат по-голям процент от изискуемите лични средства на банките, предпочитат да си вземат кредит на ниски нива",
        date: "12 февруари 2025",
        author: "Румяна Александрова",
        category: "Експертни мнения",
        image: "https://via.placeholder.com/400x250/8B4513/FFFFFF?text=Новини",
        fullContent: `
            <h3>Румяна Александрова в предаването "Утрото на фокус" на Радио "Фокус"</h3>
            <p>Водещият експерт Румяна Александрова - член на УС на Софийската структура на Националното сдружение "Недвижими имоти" беше гост в предаването "Утрото на фокус" на Радио "Фокус".</p>
            <p>В интервюто тя коментира актуалните тенденции на имотния пазар и даде експертни съвети за инвеститорите и купувачите на недвижими имоти.</p>
            <p><strong>Ключови моменти от интервюто:</strong></p>
            <ul>
                <li>Анализ на текущото състояние на имотния пазар</li>
                <li>Съвети за първо купуване на жилище</li>
                <li>Тенденции в банковото кредитиране</li>
                <li>Препоръки за инвеститори в недвижими имоти</li>
            </ul>
            <p>Румяна Александрова подчерта, че хората с по-голям процент собствени средства предпочитат да ползват кредитиране при ниски лихвени проценти, което е разумна стратегия в текущата икономическа обстановка.</p>
        `
    },
    {
        id: 2,
        title: "Ръстът на цените на жилищата в София продължава през 2025 година",
        subtitle: "Анализ на пазарните тенденции показва устойчив ръст на цените на недвижимите имоти в столицата",
        date: "10 януари 2025",
        author: "Румяна Александрова",
        category: "Пазарни тенденции",
        image: "https://via.placeholder.com/400x250/8B4513/FFFFFF?text=Тенденции",
        fullContent: `
            <h3>Пазарен анализ за 2025 година</h3>
            <p>Анализът на данните за първото тримесечие на 2025 година показва продължаващ ръст на цените на жилищата в София и областта.</p>
            <p><strong>Основни тенденции:</strong></p>
            <ul>
                <li>Средно увеличение на цените с 8-12% спрямо същия период на предходната година</li>
                <li>Най-голям ръст в кварталите Лозенец, Център и Витоша</li>
                <li>Увеличено търсене на имоти в строеж</li>
                <li>Растящ интерес към енергийно ефективни жилища</li>
            </ul>
            <p>Експертите прогнозират запазване на тенденцията към повишение през цялата 2025 година, като очакват стабилизиране на пазара към края на годината.</p>
        `
    },
    {
        id: 3,
        title: "Експерти на Националното сдружение консултират безплатно столичани",
        subtitle: "Имотите на София: Безплатни консултации за Вашите имотни казуси",
        date: "30 септември 2024",
        author: "Експертен екип",
        category: "Събития",
        image: "https://via.placeholder.com/400x250/8B4513/FFFFFF?text=Безплатни+консултации",
        fullContent: `
            <h3>Инициатива за безплатни консултации</h3>
            <p>Националното сдружение "Недвижими имоти" организира поредица от безплатни консултации за жителите на София по въпроси, свързани с недвижимите имоти.</p>
            <p><strong>Услуги, които се предлагат:</strong></p>
            <ul>
                <li>Правни консултации по сделки с недвижими имоти</li>
                <li>Оценка на пазарната стойност на имоти</li>
                <li>Съвети за инвестиции в недвижими имоти</li>
                <li>Помощ при избор на ипотечен кредит</li>
            </ul>
            <p>Консултациите се провеждат всеки четвъртък от 10:00 до 16:00 часа в офиса на сдружението. За записване на час се изисква предварително обаждане.</p>
        `
    },
    {
        id: 4,
        title: "Запазването устойчивостта на имотния пазар е от най-големите предизвикателства през 2022 година",
        subtitle: "Да запазим баланса в съвремие на крайности е наша професионална отговорност",
        date: "16 май 2022",
        author: "Румяна Александрова",
        category: "Пазарен анализ",
        image: "https://via.placeholder.com/400x250/8B4513/FFFFFF?text=Пазарен+анализ",
        fullContent: `
            <h3>Предизвикателства пред имотния пазар</h3>
            <p>В условията на глобална икономическа несигурност, българският пазар на недвижими имоти се изправя пред сериозни предизвикателства.</p>
            <p><strong>Основни фактори за внимание:</strong></p>
            <ul>
                <li>Повишение на лихвените проценти</li>
                <li>Инфлационни натиски</li>
                <li>Промени в потребителското търсене</li>
                <li>Регулаторни промени</li>
            </ul>
            <p>"Нашата отговорност като професионалисти е да помогнем на клиентите да вземат информирани решения в тези несигурни времена", коментира Румяна Александрова.</p>
        `
    },
    {
        id: 5,
        title: "Румяна Александрова е отличена с награда за отлични постижения в партньорството си с ДСК Дом",
        subtitle: "За втора година ДСК Дом награди най-добрите ФЦ и клонове по продажба на жилищни и ипотечни кредити",
        date: "12 май 2022",
        author: "Румяна Александрова",
        category: "Награди",
        image: "https://via.placeholder.com/400x250/8B4513/FFFFFF?text=Награди",
        fullContent: `
            <h3>Отличие за професионализъм</h3>
            <p>Румяна Александрова от Sander Correct получи престижно отличие от ДСК Дом за изключителни постижения в областта на жилищното кредитиране.</p>
            <p><strong>Постижения през 2021 година:</strong></p>
            <ul>
                <li>Над 50 успешно реализирани жилищни кредита</li>
                <li>Най-висок рейтинг на клиентско удовлетворение</li>
                <li>Иновативни решения за сложни случаи</li>
                <li>Професионална етика и прозрачност</li>
            </ul>
            <p>Това отличие потвърждава високия професионален стандарт и ангажимента на екипа на Sander Correct към качествено обслужване на клиентите.</p>
        `
    },
    {
        id: 6,
        title: "Румяна Александрова от Сандер Корект Р.А. е отличена за Брокер на годината 2020",
        subtitle: "Потребителите определиха техния фаворит за изминалата 2020 година",
        date: "9 юли 2021",
        author: "Румяна Александрова",
        category: "Признания",
        image: "https://via.placeholder.com/400x250/8B4513/FFFFFF?text=Брокер+на+годината",
        fullContent: `
            <h3>Най-високо потребителско признание</h3>
            <p>В национално проучване сред потребители на услуги за недвижими имоти, Румяна Александрова е определена за "Брокер на годината 2020".</p>
            <p><strong>Критерии за оценка:</strong></p>
            <ul>
                <li>Професионализъм и експертиза</li>
                <li>Качество на обслужване</li>
                <li>Прозрачност в работата</li>
                <li>Постигнати резултати</li>
                <li>Клиентска удовлетвореност</li>
            </ul>
            <p>Това признание е резултат от дългогодишната работа и посвещение на Румяна Александрова в областта на недвижимите имоти, както и на високите стандарти, които поддържа Sander Correct.</p>
        `
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing news page...');
    
    // Initialize all components
    initializeNewsPage();
    initializeAnimations();
    setupEventListeners();
    
    // Add smooth scrolling for hero buttons
    setupSmoothScrolling();
});

// Initialize news page functionality
function initializeNewsPage() {
    console.log('Initializing news page');
    
    // Add scroll event listener for header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu setup
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
}

// Initialize animations
function initializeAnimations() {
    console.log('Initializing animations');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Setup smooth scrolling for anchor links
function setupSmoothScrolling() {
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

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners');
    
    // News read more buttons
    document.querySelectorAll('.news-read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const newsId = parseInt(this.getAttribute('data-news-id'));
            console.log('News read more clicked:', newsId);
            showNewsDetails(newsId);
        });
    });

    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            console.log('Load more clicked');
            loadMoreNews();
        });
    }

    // Close modal when clicking outside
    const newsModal = document.getElementById('newsModal');
    if (newsModal) {
        newsModal.addEventListener('click', function(e) {
            if (e.target === newsModal) {
                console.log('Modal background clicked');
                closeNewsModal();
            }
        });
    }

    // Keyboard events
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('newsModal');
            if (modal && modal.classList.contains('show')) {
                closeNewsModal();
            }
        }
    });
}

// Show news details in modal
function showNewsDetails(newsId) {
    console.log('showNewsDetails called with:', newsId);
    const news = newsData.find(item => item.id === newsId);
    if (!news) {
        console.error('News not found:', newsId);
        return;
    }

    const isMobile = window.innerWidth <= 768;
    const modal = document.getElementById('newsModal');
    const modalContent = modal.querySelector('.news-modal-content');

    // Create modal content with same design as property modals
    modalContent.innerHTML = `
        <div style="position: relative; width: 100%; background: white; border-radius: ${isMobile ? '0' : '25px'}; overflow: hidden;">
            
            <!-- Header Image Section -->
            <div style="position: relative; height: ${isMobile ? '200px' : '300px'}; overflow: hidden; background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%);">
                <img src="${news.image}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.9;" alt="${news.title}">
                
                <!-- Close Button -->
                <button onclick="closeNewsModal()" style="position: absolute; top: 15px; right: 15px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; z-index: 10;">
                    <i class="fas fa-times" style="color: #666; font-size: 1.1rem;"></i>
                </button>
                
                <!-- Category Badge -->
                <div style="position: absolute; top: 15px; left: 15px;">
                    <div style="background: rgba(255,255,255,0.9); color: #8b4513; padding: 0.4rem 0.8rem; border-radius: 15px; font-size: 0.8rem; font-weight: 600; margin-bottom: 0.5rem;">${news.category}</div>
                </div>
                
                <!-- Gradient Overlay -->
                <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 50%; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);"></div>
            </div>
            
            <!-- Content Section -->
            <div style="padding: ${isMobile ? '1.5rem' : '2rem'};">
                <!-- Title and Meta -->
                <h2 style="color: #3e2723; margin-bottom: 1rem; font-size: ${isMobile ? '1.4rem' : '1.8rem'}; font-weight: 800; line-height: 1.3;">${news.title}</h2>
                
                <!-- Meta Info -->
                <div style="display: flex; gap: ${isMobile ? '1rem' : '2rem'}; margin-bottom: 1.5rem; font-size: 0.9rem; color: #666; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-calendar" style="color: #8b4513;"></i>
                        <span>${news.date}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-user" style="color: #8b4513;"></i>
                        <span>${news.author}</span>
                    </div>
                </div>
                
                <!-- Content -->
                <div style="color: #5d4e37; line-height: 1.7; font-size: ${isMobile ? '1rem' : '1.1rem'};">
                    ${news.fullContent}
                </div>
                
                <!-- Action Buttons -->
                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(139, 69, 19, 0.1); display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button onclick="shareNews('${news.title}', '${news.date}', '${news.author}')" style="background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 12px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; font-weight: 600; font-size: 0.9rem;">
                        <i class="fas fa-share-alt"></i>
                        <span>Сподели</span>
                    </button>
                    <button onclick="closeNewsModal()" style="background: transparent; color: #8b4513; border: 2px solid #8b4513; padding: 0.8rem 1.5rem; border-radius: 12px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; font-weight: 600; font-size: 0.9rem;">
                        <i class="fas fa-times"></i>
                        <span>Затвори</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Show modal with same animation as property modals
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    document.body.style.overflow = 'hidden';
}

// Close news modal
function closeNewsModal() {
    console.log('closeNewsModal called');
    const modal = document.getElementById('newsModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Share news function
function shareNews(title, date, author) {
    const shareText = `${title}\n\nПубликувано на: ${date}\nАвтор: ${author}\n\nПрочети повече в Sander Correct: ${window.location.href}`;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: shareText,
            url: window.location.href
        }).then(() => {
            showNotification('Новината е споделена успешно!', 'success');
        }).catch((error) => {
            console.log('Error sharing:', error);
            // Fallback to clipboard
            copyToClipboard(shareText);
        });
    } else {
        // Fallback - copy to clipboard
        copyToClipboard(shareText);
    }
}

// Copy to clipboard function
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Информацията е копирана в клипборда', 'success');
        }).catch(() => {
            // Fallback method
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

// Fallback copy method
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Информацията е копирана в клипборда', 'success');
    } catch (err) {
        showNotification('Грешка при копиране', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Load more news
function loadMoreNews() {
    console.log('loadMoreNews called');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const originalText = loadMoreBtn.innerHTML;
    
    // Show loading state
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Зареждане...';
    loadMoreBtn.disabled = true;

    // Simulate loading delay
    setTimeout(() => {
        // Here you would typically load more news from a server
        // For now, we'll just show a message
        showNotification('Всички новини са заредени!', 'success');
        
        // Reset button
        loadMoreBtn.innerHTML = originalText;
        loadMoreBtn.disabled = false;
    }, 2000);
}

// Show notification function
function showNotification(message, type = 'info') {
    console.log('Showing notification:', message, type);
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add notification styles if not present
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            padding: 1rem 1.5rem;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border-left: 4px solid #8B4513;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            border-left-color: #4CAF50;
        }
        
        .notification.error {
            border-left-color: #F44336;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification.success i {
            color: #4CAF50;
        }
        
        .notification.error i {
            color: #F44336;
        }
    `;
    document.head.appendChild(style);
}

console.log('News.js loaded successfully');