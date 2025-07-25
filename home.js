// Complete Enhanced home.js - Mobile Optimized Properties with Smooth Scrolling and Image Carousel

// Enhanced mobile detection
function isMobileDevice() {
    return window.innerWidth <= 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Track current image indices for each property
let propertyImageIndices = {};

// Load featured properties with 2 separate rows - each with independent scrolling
function loadFeaturedProperties() {
    const grid = document.getElementById('featuredProperties');
    if (!grid) return;
    
    const featuredProperties = properties.filter(property => property.featured);
    
    // Split properties into two rows
    const midPoint = Math.ceil(featuredProperties.length / 2);
    const row1Properties = featuredProperties.slice(0, midPoint);
    const row2Properties = featuredProperties.slice(midPoint);
    
    // Create two separate rows with independent navigation
    const rowsHTML = `
        <!-- First Row -->
        <div class="property-row">
            <div class="row-header">
                <h3 class="row-title">Топ Предложения</h3>
                <div class="row-nav">
                    <button class="nav-btn" id="row1-prev" onclick="scrollRow('row1', 'prev')">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="nav-btn" id="row1-next" onclick="scrollRow('row1', 'next')">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            <div class="properties-row-container" id="row1">
                ${row1Properties.map(property => createOptimizedPropertyCard(property)).join('')}
            </div>
            <div class="scroll-indicators" id="indicators1"></div>
        </div>

        <!-- Second Row -->
        <div class="property-row">
            <div class="row-header">
                <h3 class="row-title">Препоръчани</h3>
                <div class="row-nav">
                    <button class="nav-btn" id="row2-prev" onclick="scrollRow('row2', 'prev')">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="nav-btn" id="row2-next" onclick="scrollRow('row2', 'next')">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            <div class="properties-row-container" id="row2">
                ${row2Properties.map(property => createOptimizedPropertyCard(property)).join('')}
            </div>
            <div class="scroll-indicators" id="indicators2"></div>
        </div>
    `;
    
    grid.innerHTML = rowsHTML;
    
    // Initialize scroll indicators for both rows
    initializeRowIndicators('row1', row1Properties.length);
    initializeRowIndicators('row2', row2Properties.length);
    
    // Reinitialize animations
    setTimeout(() => {
        initializeAnimations();
    }, 100);
}

// Row scroll state management
let rowScrollStates = {
    row1: { currentIndex: 0, maxIndex: 0, cardWidth: 0, visibleCards: 0, totalProperties: 0, containerWidth: 0 },
    row2: { currentIndex: 0, maxIndex: 0, cardWidth: 0, visibleCards: 0, totalProperties: 0, containerWidth: 0 }
};

// Enhanced row initialization for mobile with smooth scrolling
function initializeRowIndicators(rowId, propertyCount) {
    const indicatorsContainer = document.getElementById(`indicators${rowId.slice(-1)}`);
    const rowContainer = document.getElementById(rowId);
    if (!indicatorsContainer || !rowContainer) return;
    
    // Wait for DOM to render properly
    setTimeout(() => {
        const containerWidth = rowContainer.clientWidth;
        const cards = rowContainer.querySelectorAll('.property-card');
        
        if (cards.length === 0) return;
        
        const isMobile = isMobileDevice();
        
        // Calculate card width with mobile optimization
        const firstCard = cards[0];
        const cardRect = firstCard.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const gap = isMobile ? 16 : 32; // Smaller gap on mobile
        const totalCardWidth = cardWidth + gap;
        
        // Mobile-specific visible cards calculation
        let visibleCards;
        if (isMobile) {
            // On mobile, always show 1.2 cards (partial next card visible)
            visibleCards = 1;
        } else {
            visibleCards = Math.floor(containerWidth / totalCardWidth);
        }
        
        // Calculate pages for mobile (always one card per page on mobile)
        let actualPages;
        if (isMobile) {
            actualPages = propertyCount; // One page per property on mobile
        } else {
            actualPages = Math.ceil(propertyCount / visibleCards);
        }
        
        // Update state
        rowScrollStates[rowId].maxIndex = actualPages - 1;
        rowScrollStates[rowId].cardWidth = totalCardWidth;
        rowScrollStates[rowId].visibleCards = visibleCards;
        rowScrollStates[rowId].totalProperties = propertyCount;
        rowScrollStates[rowId].containerWidth = containerWidth;
        
        console.log(`${rowId} Mobile Init: ${propertyCount} properties, ${actualPages} pages`);
        
        // Always show indicators on mobile
        if (actualPages > 1) {
            const indicatorsHTML = Array.from({length: actualPages}, (_, index) => 
                `<div class="scroll-dot ${index === 0 ? 'active' : ''}" onclick="scrollToRowPage('${rowId}', ${index})"></div>`
            ).join('');
            
            indicatorsContainer.innerHTML = indicatorsHTML;
            indicatorsContainer.style.display = 'flex'; // Force visible
        } else {
            indicatorsContainer.innerHTML = '';
            indicatorsContainer.style.display = 'none';
        }
    }, isMobileDevice() ? 200 : 100);
}

// Enhanced scroll function with smooth scrolling for mobile
function scrollRow(rowId, direction) {
    const rowContainer = document.getElementById(rowId);
    if (!rowContainer) return;
    
    const currentState = rowScrollStates[rowId];
    const previousIndex = currentState.currentIndex;
    const isMobile = isMobileDevice();
    
    if (currentState.maxIndex === 0) {
        console.log(`${rowId}: Only one page, no scrolling needed`);
        return;
    }
    
    if (direction === 'next') {
        currentState.currentIndex++;
        if (currentState.currentIndex > currentState.maxIndex) {
            currentState.currentIndex = 0;
        }
    } else {
        currentState.currentIndex--;
        if (currentState.currentIndex < 0) {
            currentState.currentIndex = currentState.maxIndex;
        }
    }
    
    // Calculate scroll position with mobile optimization
    let scrollPosition;
    
    if (isMobile) {
        // Mobile: scroll exactly one card width at a time
        scrollPosition = currentState.currentIndex * currentState.cardWidth;
    } else {
        // Desktop: original behavior
        if (currentState.currentIndex === 0) {
            scrollPosition = 0;
        } else if (currentState.currentIndex === currentState.maxIndex) {
            const totalWidth = currentState.totalProperties * currentState.cardWidth;
            scrollPosition = Math.max(0, totalWidth - currentState.containerWidth);
        } else {
            scrollPosition = currentState.currentIndex * currentState.visibleCards * currentState.cardWidth;
        }
    }
    
    console.log(`Mobile Scrolling ${rowId} ${direction}: page ${previousIndex} → ${currentState.currentIndex}, position: ${scrollPosition}`);
    
    // Always use smooth scroll for better user experience
    rowContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
    
    updateRowIndicators(rowId);
}

function scrollToRowPage(rowId, pageIndex) {
    const rowContainer = document.getElementById(rowId);
    if (!rowContainer) return;
    
    const currentState = rowScrollStates[rowId];
    const isMobile = isMobileDevice();
    currentState.currentIndex = pageIndex;
    
    let scrollPosition;
    
    if (isMobile) {
        // Mobile: simple calculation
        scrollPosition = pageIndex * currentState.cardWidth;
    } else {
        // Desktop: original calculation
        if (pageIndex === 0) {
            scrollPosition = 0;
        } else if (pageIndex === currentState.maxIndex) {
            const totalWidth = currentState.totalProperties * currentState.cardWidth;
            scrollPosition = Math.max(0, totalWidth - currentState.containerWidth);
        } else {
            scrollPosition = pageIndex * currentState.visibleCards * currentState.cardWidth;
        }
    }
    
    console.log(`Jumping to page ${pageIndex} in ${rowId}, position: ${scrollPosition}`);
    
    // Always use smooth scroll
    rowContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
    
    updateRowIndicators(rowId);
}

function updateRowIndicators(rowId) {
    const indicatorNumber = rowId.slice(-1);
    const dots = document.querySelectorAll(`#indicators${indicatorNumber} .scroll-dot`);
    const currentIndex = rowScrollStates[rowId].currentIndex;
    
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Enhanced scroll event handler for mobile
function handleMobileRowScroll(rowId) {
    const rowContainer = document.getElementById(rowId);
    if (!rowContainer) return;
    
    const currentState = rowScrollStates[rowId];
    if (currentState.maxIndex === 0) return;
    
    const scrollLeft = rowContainer.scrollLeft;
    const isMobile = isMobileDevice();
    
    let newPageIndex;
    
    if (isMobile) {
        // Mobile: simple calculation based on card width
        newPageIndex = Math.round(scrollLeft / currentState.cardWidth);
        newPageIndex = Math.max(0, Math.min(newPageIndex, currentState.maxIndex));
    } else {
        // Desktop: original calculation
        const maxScrollLeft = rowContainer.scrollWidth - rowContainer.clientWidth;
        
        if (scrollLeft <= 10) {
            newPageIndex = 0;
        } else if (scrollLeft >= maxScrollLeft - 10) {
            newPageIndex = currentState.maxIndex;
        } else {
            const pageSize = currentState.visibleCards * currentState.cardWidth;
            newPageIndex = Math.round(scrollLeft / pageSize);
            newPageIndex = Math.max(0, Math.min(newPageIndex, currentState.maxIndex));
        }
    }
    
    if (newPageIndex !== currentState.currentIndex) {
        console.log(`Mobile scroll detected in ${rowId}: scrollLeft=${scrollLeft}, newPage=${newPageIndex}`);
        currentState.currentIndex = newPageIndex;
        updateRowIndicators(rowId);
    }
}

// Enhanced touch handling for smooth swiping
let touchState = {
    startX: 0,
    startY: 0,
    isDragging: false,
    activeRow: null,
    threshold: 50,
    startTime: 0,
    maxTime: 300
};

function handleTouchStart(e, rowId) {
    const touch = e.touches[0];
    touchState.startX = touch.clientX;
    touchState.startY = touch.clientY;
    touchState.isDragging = true;
    touchState.activeRow = rowId;
    touchState.startTime = Date.now();
    
    // Don't prevent default to allow smooth scrolling
}

function handleTouchMove(e) {
    if (!touchState.isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchState.startX);
    const deltaY = Math.abs(touch.clientY - touchState.startY);
    
    // If more vertical than horizontal movement, allow page scroll
    if (deltaY > deltaX && deltaY > 30) {
        touchState.isDragging = false;
        return;
    }
    
    // Allow horizontal scrolling but prevent vertical page scroll
    if (deltaX > 20) {
        e.preventDefault();
    }
}

function handleTouchEnd(e) {
    if (!touchState.isDragging || !touchState.activeRow) {
        touchState.isDragging = false;
        touchState.activeRow = null;
        return;
    }
    
    const touch = e.changedTouches[0];
    const deltaX = touchState.startX - touch.clientX;
    const deltaY = Math.abs(touch.clientY - touchState.startY);
    const elapsedTime = Date.now() - touchState.startTime;
    
    // Check for valid swipe (quick gesture)
    if (elapsedTime <= touchState.maxTime && 
        Math.abs(deltaX) >= touchState.threshold && 
        deltaY <= 100) {
        
        if (deltaX > 0) {
            scrollRow(touchState.activeRow, 'next');
        } else {
            scrollRow(touchState.activeRow, 'prev');
        }
    }
    
    touchState.isDragging = false;
    touchState.activeRow = null;
}

// Optimized event listeners with smooth scrolling support
let scrollHandlers = {};

function addOptimizedRowScrollListeners() {
    ['row1', 'row2'].forEach(rowId => {
        const rowContainer = document.getElementById(rowId);
        if (!rowContainer) return;
        
        // Desktop mouse wheel with smooth scrolling
        if (!isMobileDevice()) {
            rowContainer.addEventListener('wheel', (e) => {
                if (e.deltaY !== 0) {
                    e.preventDefault();
                    
                    // Smooth scroll instead of instant
                    const currentScroll = rowContainer.scrollLeft;
                    const scrollAmount = e.deltaY * 2; // Adjust sensitivity
                    
                    rowContainer.scrollTo({
                        left: currentScroll + scrollAmount,
                        behavior: 'smooth'
                    });
                    
                    // Throttle scroll handler
                    if (!scrollHandlers[rowId]) {
                        scrollHandlers[rowId] = setTimeout(() => {
                            handleMobileRowScroll(rowId);
                            scrollHandlers[rowId] = null;
                        }, 100);
                    }
                }
            });
        }
        
        // Throttled scroll event
        rowContainer.addEventListener('scroll', () => {
            if (!scrollHandlers[rowId]) {
                scrollHandlers[rowId] = setTimeout(() => {
                    handleMobileRowScroll(rowId);
                    scrollHandlers[rowId] = null;
                }, isMobileDevice() ? 50 : 10);
            }
        }, { passive: true });
        
        // Enhanced touch events for mobile with smooth scrolling
        if (isMobileDevice()) {
            rowContainer.addEventListener('touchstart', (e) => handleTouchStart(e, rowId), { passive: true });
            rowContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
            rowContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
            
            // Enable smooth scrolling on mobile
            rowContainer.style.scrollBehavior = 'smooth';
            rowContainer.style.webkitOverflowScrolling = 'touch';
        }
    });
}

// Enhanced property card creation with image carousel and new fields
function createOptimizedPropertyCard(property) {
    // Initialize image index for this property
    if (!propertyImageIndices[property.id]) {
        propertyImageIndices[property.id] = 0;
    }
    
    const currentImageIndex = propertyImageIndices[property.id];
    const images = property.images || [property.image || 'images/default.jpg'];
    const hasMultipleImages = images.length > 1;
    
    // Get parking information - categorized
    const parkingText = (property.parking || '').toLowerCase();
    let parkingInfo = 'Няма паркинг';
    let parkingClass = 'no-parking';
    
    if (parkingText.includes('гараж')) {
        parkingInfo = 'Гараж';
        parkingClass = 'garage';
    } else if (parkingText.includes('паркомясто') || parkingText.includes('паркинг') || parkingText.includes('подземен')) {
        parkingInfo = 'Паркомясто';
        parkingClass = 'parking-space';
    } else if (parkingText.includes('двор') || parkingText.includes('на терен')) {
        parkingInfo = 'Паркомясто';
        parkingClass = 'parking-space';
    }
    
    return `
        <div class="property-card fade-in" onclick="showEnhancedPropertyModal(${property.id})">
            <div class="property-image-container">
                <div class="property-image">
                    <img src="${images[currentImageIndex]}" alt="${property.title}" loading="lazy" id="property-img-${property.id}" style="touch-action: none;">
                    <div class="property-badge ${getBadgeClass(property.badge)}">${property.badge || ''}</div>
                    <div class="property-heart" onclick="event.stopPropagation(); toggleFavorite(${property.id})" style="touch-action: manipulation;">
                        <i class="far fa-heart"></i>
                    </div>
                    ${hasMultipleImages ? `
                        <div class="image-carousel-controls">
                            <button class="carousel-btn carousel-prev" onclick="event.stopPropagation(); changePropertyImage(${property.id}, -1)" ${images.length <= 1 ? 'style="display: none;"' : ''}>
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <button class="carousel-btn carousel-next" onclick="event.stopPropagation(); changePropertyImage(${property.id}, 1)" ${images.length <= 1 ? 'style="display: none;"' : ''}>
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                        <div class="image-indicators">
                            ${images.map((_, index) => 
                                `<div class="image-dot ${index === currentImageIndex ? 'active' : ''}" onclick="event.stopPropagation(); setPropertyImage(${property.id}, ${index})"></div>`
                            ).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
            <div class="property-content">
                <div class="property-content-top">
                    <div class="property-price">${property.price}</div>
                    <div class="property-price-per-sqm">${property.price_per_sqm || 'Цена по договаряне'}</div>
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
                    <div class="property-parking ${parkingClass}">
                        <i class="fas ${parkingClass === 'garage' ? 'fa-warehouse' : parkingClass === 'parking-space' ? 'fa-car' : 'fa-times-circle'}"></i>
                        <span>${parkingInfo}</span>
                    </div>
                    <p class="property-description">${property.description}</p>
                </div>
                <div class="property-actions">
                    <button class="property-btn btn-primary" onclick="event.stopPropagation(); contactAboutProperty('${property.title}')" style="touch-action: manipulation;">
                        <i class="fas fa-phone"></i>
                        <span>Контакт</span>
                    </button>
                    <button class="property-btn btn-secondary" onclick="event.stopPropagation(); scheduleViewing('${property.title}')" style="touch-action: manipulation;">
                        <i class="fas fa-calendar"></i>
                        <span>Оглед</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Enhanced Property Modal with Full Details and Image Gallery
window.showEnhancedPropertyModal = function(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
if (property.type === 'land') {
        showLandPropertyDetails(property);
        return;
    }

    const images = property.images || [property.image || 'images/default.jpg'];
    let currentModalImageIndex = 0;
    const isMobile = isMobileDevice();
    
    // Get parking information for modal - categorized
    const parkingText = (property.parking || '').toLowerCase();
    let parkingInfo = 'Няма паркинг';
    let parkingClass = 'no-parking';
    
    if (parkingText.includes('гараж')) {
        parkingInfo = 'Гараж';
        parkingClass = 'garage';
    } else if (parkingText.includes('паркомясто') || parkingText.includes('паркинг') || parkingText.includes('подземен')) {
        parkingInfo = 'Паркомясто';
        parkingClass = 'parking-space';
    } else if (parkingText.includes('двор') || parkingText.includes('на терен')) {
        parkingInfo = 'Паркомясто';
        parkingClass = 'parking-space';
    }
    
    // Additional property details
    const additionalDetails = {
        year: property.year || '2020',
        heating: property.heating || 'Централно парно',
        parking: parkingInfo, // Use the categorized parking info
        exposure: property.exposure || 'Изток/Запад',
        condition: property.condition || 'Отлично',
        furniture: property.furniture || 'Обзаведен',
        elevator: property.elevator || 'Да',
        balcony: property.balcony || 'Тераса',
        price_per_sqm: property.price_per_sqm || '€ 4,695/кв.м'
    };
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(77, 77, 77, 0.95);
        display: flex;
        align-items: ${isMobile ? 'flex-start' : 'center'};
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: ${isMobile ? '0' : '1rem'};
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: ${isMobile ? '0' : '25px'};
        max-width: 1000px;
        width: 200%;
        max-height: 90vh;
        overflow-y: auto;
        transform: ${isMobile ? 'translateY(100%)' : 'scale(0.8)'};
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
        ${isMobile ? 'margin-top: auto; border-radius: 25px 25px 0 0;' : ''}
    `;

    modalContent.innerHTML = `
        <div style="position: relative;">
            <!-- Image Gallery Section -->
            <div id="modal-image-gallery" style="position: relative; height: ${isMobile ? '350px' : '400px'}; overflow: hidden; border-radius: ${isMobile ? '25px 25px 0 0' : '25px 25px 0 0'}; background: #f8f6f3;">
                <div id="modal-image-slider" style="display: flex; height: 100%; transition: transform 0.3s ease; width: ${images.length * 100}%;">
                    ${images.map((image, index) => `
                        <div style="width: ${100 / images.length}%; height: 100%; flex-shrink: 0;">
                            <img src="${image}" style="width: 100%; height: 100%; object-fit: cover;" alt="${property.title} - Image ${index + 1}" onerror="this.src='images/default.jpg'">
                        </div>
                    `).join('')}
                </div>
                
                <!-- Navigation Arrows -->
                ${images.length > 1 ? `
                    <button onclick="changeModalImage(-1)" style="position: absolute; left: 15px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.7); color: white; border: none; border-radius: 50%; width: ${isMobile ? '50px' : '45px'}; height: ${isMobile ? '50px' : '45px'}; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; touch-action: manipulation; z-index: 10;">
                        <i class="fas fa-chevron-left" style="font-size: ${isMobile ? '1.2rem' : '1rem'};"></i>
                    </button>
                    <button onclick="changeModalImage(1)" style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.7); color: white; border: none; border-radius: 50%; width: ${isMobile ? '50px' : '45px'}; height: ${isMobile ? '50px' : '45px'}; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; touch-action: manipulation; z-index: 10;">
                        <i class="fas fa-chevron-right" style="font-size: ${isMobile ? '1.2rem' : '1rem'};"></i>
                    </button>
                ` : ''}
                
                <!-- Image Counter -->
                <div style="position: absolute; top: 20px; right: 20px; background: rgba(0,0,0,0.8); color: white; padding: ${isMobile ? '8px 12px' : '6px 10px'}; border-radius: 15px; font-size: ${isMobile ? '0.9rem' : '0.8rem'}; font-weight: 600; z-index: 10;">
                    <span id="image-counter">${currentModalImageIndex + 1} / ${images.length}</span>
                </div>
                
                <!-- Property Badge -->
                <div style="position: absolute; top: 20px; left: 20px; background: rgba(255,255,255,0.95); color: #8b4513; padding: ${isMobile ? '8px 12px' : '6px 10px'}; border-radius: 12px; font-size: ${isMobile ? '0.8rem' : '0.75rem'}; font-weight: 700; text-transform: uppercase; z-index: 10; ${property.badge ? '' : 'display: none;'}">
                    ${property.badge || ''}
                </div>
                
                <!-- Image Dots -->
                ${images.length > 1 ? `
                    <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: ${isMobile ? '8px' : '6px'}; z-index: 10;" id="modal-image-dots">
                        ${images.map((_, index) => 
                            `<div onclick="setModalImage(${index})" style="width: ${isMobile ? '12px' : '10px'}; height: ${isMobile ? '12px' : '10px'}; border-radius: 50%; background: ${index === 0 ? 'white' : 'rgba(255,255,255,0.5)'}; cursor: pointer; transition: all 0.3s ease; touch-action: manipulation; border: 2px solid rgba(0,0,0,0.2);" class="modal-image-dot" data-index="${index}"></div>`
                        ).join('')}
                    </div>
                ` : ''}
            </div>
            
            <!-- Content Section -->
            <div style="padding: ${isMobile ? '2rem 1.5rem' : '2.5rem'};">
                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
                    <div style="flex: 1;">
                        <h2 style="color: #3e2723; margin: 0 0 0.5rem 0; font-size: ${isMobile ? '1.5rem' : '1.8rem'}; font-weight: 800; line-height: 1.2;">${property.title}</h2>
                        <div style="color: #8b4513; font-size: ${isMobile ? '1.4rem' : '1.6rem'}; font-weight: 800; margin-bottom: 0.5rem;">${property.price}</div>
                        <div style="color: #d2691e; font-size: ${isMobile ? '1rem' : '1.1rem'}; font-weight: 600; margin-bottom: 0.5rem;">${additionalDetails.price_per_sqm}</div>
                        <div style="color: #5d4e37; font-size: ${isMobile ? '1rem' : '1.1rem'}; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-map-marker-alt" style="color: #8b4513;"></i>
                            ${property.location}
                        </div>
                    </div>
                    <button onclick="closeEnhancedModal()" style="background: none; border: none; font-size: ${isMobile ? '2.2rem' : '2rem'}; color: #999; cursor: pointer; padding: 0; margin-left: 1rem; min-width: ${isMobile ? '50px' : '40px'}; min-height: ${isMobile ? '50px' : '40px'}; touch-action: manipulation; display: flex; align-items: center; justify-content: center;">×</button>
                </div>
                
                <!-- Key Details Grid -->
                <div style="display: grid; grid-template-columns: repeat(${isMobile ? '2' : '4'}, 1fr); gap: ${isMobile ? '1rem' : '1.5rem'}; margin-bottom: 2rem; padding: 1.5rem; background: linear-gradient(135deg, #f8f6f3 0%, #faf9f7 100%); border-radius: 20px; border: 1px solid rgba(139, 69, 19, 0.1);">
                    <div style="text-align: center;">
                        <div style="color: #8b4513; font-size: ${isMobile ? '1.4rem' : '1.6rem'}; font-weight: 800; margin-bottom: 0.3rem;">${property.area}</div>
                        <div style="color: #5d4e37; font-size: ${isMobile ? '0.8rem' : '0.85rem'}; text-transform: uppercase; letter-spacing: 0.5px;">Площ</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="color: #8b4513; font-size: ${isMobile ? '1.4rem' : '1.6rem'}; font-weight: 800; margin-bottom: 0.3rem;">${property.rooms.replace(/\D/g, '') || '2'}</div>
                        <div style="color: #5d4e37; font-size: ${isMobile ? '0.8rem' : '0.85rem'}; text-transform: uppercase; letter-spacing: 0.5px;">Стаи</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="color: #8b4513; font-size: ${isMobile ? '1.4rem' : '1.6rem'}; font-weight: 800; margin-bottom: 0.3rem;">${property.floor.replace(/\D/g, '') || '2'}</div>
                        <div style="color: #5d4e37; font-size: ${isMobile ? '0.8rem' : '0.85rem'}; text-transform: uppercase; letter-spacing: 0.5px;">Етаж</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="color: #8b4513; font-size: ${isMobile ? '1.4rem' : '1.6rem'}; font-weight: 800; margin-bottom: 0.3rem;">${property.bathrooms.replace(/\D/g, '') || '1'}</div>
                        <div style="color: #5d4e37; font-size: ${isMobile ? '0.8rem' : '0.85rem'}; text-transform: uppercase; letter-spacing: 0.5px;">Бани</div>
                    </div>
                </div>
                
                <!-- Parking Information -->
                <div style="margin-bottom: 2rem; padding: 1.5rem; background: linear-gradient(135deg, rgba(139, 69, 19, 0.05) 0%, rgba(210, 105, 30, 0.05) 100%); border-radius: 20px; border: 1px solid rgba(139, 69, 19, 0.1);">
                    <h3 style="color: #3e2723; margin-bottom: 1rem; font-size: ${isMobile ? '1.2rem' : '1.3rem'}; font-weight: 700; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas ${parkingClass === 'garage' ? 'fa-warehouse' : parkingClass === 'parking-space' ? 'fa-car' : 'fa-times-circle'}" style="color: #8b4513;"></i>
                        Паркиране
                    </h3>
                    <p style="color: #5d4e37; font-size: ${isMobile ? '1rem' : '1.05rem'}; margin: 0; font-weight: 600;">${parkingInfo}</p>
                </div>
                
                <!-- Description -->
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: #3e2723; margin-bottom: 1rem; font-size: ${isMobile ? '1.2rem' : '1.3rem'}; font-weight: 700;">Описание</h3>
                    <p style="color: #5d4e37; line-height: 1.7; font-size: ${isMobile ? '1rem' : '1.05rem'}; margin-bottom: 1rem;">${property.description}</p>
                    <p style="color: #5d4e37; line-height: 1.7; font-size: ${isMobile ? '1rem' : '1.05rem'};">Този имот предлага отлично съотношение цена-качество и се намира на стратегическо място с добра транспортна свързаnost. Идеален за инвестиция или лично ползване.</p>
                </div>
                
                <!-- Detailed Features -->
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: #3e2723; margin-bottom: 1rem; font-size: ${isMobile ? '1.2rem' : '1.3rem'}; font-weight: 700;">Детайли</h3>
                    <div style="display: grid; grid-template-columns: repeat(${isMobile ? '1' : '2'}, 1fr); gap: ${isMobile ? '1rem' : '1.5rem'};">
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 0; border-bottom: 1px solid rgba(139, 69, 19, 0.1);">
                            <span style="color: #5d4e37; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-calendar-alt" style="color: #8b4513; width: 16px;"></i>
                                Година на строеж
                            </span>
                            <span style="color: #3e2723; font-weight: 700;">${additionalDetails.year}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 0; border-bottom: 1px solid rgba(139, 69, 19, 0.1);">
                            <span style="color: #5d4e37; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-fire" style="color: #8b4513; width: 16px;"></i>
                                Отопление
                            </span>
                            <span style="color: #3e2723; font-weight: 700;">${additionalDetails.heating}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 0; border-bottom: 1px solid rgba(139, 69, 19, 0.1);">
                            <span style="color: #5d4e37; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-compass" style="color: #8b4513; width: 16px;"></i>
                                Изложение
                            </span>
                            <span style="color: #3e2723; font-weight: 700;">${additionalDetails.exposure}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 0; border-bottom: 1px solid rgba(139, 69, 19, 0.1);">
                            <span style="color: #5d4e37; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-tools" style="color: #8b4513; width: 16px;"></i>
                                Състояние
                            </span>
                            <span style="color: #3e2723; font-weight: 700;">${additionalDetails.condition}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 0; border-bottom: 1px solid rgba(139, 69, 19, 0.1);">
                            <span style="color: #5d4e37; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-couch" style="color: #8b4513; width: 16px;"></i>
                                Обзавеждане
                            </span>
                            <span style="color: #3e2723; font-weight: 700;">${additionalDetails.furniture}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 0; border-bottom: 1px solid rgba(139, 69, 19, 0.1);">
                            <span style="color: #5d4e37; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-arrow-up" style="color: #8b4513; width: 16px;"></i>
                                Асансьор
                            </span>
                            <span style="color: #3e2723; font-weight: 700;">${additionalDetails.elevator}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 0; border-bottom: 1px solid rgba(139, 69, 19, 0.1);">
                            <span style="color: #5d4e37; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-tree" style="color: #8b4513; width: 16px;"></i>
                                Балкон/Тераса
                            </span>
                            <span style="color: #3e2723; font-weight: 700;">${additionalDetails.balcony}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Contact Actions -->
                <div style="display: flex; gap: ${isMobile ? '1rem' : '1.5rem'}; justify-content: center; flex-direction: ${isMobile ? 'column' : 'row'}; margin-bottom: ${isMobile ? '2rem' : '1rem'};">
                    <a href="tel:+359888123456" style="background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%); color: white; padding: ${isMobile ? '1.2rem 1.5rem' : '1rem 2rem'}; border-radius: ${isMobile ? '15px' : '25px'}; text-decoration: none; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 0.8rem; transition: all 0.3s ease; font-size: ${isMobile ? '1.1rem' : '1rem'}; min-height: ${isMobile ? '56px' : 'auto'}; touch-action: manipulation; box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);">
                        <i class="fas fa-phone" style="font-size: 1.1rem;"></i> 
                        <span>Обадете се сега</span>
                    </a>
                    <a href="mailto:info@sandercorrect.com?subject=Интерес към ${property.title}&body=Здравейте, интересувам се от имота: ${property.title}" style="background: transparent; color: #8b4513; border: 2px solid #8b4513; padding: ${isMobile ? '1.2rem 1.5rem' : '1rem 2rem'}; border-radius: ${isMobile ? '15px' : '25px'}; text-decoration: none; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 0.8rem; transition: all 0.3s ease; font-size: ${isMobile ? '1.1rem' : '1rem'}; min-height: ${isMobile ? '56px' : 'auto'}; touch-action: manipulation;">
                        <i class="fas fa-envelope" style="font-size: 1.1rem;"></i> 
                        <span>Изпрати имейл</span>
                    </a>
                    <a href="properties.html" style="background: #f8f6f3; color: #5d4e37; border: none; padding: ${isMobile ? '1.2rem 1.5rem' : '1rem 2rem'}; border-radius: ${isMobile ? '15px' : '25px'}; text-decoration: none; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 0.8rem; transition: all 0.3s ease; font-size: ${isMobile ? '1.1rem' : '1rem'}; min-height: ${isMobile ? '56px' : 'auto'}; touch-action: manipulation;">
                        <i class="fas fa-search" style="font-size: 1.1rem;"></i> 
                        <span>Още имоти</span>
                    </a>
                </div>
                
                <!-- Share & Favorite Section -->
                <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 1rem; padding-top: 1rem; border-top: 1px solid rgba(139, 69, 19, 0.1);">
                    <button onclick="toggleModalFavorite(${property.id})" style="background: none; border: 2px solid #d2691e; color: #d2691e; padding: 0.8rem 1.2rem; border-radius: 12px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; font-weight: 600; touch-action: manipulation;">
                        <i class="far fa-heart" id="modal-heart-${property.id}"></i>
                        <span>Запази</span>
                    </button>
                    <button onclick="shareProperty('${property.title}', '${property.price}', '${property.location}')" style="background: none; border: 2px solid #8b4513; color: #8b4513; padding: 0.8rem 1.2rem; border-radius: 12px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; font-weight: 600; touch-action: manipulation;">
                        <i class="fas fa-share-alt"></i>
                        <span>Сподели</span>
                    </button>
                </div>
                
                ${isMobile ? `<div style="height: 2rem;"></div>` : ''}
            </div>
        </div>
    `;

    // Modal image navigation functions with smooth transitions
    window.changeModalImage = function(direction) {
        currentModalImageIndex += direction;
        if (currentModalImageIndex >= images.length) currentModalImageIndex = 0;
        if (currentModalImageIndex < 0) currentModalImageIndex = images.length - 1;
        
        updateModalImageDisplay();
    };
    
    window.setModalImage = function(index) {
        currentModalImageIndex = index;
        updateModalImageDisplay();
    };
    
    window.closeEnhancedModal = function() {
        modal.style.opacity = '0';
        modalContent.style.transform = isMobile ? 'translateY(100%)' : 'scale(0.8)';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
            // Clean up global functions
            delete window.changeModalImage;
            delete window.setModalImage;
            delete window.closeEnhancedModal;
        }, 400);
    };
    
    window.toggleModalFavorite = function(propertyId) {
        const heart = document.getElementById(`modal-heart-${propertyId}`);
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
    };
    
    window.shareProperty = function(title, price, location) {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: `${title} - ${price} в ${location}`,
                url: window.location.href
            });
        } else {
            // Fallback - copy to clipboard
            const shareText = `${title} - ${price} в ${location}\n${window.location.href}`;
            navigator.clipboard.writeText(shareText).then(() => {
                showNotification('Информацията е копирана в клипборда', 'success');
            });
        }
    };
    
    function updateModalImageDisplay() {
        const slider = document.getElementById('modal-image-slider');
        const counter = document.getElementById('image-counter');
        const dots = document.querySelectorAll('.modal-image-dot');
        
        if (slider) {
            const translateX = -(currentModalImageIndex * (100 / images.length));
            slider.style.transform = `translateX(${translateX}%)`;
        }
        
        if (counter) {
            counter.textContent = `${currentModalImageIndex + 1} / ${images.length}`;
        }
        
        dots.forEach((dot, i) => {
            dot.style.background = i === currentModalImageIndex ? 'white' : 'rgba(255,255,255,0.5)';
        });
    }

    modal.className = 'modal enhanced-modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Animate modal appearance with smooth transitions
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = isMobile ? 'translateY(0)' : 'scale(1)';
    }, 10);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeEnhancedModal();
        }
    });

    // Enhanced mobile swipe support for modal and image gallery
    if (isMobile) {
        let modalStartY = 0;
        let modalCurrentY = 0;
        let modalIsDragging = false;
        let modalStartX = 0;
        let modalCurrentX = 0;
        
        modalContent.addEventListener('touchstart', (e) => {
            modalStartY = e.touches[0].clientY;
            modalStartX = e.touches[0].clientX;
            modalIsDragging = true;
        }, { passive: true });
        
        modalContent.addEventListener('touchmove', (e) => {
            if (!modalIsDragging) return;
            modalCurrentY = e.touches[0].clientY;
            modalCurrentX = e.touches[0].clientX;
            const deltaY = modalCurrentY - modalStartY;
            const deltaX = Math.abs(modalCurrentX - modalStartX);
            
            // Only allow vertical swipe to close if not swiping horizontally on images
            if (deltaX < 50 && deltaY > 0 && modalContent.scrollTop <= 10) {
                modalContent.style.transform = `translateY(${deltaY * 0.3}px)`;
                modal.style.opacity = Math.max(0.5, 1 - (deltaY / 500));
            }
        }, { passive: true });
        
        modalContent.addEventListener('touchend', () => {
            if (!modalIsDragging) return;
            
            const deltaY = modalCurrentY - modalStartY;
            const deltaX = Math.abs(modalCurrentX - modalStartX);
            
            if (deltaX < 50 && deltaY > 120) { // Close if swiped down more than 120px
                closeEnhancedModal();
            } else {
                modalContent.style.transform = 'translateY(0)';
                modal.style.opacity = '1';
            }
            
            modalIsDragging = false;
        }, { passive: true });
        
        // Image gallery swipe support
        const imageGallery = document.getElementById('modal-image-gallery');
        if (imageGallery && images.length > 1) {
            let imageStartX = 0;
            let imageCurrentX = 0;
            let imageIsDragging = false;
            
            imageGallery.addEventListener('touchstart', (e) => {
                imageStartX = e.touches[0].clientX;
                imageIsDragging = true;
                e.stopPropagation();
            }, { passive: true });
            
            imageGallery.addEventListener('touchmove', (e) => {
                if (!imageIsDragging) return;
                imageCurrentX = e.touches[0].clientX;
                e.stopPropagation();
            }, { passive: true });
            
            imageGallery.addEventListener('touchend', (e) => {
                if (!imageIsDragging) return;
                
                const deltaX = imageStartX - imageCurrentX;
                
                if (Math.abs(deltaX) > 50) {
                    if (deltaX > 0) {
                        changeModalImage(1);
                    } else {
                        changeModalImage(-1);
                    }
                }
                
                imageIsDragging = false;
                e.stopPropagation();
            }, { passive: true });
        }
    }

    // Keyboard navigation
    const handleKeyPress = (e) => {
        if (e.key === 'ArrowLeft') changeModalImage(-1);
        if (e.key === 'ArrowRight') changeModalImage(1);
        if (e.key === 'Escape') closeEnhancedModal();
    };
    
    document.addEventListener('keydown', handleKeyPress);

    // Clean up on modal close
    modal.addEventListener('remove', () => {
        document.removeEventListener('keydown', handleKeyPress);
    });
};

// Original showPropertyModal function (keeping for backward compatibility)
window.showPropertyModal = function(title, price, location, description) {
    // Find the property by title and show enhanced modal instead
    const property = properties.find(p => p.title === title);
    if (property) {
        showEnhancedPropertyModal(property.id);
    } else {
        // Fallback to simple modal if property not found
        showSimplePropertyModal(title, price, location, description);
    }
};

// Simple modal fallback
function showSimplePropertyModal(title, price, location, description) {
    const isMobile = isMobileDevice();
    
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
            <button onclick="this.closest('.modal').remove(); document.body.style.overflow = '';" style="background: none; border: none; font-size: ${isMobile ? '1.8rem' : '1.5rem'}; color: #999; cursor: pointer; padding: 0; margin-left: 1rem; line-height: 1;">×</button>
        </div>
        ${price ? `<p style="color: #8b4513; font-size: ${isMobile ? '1.2rem' : '1.3rem'}; font-weight: 700; margin-bottom: 0.5rem; text-align: left;">${price}</p>` : ''}
        ${location ? `<p style="color: #5d4e37; margin-bottom: 2rem; text-align: left; display: flex; align-items: center; gap: 0.5rem; font-size: ${isMobile ? '0.9rem' : '1rem'};"><i class="fas fa-map-marker-alt" style="color: #8b4513;"></i>${location}</p>` : ''}
        <p style="color: #5d4e37; margin-bottom: 2rem; line-height: 1.6; text-align: left; font-size: ${isMobile ? '0.9rem' : '1rem'};">${description}</p>
        <div style="display: ${isMobile ? 'flex' : 'flex'}; gap: ${isMobile ? '0.8rem' : '1rem'}; justify-content: center; flex-wrap: wrap; margin-top: 2rem; ${isMobile ? 'flex-direction: column;' : ''}">
            <a href="tel:+359888123456" style="background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%); color: white; padding: ${isMobile ? '1.2rem 1.5rem' : '1rem 1.5rem'}; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.3s ease; font-size: ${isMobile ? '1rem' : '0.9rem'};">
                <i class="fas fa-phone"></i> Обадете се
            </a>
            <a href="mailto:info@sandercorrect.com" style="background: transparent; color: #8b4513; border: 2px solid #8b4513; padding: ${isMobile ? '1.2rem 1.5rem' : '1rem 1.5rem'}; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.3s ease; font-size: ${isMobile ? '1rem' : '0.9rem'};">
                <i class="fas fa-envelope"></i> Имейл
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
            document.body.style.overflow = '';
        }
    });

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Enhanced image carousel functions with smooth transitions
function changePropertyImage(propertyId, direction) {
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.images) return;
    
    const images = property.images;
    const currentIndex = propertyImageIndices[propertyId] || 0;
    
    let newIndex = currentIndex + direction;
    
    // Loop around
    if (newIndex >= images.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = images.length - 1;
    }
    
    propertyImageIndices[propertyId] = newIndex;
    
    // Update image and indicators with smooth transition
    updatePropertyImageDisplay(propertyId, newIndex, images);
}

// Set specific property image
function setPropertyImage(propertyId, imageIndex) {
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.images) return;
    
    propertyImageIndices[propertyId] = imageIndex;
    updatePropertyImageDisplay(propertyId, imageIndex, property.images);
}

// Update image display and indicators with smooth transitions
function updatePropertyImageDisplay(propertyId, newIndex, images) {
    const imgElement = document.getElementById(`property-img-${propertyId}`);
    const card = imgElement?.closest('.property-card');
    
    if (imgElement && images[newIndex]) {
        // Smooth image transition with CSS
        imgElement.style.transition = 'opacity 0.3s ease';
        imgElement.style.opacity = '0.7';
        
        setTimeout(() => {
            imgElement.src = images[newIndex];
            imgElement.style.opacity = '1';
        }, 150);
        
        // Update indicators with smooth transitions
        const indicators = card?.querySelectorAll('.image-dot');
        if (indicators) {
            indicators.forEach((dot, index) => {
                dot.style.transition = 'all 0.3s ease';
                if (index === newIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
}

// Get badge class for styling
function getBadgeClass(badge) {
    if (!badge) return '';
    
    const lowerBadge = badge.toLowerCase();
    if (lowerBadge.includes('ново') || lowerBadge.includes('new')) return 'new';
    if (lowerBadge.includes('спешно') || lowerBadge.includes('urgent')) return 'urgent';
    if (lowerBadge.includes('продаден') || lowerBadge.includes('sold')) return 'sold';
    if (lowerBadge.includes('наем') || lowerBadge.includes('rent')) return 'rent';
    if (lowerBadge.includes('препоръчан') || lowerBadge.includes('featured')) return 'featured';
    
    return '';
}

// Enhanced mobile resize handler
function handleOptimizedResize() {
    clearTimeout(window.optimizedResizeTimeout);
    window.optimizedResizeTimeout = setTimeout(() => {
        const featuredProperties = properties.filter(property => property.featured);
        const midPoint = Math.ceil(featuredProperties.length / 2);
        
        // Force reinitialize on mobile
        initializeRowIndicators('row1', midPoint);
        initializeRowIndicators('row2', featuredProperties.length - midPoint);
        
        // Reset scroll positions
        ['row1', 'row2'].forEach(rowId => {
            rowScrollStates[rowId].currentIndex = 0;
            const rowContainer = document.getElementById(rowId);
            if (rowContainer) {
                rowContainer.scrollLeft = 0;
                updateRowIndicators(rowId);
            }
        });
    }, isMobileDevice() ? 500 : 250);
}

// Force indicators to be visible on mobile
function forceIndicatorsVisible() {
    const indicators1 = document.getElementById('indicators1');
    const indicators2 = document.getElementById('indicators2');
    
    if (isMobileDevice()) {
        if (indicators1) {
            indicators1.style.display = 'flex';
            indicators1.style.visibility = 'visible';
        }
        if (indicators2) {
            indicators2.style.display = 'flex';
            indicators2.style.visibility = 'visible';
        }
    }
}

// Contact about property
function contactAboutProperty(propertyTitle) {
    window.location.href = 'contact.html?property=' + encodeURIComponent(propertyTitle);
}

// Schedule viewing
function scheduleViewing(propertyTitle) {
    showEnhancedPropertyModal(
        properties.find(p => p.title === propertyTitle)?.id || 1
    );
}

// Enhanced initialization with smooth scrolling
function initializeOptimizedMobile() {
    loadFeaturedProperties();
    
    setTimeout(() => {
        addOptimizedRowScrollListeners();
        
        setTimeout(() => {
            const featuredProperties = properties.filter(property => property.featured);
            const midPoint = Math.ceil(featuredProperties.length / 2);
            initializeRowIndicators('row1', midPoint);
            initializeRowIndicators('row2', featuredProperties.length - midPoint);
            
            // Force indicators visible after initialization
            forceIndicatorsVisible();
        }, isMobileDevice() ? 300 : 150);
        
    }, isMobileDevice() ? 500 : 200);
    
    setTimeout(() => {
        showNotification('Добре дошли в Sander Correct! Открийте идеалния имот за вас.', 'info');
    }, isMobileDevice() ? 2000 : 2000);
}

// Enhanced resize and orientation change handlers
window.addEventListener('resize', handleOptimizedResize);
window.addEventListener('orientationchange', () => {
    if (isMobileDevice()) {
        setTimeout(() => {
            handleOptimizedResize();
            forceIndicatorsVisible();
        }, 600);
    }
});

// Prevent double-tap zoom on mobile for better UX
if (isMobileDevice()) {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Add smooth scrolling support globally for mobile
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Enhanced accessibility for mobile
if (isMobileDevice()) {
    // Improve focus management on mobile
    document.addEventListener('focusin', (e) => {
        if (e.target.closest('.property-card, .property-btn, .nav-btn, .scroll-dot, .carousel-btn, .image-dot')) {
            e.target.style.outline = '3px solid #8b4513';
            e.target.style.outlineOffset = '2px';
        }
    });
    
    document.addEventListener('focusout', (e) => {
        if (e.target.closest('.property-card, .property-btn, .nav-btn, .scroll-dot, .carousel-btn, .image-dot')) {
            e.target.style.outline = '';
            e.target.style.outlineOffset = '';
        }
    });
}

// Replace the DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', () => {
    initializeOptimizedMobile();
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    // Clean up any remaining intervals or timeouts
    if (window.optimizedResizeTimeout) {
        clearTimeout(window.optimizedResizeTimeout);
    }
    
    // Clean up scroll handlers
    Object.keys(scrollHandlers).forEach(key => {
        if (scrollHandlers[key]) {
            clearTimeout(scrollHandlers[key]);
        }
    });
});

// Специализирана функция за показване на детайли за парцели
function showLandPropertyDetails(property) {
    const isMobile = window.innerWidth <= 768;
    const images = property.images || [property.image || 'images/default.jpg'];
    let currentLandImageIndex = 0;
    
    // Създаване на modal
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');
    
    // Специализирани данни за парцели
    const landDetails = {
        parcelType: property.parcelType || 'УПИ', // УПИ или ПИ
        electricity: property.electricity || 'Да',
        water: property.water || 'Да', 
        sewerage: property.sewerage || 'Не',
        regulation: property.regulation || 'Да',
        idealProject: property.idealProject || 'Не',
        designVisa: property.designVisa || 'Не',
        year: property.year || 'Н/А',
        parking: property.parking || 'Свободно паркиране',
        exposure: property.exposure || 'Всички страни',
        condition: property.condition || 'Добро',
        price_per_sqm: property.price_per_sqm || 'Н/А'
    };

    // Стилове за модала
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(77, 77, 77, 0.95);
        display: flex;
        align-items: ${isMobile ? 'flex-start' : 'center'};
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: ${isMobile ? '0' : '1rem'};
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    `;

    modalContent.innerHTML = `
        <div style="position: relative; width: 100%; max-width: ${isMobile ? '100%' : '1200px'}; max-height: ${isMobile ? '100vh' : '90vh'}; overflow-y: auto; background: white; border-radius: ${isMobile ? '0' : '25px'}; box-shadow: 0 25px 50px rgba(0,0,0,0.3); margin: ${isMobile ? '0' : 'auto'}; ${isMobile ? 'height: 100vh;' : ''}">
            
            <!-- Галерия със снимки -->
            <div style="position: relative; height: ${isMobile ? '250px' : '350px'}; overflow: hidden; border-radius: ${isMobile ? '0' : '25px 25px 0 0'};">
                <!-- Image Slider Container -->
                <div style="position: relative; width: 100%; height: 100%; overflow: hidden;">
                    <div id="land-image-slider" style="display: flex; width: ${images.length * 100}%; height: 100%; transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);">
                        ${images.map((img, index) => `
                            <div style="width: ${100 / images.length}%; height: 100%; flex-shrink: 0;">
                                <img src="${img}" alt="Снимка ${index + 1}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='images/default.jpg'">
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Navigation Arrows -->
                ${images.length > 1 ? `
                    <button onclick="changeLandImage(-1)" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: ${isMobile ? '45px' : '50px'}; height: ${isMobile ? '45px' : '50px'}; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: all 0.3s ease; z-index: 10; touch-action: manipulation;">
                        <i class="fas fa-chevron-left" style="color: #333; font-size: ${isMobile ? '16px' : '18px'};"></i>
                    </button>
                    <button onclick="changeLandImage(1)" style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: ${isMobile ? '45px' : '50px'}; height: ${isMobile ? '45px' : '50px'}; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: all 0.3s ease; z-index: 10; touch-action: manipulation;">
                        <i class="fas fa-chevron-right" style="color: #333; font-size: ${isMobile ? '16px' : '18px'};"></i>
                    </button>
                ` : ''}
                
                <!-- Image Counter -->
                ${images.length > 1 ? `
                    <div style="position: absolute; bottom: 1rem; right: 1rem; background: rgba(0,0,0,0.7); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: ${isMobile ? '0.8rem' : '0.9rem'}; font-weight: 600; z-index: 10;">
                        <span id="land-image-counter">1 / ${images.length}</span>
                    </div>
                ` : ''}
                
                <!-- Image Dots -->
                ${images.length > 1 && images.length <= 5 ? `
                    <div style="position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.5rem; z-index: 10;">
                        ${images.map((_, index) => `
                            <button onclick="setLandImage(${index})" class="land-image-dot" style="width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; background: ${index === 0 ? 'white' : 'transparent'}; cursor: pointer; transition: all 0.3s ease; touch-action: manipulation;"></button>
                        `).join('')}
                    </div>
                ` : ''}
                
                <!-- Close Button -->
                <button onclick="closeLandModal()" style="position: absolute; top: 1rem; right: 1rem; background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: ${isMobile ? '45px' : '50px'}; height: ${isMobile ? '45px' : '50px'}; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: ${isMobile ? '1.2rem' : '1.4rem'}; z-index: 10; transition: all 0.3s ease; touch-action: manipulation;">×</button>
            </div>
            
            <!-- Header със заглавие -->
            <div style="padding: ${isMobile ? '1.5rem 1rem 1rem' : '2rem 2.5rem 1rem'}; border-bottom: 1px solid rgba(139, 69, 19, 0.1);">
                <div style="color: #d2691e; font-size: ${isMobile ? '0.9rem' : '1rem'}; font-weight: 600; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px;">
                    ${property.badge || 'ПАРЦЕЛ'}
                </div>
                <h2 style="color: #3e2723; margin: 0 0 0.8rem 0; font-size: ${isMobile ? '1.5rem' : '1.8rem'}; font-weight: 800; line-height: 1.2;">${property.title}</h2>
                <div style="color: #8b4513; font-size: ${isMobile ? '1.4rem' : '1.6rem'}; font-weight: 800; margin-bottom: 0.5rem;">${property.price}</div>
                <div style="color: #d2691e; font-size: ${isMobile ? '1rem' : '1.1rem'}; font-weight: 600; margin-bottom: 0.5rem;">${landDetails.price_per_sqm}</div>
                <div style="color: #5d4e37; font-size: ${isMobile ? '1rem' : '1.1rem'}; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-map-marker-alt" style="color: #8b4513;"></i>
                    ${property.location}
                </div>
            </div>
            
            <!-- Основни характеристики за парцел -->
            <div style="display: grid; grid-template-columns: repeat(${isMobile ? '2' : '3'}, 1fr); gap: ${isMobile ? '1rem' : '1.5rem'}; margin-bottom: 2rem; padding: ${isMobile ? '1rem' : '1.5rem 2.5rem'}; background: linear-gradient(135deg, #f8f6f3 0%, #faf9f7 100%); border-radius: 20px; border: 1px solid rgba(139, 69, 19, 0.1); margin: 2rem;">
                <div style="text-align: center;">
                    <div style="color: #8b4513; font-size: ${isMobile ? '1.4rem' : '1.6rem'}; font-weight: 800; margin-bottom: 0.3rem;">${property.area}</div>
                    <div style="color: #5d4e37; font-size: ${isMobile ? '0.8rem' : '0.85rem'}; text-transform: uppercase; letter-spacing: 0.5px;">Площ</div>
                </div>
                <div style="text-align: center;">
                    <div style="color: #8b4513; font-size: ${isMobile ? '1.4rem' : '1.6rem'}; font-weight: 800; margin-bottom: 0.3rem;">${landDetails.parcelType}</div>
                    <div style="color: #5d4e37; font-size: ${isMobile ? '0.8rem' : '0.85rem'}; text-transform: uppercase; letter-spacing: 0.5px;">Вид парцел</div>
                </div>
                <div style="text-align: center;">
                    <div style="color: #8b4513; font-size: ${isMobile ? '1.4rem' : '1.6rem'}; font-weight: 800; margin-bottom: 0.3rem;">${landDetails.regulation}</div>
                    <div style="color: #5d4e37; font-size: ${isMobile ? '0.8rem' : '0.85rem'}; text-transform: uppercase; letter-spacing: 0.5px;">Регулация</div>
                </div>
            </div>
            
            <!-- Комуникации и инфраструктура -->
            <div style="padding: 0 ${isMobile ? '1rem' : '2.5rem'}; margin-bottom: 2rem;">
                <h3 style="color: #3e2723; margin-bottom: 1.5rem; font-size: ${isMobile ? '1.2rem' : '1.3rem'}; font-weight: 700;">Комуникации и инфраструктура</h3>
                <div style="display: grid; grid-template-columns: repeat(${isMobile ? '1' : '2'}, 1fr); gap: ${isMobile ? '1rem' : '1.5rem'};">
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: ${landDetails.electricity === 'Да' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'}; border-radius: 12px; border-left: 4px solid ${landDetails.electricity === 'Да' ? '#4CAF50' : '#F44336'};">
                        <span style="color: #5d4e37; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-bolt" style="color: #8b4513; width: 16px;"></i>
                            Ток
                        </span>
                        <span style="color: #3e2723; font-weight: 700; display: flex; align-items: center; gap: 0.3rem;">
                            <i class="fas ${landDetails.electricity === 'Да' ? 'fa-check-circle' : 'fa-times-circle'}" style="color: ${landDetails.electricity === 'Да' ? '#4CAF50' : '#F44336'};"></i>
                            ${landDetails.electricity}
                        </span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: ${landDetails.water === 'Да' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'}; border-radius: 12px; border-left: 4px solid ${landDetails.water === 'Да' ? '#4CAF50' : '#F44336'};">
                        <span style="color: #5d4e37; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-tint" style="color: #8b4513; width: 16px;"></i>
                            Вода
                        </span>
                        <span style="color: #3e2723; font-weight: 700; display: flex; align-items: center; gap: 0.3rem;">
                            <i class="fas ${landDetails.water === 'Да' ? 'fa-check-circle' : 'fa-times-circle'}" style="color: ${landDetails.water === 'Да' ? '#4CAF50' : '#F44336'};"></i>
                            ${landDetails.water}
                        </span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: ${landDetails.sewerage === 'Да' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'}; border-radius: 12px; border-left: 4px solid ${landDetails.sewerage === 'Да' ? '#4CAF50' : '#F44336'};">
                        <span style="color: #5d4e37; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-water" style="color: #8b4513; width: 16px;"></i>
                            Канал
                        </span>
                        <span style="color: #3e2723; font-weight: 700; display: flex; align-items: center; gap: 0.3rem;">
                            <i class="fas ${landDetails.sewerage === 'Да' ? 'fa-check-circle' : 'fa-times-circle'}" style="color: ${landDetails.sewerage === 'Да' ? '#4CAF50' : '#F44336'};"></i>
                            ${landDetails.sewerage}
                        </span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: ${landDetails.regulation === 'Да' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'}; border-radius: 12px; border-left: 4px solid ${landDetails.regulation === 'Да' ? '#4CAF50' : '#F44336'};">
                        <span style="color: #5d4e37; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-clipboard-check" style="color: #8b4513; width: 16px;"></i>
                            Регулация
                        </span>
                        <span style="color: #3e2723; font-weight: 700; display: flex; align-items: center; gap: 0.3rem;">
                            <i class="fas ${landDetails.regulation === 'Да' ? 'fa-check-circle' : 'fa-times-circle'}" style="color: ${landDetails.regulation === 'Да' ? '#4CAF50' : '#F44336'};"></i>
                            ${landDetails.regulation}
                        </span>
                    </div>
                </div>
            </div>
            
            <!-- Документи и разрешения -->
            <div style="padding: 0 ${isMobile ? '1rem' : '2.5rem'}; margin-bottom: 2rem;">
                <h3 style="color: #3e2723; margin-bottom: 1.5rem; font-size: ${isMobile ? '1.2rem' : '1.3rem'}; font-weight: 700;">Документи и разрешения</h3>
                <div style="display: grid; grid-template-columns: repeat(${isMobile ? '1' : '2'}, 1fr); gap: ${isMobile ? '1rem' : '1.5rem'};">
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: ${landDetails.idealProject === 'Да' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 193, 7, 0.1)'}; border-radius: 12px; border-left: 4px solid ${landDetails.idealProject === 'Да' ? '#4CAF50' : '#FFC107'};">
                        <span style="color: #5d4e37; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-drafting-compass" style="color: #8b4513; width: 16px;"></i>
                            Идеен проект
                        </span>
                        <span style="color: #3e2723; font-weight: 700; display: flex; align-items: center; gap: 0.3rem;">
                            <i class="fas ${landDetails.idealProject === 'Да' ? 'fa-check-circle' : 'fa-exclamation-triangle'}" style="color: ${landDetails.idealProject === 'Да' ? '#4CAF50' : '#FFC107'};"></i>
                            ${landDetails.idealProject}
                        </span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: ${landDetails.designVisa === 'Да' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 193, 7, 0.1)'}; border-radius: 12px; border-left: 4px solid ${landDetails.designVisa === 'Да' ? '#4CAF50' : '#FFC107'};">
                        <span style="color: #5d4e37; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-stamp" style="color: #8b4513; width: 16px;"></i>
                            Виза за проектиране
                        </span>
                        <span style="color: #3e2723; font-weight: 700; display: flex; align-items: center; gap: 0.3rem;">
                            <i class="fas ${landDetails.designVisa === 'Да' ? 'fa-check-circle' : 'fa-exclamation-triangle'}" style="color: ${landDetails.designVisa === 'Да' ? '#4CAF50' : '#FFC107'};"></i>
                            ${landDetails.designVisa}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Описание -->
            <div style="padding: 0 ${isMobile ? '1rem' : '2.5rem'}; margin-bottom: 2rem;">
                <h3 style="color: #3e2723; margin-bottom: 1rem; font-size: ${isMobile ? '1.2rem' : '1.3rem'}; font-weight: 700;">Описание</h3>
                <p style="color: #5d4e37; line-height: 1.7; font-size: ${isMobile ? '1rem' : '1.05rem'}; margin-bottom: 1rem;">${property.description}</p>
                <p style="color: #5d4e37; line-height: 1.7; font-size: ${isMobile ? '1rem' : '1.05rem'};">Този парцел предлага отлични възможности за строителство с добра локация и достъп до основни комуникации. Подходящ за жилищно или търговско строителство в зависимост от регулационния план.</p>
            </div>

            <!-- Допълнителни детайли -->
            <div style="padding: 0 ${isMobile ? '1rem' : '2.5rem'}; margin-bottom: 2rem;">
                <h3 style="color: #3e2723; margin-bottom: 1rem; font-size: ${isMobile ? '1.2rem' : '1.3rem'}; font-weight: 700;">Допълнителна информация</h3>
                <div style="display: grid; grid-template-columns: repeat(${isMobile ? '1' : '2'}, 1fr); gap: ${isMobile ? '1rem' : '1.5rem'};">
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 0; border-bottom: 1px solid rgba(139, 69, 19, 0.1);">
                        <span style="color: #5d4e37; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-compass" style="color: #8b4513; width: 16px;"></i>
                            Изложение
                        </span>
                        <span style="color: #3e2723; font-weight: 700;">${landDetails.exposure}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 0; border-bottom: 1px solid rgba(139, 69, 19, 0.1);">
                        <span style="color: #5d4e37; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-car" style="color: #8b4513; width: 16px;"></i>
                            Паркиране
                        </span>
                        <span style="color: #3e2723; font-weight: 700;">${landDetails.parking}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 0; border-bottom: 1px solid rgba(139, 69, 19, 0.1);">
                        <span style="color: #5d4e37; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-star" style="color: #8b4513; width: 16px;"></i>
                            Състояние
                        </span>
                        <span style="color: #3e2723; font-weight: 700;">${landDetails.condition}</span>
                    </div>
                </div>
            </div>

            <!-- Действия -->
            <div style="padding: ${isMobile ? '1rem' : '2rem 2.5rem'}; border-top: 1px solid rgba(139, 69, 19, 0.1); background: #fafafa;">
                <div style="display: grid; grid-template-columns: repeat(${isMobile ? '1' : '2'}, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
                    <a href="mailto:office@example.com?subject=Интерес към ${property.title}&body=Здравейте,%0D%0A%0D%0AИмам интерес към парцела: ${property.title}%0D%0AЦена: ${property.price}%0D%0AЛокация: ${property.location}%0D%0A%0D%0AБих искал/а да получа повече информация.%0D%0A%0D%0AБлагодаря!" style="background: #8b4513; color: white; border: none; padding: ${isMobile ? '1.2rem 1.5rem' : '1rem 2rem'}; border-radius: ${isMobile ? '15px' : '25px'}; text-decoration: none; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 0.8rem; transition: all 0.3s ease; font-size: ${isMobile ? '1.1rem' : '1rem'}; min-height: ${isMobile ? '56px' : 'auto'}; touch-action: manipulation;">
                        <i class="fas fa-envelope" style="font-size: 1.1rem;"></i> 
                        <span>Изпрати имейл</span>
                    </a>
                    <a href="properties.html" style="background: #f8f6f3; color: #5d4e37; border: none; padding: ${isMobile ? '1.2rem 1.5rem' : '1rem 2rem'}; border-radius: ${isMobile ? '15px' : '25px'}; text-decoration: none; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 0.8rem; transition: all 0.3s ease; font-size: ${isMobile ? '1.1rem' : '1rem'}; min-height: ${isMobile ? '56px' : 'auto'}; touch-action: manipulation;">
                        <i class="fas fa-search" style="font-size: 1.1rem;"></i> 
                        <span>Още парцели</span>
                    </a>
                </div>
                
                <!-- Share & Favorite Section -->
                <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 1rem; padding-top: 1rem; border-top: 1px solid rgba(139, 69, 19, 0.1);">
                    <button onclick="toggleLandFavorite(${property.id})" style="background: none; border: 2px solid #d2691e; color: #d2691e; padding: 0.8rem 1.2rem; border-radius: 12px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; font-weight: 600; touch-action: manipulation;">
                        <i class="far fa-heart" id="land-heart-${property.id}"></i>
                        <span>Запази</span>
                    </button>
                    <button onclick="shareLandProperty('${property.title}', '${property.price}', '${property.location}')" style="background: none; border: 2px solid #8b4513; color: #8b4513; padding: 0.8rem 1.2rem; border-radius: 12px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; font-weight: 600; touch-action: manipulation;">
                        <i class="fas fa-share-alt"></i>
                        <span>Сподели</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Анимация за появяване
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = isMobile ? 'translateY(0)' : 'scale(1)';
    }, 10);

    // Затваряне при клик извън модала
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeLandModal();
        }
    });

    // Предотвратяване скрол на body
    document.body.style.overflow = 'hidden';
    
    // Функции за навигация в снимките
    function updateLandImageDisplay() {
        const slider = document.getElementById('land-image-slider');
        const counter = document.getElementById('land-image-counter');
        const dots = document.querySelectorAll('.land-image-dot');
        
        if (slider) {
            const translateX = -(currentLandImageIndex * (100 / images.length));
            slider.style.transform = `translateX(${translateX}%)`;
        }
        
        if (counter) {
            counter.textContent = `${currentLandImageIndex + 1} / ${images.length}`;
        }
        
        dots.forEach((dot, i) => {
            dot.style.background = i === currentLandImageIndex ? 'white' : 'transparent';
        });
    }
    
    // Глобални функции за парцелите
    window.closeLandModal = function() {
        modal.style.opacity = '0';
        modalContent.style.transform = isMobile ? 'translateY(100%)' : 'scale(0.8)';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
            delete window.closeLandModal;
            delete window.changeLandImage;
            delete window.setLandImage;
            delete window.toggleLandFavorite;
            delete window.shareLandProperty;
        }, 400);
    };
    
    window.changeLandImage = function(direction) {
        currentLandImageIndex += direction;
        if (currentLandImageIndex >= images.length) currentLandImageIndex = 0;
        if (currentLandImageIndex < 0) currentLandImageIndex = images.length - 1;
        updateLandImageDisplay();
    };
    
    window.setLandImage = function(index) {
        currentLandImageIndex = index;
        updateLandImageDisplay();
    };
    
    window.toggleLandFavorite = function(propertyId) {
        const heart = document.getElementById(`land-heart-${propertyId}`);
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
    };
    
    window.shareLandProperty = function(title, price, location) {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: `${title} - ${price} в ${location}`,
                url: window.location.href
            });
        } else {
            const shareText = `${title} - ${price} в ${location}\n${window.location.href}`;
            navigator.clipboard.writeText(shareText).then(() => {
                showNotification('Информацията е копирана в клипборда', 'success');
            });
        }
    };

    // Touch/Swipe поддръжка за мобилни устройства
    if (isMobile && images.length > 1) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        const imageContainer = modalContent.querySelector('#land-image-slider').parentElement;
        
        imageContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        imageContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleLandSwipe();
        }, { passive: true });
        
        function handleLandSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next image
                    window.changeLandImage(1);
                } else {
                    // Swipe right - previous image
                    window.changeLandImage(-1);
                }
            }
        }
    }

    // Keyboard navigation
    function handleLandKeyPress(e) {
        if (images.length <= 1) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                window.changeLandImage(-1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                window.changeLandImage(1);
                break;
            case 'Escape':
                e.preventDefault();
                window.closeLandModal();
                break;
        }
    }
    
    document.addEventListener('keydown', handleLandKeyPress);
    
    // Clean up keyboard listener when modal closes
    const originalCloseLandModal = window.closeLandModal;
    window.closeLandModal = function() {
        document.removeEventListener('keydown', handleLandKeyPress);
        originalCloseLandModal();
    };
}