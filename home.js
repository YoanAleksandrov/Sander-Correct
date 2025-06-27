// Complete Enhanced home.js - Mobile Optimized Properties with Image Carousel

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

// Enhanced row initialization for mobile
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

// Enhanced scroll function for mobile
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
let scrollHandlers = {};

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

// Enhanced property card creation with image carousel
function createOptimizedPropertyCard(property) {
    // Initialize image index for this property
    if (!propertyImageIndices[property.id]) {
        propertyImageIndices[property.id] = 0;
    }
    
    const currentImageIndex = propertyImageIndices[property.id];
    const images = property.images || [property.image || 'images/default.jpg'];
    const hasMultipleImages = images.length > 1;
    
    return `
        <div class="property-card fade-in" onclick="showPropertyModal('${property.title}', '${property.price}', '${property.location}', '${property.description}')">
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

// Change property image (next/previous)
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
    
    // Update image and indicators
    updatePropertyImageDisplay(propertyId, newIndex, images);
}

// Set specific property image
function setPropertyImage(propertyId, imageIndex) {
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.images) return;
    
    propertyImageIndices[propertyId] = imageIndex;
    updatePropertyImageDisplay(propertyId, imageIndex, property.images);
}

// Update image display and indicators
function updatePropertyImageDisplay(propertyId, newIndex, images) {
    const imgElement = document.getElementById(`property-img-${propertyId}`);
    const card = imgElement?.closest('.property-card');
    
    if (imgElement && images[newIndex]) {
        // Smooth image transition
        imgElement.style.opacity = '0.7';
        
        setTimeout(() => {
            imgElement.src = images[newIndex];
            imgElement.style.opacity = '1';
        }, 150);
        
        // Update indicators
        const indicators = card?.querySelectorAll('.image-dot');
        if (indicators) {
            indicators.forEach((dot, index) => {
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

// Auto-advance images (optional feature)
let autoAdvanceInterval;

function startAutoAdvance() {
    // Auto-advance every 5 seconds for all properties with multiple images
    autoAdvanceInterval = setInterval(() => {
        properties.forEach(property => {
            if (property.images && property.images.length > 1) {
                const card = document.querySelector(`#property-img-${property.id}`)?.closest('.property-card');
                // Only advance if card is visible and user is not hovering
                if (card && !card.matches(':hover')) {
                    changePropertyImage(property.id, 1);
                }
            }
        });
    }, 5000);
}

function stopAutoAdvance() {
    if (autoAdvanceInterval) {
        clearInterval(autoAdvanceInterval);
        autoAdvanceInterval = null;
    }
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
    
    // Use the unified properties data with coordinates
    let filteredProperties = properties.filter(property => property.coordinates);
    if (currentHomeMapFilter !== 'all') {
        filteredProperties = filteredProperties.filter(property => property.type === currentHomeMapFilter);
    }
    
    filteredProperties.forEach(property => {
        // Create custom marker
        const markerElement = L.divIcon({
            className: 'custom-marker-container',
            html: `<div class="custom-marker ${property.type}">${property.type === 'apartment' ? 'А' : property.type === 'house' ? 'К' : property.type === 'land' ? 'П' : 'Т'}</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        
        // Get first image for popup
        const images = property.images || [property.image || 'images/default.jpg'];
        const firstImage = images[0] || 'images/default.jpg';
        
        // Create popup content with image
        const popupContent = `
            <div class="property-popup">
                <div class="popup-image-container" style="position: relative; height: 120px; overflow: hidden; border-radius: 12px 12px 0 0;">
                    <img src="${firstImage}" alt="${property.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='images/default.jpg'">
                    ${images.length > 1 ? `
                        <div style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.7); color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">
                            <i class="fas fa-images"></i> ${images.length}
                        </div>
                    ` : ''}
                    <div class="property-badge ${getBadgeClass(property.badge)}" style="position: absolute; top: 8px; left: 8px; background: rgba(255,255,255,0.9); color: #8b4513; padding: 4px 8px; border-radius: 8px; font-size: 0.7rem; font-weight: 700;">${property.badge || ''}</div>
                </div>
                <div class="popup-content" style="padding: 1rem;">
                    <div class="popup-price" style="font-size: 1.1rem; font-weight: 800; background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 0.5rem;">${property.price}</div>
                    <div class="popup-title" style="font-size: 1rem; font-weight: 700; color: #3e2723; margin-bottom: 0.5rem; line-height: 1.3;">${property.title}</div>
                    <div class="popup-location" style="color: #8b4513; font-size: 0.85rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.3rem;">
                        <i class="fas fa-map-marker-alt"></i>
                        ${property.location}
                    </div>
                    <div class="popup-details" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; margin-bottom: 0.8rem; font-size: 0.8rem; color: #5d4e37;">
                        <div><strong>Площ:</strong> ${property.area}</div>
                        <div><strong>Стаи:</strong> ${property.rooms}</div>
                    </div>
                    <div class="popup-actions" style="display: flex; gap: 0.5rem;">
                        <button class="popup-btn popup-btn-primary" onclick="contactAboutProperty('${property.title}')" style="flex: 1; background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%); color: white; border: none; padding: 0.6rem; border-radius: 8px; font-size: 0.75rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.3rem;">
                            <i class="fas fa-phone"></i> Контакт
                        </button>
                        <button class="popup-btn popup-btn-secondary" onclick="showMapPropertyModal('${property.id}')" style="flex: 1; background: transparent; color: #8b4513; border: 2px solid #8b4513; padding: 0.6rem; border-radius: 8px; font-size: 0.75rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.3rem;">
                            <i class="fas fa-images"></i> Галерия
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

// Show enhanced property modal from map with image gallery
window.showMapPropertyModal = function(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    const images = property.images || [property.image || 'images/default.jpg'];
    let currentModalImageIndex = 0;
    
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
        transition: opacity 0.3s ease;
        padding: ${isMobileDevice() ? '1rem 0.5rem' : '1rem'};
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 20px;
        max-width: 800px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        transform: scale(0.8);
        transition: transform 0.3s ease;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        -webkit-overflow-scrolling: touch;
    `;

    modalContent.innerHTML = `
        <div style="position: relative;">
            ${images.length > 1 ? `
                <div id="modal-image-container" style="position: relative; height: 300px; overflow: hidden; border-radius: 20px 20px 0 0;">
                    <img id="modal-image" src="${images[0]}" style="width: 100%; height: 100%; object-fit: cover;" alt="${property.title}">
                    <button onclick="changeMapModalImage(-1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.7); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button onclick="changeMapModalImage(1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.7); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; gap: 5px;" id="modal-dots">
                        ${images.map((_, index) => 
                            `<div onclick="setMapModalImage(${index})" style="width: 8px; height: 8px; border-radius: 50%; background: ${index === 0 ? 'white' : 'rgba(255,255,255,0.5)'}; cursor: pointer; transition: all 0.3s ease;" class="modal-dot" data-index="${index}"></div>`
                        ).join('')}
                    </div>
                    <div style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; padding: 6px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">
                        ${currentModalImageIndex + 1} / ${images.length}
                    </div>
                </div>
            ` : `
                <div style="height: 300px; overflow: hidden; border-radius: 20px 20px 0 0;">
                    <img src="${images[0]}" style="width: 100%; height: 100%; object-fit: cover;" alt="${property.title}">
                </div>
            `}
            
            <div style="padding: ${isMobileDevice() ? '1.5rem' : '2rem'};">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <h3 style="color: #3e2723; margin: 0; font-size: ${isMobileDevice() ? '1.3rem' : '1.5rem'}; flex: 1; line-height: 1.3;">${property.title}</h3>
                    <button onclick="this.closest('.modal').remove(); document.body.style.overflow = '';" style="background: none; border: none; font-size: ${isMobileDevice() ? '1.8rem' : '2rem'}; color: #999; cursor: pointer; padding: 0; margin-left: 1rem; min-width: 30px; min-height: 30px;">×</button>
                </div>
                <p style="color: #8b4513; font-size: ${isMobileDevice() ? '1.1rem' : '1.3rem'}; font-weight: 700; margin-bottom: 0.5rem;">${property.price}</p>
                <p style="color: #5d4e37; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; font-size: ${isMobileDevice() ? '0.9rem' : '1rem'};"><i class="fas fa-map-marker-alt" style="color: #8b4513;"></i>${property.location}</p>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem; margin-bottom: 1.5rem; font-size: ${isMobileDevice() ? '0.85rem' : '0.9rem'}; color: #5d4e37;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-expand" style="color: #8b4513; width: 16px;"></i><strong>Площ:</strong> ${property.area}</div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-door-open" style="color: #8b4513; width: 16px;"></i><strong>Стаи:</strong> ${property.rooms}</div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-layer-group" style="color: #8b4513; width: 16px;"></i><strong>Етаж:</strong> ${property.floor}</div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-bath" style="color: #8b4513; width: 16px;"></i><strong>Бани:</strong> ${property.bathrooms}</div>
                </div>
                
                <p style="color: #5d4e37; margin-bottom: 2rem; line-height: 1.6; font-size: ${isMobileDevice() ? '0.9rem' : '1rem'};">${property.description}</p>
                <div style="display: ${isMobileDevice() ? 'flex' : 'flex'}; gap: ${isMobileDevice() ? '0.8rem' : '1rem'}; justify-content: center; flex-direction: ${isMobileDevice() ? 'column' : 'row'};">
                    <a href="tel:+359888123456" style="background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%); color: white; padding: ${isMobileDevice() ? '1rem 1.2rem' : '1rem 1.5rem'}; border-radius: ${isMobileDevice() ? '12px' : '25px'}; text-decoration: none; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.3s ease; font-size: ${isMobileDevice() ? '0.9rem' : '1rem'}; min-height: ${isMobileDevice() ? '48px' : 'auto'};">
                        <i class="fas fa-phone"></i> Обадете се
                    </a>
                    <a href="mailto:info@sandercorrect.com" style="background: transparent; color: #8b4513; border: 2px solid #8b4513; padding: ${isMobileDevice() ? '1rem 1.2rem' : '1rem 1.5rem'}; border-radius: ${isMobileDevice() ? '12px' : '25px'}; text-decoration: none; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.3s ease; font-size: ${isMobileDevice() ? '0.9rem' : '1rem'}; min-height: ${isMobileDevice() ? '48px' : 'auto'};">
                        <i class="fas fa-envelope"></i> Имейл
                    </a>
                    <a href="properties.html" style="background: #f8f6f3; color: #5d4e37; border: none; padding: ${isMobileDevice() ? '1rem 1.2rem' : '1rem 1.5rem'}; border-radius: ${isMobileDevice() ? '12px' : '25px'}; text-decoration: none; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.3s ease; font-size: ${isMobileDevice() ? '0.9rem' : '1rem'}; min-height: ${isMobileDevice() ? '48px' : 'auto'};">
                        <i class="fas fa-search"></i> Още имоти
                    </a>
                </div>
            </div>
        </div>
    `;

    // Modal image navigation functions
    window.changeMapModalImage = function(direction) {
        currentModalImageIndex += direction;
        if (currentModalImageIndex >= images.length) currentModalImageIndex = 0;
        if (currentModalImageIndex < 0) currentModalImageIndex = images.length - 1;
        
        updateMapModalImage();
    };
    
    window.setMapModalImage = function(index) {
        currentModalImageIndex = index;
        updateMapModalImage();
    };
    
    function updateMapModalImage() {
        const modalImg = document.getElementById('modal-image');
        const dots = document.querySelectorAll('.modal-dot');
        const counter = document.querySelector('#modal-image-container .fa-chevron-right').parentElement.nextElementSibling;
        
        if (modalImg) {
            modalImg.style.opacity = '0.7';
            setTimeout(() => {
                modalImg.src = images[currentModalImageIndex];
                modalImg.style.opacity = '1';
            }, 150);
        }
        
        if (counter) {
            counter.textContent = `${currentModalImageIndex + 1} / ${images.length}`;
        }
        
        dots.forEach((dot, i) => {
            dot.style.background = i === currentModalImageIndex ? 'white' : 'rgba(255,255,255,0.5)';
        });
    }

    modal.className = 'modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Animate modal appearance
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    });

    // Keyboard navigation
    const handleKeyPress = (e) => {
        if (e.key === 'ArrowLeft') changeMapModalImage(-1);
        if (e.key === 'ArrowRight') changeMapModalImage(1);
        if (e.key === 'Escape') {
            modal.remove();
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeyPress);
        }
    };
    
    document.addEventListener('keydown', handleKeyPress);

    // Clean up on modal close
    modal.addEventListener('remove', () => {
        document.removeEventListener('keydown', handleKeyPress);
    });
};

// View property details
window.viewPropertyDetails = function(propertyTitle) {
    const property = properties.find(p => p.title === propertyTitle);
    if (property) {
        showMapPropertyModal(property.id);
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
document.addEventListener('DOMContentLoaded', () => {
    initializeOptimizedMobile();
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    // Clean up any remaining intervals or timeouts
    if (window.optimizedResizeTimeout) {
        clearTimeout(window.optimizedResizeTimeout);
    }
});

