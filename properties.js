// Enhanced Properties & Search Functionality - Updated with Parking and Price per SqM

let currentFilter = 'all';
let currentSort = 'default';
let currentView = 'grid';
let currentPage = 1;
let itemsPerPage = 9;
let filteredProperties = [];
let searchCriteria = {};
let isFromIndexPage = false;

// Track current image indices for each property (for image carousel)
let propertyImageIndices = {};

// Enhanced mobile detection
function isMobileDevice() {
    return window.innerWidth <= 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Toggle advanced search
function toggleAdvancedSearch() {
    const filters = document.getElementById('advancedFilters');
    const btn = document.getElementById('searchToggleBtn');
    
    if (filters.classList.contains('show')) {
        filters.classList.remove('show');
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fas fa-search"></i> Разширена търсачка';
    } else {
        filters.classList.add('show');
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-times"></i> Скрий търсачката';
    }
}

// Property filtering by type
function filterProperties(type) {
    currentFilter = type;
    currentPage = 1;
    
    // Clear type from advanced search criteria when using tabs
    // This prevents conflicts between tab filters and advanced search
    if (searchCriteria.type) {
        searchCriteria.type = '';
        document.getElementById('adv-type').value = '';
    }
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    console.log('Filter tab clicked:', type, 'Current criteria:', searchCriteria);
    
    applyFilters();
}

// Sort properties
function sortProperties(sortType) {
    currentSort = sortType;
    currentPage = 1;
    applyFilters();
}

// Toggle view (grid/list) - REMOVED FUNCTIONALITY
// Keeping the function for compatibility but forcing grid view only
function toggleView(viewType) {
    // Force grid view only - remove list view functionality
    currentView = 'grid';
    
    // Update active view button (keeping only grid active)
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Always activate grid view
    const gridBtn = document.querySelector('.view-btn[onclick="toggleView(\'grid\')"]');
    if (gridBtn) {
        gridBtn.classList.add('active');
    }
    
    // Ensure grid layout is always used
    const grid = document.getElementById('propertiesGrid');
    if (grid) {
        grid.classList.remove('list-view');
    }
}

// Clear all filters
function clearFilters() {
    // Clear form
    document.getElementById('advancedSearchForm').reset();
    
    // Explicitly clear all form fields
    document.getElementById('adv-type').value = '';
    document.getElementById('adv-transaction').value = '';
    document.getElementById('adv-location').value = '';
    document.getElementById('adv-price-min').value = '';
    document.getElementById('adv-price-max').value = '';
    document.getElementById('adv-rooms').value = '';
    document.getElementById('adv-area-min').value = '';
    document.getElementById('adv-area-max').value = '';
    
    // Reset variables
    currentFilter = 'all';
    currentSort = 'default';
    currentPage = 1;
    searchCriteria = {};
    isFromIndexPage = false;
    
    // Update UI
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.filter-btn[onclick="filterProperties(\'all\')"]').classList.add('active');
    
    document.getElementById('sortBy').value = 'default';
    
    // Remove search summary if it exists
    const summary = document.querySelector('.search-summary');
    if (summary) {
        summary.remove();
    }
    
    // Show advanced search section again
    showAdvancedSearchSection();
    
    // Clear URL parameters
    window.history.pushState({}, '', window.location.pathname);
    
    // Apply filters
    applyFilters();
    
    showNotification('Филтрите са изчистени', 'info');
}

// Hide advanced search section for index page users
function hideAdvancedSearchSection() {
    const advancedSection = document.querySelector('.advanced-search-section');
    if (advancedSection) {
        advancedSection.style.display = 'none';
    }
}

// Show advanced search section
function showAdvancedSearchSection() {
    const advancedSection = document.querySelector('.advanced-search-section');
    if (advancedSection) {
        advancedSection.style.display = 'block';
    }
}

// Show a clean search summary for index page users
function showSearchSummary() {
    const container = document.querySelector('.properties-container');
    const advancedSection = document.querySelector('.advanced-search-section');
    
    if (container && advancedSection) {
        const appliedFilters = [];
        if (searchCriteria.type) {
            const typeMap = {
                'apartment': 'Апартаменти',
                'house': 'Къщи',
                'land': 'Парцели',
                'commercial': 'Търговски обекти'
            };
            appliedFilters.push(typeMap[searchCriteria.type] || searchCriteria.type);
        }
        if (searchCriteria.location) appliedFilters.push(`в ${searchCriteria.location}`);
        if (searchCriteria.priceMax) appliedFilters.push(`до ${parseInt(searchCriteria.priceMax).toLocaleString()}€`);
        if (searchCriteria.rooms) appliedFilters.push(`${searchCriteria.rooms} стаи`);
        
        const summaryHTML = `
            <div class="search-summary" style="background: linear-gradient(135deg, #f8f6f3 0%, #ffffff 100%); padding: 2rem; border-radius: 20px; margin-bottom: 2rem; border: 1px solid rgba(139, 69, 19, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h3 style="color: #3e2723; margin: 0 0 0.5rem 0; font-size: 1.3rem;">Търсене: ${appliedFilters.join(', ')}</h3>
                        <p style="color: #5d4e37; margin: 0; opacity: 0.8;">Резултати от вашето търсене от началната страница</p>
                    </div>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <button onclick="showAdvancedSearch()" class="cta-btn" style="background: transparent; color: #8b4513; border: 2px solid #8b4513; padding: 0.8rem 1.5rem; border-radius: 25px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-filter"></i> Промени филтрите
                        </button>
                        <button onclick="clearFilters()" class="cta-btn" style="background: #f5f5f5; color: #5d4e37; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-times"></i> Изчисти
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        advancedSection.insertAdjacentHTML('afterend', summaryHTML);
    }
}

// Show advanced search (called from summary)
function showAdvancedSearch() {
    showAdvancedSearchSection();
    toggleAdvancedSearch();
    
    // Remove search summary
    const summary = document.querySelector('.search-summary');
    if (summary) {
        summary.remove();
    }
    
    isFromIndexPage = false;
}

// Handle advanced search form
function handleAdvancedSearch(event) {
    event.preventDefault();
    
    const button = event.target.querySelector('.filter-btn-primary');
    const originalText = button.innerHTML;
    
    // Add loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Търсене...';
    button.disabled = true;
    
    // Get form values
    const formData = new FormData(event.target);
    searchCriteria = {
        type: formData.get('type') || '',
        transaction: formData.get('transaction') || '',
        location: formData.get('location') || '',
        priceMin: formData.get('priceMin') || '',
        priceMax: formData.get('priceMax') || '',
        rooms: formData.get('rooms') || '',
        areaMin: formData.get('areaMin') || '',
        areaMax: formData.get('areaMax') || ''
    };
    
    // If advanced search has a type, reset the filter tabs to "all"
    if (searchCriteria.type) {
        currentFilter = 'all';
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.filter-btn[onclick="filterProperties(\'all\')"]').classList.add('active');
    }
    
    currentPage = 1;
    isFromIndexPage = false;
    
    // Update URL with search parameters
    updateURL();
    
    console.log('Advanced search submitted:', searchCriteria);
    
    // Simulate search delay
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        
        applyFilters();
        
        // Collapse search if results found
        if (filteredProperties.length > 0) {
            toggleAdvancedSearch();
        }
    }, 1000);
}

// Apply all filters and search criteria
function applyFilters() {
    showLoading(true);
    
    setTimeout(() => {
        // Start with all properties
        let results = [...properties];
        
        // Priority: Advanced search criteria override filter tabs
        let activeTypeFilter = null;
        
        // Check if we have a type from advanced search
        if (searchCriteria.type && searchCriteria.type !== '') {
            activeTypeFilter = searchCriteria.type;
            // Update the filter tab to match
            updateFilterTab(searchCriteria.type);
        } else if (currentFilter !== 'all') {
            // Use the filter tab if no advanced search type is set
            activeTypeFilter = currentFilter;
        }
        
        // Apply type filter (either from advanced search or tabs)
        if (activeTypeFilter) {
            results = results.filter(property => property.type === activeTypeFilter);
        }
        
        // Apply other advanced search criteria
        if (searchCriteria.location && searchCriteria.location !== '') {
            results = results.filter(property => 
                property.location.toLowerCase().includes(searchCriteria.location.toLowerCase())
            );
        }
        
        if (searchCriteria.priceMin || searchCriteria.priceMax) {
            results = results.filter(property => {
                const price = parseFloat(property.price.replace(/[^0-9.]/g, ''));
                const min = searchCriteria.priceMin ? parseFloat(searchCriteria.priceMin) : 0;
                const max = searchCriteria.priceMax ? parseFloat(searchCriteria.priceMax) : Infinity;
                return price >= min && price <= max;
            });
        }
        
        if (searchCriteria.rooms && searchCriteria.rooms !== '') {
            results = results.filter(property => {
                const rooms = parseInt(property.rooms.replace(/[^0-9]/g, '')) || 0;
                const targetRooms = parseInt(searchCriteria.rooms);
                return targetRooms === 4 ? rooms >= 4 : rooms === targetRooms;
            });
        }
        
        if (searchCriteria.areaMin || searchCriteria.areaMax) {
            results = results.filter(property => {
                const area = parseFloat(property.area.replace(/[^0-9.]/g, ''));
                const min = searchCriteria.areaMin ? parseFloat(searchCriteria.areaMin) : 0;
                const max = searchCriteria.areaMax ? parseFloat(searchCriteria.areaMax) : Infinity;
                return area >= min && area <= max;
            });
        }
        
        // Apply sorting
        results = sortResults(results);
        
        // Store filtered results
        filteredProperties = results;
        
        showLoading(false);
        displayResults();
        updateResultsCount();
        updatePagination();
        
        // Debug logging
        console.log('Filter applied:', {
            activeTypeFilter,
            currentFilter,
            searchCriteria,
            totalResults: results.length,
            availableTypes: [...new Set(properties.map(p => p.type))]
        });
        
        // Show notification only if not from index page
        if (!isFromIndexPage) {
            const searchApplied = Object.values(searchCriteria).some(val => val && val !== '');
            const filterApplied = activeTypeFilter !== null;
            
            if (searchApplied || filterApplied) {
                showNotification(`Намерени са ${results.length} имота, отговарящи на критериите`, 'success');
            }
        }
    }, 500);
}

// Update filter tab to match search criteria
function updateFilterTab(type) {
    // Remove active from all tabs
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find and activate the matching tab
    const targetTab = document.querySelector(`.filter-btn[onclick="filterProperties('${type}')"]`);
    if (targetTab) {
        targetTab.classList.add('active');
        currentFilter = type;
    }
}

// Load and apply URL parameters from index page
function loadFromURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    let hasParams = false;
    
    // Map URL parameters to search criteria
    if (urlParams.has('type')) {
        const type = urlParams.get('type');
        document.getElementById('adv-type').value = type;
        searchCriteria.type = type;
        hasParams = true;
    }
    
    if (urlParams.has('transaction')) {
        const transaction = urlParams.get('transaction');
        document.getElementById('adv-transaction').value = transaction;
        searchCriteria.transaction = transaction;
        hasParams = true;
    }
    
    if (urlParams.has('location')) {
        const location = urlParams.get('location');
        document.getElementById('adv-location').value = location;
        searchCriteria.location = location;
        hasParams = true;
    }
    
    if (urlParams.has('priceMin')) {
        const priceMin = urlParams.get('priceMin');
        document.getElementById('adv-price-min').value = priceMin;
        searchCriteria.priceMin = priceMin;
        hasParams = true;
    }
    
    if (urlParams.has('priceMax')) {
        const priceMax = urlParams.get('priceMax');
        document.getElementById('adv-price-max').value = priceMax;
        searchCriteria.priceMax = priceMax;
        hasParams = true;
    }
    
    if (urlParams.has('rooms')) {
        const rooms = urlParams.get('rooms');
        document.getElementById('adv-rooms').value = rooms;
        searchCriteria.rooms = rooms;
        hasParams = true;
    }
    
    if (urlParams.has('areaMin')) {
        const areaMin = urlParams.get('areaMin');
        document.getElementById('adv-area-min').value = areaMin;
        searchCriteria.areaMin = areaMin;
        hasParams = true;
    }
    
    if (urlParams.has('areaMax')) {
        const areaMax = urlParams.get('areaMax');
        document.getElementById('adv-area-max').value = areaMax;
        searchCriteria.areaMax = areaMax;
        hasParams = true;
    }
    
    if (urlParams.has('filter')) {
        currentFilter = urlParams.get('filter');
        hasParams = true;
    }
    
    if (urlParams.has('sort')) {
        currentSort = urlParams.get('sort');
        document.getElementById('sortBy').value = currentSort;
        hasParams = true;
    }
    
    return hasParams;
}

// Sort results
function sortResults(results) {
    switch (currentSort) {
        case 'price-asc':
            return results.sort((a, b) => {
                const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
                const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
                return priceA - priceB;
            });
        case 'price-desc':
            return results.sort((a, b) => {
                const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
                const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
                return priceB - priceA;
            });
        case 'area-asc':
            return results.sort((a, b) => {
                const areaA = parseFloat(a.area.replace(/[^0-9.]/g, ''));
                const areaB = parseFloat(b.area.replace(/[^0-9.]/g, ''));
                return areaA - areaB;
            });
        case 'area-desc':
            return results.sort((a, b) => {
                const areaA = parseFloat(a.area.replace(/[^0-9.]/g, ''));
                const areaB = parseFloat(b.area.replace(/[^0-9.]/g, ''));
                return areaB - areaA;
            });
        case 'newest':
            return results.sort((a, b) => b.id - a.id);
        default:
            return results;
    }
}

// Display results with pagination
function displayResults() {
    const grid = document.getElementById('propertiesGrid');
    const noResults = document.getElementById('noResults');
    
    if (filteredProperties.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageProperties = filteredProperties.slice(startIndex, endIndex);
    
    // Display properties using enhanced property cards
    grid.innerHTML = pageProperties.map(property => createEnhancedPropertyCard(property)).join('');
    
    // Reinitialize animations
    setTimeout(() => {
        initializeAnimations();
    }, 100);
}

// Update results count
function updateResultsCount() {
    const resultsCount = document.getElementById('resultsCount');
    const resultNumber = document.getElementById('resultNumber');
    const footerText = document.getElementById('footerText');
    
    if (filteredProperties.length > 0) {
        resultsCount.style.display = 'block';
        resultNumber.textContent = filteredProperties.length;
        
        const searchApplied = Object.values(searchCriteria).some(val => val && val !== '') || currentFilter !== 'all';
        if (searchApplied) {
            footerText.textContent = `Показани са ${filteredProperties.length} имота от общо ${properties.length} • Последна актуализация: днес`;
        } else {
            footerText.textContent = 'Показани са всички налични имоти • Последна актуализация: днес';
        }
    } else {
        resultsCount.style.display = 'none';
    }
}

// Update pagination
function updatePagination() {
    const pagination = document.getElementById('pagination');
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    
    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }
    
    pagination.style.display = 'flex';
    pageInfo.textContent = `Страница ${currentPage} от ${totalPages}`;
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Change page
function changePage(direction) {
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        displayResults();
        updatePagination();
        
        // Scroll to top of properties
        document.getElementById('propertiesGrid').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Show/hide loading state
function showLoading(show) {
    const loadingState = document.getElementById('loadingState');
    const grid = document.getElementById('propertiesGrid');
    const noResults = document.getElementById('noResults');
    
    if (show) {
        loadingState.style.display = 'flex';
        grid.style.display = 'none';
        noResults.style.display = 'none';
    } else {
        loadingState.style.display = 'none';
    }
}

// Update URL with current search parameters (for bookmarking/sharing)
function updateURL() {
    const params = new URLSearchParams();
    
    if (searchCriteria.type) params.set('type', searchCriteria.type);
    if (searchCriteria.transaction) params.set('transaction', searchCriteria.transaction);
    if (searchCriteria.location) params.set('location', searchCriteria.location);
    if (searchCriteria.priceMin) params.set('priceMin', searchCriteria.priceMin);
    if (searchCriteria.priceMax) params.set('priceMax', searchCriteria.priceMax);
    if (searchCriteria.rooms) params.set('rooms', searchCriteria.rooms);
    if (searchCriteria.areaMin) params.set('areaMin', searchCriteria.areaMin);
    if (searchCriteria.areaMax) params.set('areaMax', searchCriteria.areaMax);
    if (currentFilter !== 'all') params.set('filter', currentFilter);
    if (currentSort !== 'default') params.set('sort', currentSort);
    
    const newURL = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.pushState({}, '', newURL);
}

// Enhanced property card with image carousel, parking and price per sqm - UPDATED
function createEnhancedPropertyCard(property) {
    // Initialize image index for this property
    if (!propertyImageIndices[property.id]) {
        propertyImageIndices[property.id] = 0;
    }
    
    const currentImageIndex = propertyImageIndices[property.id];
    const images = property.images || [property.image || 'images/default.jpg'];
    const hasMultipleImages = images.length > 1;
    
    // Get parking information - categorized (SAME AS INDEX PAGE)
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

// Enhanced image carousel functions with smooth transitions - SAME AS INDEX PAGE
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

// Set specific property image - SAME AS INDEX PAGE
function setPropertyImage(propertyId, imageIndex) {
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.images) return;
    
    propertyImageIndices[propertyId] = imageIndex;
    updatePropertyImageDisplay(propertyId, imageIndex, property.images);
}

// Update image display and indicators with smooth transitions - SAME AS INDEX PAGE
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

// Enhanced toggle favorite with mobile optimizations - SAME AS INDEX PAGE
function toggleFavorite(propertyId) {
    const heart = event.target;
    const card = heart.closest('.property-card');
    
    if (heart.classList.contains('fas')) {
        heart.classList.remove('fas');
        heart.classList.add('far');
        heart.style.color = '';
        showNotification('Премахнато от любими', 'info');
        
        // Mobile-optimized animation
        if (window.innerWidth <= 768) {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        } else {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        }
    } else {
        heart.classList.remove('far');
        heart.classList.add('fas');
        heart.style.color = '#d2691e';
        showNotification('Добавено в любими', 'success');
        
        // Mobile-optimized animation
        const scale = window.innerWidth <= 768 ? '1.2' : '1.3';
        const duration = window.innerWidth <= 768 ? 200 : 300;
        
        heart.style.transform = `scale(${scale})`;
        setTimeout(() => {
            heart.style.transform = '';
        }, duration);
    }
}

// Contact about property
function contactAboutProperty(propertyTitle) {
    window.location.href = 'contact.html?property=' + encodeURIComponent(propertyTitle);
}

// Schedule viewing
function scheduleViewing(propertyTitle) {
    const property = properties.find(p => p.title === propertyTitle);
    if (property) {
        showEnhancedPropertyModal(property.id);
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

// ENHANCED PROPERTY MODAL - EXACT SAME AS INDEX PAGE
window.showEnhancedPropertyModal = function(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    const images = property.images || [property.image || 'images/default.jpg'];
    let currentModalImageIndex = 0;
    const isMobile = isMobileDevice();
    
    // Get parking information for modal - categorized (SAME AS INDEX PAGE)
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
        width: 100%;
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
                    <p style="color: #5d4e37; line-height: 1.7; font-size: ${isMobile ? '1rem' : '1.05rem'};">Този имот предлага отлично съотношение цена-качество и се намира на стратегическо място с добра транспортна свързаност. Идеален за инвестиция или лично ползване.</p>
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

// BACKWARD COMPATIBILITY - Keep old showPropertyModal for any legacy calls
window.showPropertyModal = function(title, price, location, description) {
    // Find the property by title and show enhanced modal instead
    const property = properties.find(p => p.title === title);
    if (property) {
        showEnhancedPropertyModal(property.id);
    } else {
        // Fallback to enhanced modal with basic info
        showNotification('Имотът не е намерен', 'error');
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Setup form handler
    const form = document.getElementById('advancedSearchForm');
    if (form) {
        form.addEventListener('submit', handleAdvancedSearch);
    }
    
    // Load URL parameters and apply filters automatically
    const hasURLParams = loadFromURLParameters();
    
    if (hasURLParams) {
        // Mark as coming from index page
        isFromIndexPage = true;
        
        // Hide the advanced search section
        hideAdvancedSearchSection();
        
        // Apply filters with the URL parameters
        applyFilters();
        
        // Show search summary after filters are applied
        setTimeout(() => {
            showSearchSummary();
        }, 800);
        
    } else {
        // Load all properties initially if no URL parameters
        isFromIndexPage = false;
        applyFilters();
    }
    
    // Initialize view toggle
    const grid = document.getElementById('propertiesGrid');
    if (currentView === 'list') {
        grid.classList.add('list-view');
    }
});

// Add keyboard shortcuts for power users
document.addEventListener('keydown', (e) => {
    // Only if not typing in input fields
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT' && e.target.tagName !== 'TEXTAREA') {
        switch (e.key) {
            case 'f':
            case 'F':
                e.preventDefault();
                if (!isFromIndexPage) {
                    toggleAdvancedSearch();
                } else {
                    showAdvancedSearch();
                }
                break;
            case 'c':
            case 'C':
                e.preventDefault();
                clearFilters();
                break;
            case 'ArrowLeft':
                if (e.ctrlKey) {
                    e.preventDefault();
                    changePage(-1);
                }
                break;
            case 'ArrowRight':
                if (e.ctrlKey) {
                    e.preventDefault();
                    changePage(1);
                }
                break;
        }
    }
});

// Quick search suggestions based on popular searches
function getSearchSuggestions() {
    return [
        { text: 'Апартаменти в София', filter: { type: 'apartment', location: 'София' } },
        { text: 'Къщи до 500,000€', filter: { type: 'house', priceMax: '500000' } },
        { text: 'Парцели за строителство', filter: { type: 'land' } },
        { text: 'Тристайни апартаменти', filter: { type: 'apartment', rooms: '3' } },
        { text: 'Имоти в Лозенец', filter: { location: 'Лозенец' } },
        { text: 'Търговски обекти', filter: { type: 'commercial' } }
    ];
}

// Apply quick search suggestion
function applyQuickSearch(suggestion) {
    // Clear current criteria
    clearFilters();
    
    // Set new criteria
    Object.assign(searchCriteria, suggestion.filter);
    
    // Update form
    if (suggestion.filter.type) {
        document.getElementById('adv-type').value = suggestion.filter.type;
    }
    if (suggestion.filter.location) {
        document.getElementById('adv-location').value = suggestion.filter.location;
    }
    if (suggestion.filter.priceMax) {
        document.getElementById('adv-price-max').value = suggestion.filter.priceMax;
    }
    if (suggestion.filter.rooms) {
        document.getElementById('adv-rooms').value = suggestion.filter.rooms;
    }
    
    // Apply filters
    applyFilters();
    
    showNotification(`Прилагане на филтър: ${suggestion.text}`, 'info');
}

// Add search suggestions to the advanced search
function addSearchSuggestions() {
    const suggestions = getSearchSuggestions();
    const filtersContainer = document.querySelector('.advanced-filters');
    
    if (filtersContainer && !document.querySelector('.search-suggestions')) {
        const suggestionsHTML = `
            <div class="search-suggestions">
                <h5>Популярни търсения:</h5>
                <div class="suggestions-list">
                    ${suggestions.map(suggestion => 
                        `<span class="suggestion-tag" onclick="applyQuickSearch(${JSON.stringify(suggestion).replace(/"/g, '&quot;')})">${suggestion.text}</span>`
                    ).join('')}
                </div>
            </div>
        `;
        
        filtersContainer.insertAdjacentHTML('beforeend', suggestionsHTML);
    }
}

// Initialize search suggestions when advanced search is first opened
let suggestionsAdded = false;
const originalToggleAdvancedSearch = toggleAdvancedSearch;
toggleAdvancedSearch = function() {
    originalToggleAdvancedSearch();
    
    if (!suggestionsAdded) {
        setTimeout(() => {
            addSearchSuggestions();
            suggestionsAdded = true;
        }, 300);
    }
};