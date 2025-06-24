// Combined Properties & Search Functionality

let currentFilter = 'all';
let currentSort = 'default';
let currentView = 'grid';
let currentPage = 1;
let itemsPerPage = 9;
let filteredProperties = [];
let searchCriteria = {};

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
    
    // Reset variables
    currentFilter = 'all';
    currentSort = 'default';
    currentPage = 1;
    searchCriteria = {};
    
    // Update UI
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.filter-btn[onclick="filterProperties(\'all\')"]').classList.add('active');
    
    document.getElementById('sortBy').value = 'default';
    
    // Apply filters
    applyFilters();
    
    showNotification('Филтрите са изчистени', 'info');
}

// Handle advanced search form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('advancedSearchForm');
    if (form) {
        form.addEventListener('submit', handleAdvancedSearch);
    }
});

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
        type: formData.get('type'),
        transaction: formData.get('transaction'),
        location: formData.get('location'),
        priceMin: formData.get('priceMin'),
        priceMax: formData.get('priceMax'),
        rooms: formData.get('rooms'),
        areaMin: formData.get('areaMin'),
        areaMax: formData.get('areaMax')
    };
    
    currentPage = 1;
    
    // Simulate search delay
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        
        applyFilters();
        
        // Collapse search if results found
        if (filteredProperties.length > 0) {
            toggleAdvancedSearch();
        }
    }, 1500);
}

// Apply all filters and search criteria
function applyFilters() {
    showLoading(true);
    
    setTimeout(() => {
        // Start with all properties
        let results = [...properties];
        
        // Apply type filter
        if (currentFilter !== 'all') {
            results = results.filter(property => property.type === currentFilter);
        }
        
        // Apply advanced search criteria
        if (searchCriteria.type) {
            results = results.filter(property => property.type === searchCriteria.type);
        }
        
        if (searchCriteria.location) {
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
        
        if (searchCriteria.rooms) {
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
        
        // Show notification
        const searchApplied = Object.values(searchCriteria).some(val => val && val !== '');
        const filterApplied = currentFilter !== 'all';
        
        if (searchApplied || filterApplied) {
            showNotification(`Намерени са ${results.length} имота, отговарящи на критериите`, 'success');
        }
    }, 800);
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Pre-fill form if parameters exist
    if (urlParams.has('type')) {
        document.getElementById('adv-type').value = urlParams.get('type');
        searchCriteria.type = urlParams.get('type');
    }
    if (urlParams.has('location')) {
        document.getElementById('adv-location').value = urlParams.get('location');
        searchCriteria.location = urlParams.get('location');
    }
    if (urlParams.has('priceMin')) {
        document.getElementById('adv-price-min').value = urlParams.get('priceMin');
        searchCriteria.priceMin = urlParams.get('priceMin');
    }
    if (urlParams.has('priceMax')) {
        document.getElementById('adv-price-max').value = urlParams.get('priceMax');
        searchCriteria.priceMax = urlParams.get('priceMax');
    }
    
    // Auto-submit if parameters exist
    if (urlParams.toString()) {
        setTimeout(() => {
            toggleAdvancedSearch();
            applyFilters();
        }, 500);
    } else {
        // Load all properties initially
        applyFilters();
    }
    
    // Initialize view toggle
    const grid = document.getElementById('propertiesGrid');
    if (currentView === 'list') {
        grid.classList.add('list-view');
    }
});

// Update URL with current search parameters (for bookmarking/sharing)
function updateURL() {
    const params = new URLSearchParams();
    
    if (searchCriteria.type) params.set('type', searchCriteria.type);
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

// Save search to local storage (search history)
function saveSearchToHistory() {
    try {
        const searches = JSON.parse(localStorage.getItem('propertySearches') || '[]');
        const newSearch = {
            criteria: searchCriteria,
            filter: currentFilter,
            sort: currentSort,
            timestamp: new Date().toISOString(),
            resultsCount: filteredProperties.length
        };
        
        // Add to beginning and limit to 10 searches
        searches.unshift(newSearch);
        searches.splice(10);
        
        localStorage.setItem('propertySearches', JSON.stringify(searches));
    } catch (e) {
        // localStorage not available or full
        console.log('Could not save search history');
    }
}

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

// Export search results (for sharing or printing)
function exportResults() {
    const results = {
        searchCriteria,
        properties: filteredProperties,
        timestamp: new Date().toISOString(),
        totalResults: filteredProperties.length
    };
    
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `property-search-results-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Резултатите са експортирани', 'success');
}

// Enhanced property card with more interactive features
function createPropertyCard(property) {
    return `
        <div class="property-card fade-in" onclick="showPropertyModal('${property.title}', '${property.price}', '${property.location}', '${property.description}')">
            <div class="property-image">
                <img src="${property.image || 'images/default.jpg'}" alt="${property.title}" loading="lazy">
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

// Add keyboard shortcuts for power users
document.addEventListener('keydown', (e) => {
    // Only if not typing in input fields
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT' && e.target.tagName !== 'TEXTAREA') {
        switch (e.key) {
            case 'f':
            case 'F':
                e.preventDefault();
                toggleAdvancedSearch();
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