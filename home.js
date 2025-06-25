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
                ${row1Properties.map(property => createPropertyCard(property)).join('')}
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
                ${row2Properties.map(property => createPropertyCard(property)).join('')}
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

function initializeRowIndicators(rowId, propertyCount) {
    const indicatorsContainer = document.getElementById(`indicators${rowId.slice(-1)}`);
    const rowContainer = document.getElementById(rowId);
    if (!indicatorsContainer || !rowContainer) return;
    
    // Wait for DOM to render properly
    setTimeout(() => {
        // Calculate visible cards and card width
        const containerWidth = rowContainer.clientWidth;
        const cards = rowContainer.querySelectorAll('.property-card');
        
        if (cards.length === 0) return;
        
        // Get actual card width including gap
        const firstCard = cards[0];
        const cardRect = firstCard.getBoundingClientRect();
        const cardStyle = window.getComputedStyle(firstCard);
        const cardWidth = cardRect.width;
        const marginRight = parseFloat(cardStyle.marginRight) || 0;
        const totalCardWidth = cardWidth + marginRight + 32; // 32px is the gap from CSS
        
        const visibleCards = Math.floor(containerWidth / totalCardWidth);
        
        // Calculate how many full scrolls we need
        // If all properties fit in view, no scrolling needed
        if (propertyCount <= visibleCards) {
            rowScrollStates[rowId].maxIndex = 0;
            rowScrollStates[rowId].cardWidth = totalCardWidth;
            rowScrollStates[rowId].visibleCards = visibleCards;
            rowScrollStates[rowId].totalProperties = propertyCount;
            
            indicatorsContainer.innerHTML = '';
            return;
        }
        
        // Calculate actual scrollable pages
        // Each scroll shows visibleCards, but we need to account for overlapping
        const totalScrollableWidth = (propertyCount * totalCardWidth) - containerWidth;
        const scrollStep = visibleCards * totalCardWidth;
        const actualPages = Math.ceil(totalScrollableWidth / scrollStep) + 1;
        
        // Update state
        rowScrollStates[rowId].maxIndex = actualPages - 1;
        rowScrollStates[rowId].cardWidth = totalCardWidth;
        rowScrollStates[rowId].visibleCards = visibleCards;
        rowScrollStates[rowId].totalProperties = propertyCount;
        rowScrollStates[rowId].containerWidth = containerWidth;
        
        console.log(`${rowId}: ${propertyCount} properties, ${visibleCards} visible, ${actualPages} pages, containerWidth: ${containerWidth}, cardWidth: ${totalCardWidth}`);
        
        const indicatorsHTML = Array.from({length: actualPages}, (_, index) => 
            `<div class="scroll-dot ${index === 0 ? 'active' : ''}" onclick="scrollToRowPage('${rowId}', ${index})"></div>`
        ).join('');
        
        indicatorsContainer.innerHTML = indicatorsHTML;
    }, 50);
}

function scrollRow(rowId, direction) {
    const rowContainer = document.getElementById(rowId);
    if (!rowContainer) return;
    
    const currentState = rowScrollStates[rowId];
    const previousIndex = currentState.currentIndex;
    
    // If we only have one page, don't scroll
    if (currentState.maxIndex === 0) {
        console.log(`${rowId}: Only one page, no scrolling needed`);
        return;
    }
    
    if (direction === 'next') {
        currentState.currentIndex++;
        if (currentState.currentIndex > currentState.maxIndex) {
            currentState.currentIndex = 0; // Loop back to start
        }
    } else {
        currentState.currentIndex--;
        if (currentState.currentIndex < 0) {
            currentState.currentIndex = currentState.maxIndex; // Loop to end
        }
    }
    
    // Calculate scroll position based on current page
    let scrollPosition;
    
    if (currentState.currentIndex === 0) {
        // First page - always start at 0
        scrollPosition = 0;
    } else if (currentState.currentIndex === currentState.maxIndex) {
        // Last page - scroll to show last properties without cut-off
        const totalWidth = currentState.totalProperties * currentState.cardWidth;
        scrollPosition = Math.max(0, totalWidth - currentState.containerWidth);
    } else {
        // Middle pages - scroll by visible cards
        scrollPosition = currentState.currentIndex * currentState.visibleCards * currentState.cardWidth;
    }
    
    console.log(`Scrolling ${rowId} ${direction}: page ${previousIndex} → ${currentState.currentIndex}, position: ${scrollPosition}, maxIndex: ${currentState.maxIndex}`);
    
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
    currentState.currentIndex = pageIndex;
    
    // Calculate scroll position based on page
    let scrollPosition;
    
    if (pageIndex === 0) {
        // First page - always start at 0
        scrollPosition = 0;
    } else if (pageIndex === currentState.maxIndex) {
        // Last page - scroll to show last properties without cut-off
        const totalWidth = currentState.totalProperties * currentState.cardWidth;
        scrollPosition = Math.max(0, totalWidth - currentState.containerWidth);
    } else {
        // Middle pages - scroll by visible cards
        scrollPosition = pageIndex * currentState.visibleCards * currentState.cardWidth;
    }
    
    console.log(`Jumping to page ${pageIndex} in ${rowId}, position: ${scrollPosition}, maxIndex: ${currentState.maxIndex}`);
    
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

// Handle row scroll events
function handleRowScroll(rowId) {
    const rowContainer = document.getElementById(rowId);
    if (!rowContainer) return;
    
    const currentState = rowScrollStates[rowId];
    
    // Don't update if only one page
    if (currentState.maxIndex === 0) return;
    
    const scrollLeft = rowContainer.scrollLeft;
    const maxScrollLeft = rowContainer.scrollWidth - rowContainer.clientWidth;
    
    // Determine current page based on scroll position
    let newPageIndex;
    
    if (scrollLeft <= 10) {
        // Near the beginning
        newPageIndex = 0;
    } else if (scrollLeft >= maxScrollLeft - 10) {
        // Near the end
        newPageIndex = currentState.maxIndex;
    } else {
        // Calculate based on scroll position
        const pageSize = currentState.visibleCards * currentState.cardWidth;
        newPageIndex = Math.round(scrollLeft / pageSize);
        newPageIndex = Math.max(0, Math.min(newPageIndex, currentState.maxIndex));
    }
    
    if (newPageIndex !== currentState.currentIndex) {
        console.log(`Scroll detected in ${rowId}: scrollLeft=${scrollLeft}, maxScroll=${maxScrollLeft}, newPage=${newPageIndex}`);
        currentState.currentIndex = newPageIndex;
        updateRowIndicators(rowId);
    }
}

// Touch/swipe support for individual rows
let touchState = {
    startX: 0,
    currentX: 0,
    isDragging: false,
    activeRow: null
};

function handleRowTouchStart(e, rowId) {
    touchState.startX = e.touches[0].clientX;
    touchState.isDragging = true;
    touchState.activeRow = rowId;
}

function handleRowTouchMove(e) {
    if (!touchState.isDragging) return;
    touchState.currentX = e.touches[0].clientX;
}

function handleRowTouchEnd(e) {
    if (!touchState.isDragging || !touchState.activeRow) return;
    
    const diffX = touchState.startX - touchState.currentX;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
            scrollRow(touchState.activeRow, 'next');
        } else {
            scrollRow(touchState.activeRow, 'prev');
        }
    }
    
    touchState.isDragging = false;
    touchState.activeRow = null;
}

// Add event listeners for both rows
function addRowScrollListeners() {
    ['row1', 'row2'].forEach(rowId => {
        const rowContainer = document.getElementById(rowId);
        if (!rowContainer) return;
        
        // Mouse wheel horizontal scroll
        rowContainer.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                rowContainer.scrollLeft += e.deltaY;
                handleRowScroll(rowId);
            }
        });
        
        // Regular scroll event
        rowContainer.addEventListener('scroll', () => handleRowScroll(rowId));
        
        // Touch events for mobile
        rowContainer.addEventListener('touchstart', (e) => handleRowTouchStart(e, rowId), { passive: true });
        rowContainer.addEventListener('touchmove', handleRowTouchMove, { passive: true });
        rowContainer.addEventListener('touchend', handleRowTouchEnd, { passive: true });
    });
}

// Enhanced property card for row layout
function createPropertyCard(property) {
    return `
        <div class="property-card fade-in" onclick="showPropertyModal('${property.title}', '${property.price}', '${property.location}', '${property.description}')">
            <div class="property-image">
                <img src="${property.image || 'images/default.jpg'}" alt="${property.title}" loading="lazy">
                <div class="property-badge">${property.badge || ''}</div>
                <div class="property-heart" onclick="event.stopPropagation(); toggleFavorite(${property.id})">
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
                    <button class="property-btn btn-primary" onclick="event.stopPropagation(); contactAboutProperty('${property.title}')">
                        <i class="fas fa-phone"></i>
                        <span>Контакт</span>
                    </button>
                    <button class="property-btn btn-secondary" onclick="event.stopPropagation(); scheduleViewing('${property.title}')">
                        <i class="fas fa-calendar"></i>
                        <span>Оглед</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Handle window resize to recalculate indicators for both rows
window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        const featuredProperties = properties.filter(property => property.featured);
        const midPoint = Math.ceil(featuredProperties.length / 2);
        
        // Reinitialize indicators for both rows
        initializeRowIndicators('row1', midPoint);
        initializeRowIndicators('row2', featuredProperties.length - midPoint);
        
        // Reset both rows to first page
        ['row1', 'row2'].forEach(rowId => {
            rowScrollStates[rowId].currentIndex = 0;
            const rowContainer = document.getElementById(rowId);
            if (rowContainer) {
                rowContainer.scrollTo({ left: 0, behavior: 'smooth' });
                updateRowIndicators(rowId);
            }
        });
    }, 250);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProperties();
    
    // Add scroll listeners after properties are loaded
    setTimeout(() => {
        addRowScrollListeners();
        
        // Recalculate after DOM is fully rendered
        setTimeout(() => {
            const featuredProperties = properties.filter(property => property.featured);
            const midPoint = Math.ceil(featuredProperties.length / 2);
            initializeRowIndicators('row1', midPoint);
            initializeRowIndicators('row2', featuredProperties.length - midPoint);
        }, 100);
        
    }, 200);
    
    // Initialize home map if Leaflet is available
    if (typeof L !== 'undefined') {
        setTimeout(initializeHomeMap, 500);
    }
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Добре дошли в Sander Correct! Открийте идеалния имот за вас.', 'info');
    }, 2000);
});

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