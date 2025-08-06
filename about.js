// Enhanced About Page JavaScript - Complete

// Team member data
const teamMembers = {
    biser: {
        name: "Бисер Бонев",
        role: "Старши брокер",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        experience: "15+ години опит",
        specialization: "Луксозни имоти и инвестиционни консултации",
        description: "Бисер е старши брокер с богато портфолио от недвижими имоти. С над 15 години опит в сферата на недвижимите имоти, той е специалист по луксозни имоти и инвестиционни консултации. Помогнал е на стотици клиенти да реализират мечтите си за идеалния дом.",
        achievements: [
            "500+ успешни сделки",
            "Сертифициран оценител на имоти",
            "Магистър по икономика",
            "Член на RICS (Royal Institution of Chartered Surveyors)"
        ],
        phone: "+359888605571",
        email: "sanderimoti@abv.bg",
        languages: ["Български", "Английски", "Немски"]
    },
    diana: {
        name: "Диана Узунова",
        role: "Брокер",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        experience: "8 години опит",
        specialization: "Жилищни имоти в София",
        description: "Диана е експерт по жилищни имоти в София с дълбоко познаване на пазара. Помогнала е на над 300 семейства да намерят своя идеален дом. Известна е с персонализирания си подход и внимание към детайлите.",
        achievements: [
            "300+ щастливи семейства",
            "Брокер на годината 2023",
            "Специалист по апартаменти",
            "Сертифициран консултант"
        ],
        phone: "+359883414169",
        email: "sanderimoti@abv.bg",
        languages: ["Български", "Английски", "Руски"]
    },
    plamen: {
        name: "Пламен Петров",
        role: "Брокер",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        experience: "10 години опит",
        specialization: "Комерсиални и жилищни недвижими имоти",
        description: "Пламен е специалист по комерсиални и жилищни недвижими имоти. С дългогодишен опит в сделки с недвижими имоти, той гарантира безопасността на всяка транзакция и предоставя професионални консултации на нашите клиенти.",
        achievements: [
            "400+ успешни сделки",
            "Сертифициран брокер",
            "Специалист по комерсиални имоти",
            "Експерт по инвестиции"
        ],
        phone: "+359878430485",
        email: "sanderimoti@abv.bg",
        languages: ["Български", "Английски"]
    },
    trifon: {
        name: "Трифон Бончев",
        role: "Брокер",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        experience: "8 години опит",
        specialization: "Жилищни имоти и консултации",
        description: "Трифон е опитен консултант в сферата на недвижимите имоти. Със своя експертиза и внимание към детайлите, той помага на клиентите да намерят идеалния дом за тях.",
        achievements: [
            "250+ успешни сделки",
            "Сертифициран брокер",
            "Специалист по жилищни имоти",
            "Експерт по пазарни анализи"
        ],
        phone: "0888390674",
        email: "trifon.bonchev@gmail.com",
        languages: ["Български", "Английски"]
    },
    rumyana: {
        name: "Румяна Александрова",
        role: "Брокер",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        experience: "6 години опит",
        specialization: "Жилищни имоти и персонален подход",
        description: "Румяна е брокер с персонален подход и внимание към детайлите при всяка сделка. Тя помага на клиентите да намерят най-подходящия имот за техните нужди.",
        achievements: [
            "150+ успешни сделки",
            "Сертифициран брокер",
            "Специалист по персонално обслужване",
            "Експерт по жилищни имоти"
        ],
        phone: "+359888959939",
        email: "sanderimoti@abv.bg",
        languages: ["Български", "Английски"]
    },
    aleksandra: {
        name: "Александра Иванова",
        role: "Брокер",
        image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        experience: "3 години опит",
        specialization: "Млади имоти и клиентско обслужване",
        description: "Александра е млад и амбициозен специалист с фокус върху клиентското обслужване. Тя помага на клиентите да намерят своя идеален дом с модерен подход и внимание към детайлите.",
        achievements: [
            "80+ успешни сделки",
            "Сертифициран брокер",
            "Специалист по млади имоти",
            "Експерт по дигитални решения"
        ],
        phone: "+359892014504",
        email: "sanderimoti@abv.bg",
        languages: ["Български", "Английски"]
    }
};

// Function to count properties for each broker
function getBrokerPropertiesCount(brokerId) {
    if (typeof properties === 'undefined') {
        return 0;
    }
    return properties.filter(property => property.assignedBroker === brokerId).length;
}

// Function to get properties for a specific broker
function getBrokerProperties(brokerId) {
    if (typeof properties === 'undefined') {
        return [];
    }
    return properties.filter(property => property.assignedBroker === brokerId);
}

// Function to update property counts in the UI
function updatePropertyCounts() {
    Object.keys(teamMembers).forEach(brokerId => {
        const count = getBrokerPropertiesCount(brokerId);
        const countElements = document.querySelectorAll(`[data-broker="${brokerId}"] .properties-count, [data-broker="${brokerId}"] .stat-badge span`);
        
        countElements.forEach(element => {
            let countText;
            if (count === 0) {
                countText = 'Няма имоти';
            } else if (count === 1) {
                countText = '1 имот';
            } else if (count < 5) {
                countText = `${count} имота`;
            } else {
                countText = `${count} имота`;
            }
            
            element.textContent = countText;
        });
    });
}

// News data
const newsData = [
    {
        id: 1,
        title: "Нови апартаменти във Витоша",
        summary: "Открихме нова жилищна сграда с луксозни апартаменти в подножието на Витоша",
        date: "2025-06-25",
        category: "Нови проекти",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        content: "Гордеем се да представим нашия най-нов проект - луксозна жилищна сграда в престижния район Витоша. Сградата предлага модерни апартаменти с невероятна гледка към планината и града. Всеки апартамент е проектиран с внимание към детайлите и предлага най-високо качество на живот. Проектът включва 45 апартамента с различни квадратури, подземен гараж, детска площадка и зелени площи."
    },
    {
        id: 2,
        title: "Ръст на цените на имотите",
        summary: "Анализ на пазара показва 5% ръст на цените на жилищните имоти в София",
        date: "2025-06-20",
        category: "Пазарен анализ",
        image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        content: "Според нашия месечен анализ, цените на жилищните имоти в София отбелязват стабилен ръст от 5% на годишна база. Най-голямо поскъпване се наблюдава в центъра и South Park. Този ръст се дължи на повишеното търсене и ограничения брой нови проекти. Експертите прогнозират, че тенденцията ще продължи през следващите месеци."
    },
    {
        id: 3,
        title: "Виртуални обиколки 360°",
        summary: "Въведохме най-новата технология за 360° виртуални обиколки за всички наши имоти",
        date: "2025-06-15",
        category: "Иновации",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        content: "С цел подобряване на клиентското обслужване, въведохме най-новата технология за 360° виртуални обиколки. Сега можете да разгледате всеки имот от комфорта на дома си. Технологията позволява пълно потапяне в пространството и детайлно разглеждане на всеки ъгъл. Това спестява време и позволява предварителна селекция на имотите."
    },
    {
        id: 4,
        title: "Партньорство с водещи банки",
        summary: "Сключихме договори с 5 нови банки за по-изгодни кредитни условия",
        date: "2025-06-10",
        category: "Партньорства",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        content: "Разширихме мрежата си от банкови партньори, което ни позволява да предлагаме на клиентите си още по-изгодни условия за ипотечни кредити с лихви от 3.5%. Новите партньорства включват УниКредит Булбанк, ОББ, Първа инвестиционна банка, Токуда банк и Алианц банк. Това дава възможност за по-гъвкави условия и по-бързо одобрение."
    },
    {
        id: 5,
        title: "Откриване на нов офис",
        summary: "Откриваме нов офис в центъра на София за по-добро обслужване",
        date: "2025-06-05",
        category: "Компания",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        content: "Поради непрекъснатия растеж на компанията, откриваме втори офис в центъра на София на бул. Цариградско шосе 101. Новият офис ще предлага всички наши услуги и ще работи с разширен екип от консултанти. Целта е да предоставим по-добро и по-бързо обслужване на нашите клиенти."
    },
    {
        id: 6,
        title: "Безплатна оценка на имоти",
        summary: "Стартираме нова услуга за безплатна оценка на жилищни имоти",
        date: "2025-06-01",
        category: "Услуги",
        image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        content: "Стартираме нова услуга за безплатна оценка на жилищни имоти от сертифицирани оценители. Услугата е достъпна за всички клиенти, които желаят да продадат своя имот или да разберат неговата пазарна стойност. Оценката се извършва в рамките на 24 часа и включва подробен анализ на пазара."
    }
];

// Team scroll functions for buttons
function scrollTeamLeft() {
    const container = document.getElementById('teamScroll');
    if (!container) return;
    
    const scrollAmount = 340; // Width of card + gap
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    
    // Update scroll button states
    updateScrollButtonStates();
}

function scrollTeamRight() {
    const container = document.getElementById('teamScroll');
    if (!container) return;
    
    const scrollAmount = 340; // Width of card + gap
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
    // Update scroll button states
    updateScrollButtonStates();
}

// Function to update scroll button states
function updateScrollButtonStates() {
    const container = document.getElementById('teamScroll');
    const leftBtn = document.getElementById('teamLeftBtn');
    const rightBtn = document.getElementById('teamRightBtn');
    
    if (!container || !leftBtn || !rightBtn) return;
    
    // Check if we can scroll left
    if (container.scrollLeft <= 0) {
        leftBtn.disabled = true;
        leftBtn.classList.add('disabled');
    } else {
        leftBtn.disabled = false;
        leftBtn.classList.remove('disabled');
    }
    
    // Check if we can scroll right
    if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
        rightBtn.disabled = true;
        rightBtn.classList.add('disabled');
    } else {
        rightBtn.disabled = false;
        rightBtn.classList.remove('disabled');
    }
}

// Enhanced team member modal function
function showTeamMemberModal(memberId) {
    const member = teamMembers[memberId];
    if (!member) return;
    
    const brokerProperties = getBrokerProperties(memberId);
    const propertiesCount = brokerProperties.length;
    
    // Create properties HTML
    let propertiesHTML = '';
    if (brokerProperties.length > 0) {
        propertiesHTML = `
            <div class="broker-properties-section">
                <h4><i class="fas fa-home"></i> Имоти на брокера (${propertiesCount})</h4>
                <div class="properties-scroll-container">
                    <div class="properties-scroll" id="brokerPropertiesScroll">
                        ${brokerProperties.map(property => `
                            <div class="property-card" onclick="showPropertyModal('${property.title}', '${property.price}', '${property.location}', '${property.description}')">
                                <div class="property-image">
                                    <img src="${property.images[0]}" alt="${property.title}">
                                    <div class="property-badge">${property.badge}</div>
                                </div>
                                <div class="property-info">
                                    <h5>${property.title}</h5>
                                    <p class="property-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                                    <p class="property-price"><i class="fas fa-tag"></i> ${property.price}</p>
                                    <p class="property-area"><i class="fas fa-ruler-combined"></i> ${property.area}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    ${brokerProperties.length > 3 ? `
                        <div class="properties-scroll-controls">
                            <button class="property-scroll-btn left" onclick="scrollBrokerProperties('left')">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <button class="property-scroll-btn right" onclick="scrollBrokerProperties('right')">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    ` : ''}
                </div>
                <div class="view-all-properties">
                    <button class="btn btn-primary" onclick="showAllBrokerProperties('${memberId}')">
                        <span><i class="fas fa-external-link-alt"></i> Виж всички имоти (${propertiesCount})</span>
                    </button>
                </div>
            </div>
        `;
    } else {
        propertiesHTML = `
            <div class="broker-properties-section">
                <div class="no-properties">
                    <i class="fas fa-home" style="font-size: 3rem; color: #8b4513; margin-bottom: 1rem;"></i>
                    <h4>В момента няма активни имоти</h4>
                    <p>Този брокер все още не е отговорен за имоти.</p>
                </div>
            </div>
        `;
    }
    
    const modalHTML = `
        <div class="team-modal" id="teamModal">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="member-info">
                        <img src="${member.image}" alt="${member.name}" class="member-image">
                                                    <div class="member-details">
                                <h3>${member.name}</h3>
                                <span class="role">${member.role}</span>
                                <div class="experience">${member.experience}</div>
                                <div class="broker-stats-modal">
                                    <div class="stat-item">
                                        <i class="fas fa-home"></i>
                                        <span>${propertiesCount} ${propertiesCount === 1 ? 'имот' : propertiesCount < 5 ? 'имота' : 'имота'}</span>
                                    </div>
                                    <div class="stat-item">
                                        <i class="fas fa-star"></i>
                                        <span>${member.achievements.length} постижения</span>
                                    </div>
                                </div>
                            </div>
    </div>
                    <button class="modal-close" onclick="closeTeamModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    <div class="member-description">
                        <h4><i class="fas fa-user-circle"></i> За брокера</h4>
                        <p>${member.description}</p>
                    </div>
                    
                    <div class="member-achievements">
                        <h4><i class="fas fa-trophy"></i> Постижения</h4>
                        <ul>
                            ${member.achievements.map(achievement => `<li><i class="fas fa-check-circle"></i> ${achievement}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="member-specialization">
                        <h4><i class="fas fa-briefcase"></i> Специализация</h4>
                        <p>${member.specialization}</p>
                    </div>
                    
                    <div class="member-languages">
                        <h4><i class="fas fa-globe"></i> Езици</h4>
                        <p>${member.languages.join(', ')}</p>
                    </div>
            
            ${propertiesHTML}
            
                    <div class="member-contact">
                        <h4>Контакти</h4>
                        <div class="contact-cards">
                            <div class="contact-card">
                                <i class="fas fa-phone"></i>
                                <div>
                                    <span>Телефон</span>
                                    <a href="tel:${member.phone}">${member.phone}</a>
            </div>
                        </div>
                            <div class="contact-card">
                                <i class="fas fa-envelope"></i>
                                <div>
                                    <span>Имейл</span>
                                    <a href="mailto:${member.email}">${member.email}</a>
                </div>
            </div>
                </div>
            </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('teamModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add new modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal with animation
    setTimeout(() => {
        const modal = document.getElementById('teamModal');
        if (modal) {
            modal.classList.add('show');
        }
    }, 10);
}

// Function to scroll broker properties
function scrollBrokerProperties(direction) {
    const container = document.getElementById('brokerPropertiesScroll');
    if (!container) return;
    
    const scrollAmount = 280; // Width of property card + gap
    if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// Function to show all broker properties
function showAllBrokerProperties(brokerId) {
    // Redirect to properties page with broker filter
    window.open(`properties.html?broker=${brokerId}`, '_blank');
}

// Close team modal
function closeTeamModal() {
    const modal = document.getElementById('teamModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 400);
    }
}

// News modal functionality
function showNewsModal(newsId) {
    const news = newsData.find(n => n.id === newsId);
    if (!news) return;

    const isMobile = window.innerWidth <= 768;
    
    const modal = document.createElement('div');
    modal.className = 'news-modal';
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
        <div style="position: relative; height: ${isMobile ? '200px' : '250px'}; background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%); border-radius: ${isMobile ? '20px' : '25px'} ${isMobile ? '20px' : '25px'} 0 0; overflow: hidden;">
            <img src="${news.image}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.8;" alt="${news.title}">
            
            <button onclick="closeNewsModal()" style="position: absolute; top: 15px; right: 15px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease;">
                <i class="fas fa-times" style="color: #666; font-size: 1.1rem;"></i>
            </button>
            
            <div style="position: absolute; top: 15px; left: 15px;">
                <div style="background: rgba(255,255,255,0.9); color: #8b4513; padding: 0.4rem 0.8rem; border-radius: 15px; font-size: 0.8rem; font-weight: 600; margin-bottom: 0.5rem;">${news.category}</div>
                <div style="background: rgba(0,0,0,0.7); color: white; padding: 0.4rem 0.8rem; border-radius: 15px; font-size: 0.8rem; font-weight: 600;">${formatDate(news.date)}</div>
            </div>
        </div>
        
        <div style="padding: ${isMobile ? '1.5rem' : '2rem'};">
            <h2 style="color: #3e2723; margin-bottom: 1rem; font-size: ${isMobile ? '1.4rem' : '1.6rem'}; font-weight: 800; line-height: 1.3;">${news.title}</h2>
            <p style="color: #5d4e37; line-height: 1.7; font-size: ${isMobile ? '1rem' : '1.1rem'}; margin-bottom: 1.5rem;">${news.content}</p>
            
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem;">
                <a href="properties.html" style="background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%); color: white; padding: 0.8rem 1.5rem; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease;">
                    <i class="fas fa-home"></i> Разгледай имоти
                </a>
                <a href="contact.html" style="background: transparent; color: #8b4513; border: 2px solid #8b4513; padding: 0.8rem 1.5rem; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease;">
                    <i class="fas fa-envelope"></i> Свържи се
                </a>
            </div>
        </div>
    `;

    window.closeNewsModal = function() {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8) translateY(20px)';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
            document.body.style.overflow = '';
            delete window.closeNewsModal;
        }, 400);
    };

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1) translateY(0)';
    }, 10);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeNewsModal();
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

// Enhanced animations
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

    document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
        observer.observe(el);
    });
}

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (window.closeTeamModal) {
            closeTeamModal();
        }
        if (window.closeNewsModal) {
            closeNewsModal();
        }
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeAboutAnimations();
    
    // Add scroll indicator visibility logic for team section
    const teamContainer = document.getElementById('teamScroll');
    
    function updateScrollIndicators() {
        const teamLeftBtn = document.querySelector('.team-section .scroll-left');
        const teamRightBtn = document.querySelector('.team-section .scroll-right');
        
        if (teamContainer && teamLeftBtn && teamRightBtn) {
            const isAtStart = teamContainer.scrollLeft <= 0;
            const isAtEnd = teamContainer.scrollLeft >= teamContainer.scrollWidth - teamContainer.clientWidth;
            
            teamLeftBtn.style.opacity = isAtStart ? '0.5' : '1';
            teamRightBtn.style.opacity = isAtEnd ? '0.5' : '1';
            teamLeftBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
            teamRightBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        }
    }
    
    // Add scroll event listener
    if (teamContainer) {
        teamContainer.addEventListener('scroll', updateScrollIndicators);
    }
    
    // Initial call
    setTimeout(updateScrollIndicators, 100);
});

// Performance optimization for mobile
function optimizeAboutPageForMobile() {
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-about-page');
        
        // Optimize images for mobile
        const images = document.querySelectorAll('.news-image img, .card-image img');
        images.forEach(img => {
            if (img.loading !== 'lazy') {
                img.loading = 'lazy';
            }
        });
        
        // Reduce animation complexity on mobile
        const cards = document.querySelectorAll('.news-card, .team-card');
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