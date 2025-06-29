// About Page Specific JavaScript - about.js

// Team member data (moved from inline script for better organization)
const teamMembers = {
    aleksandar: {
        name: "Александър Петров",
        role: "Управляващ директор",
        image: "./images/single_man.png",
        experience: "15+ години опит",
        specialization: "Луксозни имоти и инвестиционни консултации",
        description: "Александър е основател и управляващ директор на Sander Correct. С над 15 години опит в сферата на недвижимите имоти, той е специалист по луксозни имоти и инвестиционни консултации. Помогнал е на стотици клиенти да реализират мечтите си за идеалния дом.",
        achievements: [
            "500+ успешни сделки",
            "Сертифициран оценител на имоти",
            "Магистър по икономика",
            "Член на RICS (Royal Institution of Chartered Surveyors)"
        ],
        phone: "+359 888 123 456",
        email: "aleksandar@sandercorrect.com",
        linkedin: "#",
        languages: ["Български", "Английски", "Немски"]
    },
    maria: {
        name: "Мария Стоянова",
        role: "Старши брокер",
        image: "./images/single_woman.png",
        experience: "8 години опит",
        specialization: "Жилищни имоти в София",
        description: "Мария е експерт по жилищни имоти в София с дълбоко познаване на пазара. Помогнала е на над 300 семейства да намерят своя идеален дом. Известна е с персонализирания си подход и внимание към детайлите.",
        achievements: [
            "300+ щастливи семейства",
            "Брокер на годината 2023",
            "Специалист по апартаменти",
            "Сертифициран консултант"
        ],
        phone: "+359 888 123 457",
        email: "maria@sandercorrect.com",
        linkedin: "#",
        languages: ["Български", "Английски", "Руски"]
    },
    dimitar: {
        name: "Димитър Марков",
        role: "Правен консултант",
        image: "./images/single_man.png",
        experience: "12 години опит",
        specialization: "Правни услуги и сделки",
        description: "Димитър е юрист с дългогодишен опит в сделки с недвижими имоти. Гарантира безопасността на всяка транзакция и предоставя професионални правни консултации на нашите клиенти.",
        achievements: [
            "1000+ проверени сделки",
            "Магистър по право",
            "Специалист по имотно право",
            "Нотариус"
        ],
        phone: "+359 888 123 458",
        email: "dimitar@sandercorrect.com",
        linkedin: "#",
        languages: ["Български", "Английски"]
    },
    elena: {
        name: "Елена Георгиева",
        role: "Маркетинг мениджър",
        image: "./images/single_woman.png",
        experience: "6 години опит",
        specialization: "Дигитален маркетинг и реклама",
        description: "Елена отговаря за представянето на имотите и дигиталния маркетинг. Създава иновативни стратегии за продажба и използва най-новите технологии за промотиране на имотите.",
        achievements: [
            "200+ маркетингови кампании",
            "Магистър по маркетинг",
            "Google Ads сертификат",
            "Facebook Blueprint сертификат"
        ],
        phone: "+359 888 123 459",
        email: "elena@sandercorrect.com",
        linkedin: "#",
        languages: ["Български", "Английски", "Френски"]
    },
    ivan: {
        name: "Иван Попов",
        role: "Финансов консултант",
        image: "./images/single_man.png",
        experience: "10 години опит",
        specialization: "Ипотечно кредитиране и финансови решения",
        description: "Иван е специалист по ипотечно кредитиране и финансови решения. Помага на клиентите да намерят най-изгодното финансиране за техните имотни инвестиции.",
        achievements: [
            "400+ одобрени кредита",
            "Сертифициран финансов консултант",
            "Магистър по финанси",
            "Партньор на 15+ банки"
        ],
        phone: "+359 888 123 460",
        email: "ivan@sandercorrect.com",
        linkedin: "#",
        languages: ["Български", "Английски", "Италиански"]
    },
    svetlana: {
        name: "Светлана Димитрова",
        role: "Офис мениджър",
        image: "./images/single_woman.png",
        experience: "7 години опит",
        specialization: "Администрация и клиентски услуги",
        description: "Светлана координира дейността на офиса и комуникацията с клиентите. Осигурява перфектна организация на всички процеси и е първото лице, което посреща клиентите.",
        achievements: [
            "99% удовлетворени клиенти",
            "Сертификат за качество ISO",
            "Специалист по CRM системи",
            "Магистър по администрация"
        ],
        phone: "+359 888 123 461",
        email: "svetlana@sandercorrect.com",
        linkedin: "#",
        languages: ["Български", "Английски", "Испански"]
    }
};

// News data for the news section
const newsData = [
    {
        id: 1,
        title: "Нови апартаменти в Витоша",
        summary: "Открихме нова жилищна сграда с луксозни апартаменти в подножието на Витоша",
        date: "2025-06-25",
        category: "Нови проекти",
        image: "./images/news1.jpg",
        content: "Гордеем се да представим нашия най-нов проект - луксозна жилищна сграда в престижния район Витоша. Сградата предлага модерни апартаменти с невероятна гледка към планината и града."
    },
    {
        id: 2,
        title: "Ръст на цените на имотите",
        summary: "Анализ на пазара показва 5% ръст на цените на жилищните имоти в София",
        date: "2025-06-20",
        category: "Пазарен анализ",
        image: "./images/news2.jpg",
        content: "Според нашия месечен анализ, цените на жилищните имоти в София отбелязват стабилен ръст от 5% на годишна база. Най-голямо поскъпване се наблюдава в центъра и South Park."
    },
    {
        id: 3,
        title: "Нова услуга: Виртуални обиколки",
        summary: "Въведохме 360° виртуални обиколки за всички наши имоти",
        date: "2025-06-15",
        category: "Иновации",
        image: "./images/news3.jpg",
        content: "С цел подобряване на клиентското обслужване, въведохме най-новата технология за 360° виртуални обиколки. Сега можете да разгледате всеки имот от комфорта на дома си."
    },
    {
        id: 4,
        title: "Партньорство с водещи банки",
        summary: "Сключихме договори с 5 нови банки за по-изгодни кредитни условия",
        date: "2025-06-10",
        category: "Партньорства",
        image: "./images/news4.jpg",
        content: "Разширихме мрежата си от банкови партньори, което ни позволява да предлагаме на клиентите си още по-изгодни условия за ипотечни кредити с лихви от 3.5%."
    }
];

// Initialize team member modal functionality
function showTeamMemberModal(memberId) {
    const member = teamMembers[memberId];
    if (!member) return;

    const isMobile = window.innerWidth <= 768;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.4s ease;
        padding: ${isMobile ? '1rem' : '2rem'};
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: ${isMobile ? '20px' : '25px'};
        max-width: 700px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        transform: scale(0.8) translateY(20px);
        transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 0 40px 80px rgba(0, 0, 0, 0.3);
        position: relative;
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
    `;

    modalContent.innerHTML = `
        <!-- Header with Image -->
        <div style="position: relative; height: ${isMobile ? '200px' : '250px'}; background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%); border-radius: ${isMobile ? '20px' : '25px'} ${isMobile ? '20px' : '25px'} 0 0; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.3);"></div>
            <img src="${member.image}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.8;" alt="${member.name}">
            
            <!-- Close Button -->
            <button onclick="closeTeamModal()" style="position: absolute; top: 15px; right: 15px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; touch-action: manipulation;">
                <i class="fas fa-times" style="color: #666; font-size: 1.1rem;"></i>
            </button>
            
            <!-- Member Info Overlay -->
            <div style="position: absolute; bottom: 20px; left: 20px; color: white;">
                <h2 style="margin: 0 0 5px 0; font-size: ${isMobile ? '1.5rem' : '1.8rem'}; font-weight: 800;">${member.name}</h2>
                <div style="font-size: ${isMobile ? '1rem' : '1.1rem'}; opacity: 0.9; font-weight: 600;">${member.role}</div>
                <div style="font-size: ${isMobile ? '0.85rem' : '0.9rem'}; opacity: 0.8; margin-top: 5px;">${member.experience}</div>
            </div>
        </div>
        
        <!-- Content -->
        <div style="padding: ${isMobile ? '1.5rem' : '2rem'};">
            <!-- Specialization -->
            <div style="background: linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(210, 105, 30, 0.1) 100%); padding: 1rem; border-radius: 15px; margin-bottom: 2rem; border: 1px solid rgba(139, 69, 19, 0.1);">
                <div style="font-weight: 700; color: #8b4513; margin-bottom: 0.5rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px;">Специализация</div>
                <div style="color: #3e2723; font-size: ${isMobile ? '1rem' : '1.1rem'}; font-weight: 600;">${member.specialization}</div>
            </div>
            
            <!-- Description -->
            <div style="margin-bottom: 2rem;">
                <h3 style="color: #3e2723; margin-bottom: 1rem; font-size: ${isMobile ? '1.2rem' : '1.3rem'}; font-weight: 700;">За ${member.name.split(' ')[0]}</h3>
                <p style="color: #5d4e37; line-height: 1.7; font-size: ${isMobile ? '0.95rem' : '1rem'}; margin: 0;">${member.description}</p>
            </div>
            
            <!-- Achievements -->
            <div style="margin-bottom: 2rem;">
                <h3 style="color: #3e2723; margin-bottom: 1rem; font-size: ${isMobile ? '1.2rem' : '1.3rem'}; font-weight: 700;">Постижения</h3>
                <div style="display: grid; grid-template-columns: repeat(${isMobile ? '1' : '2'}, 1fr); gap: 0.8rem;">
                    ${member.achievements.map(achievement => `
                        <div style="display: flex; align-items: center; gap: 0.8rem; padding: 0.8rem; background: #f8f6f3; border-radius: 12px; border: 1px solid rgba(139, 69, 19, 0.08);">
                            <div style="width: 8px; height: 8px; background: #8b4513; border-radius: 50%; flex-shrink: 0;"></div>
                            <span style="color: #5d4e37; font-weight: 500; font-size: 0.9rem;">${achievement}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Languages -->
            <div style="margin-bottom: 2rem;">
                <h3 style="color: #3e2723; margin-bottom: 1rem; font-size: ${isMobile ? '1.2rem' : '1.3rem'}; font-weight: 700;">Езици</h3>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    ${member.languages.map(language => `
                        <span style="background: rgba(139, 69, 19, 0.1); color: #8b4513; padding: 0.4rem 0.8rem; border-radius: 15px; font-size: 0.85rem; font-weight: 600;">${language}</span>
                    `).join('')}
                </div>
            </div>
            
            <!-- Contact Info -->
            <div style="background: linear-gradient(135deg, #2c1810 0%, #3e2723 100%); padding: 1.5rem; border-radius: 20px; color: white;">
                <h3 style="margin: 0 0 1rem 0; font-size: ${isMobile ? '1.1rem' : '1.2rem'}; font-weight: 700;">Свържете се с ${member.name.split(' ')[0]}</h3>
                <div style="display: flex; gap: 1rem; flex-direction: ${isMobile ? 'column' : 'row'};">
                    <a href="tel:${member.phone}" style="background: rgba(255,255,255,0.1); color: white; padding: 0.8rem 1.2rem; border-radius: 12px; text-decoration: none; display: flex; align-items: center; gap: 0.8rem; transition: all 0.3s ease; flex: 1; justify-content: center;">
                        <i class="fas fa-phone"></i>
                        <span style="font-weight: 600;">${member.phone}</span>
                    </a>
                    <a href="mailto:${member.email}" style="background: rgba(255,255,255,0.1); color: white; padding: 0.8rem 1.2rem; border-radius: 12px; text-decoration: none; display: flex; align-items: center; gap: 0.8rem; transition: all 0.3s ease; flex: 1; justify-content: center;">
                        <i class="fas fa-envelope"></i>
                        <span style="font-weight: 600;">Имейл</span>
                    </a>
                </div>
            </div>
        </div>
    `;

    // Close function
    window.closeTeamModal = function() {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8) translateY(20px)';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
            delete window.closeTeamModal;
        }, 400);
    };

    modal.className = 'team-modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Animate modal appearance
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1) translateY(0)';
    }, 10);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeTeamModal();
        }
    });

    // Mobile swipe to close
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
            
            if (deltaY > 0 && modalContent.scrollTop <= 10) {
                modalContent.style.transform = `translateY(${deltaY * 0.3}px)`;
                modal.style.opacity = Math.max(0.5, 1 - (deltaY / 400));
            }
        }, { passive: true });
        
        modalContent.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const deltaY = currentY - startY;
            if (deltaY > 120) {
                closeTeamModal();
            } else {
                modalContent.style.transform = 'translateY(0)';
                modal.style.opacity = '1';
            }
            
            isDragging = false;
        }, { passive: true });
    }
}

// Create and display the news section
function createNewsSection() {
    const newsHTML = `
        <div class="section-header" style="margin-top: 4rem;">
            <h2 class="fade-in">Новини и събития</h2>
            <p class="fade-in">Актуални новини от света на недвижимите имоти</p>
        </div>

        <div class="news-grid">
            ${newsData.map(news => `
                <article class="news-card fade-in" onclick="showNewsModal(${news.id})">
                    <div class="news-image">
                        <img src="${news.image}" alt="${news.title}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="news-image-placeholder" style="display: none;">
                            <i class="fas fa-newspaper"></i>
                        </div>
                        <div class="news-category">${news.category}</div>
                        <div class="news-date">${formatDate(news.date)}</div>
                    </div>
                    <div class="news-content">
                        <h3 class="news-title">${news.title}</h3>
                        <p class="news-summary">${news.summary}</p>
                        <div class="news-read-more">
                            <span>Прочетете повече</span>
                            <i class="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </article>
            `).join('')}
        </div>
    `;

    // Find the values section and insert news before it
    const valuesSection = document.querySelector('.advantages-grid').parentElement;
    const newsContainer = document.createElement('div');
    newsContainer.innerHTML = newsHTML;
    
    // Insert before the values section
    valuesSection.parentNode.insertBefore(newsContainer, valuesSection);
}

// Show news modal
function showNewsModal(newsId) {
    const news = newsData.find(n => n.id === newsId);
    if (!news) return;

    const isMobile = window.innerWidth <= 768;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: ${isMobile ? 'flex-start' : 'center'};
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.4s ease;
        padding: ${isMobile ? '1rem' : '2rem'};
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: ${isMobile ? '20px' : '25px'};
        max-width: 600px;
        width: 100%;
        max-height: ${isMobile ? 'none' : '80vh'};
        overflow-y: ${isMobile ? 'visible' : 'auto'};
        transform: scale(0.8) translateY(20px);
        transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 0 40px 80px rgba(0, 0, 0, 0.3);
        margin: ${isMobile ? '1rem 0' : '0'};
    `;

    modalContent.innerHTML = `
        <!-- Header -->
        <div style="position: relative; height: ${isMobile ? '200px' : '250px'}; background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%); border-radius: ${isMobile ? '20px' : '25px'} ${isMobile ? '20px' : '25px'} 0 0; overflow: hidden;">
            <img src="${news.image}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.8;" alt="${news.title}" onerror="this.style.display='none';">
            
            <!-- Close Button -->
            <button onclick="this.closest('.news-modal').remove(); document.body.style.overflow='';" style="position: absolute; top: 15px; right: 15px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease;">
                <i class="fas fa-times" style="color: #666; font-size: 1.1rem;"></i>
            </button>
            
            <!-- Category and Date -->
            <div style="position: absolute; top: 15px; left: 15px;">
                <div style="background: rgba(255,255,255,0.9); color: #8b4513; padding: 0.4rem 0.8rem; border-radius: 15px; font-size: 0.8rem; font-weight: 600; margin-bottom: 0.5rem;">${news.category}</div>
                <div style="background: rgba(0,0,0,0.7); color: white; padding: 0.4rem 0.8rem; border-radius: 15px; font-size: 0.8rem; font-weight: 600;">${formatDate(news.date)}</div>
            </div>
        </div>
        
        <!-- Content -->
        <div style="padding: ${isMobile ? '1.5rem' : '2rem'};">
            <h2 style="color: #3e2723; margin-bottom: 1rem; font-size: ${isMobile ? '1.4rem' : '1.6rem'}; font-weight: 800; line-height: 1.3;">${news.title}</h2>
            <p style="color: #5d4e37; line-height: 1.7; font-size: ${isMobile ? '1rem' : '1.1rem'}; margin-bottom: 1.5rem;">${news.content}</p>
            
            <!-- Actions -->
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem;">
                <a href="properties.html" style="background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%); color: white; padding: 0.8rem 1.5rem; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">
                    <i class="fas fa-home"></i> Разгледай имоти
                </a>
                <a href="contact.html" style="background: transparent; color: #8b4513; border: 2px solid #8b4513; padding: 0.8rem 1.5rem; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease;" onmouseover="this.style.background='#8b4513'; this.style.color='white'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='transparent'; this.style.color='#8b4513'; this.style.transform=''">
                    <i class="fas fa-envelope"></i> Свържи се
                </a>
            </div>
        </div>
    `;

    modal.className = 'news-modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Animate modal appearance
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1) translateY(0)';
    }, 10);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    });
}

// Format date helper function
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

// Enhanced animations specifically for about page
function initializeAboutAnimations() {
    const observerOptions = {
        threshold: window.innerWidth <= 768 ? 0.1 : 0.15,
        rootMargin: window.innerWidth <= 768 ? '50px' : '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = window.innerWidth <= 768 ? index * 100 : index * 200;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
        observer.observe(el);
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (window.closeTeamModal) {
            closeTeamModal();
        }
        
        // Close news modals
        document.querySelectorAll('.news-modal').forEach(modal => {
            modal.remove();
            document.body.style.overflow = '';
        });
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create news section
    createNewsSection();
    
    // Initialize animations
    initializeAboutAnimations();
    
   
    // Inject styles into the page
    const styleSheet = document.createElement('style');
    styleSheet.textContent = newsStyles;
    document.head.appendChild(styleSheet);
});

// Performance optimization for mobile
function optimizeAboutPageForMobile() {
    if (window.innerWidth <= 768) {
        // Add mobile-specific optimizations
        document.body.classList.add('mobile-about-page');
        
        // Optimize images for mobile
        const images = document.querySelectorAll('.news-image img, .member-avatar img');
        images.forEach(img => {
            if (img.loading !== 'lazy') {
                img.loading = 'lazy';
            }
        });
        
        // Reduce animation complexity on mobile
        const cards = document.querySelectorAll('.news-card, .team-member-card');
        cards.forEach(card => {
            card.style.willChange = 'transform';
        });
    }
}

// Re-optimize on resize
window.addEventListener('resize', () => {
    clearTimeout(window.aboutOptimizeTimeout);
    window.aboutOptimizeTimeout = setTimeout(() => {
        optimizeAboutPageForMobile();
    }, 100);
});

// Initialize mobile optimizations
document.addEventListener('DOMContentLoaded', () => {
    optimizeAboutPageForMobile();
});