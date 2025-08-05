// News Page JavaScript

// News data - всички новини от оригиналния сайт
const newsData = [
    {
        id: 1,
        title: "Румяна Александрова – член на Управителния съвет на Софийската структура на Националното сдружение",
        subtitle: "Румяна Александрова: Хора, които имат по-голям процент от изискуемите лични средства на банките, предпочитат да си вземат кредит на ниски нива",
        fullContent: `
            <h3>Румяна Александрова в предаването "Утрото на фокус" на Радио "Фокус"</h3>
            <p>Водещият експерт Румяна Александрова - член на УС на Софийската структура на Националното сдружение "Недвижими имоти" беше гост в предаването "Утрото на фокус" на Радио "Фокус".</p>
            <p>В интервюто тя коментира актуалните тенденции на имотния пазар и даде експертни съвети за инвеститорите и купувачите на недвижими имоти.</p>
            <p><strong>Ключови моменти от интервюто:</strong></p>
            <ul>
                <li>Анализ на текущото състояние на имотния пазар</li>
                <li>Съвети за правилно инвестиране в недвижими имоти</li>
                <li>Прогнози за развитието на сектора</li>
                <li>Информация за новите регулации в сферата</li>
            </ul>
            <p>Румяна Александрова подчерта важността на професионалните консултации при сделки с недвижими имоти и насърчи гражданите да се консултират с експерти преди да вземат важни решения.</p>
        `,
        date: "12 февруари 2025",
        author: "Румяна Александрова",
        category: "Експертни мнения",
        image: "https://via.placeholder.com/400x250/8B4513/FFFFFF?text=Новини"
    },
    {
        id: 2,
        title: "Водещият експерт Румяна Александрова с интервю за БНР Радио София",
        subtitle: "Експертът коментира и съветва: В София може да се направи най-смислената инвестиция в имот",
        fullContent: `
            <h3>Интервю за БНР Радио София - Ритъмът на столицата</h3>
            <p>Водещият експерт Румяна Александрова - член на УС на Софийската структура на Националното сдружение "Недвижими имоти" даде ексклузивно интервю за БНР Радио София.</p>
            <p>В разговора тя анализира инвестиционните възможности в столицата и даде конкретни съвети за купувачите на недвижими имоти.</p>
            <p><strong>Основни теми:</strong></p>
            <ul>
                <li>Най-добрите инвестиционни зони в София</li>
                <li>Тенденции в цените на недвижимите имоти</li>
                <li>Съвети за избор на имот</li>
                <li>Правни аспекти на сделките</li>
            </ul>
            <p>Експертът подчерта, че София продължава да бъде най-атрактивният град за инвестиции в недвижими имоти в България.</p>
        `,
        date: "4 октомври 2024",
        author: "Румяна Александрова",
        category: "Интервю",
        image: "https://via.placeholder.com/400x250/8B4513/FFFFFF?text=Интервю"
    },
    {
        id: 3,
        title: "Експерти на Националното сдружение консултират безплатно столичани",
        subtitle: '"Имотите на София: Безплатни консултации за Вашите имотни казуси"',
        fullContent: `
            <h3>Безплатни консултации за столичани</h3>
            <p>Експерти на Националното сдружение "Недвижими имоти" проведоха безплатни консултации за граждани на София по въпроси за недвижимите имоти.</p>
            <p>Инициативата "Имотите на София" беше насочена към предоставяне на професионални съвети и насоки за всички заинтересовани от сделки с недвижими имоти.</p>
            <p><strong>Услуги, които бяха предоставени:</strong></p>
            <ul>
                <li>Оценка на имоти</li>
                <li>Консултации за инвестиции</li>
                <li>Правни съвети</li>
                <li>Информация за пазарните тенденции</li>
                <li>Съвети за избор на имот</li>
            </ul>
            <p>Мероприятието беше посетено от над 200 граждани и получи високи оценки за професионализма и полезността на предоставената информация.</p>
        `,
        date: "30 септември 2024",
        author: "Експертен екип",
        category: "Събития",
        image: "https://via.placeholder.com/400x250/8B4513/FFFFFF?text=Консултации"
    },
    {
        id: 4,
        title: "Запазването устойчивостта на имотния пазар е от най-големите предизвикателства през 2022 година",
        subtitle: "Да запазим баланса в съвремие на крайности е наша професионална отговорност, смята собственикът на 'Сандер Корект'",
        fullContent: `
            <h3>Анализ на имотния пазар за 2022 година</h3>
            <p>Румяна Александрова, собственик на "Сандер Корект", коментира предизвикателствата пред имотния пазар през 2022 година.</p>
            <p>В условията на глобална нестабилност и икономически промени, запазването на устойчивостта на имотния пазар се оказва ключово за развитието на сектора.</p>
            <p><strong>Основни предизвикателства:</strong></p>
            <ul>
                <li>Инфлационни натиски</li>
                <li>Промени в кредитните условия</li>
                <li>Глобална икономическа нестабилност</li>
                <li>Промени в потребителското поведение</li>
            </ul>
            <p>Експертът подчерта важността на професионалния подход и етичните практики в работата с клиентите.</p>
        `,
        date: "16 май 2022",
        author: "Румяна Александрова",
        category: "Пазарен анализ",
        image: "https://via.placeholder.com/400x250/8B4513/FFFFFF?text=Пазарен+анализ"
    },
    {
        id: 5,
        title: "Румяна Александрова е отличена с награда за отлични постижения в партньорството си с ДСК Дом",
        subtitle: "За втора година ДСК Дом награди най-добрите ФЦ и клонове по продажба за 2021г. на жилищни и ипотечни кредити",
        fullContent: `
            <h3>Награда за отлични постижения от ДСК Дом</h3>
            <p>На 12.05.2022 година, за втора година ДСК Дом награди най-добрите ФЦ и клонове по продажба за 2021г. на жилищни и ипотечни кредити в съвместното партньорство с ДСК Дом.</p>
            <p>Румяна Александрова от "Сандер Корект" беше отличена за изключителни постижения в партньорството с банката.</p>
            <p><strong>Критерии за наградата:</strong></p>
            <ul>
                <li>Високо качество на обслужване</li>
                <li>Професионализъм в работата</li>
                <li>Успешни сделки</li>
                <li>Доверие на клиентите</li>
                <li>Спазване на етичните стандарти</li>
            </ul>
            <p>Наградата е признание за дългогодишната работа и принос в развитието на имотния пазар в България.</p>
        `,
        date: "12 май 2022",
        author: "Румяна Александрова",
        category: "Награди",
        image: "https://via.placeholder.com/400x250/8B4513/FFFFFF?text=Награди"
    },
    {
        id: 6,
        title: "Румяна Александрова от Сандер Корект Р.А. е отличена за Брокер на годината 2020",
        subtitle: "Потребителите определиха техния фаворит за изминалата 2020 година",
        fullContent: `
            <h3>Брокер на годината 2020</h3>
            <p>Румяна Александрова от "Сандер Корект" Р.А. беше отличена за "Брокер на годината 2020" в национално класиране.</p>
            <p>Наградата е резултат от гласуване на потребителите, които определиха техния фаворит за изминалата 2020 година.</p>
            <p><strong>Основни постижения през 2020:</strong></p>
            <ul>
                <li>Високо качество на обслужване</li>
                <li>Професионален подход към клиентите</li>
                <li>Успешни сделки в трудни условия</li>
                <li>Иновативни решения</li>
                <li>Доверие и репутация</li>
            </ul>
            <p>Наградата е признание за професионализма и приноса в развитието на имотния пазар в България.</p>
        `,
        date: "9 юли 2021",
        author: "Румяна Александрова",
        category: "Признания",
        image: "https://via.placeholder.com/400x250/8B4513/FFFFFF?text=Брокер+на+годината"
    }
];

// Global functions - make them available in global scope
window.showNewsDetails = function(newsId) {
    console.log('showNewsDetails called with:', newsId);
    const news = newsData.find(item => item.id === newsId);
    if (!news) {
        console.error('News not found:', newsId);
        return;
    }

    // Populate modal content
    document.getElementById('modalNewsTitle').textContent = news.title;
    document.getElementById('modalNewsDate').innerHTML = `<i class="fas fa-calendar"></i> ${news.date}`;
    document.getElementById('modalNewsAuthor').innerHTML = `<i class="fas fa-user"></i> ${news.author}`;
    document.getElementById('modalNewsImage').src = news.image;
    document.getElementById('modalNewsImage').alt = news.title;
    document.getElementById('modalNewsContent').innerHTML = news.fullContent;

    // Show modal
    const modal = document.getElementById('newsModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
};

window.closeNewsModal = function() {
    console.log('closeNewsModal called');
    const modal = document.getElementById('newsModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
};

window.loadMoreNews = function() {
    console.log('loadMoreNews called');
    const loadMoreBtn = document.querySelector('.load-more-btn');
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
};

window.subscribeNewsletter = function(event) {
    console.log('subscribeNewsletter called');
    event.preventDefault();
    
    const email = document.getElementById('newsletter-email').value;
    const submitBtn = event.target.querySelector('.newsletter-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Абониране...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        if (email) {
            showNotification('Успешно се абонирахте за нашия бюлетин!', 'success');
            document.getElementById('newsletter-email').value = '';
        } else {
            showNotification('Моля, въведете валиден имейл адрес.', 'error');
        }
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
};

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('News page DOM loaded');
    initializeNewsPage();
    initializeAnimations();
    setupEventListeners();
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

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners');
    
    // Close modal when clicking outside
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('newsModal');
        if (event.target === modal) {
            closeNewsModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeNewsModal();
        }
    });

    // Add click listeners to news cards
    document.querySelectorAll('.news-read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const newsId = parseInt(this.getAttribute('onclick').match(/\d+/)[0]);
            showNewsDetails(newsId);
        });
    });
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