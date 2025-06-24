// Load featured properties with 2-row horizontal scroll - 3 columns visible
function loadFeaturedProperties() {
    const grid = document.getElementById('featuredProperties');
    if (!grid) return;
    
    const featuredProperties = properties.filter(property => property.featured);
    
    // Create navigation controls
    const navHTML = `
        <div class="properties-nav">
            <button class="nav-btn" id="prevBtn" onclick="scrollProperties('prev')">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="auto-scroll-toggle" id="autoScrollToggle" onclick="toggleAutoScroll()">
                <i class="fas fa-play"></i>
                <span>Автоматично</span>
            </button>
            <button class="nav-btn" id="nextBtn" onclick="scrollProperties('next')">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;
    
    // Insert navigation before the grid
    grid.insertAdjacentHTML('beforebegin', navHTML);
    
    // Create enough properties to fill both rows and allow scrolling
    const duplicatedProperties = [...featuredProperties, ...featuredProperties];
    grid.innerHTML = duplicatedProperties.map(property => createPropertyCard(property)).join('');
    
    // Calculate how many "pages" we have (each page shows 6 properties: 3 columns x 2 rows)
    const propertiesPerPage = 6;
    const totalPages = Math.ceil(featuredProperties.length / 3); // 3 properties per row, 2 rows
    
    // Add scroll indicators for pages
    const indicatorsHTML = `
        <div class="scroll-indicators">
            ${Array.from({length: totalPages}, (_, index) => 
                `<div class="scroll-dot ${index === 0 ? 'active' : ''}" onclick="scrollToPage(${index})"></div>`
            ).join('')}
        </div>
    `;
    grid.insertAdjacentHTML('afterend', indicatorsHTML);
    
    // Initialize auto-scroll
    initializeAutoScroll();
    
    // Reinitialize animations
    setTimeout(() => {
        initializeAnimations();
    }, 100);
}

// Auto-scroll functionality for 2-row, 3-column layout
let autoScrollInterval;
let isAutoScrolling = false;
let currentPageIndex = 0;

function initializeAutoScroll() {
    startAutoScroll();
}

function startAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    
    isAutoScrolling = true;
    const toggle = document.getElementById('autoScrollToggle');
    if (toggle) {
        toggle.innerHTML = '<i class="fas fa-pause"></i><span>Пауза</span>';
        toggle.classList.remove('paused');
    }
    
    autoScrollInterval = setInterval(() => {
        scrollProperties('next');
    }, 5000); // Change every 5 seconds
}

function stopAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
    
    isAutoScrolling = false;
    const toggle = document.getElementById('autoScrollToggle');
    if (toggle) {
        toggle.innerHTML = '<i class="fas fa-play"></i><span>Старт</span>';
        toggle.classList.add('paused');
    }
}

function toggleAutoScroll() {
    if (isAutoScrolling) {
        stopAutoScroll();
    } else {
        startAutoScroll();
    }
}

function scrollProperties(direction) {
    const grid = document.getElementById('featuredProperties');
    if (!grid) return;
    
    // Calculate visible columns based on screen size
    const screenWidth = window.innerWidth;
    let visibleColumns = 3; // Default desktop
    if (screenWidth <= 480) {
        visibleColumns = 1; // Mobile
    } else if (screenWidth <= 768) {
        visibleColumns = 2; // Tablet
    }
    
    // Calculate scroll amount (scroll by the visible columns width)
    const gridWidth = grid.clientWidth;
    const scrollAmount = gridWidth; // Scroll by full grid width
    
    // Calculate total pages
    const featuredProperties = properties.filter(property => property.featured);
    const totalPages = Math.ceil(featuredProperties.length / visibleColumns);
    
    if (direction === 'next') {
        currentPageIndex++;
        if (currentPageIndex >= totalPages) {
            currentPageIndex = 0; // Loop back to start
        }
    } else {
        currentPageIndex--;
        if (currentPageIndex < 0) {
            currentPageIndex = totalPages - 1; // Loop to end
        }
    }
    
    const scrollPosition = currentPageIndex * scrollAmount;
    grid.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
    
    updateScrollIndicators();
}

function scrollToPage(pageIndex) {
    currentPageIndex = pageIndex;
    const grid = document.getElementById('featuredProperties');
    if (!grid) return;
    
    const gridWidth = grid.clientWidth;
    const scrollPosition = pageIndex * gridWidth;
    
    grid.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
    
    updateScrollIndicators();
    
    // Restart auto-scroll if it was running
    if (isAutoScrolling) {
        stopAutoScroll();
        setTimeout(startAutoScroll, 1000);
    }
}

function updateScrollIndicators() {
    const dots = document.querySelectorAll('.scroll-dot');
    dots.forEach((dot, index) => {
        if (index === currentPageIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Handle grid scroll events
function handleGridScroll() {
    const grid = document.getElementById('featuredProperties');
    if (!grid) return;
    
    // Update current page index based on scroll position
    const gridWidth = grid.clientWidth;
    const newPageIndex = Math.round(grid.scrollLeft / gridWidth);
    
    if (newPageIndex !== currentPageIndex) {
        currentPageIndex = newPageIndex;
        updateScrollIndicators();
    }
    
    // Pause auto-scroll when user manually scrolls
    if (isAutoScrolling) {
        stopAutoScroll();
        setTimeout(() => {
            if (!isAutoScrolling) startAutoScroll();
        }, 3000); // Resume after 3 seconds of inactivity
    }
}

// Touch/swipe support for mobile
let startX = 0;
let currentX = 0;
let isDragging = false;

function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
    
    // Pause auto-scroll during touch
    if (isAutoScrolling) {
        stopAutoScroll();
    }
}

function handleTouchMove(e) {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    
    const diffX = startX - currentX;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
            scrollProperties('next');
        } else {
            scrollProperties('prev');
        }
    }
    
    // Resume auto-scroll after touch ends
    setTimeout(() => {
        if (!isAutoScrolling) startAutoScroll();
    }, 2000);
}

// Add event listeners when grid is loaded
function addPropertyScrollListeners() {
    const grid = document.getElementById('featuredProperties');
    if (!grid) return;
    
    // Mouse wheel horizontal scroll
    grid.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            grid.scrollLeft += e.deltaY;
            handleGridScroll();
        }
    });
    
    // Regular scroll event
    grid.addEventListener('scroll', handleGridScroll);
    
    // Touch events for mobile
    grid.addEventListener('touchstart', handleTouchStart, { passive: true });
    grid.addEventListener('touchmove', handleTouchMove, { passive: true });
    grid.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Pause auto-scroll on hover
    grid.addEventListener('mouseenter', () => {
        if (isAutoScrolling) stopAutoScroll();
    });
    
    grid.addEventListener('mouseleave', () => {
        if (!isAutoScrolling) {
            setTimeout(startAutoScroll, 1000);
        }
    });
}

// Enhanced property card with horizontal layout
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

// Handle window resize to recalculate scroll indicators
window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        // Reload scroll indicators based on new window size
        const grid = document.getElementById('featuredProperties');
        if (grid) {
            const existingIndicators = document.querySelector('.scroll-indicators');
            if (existingIndicators) {
                existingIndicators.remove();
            }
            
            // Calculate visible columns based on new screen size
            const screenWidth = window.innerWidth;
            let visibleColumns = 3; // Default desktop
            if (screenWidth <= 480) {
                visibleColumns = 1; // Mobile
            } else if (screenWidth <= 768) {
                visibleColumns = 2; // Tablet
            }
            
            // Recalculate pages
            const featuredProperties = properties.filter(property => property.featured);
            const totalPages = Math.ceil(featuredProperties.length / visibleColumns);
            
            const indicatorsHTML = `
                <div class="scroll-indicators">
                    ${Array.from({length: totalPages}, (_, index) => 
                        `<div class="scroll-dot ${index === currentPageIndex ? 'active' : ''}" onclick="scrollToPage(${index})"></div>`
                    ).join('')}
                </div>
            `;
            grid.insertAdjacentHTML('afterend', indicatorsHTML);
            
            // Reset to first page
            currentPageIndex = 0;
            grid.scrollTo({ left: 0, behavior: 'smooth' });
            updateScrollIndicators();
        }
    }, 250);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProperties();
    
    // Add scroll listeners after properties are loaded
    setTimeout(() => {
        addPropertyScrollListeners();
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

// Cleanup function for when user leaves page
window.addEventListener('beforeunload', () => {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
    }
});

// Visibility API to pause/resume auto-scroll when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (isAutoScrolling) {
            stopAutoScroll();
        }
    } else {
        if (!isAutoScrolling) {
            setTimeout(startAutoScroll, 1000);
        }
    }
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
    // Initialize home map if Leaflet is available
    if (typeof L !== 'undefined') {
        setTimeout(initializeHomeMap, 500);
    }
    
   