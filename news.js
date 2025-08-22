// News Page JavaScript - Updated with Database Content
// Автоматично генериран от админ панела на 22.08.2025 г., 08:25:12 ч.

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
        "title": "ТЕСТ",
        "subtitle": "тест",
        "date": "22 август 2025 г.",
        "author": "тест",
        "category": "Пазарни анализи",
        "image": "./images/news/default-news.jpg",
        "fullContent": "\n                <h3>ТЕСТ</h3>\n                тест\n                <p><em>тест</em></p>\n            ",
        "slug": "test",
        "excerpt": "тест",
        "tags": [
            "тест"
        ],
        "featured": 0,
        "readingTime": 5,
        "metaTitle": "ТЕСТ",
        "metaDescription": "тест",
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
                    <button class="news-read-more" onclick="openNewsModal(${news.id})">
                        <i class="fas fa-arrow-right"></i>
                        Прочети повече
                    </button>
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
    
    console.log('News rendered successfully, cards added:', newsToShow.length);
}

function loadMoreNews() {
    currentNewsIndex += newsPerPage;
    renderNews();
}

// МОДАЛ СЪС СТИЛОВЕ НА САЙТА
function openNewsModal(newsId) {
    console.log('Opening site-matching modal for news ID:', newsId);
    
    const news = newsData.find(item => item.id === newsId);
    if (!news) {
        console.error('News not found:', newsId);
        return;
    }
    
    // Премахваме всички стари модали
    const existingModals = document.querySelectorAll('[id*="newsModal"], [class*="modal"]');
    existingModals.forEach(modal => {
        if (modal.id === 'newsModal') {
            modal.remove();
        }
    });
    
    // Създаваме нов модал
    const modal = document.createElement('div');
    modal.id = 'newsModal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeNewsModal()">
            <div class="modal-container" onclick="event.stopPropagation()">
                
                <!-- Header със снимка -->
                <div class="modal-header">
                    <div class="modal-image-wrapper">
                        <img src="${news.image}" alt="${news.title}" class="modal-hero-image">
                        <div class="modal-overlay"></div>
                        
                        <!-- Close Button -->
                        <button class="modal-close" onclick="closeNewsModal()">
                            <i class="fas fa-times"></i>
                        </button>
                        
                        <!-- Category Badge -->
                        <div class="modal-category">
                            ${news.category}
                        </div>
                        
                        <!-- Title Section -->
                        <div class="modal-title-section">
                            <h1 class="modal-title">${news.title}</h1>
                            <div class="modal-meta">
                                <span class="meta-item">
                                    <i class="fas fa-calendar"></i>
                                    ${news.date}
                                </span>
                                <span class="meta-item">
                                    <i class="fas fa-user"></i>
                                    ${news.author}
                                </span>
                                <span class="meta-item">
                                    <i class="fas fa-clock"></i>
                                    ${news.readingTime} мин четене
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Content Section -->
                <div class="modal-body">
                    <div class="modal-content1">
                        ${news.fullContent}
                    </div>
                    
                    ${news.tags && news.tags.length > 0 ? `
                        <div class="modal-tags">
                            <h4>Тагове:</h4>
                            <div class="tags-container">
                                ${news.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Share Section -->
                    <div class="modal-share">
                        <h4>Сподели статията:</h4>
                        <div class="share-buttons">
                            <button class="share-btn facebook" onclick="shareNews('facebook', '${news.title.replace(/'/g, "\\'")}', '${news.slug}')">
                                <i class="fab fa-facebook-f"></i>
                                Facebook
                            </button>
                            <button class="share-btn twitter" onclick="shareNews('twitter', '${news.title.replace(/'/g, "\\'")}', '${news.slug}')">
                                <i class="fab fa-twitter"></i>
                                Twitter
                            </button>
                            <button class="share-btn linkedin" onclick="shareNews('linkedin', '${news.title.replace(/'/g, "\\'")}', '${news.slug}')">
                                <i class="fab fa-linkedin-in"></i>
                                LinkedIn
                            </button>
                            <button class="share-btn copy" onclick="copyNewsLink('${news.slug}')">
                                <i class="fas fa-link"></i>
                                Копирай линк
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // CSS стилове съвместими със сайта
    const style = document.createElement('style');
    style.textContent = `
        #newsModal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        #newsModal.show {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-backdrop {
            width: 100%;
            height: 100%;
            background: rgba(44, 24, 16, 0.85);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            overflow-y: auto;
        }
        
        .modal-container {
            background: white;
            border-radius: 20px;
            max-width: 900px;
            width: 100%;
            max-height: 90vh;
            overflow: hidden;
            transform: scale(0.9) translateY(30px);
            transition: all 0.3s ease;
            box-shadow: 0 20px 50px rgba(44, 24, 16, 0.3);
            overflow-y: auto;
        }
        
        #newsModal.show .modal-container {
            transform: scale(1) translateY(0);
        }
        
        /* Header Section */
        .modal-header {
            position: relative;
        }
        
        .modal-image-wrapper {
            position: relative;
            height: 350px;
            overflow: hidden;
        }
        
        .modal-hero-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                to bottom,
                rgba(44, 24, 16, 0.2) 0%,
                rgba(44, 24, 16, 0.6) 70%,
                rgba(44, 24, 16, 0.8) 100%
            );
        }
        
        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            border: none;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.9);
            color: #8b4513;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: all 0.3s ease;
            z-index: 10;
            box-shadow: 0 4px 15px rgba(139, 69, 19, 0.2);
        }
        
        .modal-close:hover {
            background: white;
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(139, 69, 19, 0.3);
        }
        
        .modal-category {
            position: absolute;
            top: 20px;
            left: 20px;
            background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
        }
        
        .modal-title-section {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 30px;
            color: white;
        }
        
        .modal-title {
            font-size: 2.2rem;
            font-weight: 800;
            margin: 0 0 15px 0;
            line-height: 1.2;
            color: #f5f5dc;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }
        
        .modal-meta {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            opacity: 0.9;
        }
        
        .meta-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 14px;
            color: #f5f5dc;
        }
        
        .meta-item i {
            color: #d2691e;
        }
        
        /* Body Section */
        .modal-body {
            padding: 40px;
        }
        
        .modal-content1 {
            color: #3e2723;
            line-height: 1.7;
            font-size: 16px;
            margin-bottom: 30px;
        }
        
        .modal-content h3 {
            color: #2c1810;
            font-size: 1.3rem;
            font-weight: 700;
            margin: 25px 0 15px 0;
        }
        
        .modal-content p {
            margin-bottom: 16px;
            color: #5d4e37;
        }
        
        /* Tags Section */
        .modal-tags {
            margin: 30px 0;
            padding: 25px;
            background: linear-gradient(135deg, #faf9f7 0%, #f8f6f3 100%);
            border-radius: 15px;
            border-left: 4px solid #8b4513;
        }
        
        .modal-tags h4 {
            color: #3e2723;
            font-size: 14px;
            font-weight: 700;
            margin: 0 0 15px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .tags-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .modal-tag {
            background: white;
            color: #5d4e37;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 600;
            border: 1px solid rgba(139, 69, 19, 0.2);
            transition: all 0.3s ease;
        }
        
        .modal-tag:hover {
            background: #8b4513;
            color: white;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
        }
        
        /* Share Section */
        .modal-share {
            margin-top: 30px;
            padding: 25px;
            background: linear-gradient(135deg, #2c1810 0%, #3e2723 100%);
            border-radius: 15px;
            color: white;
        }
        
        .modal-share h4 {
            color: #f5f5dc;
            font-size: 14px;
            font-weight: 700;
            margin: 0 0 20px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .share-buttons {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 12px;
        }
        
        .share-btn {
            background: rgba(245, 245, 220, 0.1);
            border: 1px solid rgba(245, 245, 220, 0.2);
            color: #f5f5dc;
            padding: 12px 16px;
            border-radius: 10px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            font-weight: 600;
            transition: all 0.3s ease;
            justify-content: center;
        }
        
        .share-btn:hover {
            background: rgba(245, 245, 220, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }
        
        .share-btn.facebook:hover { 
            background: #1877f2; 
            border-color: #1877f2; 
        }
        .share-btn.twitter:hover { 
            background: #1da1f2; 
            border-color: #1da1f2; 
        }
        .share-btn.linkedin:hover { 
            background: #0077b5; 
            border-color: #0077b5; 
        }
        .share-btn.copy:hover { 
            background: #d2691e; 
            border-color: #d2691e; 
        }
        
        .share-btn i {
            font-size: 14px;
        }
        
        /* Mobile Responsive */
        @media (max-width: 768px) {
            .modal-backdrop {
                padding: 0;
            }
            
            .modal-container {
                border-radius: 0;
                max-height: 100vh;
                height: 100vh;
                max-width: 100%;
            }
            
            .modal-image-wrapper {
                height: 250px;
            }
            
            .modal-title {
                font-size: 1.6rem;
            }
            
            .modal-body {
                padding: 25px 20px;
            }
            
            .modal-meta {
                gap: 15px;
            }
            
            .meta-item {
                font-size: 13px;
            }
            
            .share-buttons {
                grid-template-columns: 1fr 1fr;
                gap: 10px;
            }
        }
        
        /* Scrollbar Styling */
        .modal-container::-webkit-scrollbar {
            width: 6px;
        }
        
        .modal-container::-webkit-scrollbar-track {
            background: #f8f6f3;
        }
        
        .modal-container::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%);
            border-radius: 3px;
        }
        
        .modal-container::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #7a3f11 0%, #b8551a 100%);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Показваме модала
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Блокираме скрола
    document.body.style.overflow = 'hidden';
}

function closeNewsModal() {
    console.log('Closing modal...');
    
    const modal = document.getElementById('newsModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
            
            // Премахваме style елемента
            const modalStyles = document.querySelector('style');
            if (modalStyles && modalStyles.textContent.includes('#newsModal')) {
                modalStyles.remove();
            }
        }, 300);
    }
}

// Функции за споделяне
function shareNews(platform, title, slug) {
    const url = `${window.location.origin}/news.html#${slug}`;
    const text = `${title} - Sander Correct`;
    
    let shareUrl = '';
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

function copyNewsLink(slug) {
    const url = `${window.location.origin}/news.html#${slug}`;
    navigator.clipboard.writeText(url).then(() => {
        showNotification('Линкът е копиран успешно!', 'success');
    }).catch(() => {
        // Fallback за стари браузъри
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Линкът е копиран успешно!', 'success');
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #8b4513 0%, #d2691e 100%)' : 'linear-gradient(135deg, #3e2723 0%, #5d4037 100%)'};
        color: #f5f5dc;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10001;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 8px 25px rgba(139, 69, 19, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    // Показване
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Скриване след 3 секунди
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Escape key за затваряне
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('newsModal');
        if (modal) {
            closeNewsModal();
        }
    }
});

// Глобални функции
window.openNewsModal = openNewsModal;
window.closeNewsModal = closeNewsModal;
window.loadMoreNews = loadMoreNews;
window.toggleMobileMenu = toggleMobileMenu;
window.shareNews = shareNews;
window.copyNewsLink = copyNewsLink;

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing news with site-matching modal...');
    console.log('newsData available:', typeof newsData !== 'undefined');
    console.log('newsData length:', newsData ? newsData.length : 0);
    
    setTimeout(() => {
        renderNews();
    }, 100);
    
    // Event listeners
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreNews);
    }
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
});