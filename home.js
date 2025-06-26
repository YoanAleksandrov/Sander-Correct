// Complete Mobile-Optimized home.js - Performance and UI Fixes

// Optimized mobile detection
function isMobileDevice() {
    return window.innerWidth <= 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

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

// Enhanced row initialization with better mobile indicator calculation
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

// Optimized scroll function with no smooth scrolling on mobile for performance
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
    
    // Calculate scroll position optimized for mobile
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
    
    // Use instant scroll on mobile for better performance
    if (isMobile) {
        rowContainer.scrollLeft = scrollPosition;
    } else {
        rowContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
    
    updateRowIndicators(rowId);
}

// Optimized scroll to page function
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
    
    // Use instant scroll on mobile for better performance
    if (isMobile) {
        rowContainer.scrollLeft = scrollPosition;
    } else {
        rowContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
    
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

// Throttled scroll handler for better performance
let scrollHandlers = {};

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
        console.log(`Scroll detected in ${rowId}: scrollLeft=${scrollLeft}, newPage=${newPageIndex}`);
        currentState.currentIndex = newPageIndex;
        updateRowIndicators(rowId);
    }
}

// Simplified touch handling for better performance
let simpleTouchState = {
    startX: 0,
    startY: 0,
    isDragging: false,
    activeRow: null,
    threshold: 50,
    startTime: 0,
    maxTime: 300
};

function handleSimpleTouchStart(e, rowId) {
    const touch = e.touches[0];
    simpleTouchState.startX = touch.clientX;
    simpleTouchState.startY = touch.clientY;
    simpleTouchState.isDragging = true;
    simpleTouchState.activeRow = rowId;
    simpleTouchState.startTime = Date.now();
    
    // Prevent text selection
    e.preventDefault();
}

function handleSimpleTouchMove(e) {
    if (!simpleTouchState.isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - simpleTouchState.startX);
    const deltaY = Math.abs(touch.clientY - simpleTouchState.startY);
    
    // If more vertical than horizontal movement, cancel horizontal scroll
    if (deltaY > deltaX && deltaY > 30) {
        simpleTouchState.isDragging = false;
        return;
    }
    
    // Prevent page scroll if horizontal movement
    if (deltaX > 20) {
        e.preventDefault();
    }
}

function handleSimpleTouchEnd(e) {
    if (!simpleTouchState.isDragging || !simpleTouchState.activeRow) {
        simpleTouchState.isDragging = false;
        simpleTouchState.activeRow = null;
        return;
    }
    
    const touch = e.changedTouches[0];
    const deltaX = simpleTouchState.startX - touch.clientX;
    const deltaY = Math.abs(touch.clientY - simpleTouchState.startY);
    const elapsedTime = Date.now() - simpleTouchState.startTime;
    
    // Check for valid swipe
    if (elapsedTime <= simpleTouchState.maxTime && 
        Math.abs(deltaX) >= simpleTouchState.threshold && 
        deltaY <= 100) {
        
        if (deltaX > 0) {
            scrollRow(simpleTouchState.activeRow, 'next');
        } else {
            scrollRow(simpleTouchState.activeRow, 'prev');
        }
    }
    
    simpleTouchState.isDragging = false;
    simpleTouchState.activeRow = null;
}

// Optimized event listeners with throttling
function addOptimizedRowScrollListeners() {
    ['row1', 'row2'].forEach(rowId => {
        const rowContainer = document.getElementById(rowId);
        if (!rowContainer) return;
        
        // Desktop mouse wheel
        if (!isMobileDevice()) {
            rowContainer.addEventListener('wheel', (e) => {
                if (e.deltaY !== 0) {
                    e.preventDefault();
                    rowContainer.scrollLeft += e.deltaY;
                    
                    // Throttle scroll handler
                    if (!scrollHandlers[rowId]) {
                        scrollHandlers[rowId] = setTimeout(() => {
                            handleMobileRowScroll(rowId);
                            scrollHandlers[rowId] = null;
                        }, 10);
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
        
        // Simplified touch events for mobile
        if (isMobileDevice()) {
            rowContainer.addEventListener('touchstart', (e) => handleSimpleTouchStart(e, rowId), { passive: false });
            rowContainer.addEventListener('touchmove', handleSimpleTouchMove, { passive: false });
            rowContainer.addEventListener('touchend', handleSimpleTouchEnd, { passive: true });
            
            // Remove scroll snap for performance
            rowContainer.style.scrollSnapType = 'none';
        }
    });
}

// Enhanced property card creation with performance optimization
function createOptimizedPropertyCard(property) {
    return `
        <div class="property-card fade-in" onclick="showPropertyModal('${property.title}', '${property.price}', '${property.location}', '${property.description}')" style="touch-action: manipulation;">
            <div class="property-image">
                <img src="${property.image || 'images/default.jpg'}" alt="${property.title}" loading="lazy" style="touch-action: none;">
                <div class="property-badge">${property.badge || ''}</div>
                <div class="property-heart" onclick="event.stopPropagation(); toggleFavorite(${property.id})" style="touch-action: manipulation;">
                    <i class="far fa-heart"></i>
                </div>
            </div>
            <div class="property-content">
                <div class="property-content-top">
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

// Optimized resize handler with better debouncing
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

// Initialize home map
let homeMap = null;
let homeMapMarkers = [];
let currentHomeMapFilter = 'all';

function initializeHomeMap() {
    const homeMapElement = document.getElementById('homeMap');
    if (!homeMapElement || typeof L === 'undefined') return;
    
    // Initialize map centered on Sofia
    homeMap = L.map('homeMap').setView([42.6977, 23.3219], 11);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(homeMap);
    
    // Add all properties to map
    addPropertiesToHomeMap();
}

function addPropertiesToHomeMap() {
    // Clear existing markers
    homeMapMarkers.forEach(marker => homeMap.removeLayer(marker));
    homeMapMarkers = [];
    
    let filteredProperties = mapProperties;
    if (currentHomeMapFilter !== 'all') {
        filteredProperties = mapProperties.filter(property => property.type === currentHomeMapFilter);
    }
    
    filteredProperties.forEach(property => {
        // Create custom marker
        const markerElement = L.divIcon({
            className: 'custom-marker-container',
            html: `<div class="custom-marker ${property.type}">${property.type === 'apartment' ? 'А' : property.type === 'house' ? 'К' : property.type === 'land' ? 'П' : 'Т'}</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        
        // Create popup content
        const popupContent = `
            <div class="property-popup">
                <div class="popup-image">
                    <i class="fas fa-${property.type === 'apartment' ? 'building' : property.type === 'house' ? 'home' : property.type === 'land' ? 'map' : 'store'}"></i>
                </div>
                <div class="popup-content">
                    <div class="popup-price">${property.price}</div>
                    <div class="popup-title">${property.title}</div>
                    <div class="popup-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${property.location}
                    </div>
                    <div class="popup-details">
                        <div><strong>Площ:</strong> ${property.area}</div>
                        <div><strong>Стаи:</strong> ${property.rooms}</div>
                    </div>
                    <div class="popup-actions">
                        <button class="popup-btn popup-btn-primary" onclick="contactAboutProperty('${property.title}')">
                            <i class="fas fa-phone"></i> Контакт
                        </button>
                        <button class="popup-btn popup-btn-secondary" onclick="viewPropertyDetails('${property.title}')">
                            <i class="fas fa-info-circle"></i> Детайли
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add marker to map
        const marker = L.marker(property.coordinates, { icon: markerElement })
            .addTo(homeMap)
            .bindPopup(popupContent, {
                maxWidth: 300,
                className: 'custom-popup'
            });
        
        homeMapMarkers.push(marker);
    });
}

// Filter home map properties
window.filterHomeMapProperties = function(type) {
    currentHomeMapFilter = type; 
    
    // Update active button
    document.querySelectorAll('.map-controls-home .map-control-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update markers
    addPropertiesToHomeMap();
    
    // Show notification
    const typeNames = {
        'all': 'всички имоти',
        'apartment': 'апартаменти',
        'house': 'къщи',
        'land': 'парцели',
        'commercial': 'търговски обекти'
    };
    
    showNotification(`Показват се ${typeNames[type]} на картата`, 'info');
};

// View property details
window.viewPropertyDetails = function(propertyTitle) {
    const property = mapProperties.find(p => p.title === propertyTitle);
    if (property) {
        showPropertyModal(property.title, property.price, property.location, property.description);
    }
};

// Enhanced initialization
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
    
    if (typeof L !== 'undefined') {
        setTimeout(initializeHomeMap, isMobileDevice() ? 1000 : 500);
    }
    
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

// Prevent double-tap zoom on mobile
if (isMobileDevice()) {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// Enhanced accessibility for mobile
if (isMobileDevice()) {
    // Improve focus management on mobile
    document.addEventListener('focusin', (e) => {
        if (e.target.closest('.property-card, .property-btn, .nav-btn, .scroll-dot')) {
            e.target.style.outline = '3px solid #8b4513';
            e.target.style.outlineOffset = '2px';
        }
    });
    
    document.addEventListener('focusout', (e) => {
        if (e.target.closest('.property-card, .property-btn, .nav-btn, .scroll-dot')) {
            e.target.style.outline = '';
            e.target.style.outlineOffset = '';
        }
    });
}

// Replace the DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', initializeOptimizedMobile);