// Enhanced Properties & Search Functionality - Clean UX for Index Redirects

let currentFilter = 'all';
let currentSort = 'default';
let currentView = 'grid';
let currentPage = 1;
let itemsPerPage = 9;
let filteredProperties = [];
let searchCriteria = {};
let isFromIndexPage = false; // Track if user came from index page

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
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    applyFilters();
}

// Sort properties
function sortProperties(sortType) {
    currentSort = sortType;
    currentPage = 1;
    applyFilters();
}

// Toggle view (grid/list)
function toggleView(viewType) {
    currentView = viewType;
    
    // Update active view button
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const grid = document.getElementById('propertiesGrid');
    if (viewType === 'list') {
        grid.classList.add('list-view');
    } else {
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
    isFromIndexPage = false; // Reset index page flag
    
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
    
    isFromIndexPage = false; // User is now actively using filters
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
    
    currentPage = 1;
    isFromIndexPage = false; // User is actively using filters
    
    // Update URL with search parameters
    updateURL();
    
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
        
        // Apply type filter from tabs
        if (currentFilter !== 'all') {
            results = results.filter(property => property.type === currentFilter);
        }
        
        // Apply advanced search criteria
        if (searchCriteria.type && searchCriteria.type !== '') {
            results = results.filter(property => property.type === searchCriteria.type);
            // Update the filter tab to match
            updateFilterTab(searchCriteria.type);
        }
        
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
        
        // Show notification only if not from index page
        if (!isFromIndexPage) {
            const searchApplied = Object.values(searchCriteria).some(val => val && val !== '');
            const filterApplied = currentFilter !== 'all';
            
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
    
    // Display properties
    grid.innerHTML = pageProperties.map(property => createPropertyCard(property)).join('');
    
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

// Enhanced property card with image array support
function createPropertyCard(property) {
    // Get the first image from images array, or fallback to image property, or default
    const imageUrl = (property.images && property.images.length > 0) 
        ? property.images[0] 
        : (property.image || 'images/default.jpg');
    
    return `
        <div class="property-card fade-in" onclick="showPropertyModal('${property.title}', '${property.price}', '${property.location}', '${property.description}')">
            <div class="property-image">
                <img src="${imageUrl}" alt="${property.title}" loading="lazy">
                <div class="property-badge ${getBadgeClass(property.badge)}">${property.badge || ''}</div>
                <div class="property-heart" onclick="event.stopPropagation(); toggleFavorite(${property.id})">
                    <i class="far fa-heart"></i>
                </div>
            </div>
            <div class="property-content">
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
                <div class="property-actions">
                    <button class="property-btn btn-primary" onclick="event.stopPropagation(); contactAboutProperty('${property.title}')">
                        <i class="fas fa-phone"></i> Свържи се
                    </button>
                    <button class="property-btn btn-secondary" onclick="event.stopPropagation(); scheduleViewing('${property.title}')">
                        <i class="fas fa-calendar"></i> Оглед
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Also update the modal function to handle multiple images
function showPropertyModal(title, price, location, description, propertyId = null) {
    const isMobile = window.innerWidth <= 768;
    
    // Find the property to get all images
    const property = properties.find(p => p.title === title);
    const allImages = property && property.images ? property.images : [];
    
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

    // Create image gallery if multiple images exist
    const imageGalleryHTML = allImages.length > 1 ? `
        <div style="margin-bottom: 1.5rem;">
            <div style="position: relative; margin-bottom: 1rem;">
                <img id="modalMainImage" src="${allImages[0]}" alt="${title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 15px;">
            </div>
            <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding: 0.5rem 0;">
                ${allImages.map((img, index) => `
                    <img src="${img}" alt="${title} ${index + 1}" 
                         style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; cursor: pointer; opacity: ${index === 0 ? '1' : '0.6'}; transition: opacity 0.3s ease;"
                         onclick="document.getElementById('modalMainImage').src='${img}'; document.querySelectorAll('[data-gallery-thumb]').forEach(t => t.style.opacity='0.6'); this.style.opacity='1';"
                         data-gallery-thumb>
                </img>`).join('')}
            </div>
        </div>
    ` : (allImages.length === 1 ? `
        <div style="margin-bottom: 1.5rem;">
            <img src="${allImages[0]}" alt="${title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 15px;">
        </div>
    ` : '');

    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <h3 style="color: #3e2723; margin: 0; font-size: ${isMobile ? '1.3rem' : '1.5rem'}; text-align: left; flex: 1;">${title}</h3>
            <button onclick="this.closest('.modal').remove()" style="background: none; border: none; font-size: ${isMobile ? '1.8rem' : '1.5rem'}; color: #999; cursor: pointer; padding: 0; margin-left: 1rem; line-height: 1;">×</button>
        </div>
        ${imageGalleryHTML}
        ${price ? `<p style="color: #8b4513; font-size: ${isMobile ? '1.2rem' : '1.3rem'}; font-weight: 700; margin-bottom: 0.5rem; text-align: left;">${price}</p>` : ''}
        ${location ? `<p style="color: #5d4e37; margin-bottom: 2rem; text-align: left; display: flex; align-items: center; gap: 0.5rem; font-size: ${isMobile ? '0.9rem' : '1rem'};"><i class="fas fa-map-marker-alt" style="color: #8b4513;"></i>${location}</p>` : ''}
        <p style="color: #5d4e37; margin-bottom: 2rem; line-height: 1.6; text-align: left; font-size: ${isMobile ? '0.9rem' : '1rem'};">${description}</p>
        <div style="display: ${isMobile ? 'flex' : 'flex'}; gap: ${isMobile ? '0.8rem' : '1rem'}; justify-content: center; flex-wrap: wrap; margin-top: 2rem; ${isMobile ? 'flex-direction: column;' : ''}">
            <a href="tel:+359888123456" style="background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%); color: white; padding: ${isMobile ? '1.2rem 1.5rem' : '1rem 1.5rem'}; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.3s ease; font-size: ${isMobile ? '1rem' : '0.9rem'};" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">
                <i class="fas fa-phone"></i> Обадете се
            </a>
            <a href="mailto:info@sandercorrect.com" style="background: transparent; color: #8b4513; border: 2px solid #8b4513; padding: ${isMobile ? '1.2rem 1.5rem' : '1rem 1.5rem'}; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.3s ease; font-size: ${isMobile ? '1rem' : '0.9rem'};" onmouseover="this.style.background='#8b4513'; this.style.color='white'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='transparent'; this.style.color='#8b4513'; this.style.transform=''">
                <i class="fas fa-envelope"></i> Имейл
            </a>
            <a href="properties.html" style="background: #f8f6f3; color: #5d4e37; border: none; padding: ${isMobile ? '1.2rem 1.5rem' : '1rem 1.5rem'}; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.3s ease; font-size: ${isMobile ? '1rem' : '0.9rem'};" onmouseover="this.style.background='#8b4513'; this.style.color='white'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#f8f6f3'; this.style.color='#5d4e37'; this.style.transform=''">
                <i class="fas fa-search"></i> Още имоти
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
        }
    });

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Restore body scroll when modal is closed
    const originalRemove = modal.remove;
    modal.remove = function() {
        document.body.style.overflow = '';
        originalRemove.call(this);
    };
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