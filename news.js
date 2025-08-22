// News Page JavaScript - Updated with Database Content
// Автоматично генериран от админ панела на 22.08.2025 г., 07:52:38 ч.

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

// News data - автоматично обновени от админ панела
const newsData = [
    {
        "id": 7,
        "title": "dasdas",
        "subtitle": "asdasd",
        "date": "22 август 2025 г.",
        "author": "dasdas",
        "category": "Съвети за купувачи",
        "image": "./images/news/news-1755838292896-123428490.png",
        "fullContent": "\n                <h3>dasdas</h3>\n                dasdas\n                <p><em>dasda</em></p>\n            ",
        "slug": "dasdas",
        "excerpt": "asdasd",
        "tags": [
            "dasdas"
        ],
        "featured": 0,
        "readingTime": 5,
        "metaTitle": "dasdas",
        "metaDescription": "dasda",
        "views": 0
    }
];

// Код за показване на новините
let currentNewsIndex = 0;
const newsPerPage = 6;

function renderNews() {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) {
        console.error('newsGrid element not found!');
        return;
    }
    
    console.log('Rendering news, data length:', newsData.length);
    
    // Изчистваме съществуващо съдържание
    newsGrid.innerHTML = '';
    
    const newsToShow = newsData.slice(0, currentNewsIndex + newsPerPage);
    console.log('News to show:', newsToShow.length);
    
    newsToShow.forEach(news => {
        const newsCard = document.createElement('article');
        newsCard.className = 'news-card fade-in';
        newsCard.innerHTML = `
            <div class="news-image">
                <img src="${news.image}" alt="${news.title}">
                <div class="news-category">${news.category}</div>
            </div>
            <div class="news-content">
                <div class="news-meta">
                    <span class="news-date">
                        <i class="fas fa-calendar"></i>
                        ${news.date}
                    </span>
                    <span class="news-author">
                        <i class="fas fa-user"></i>
                        ${news.author}
                    </span>
                </div>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-excerpt">${news.subtitle || news.excerpt}</p>
                <div class="news-actions">
                    <a href="#" class="news-read-more" data-news-id="${news.id}">
                        <i class="fas fa-arrow-right"></i>
                        Прочети повече
                    </a>
                    <div class="news-tags">
                        ${news.tags ? news.tags.slice(0, 2).map(tag => `<span class="news-tag">${tag}</span>`).join('') : ''}
                    </div>
                </div>
            </div>
        `;
        newsGrid.appendChild(newsCard);
    });
    
    // Покажи/скрий "Зареди още" бутона
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (newsToShow.length >= newsData.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
    
    // Добави event listeners
    addNewsEventListeners();
    
    console.log('News rendered successfully, cards added:', newsToShow.length);
}

function loadMoreNews() {
    currentNewsIndex += newsPerPage;
    renderNews();
}

function addNewsEventListeners() {
    // Event listeners за "Прочети повече"
    const readMoreBtns = document.querySelectorAll('.news-read-more');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const newsId = parseInt(this.getAttribute('data-news-id'));
            showNewsDetails(newsId);
        });
    });

    // Event listener за "Зареди още"
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.removeEventListener('click', loadMoreNews);
        loadMoreBtn.addEventListener('click', loadMoreNews);
    }

    // Затваряне на модал при клик извън него
    const newsModal = document.getElementById('newsModal');
    if (newsModal) {
        newsModal.addEventListener('click', function(e) {
            if (e.target === newsModal) {
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

// Показване на детайли за новина в модал
function showNewsDetails(newsId) {
    const news = newsData.find(item => item.id === newsId);
    if (!news) {
        console.error('News not found:', newsId);
        return;
    }

    const isMobile = window.innerWidth <= 768;
    let modal = document.getElementById('newsModal');
    
    if (!modal) {
        createNewsModal();
        modal = document.getElementById('newsModal');
    }
    
    const modalContent = modal.querySelector('.news-modal-content');

    modalContent.innerHTML = `
        <div style="position: relative; width: 100%; background: white; border-radius: ${isMobile ? '0' : '25px'}; overflow: hidden;">
            
            <!-- Header Image Section -->
            <div style="position: relative; height: ${isMobile ? '250px' : '400px'}; overflow: hidden;">
                <img src="${news.image}" alt="${news.title}" 
                     style="width: 100%; height: 100%; object-fit: cover;">
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
                           background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);">
                </div>
                
                <!-- Close Button -->
                <button onclick="closeNewsModal()" 
                        style="position: absolute; top: 20px; right: 20px; width: 40px; height: 40px; 
                               border: none; border-radius: 50%; background: rgba(255,255,255,0.9); 
                               color: #333; font-size: 18px; cursor: pointer; display: flex; 
                               align-items: center; justify-content: center; transition: all 0.3s ease;">
                    ×
                </button>
                
                <!-- Category Badge -->
                <div style="position: absolute; top: 20px; left: 20px; background: rgba(210, 105, 30, 0.9); 
                           color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600;">
                    ${news.category}
                </div>
                
                <!-- Title Overlay -->
                <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 30px; color: white;">
                    <h1 style="font-size: ${isMobile ? '1.8rem' : '2.5rem'}; font-weight: 700; 
                               margin: 0 0 10px 0; line-height: 1.2;">${news.title}</h1>
                    <div style="display: flex; gap: 20px; align-items: center; font-size: 14px; opacity: 0.9;">
                        <span><i class="fas fa-calendar" style="margin-right: 5px;"></i>${news.date}</span>
                        <span><i class="fas fa-user" style="margin-right: 5px;"></i>${news.author}</span>
                        <span><i class="fas fa-clock" style="margin-right: 5px;"></i>${news.readingTime} мин четене</span>
                    </div>
                </div>
            </div>
            
            <!-- Content Section -->
            <div style="padding: ${isMobile ? '30px 20px' : '40px 50px'}; max-height: 60vh; overflow-y: auto;">
                <div style="color: #333; line-height: 1.8; font-size: 16px;">
                    ${news.fullContent}
                </div>
                
                ${news.tags && news.tags.length > 0 ? `
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                    <h4 style="margin-bottom: 15px; color: #8B4513;">Тагове:</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        ${news.tags.map(tag => `
                            <span style="background: #f0f0f0; color: #666; padding: 5px 12px; 
                                         border-radius: 15px; font-size: 12px;">${tag}</span>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
    `;

    // Показване на модала
    modal.style.display = 'flex';
    modal.offsetHeight; // Force reflow
    modal.classList.add('show');
    modalContent.style.transform = isMobile ? 'translateY(0)' : 'scale(1)';
    
    // Блокиране на скрол на body
    document.body.style.overflow = 'hidden';
}

function createNewsModal() {
    const modal = document.createElement('div');
    modal.id = 'newsModal';
    modal.className = 'modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        align-items: center;
        justify-content: center;
        padding: 20px;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.className = 'news-modal-content';
    modalContent.style.cssText = `
        max-width: 900px;
        width: 100%;
        max-height: 90vh;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Добавяне на CSS стилове за модала
    if (!document.querySelector('#news-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'news-modal-styles';
        style.textContent = `
            .modal.show {
                opacity: 1 !important;
            }
            @media (max-width: 768px) {
                .news-modal-content {
                    transform: translateY(100%) !important;
                    transition: transform 0.3s ease !important;
                }
                .modal.show .news-modal-content {
                    transform: translateY(0) !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function closeNewsModal() {
    const modal = document.getElementById('newsModal');
    if (!modal) return;
    
    const modalContent = modal.querySelector('.news-modal-content');
    const isMobile = window.innerWidth <= 768;
    
    modal.classList.remove('show');
    modalContent.style.transform = isMobile ? 'translateY(100%)' : 'scale(0.8)';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Глобални функции
window.showNewsDetails = showNewsDetails;
window.closeNewsModal = closeNewsModal;
window.loadMoreNews = loadMoreNews;

// Инициализация на новините при зареждане на страницата
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing news...');
    console.log('newsData available:', typeof newsData !== 'undefined');
    console.log('newsData length:', newsData ? newsData.length : 0);
    
    // Малко забавяне за да се зареди всичко
    setTimeout(() => {
        renderNews();
    }, 100);
    
    // Добавяне на event listener за mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
});