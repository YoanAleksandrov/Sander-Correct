// Handle advanced search form
document.getElementById('advancedSearchForm').addEventListener('submit', handleAdvancedSearch);

function handleAdvancedSearch(event) {
    event.preventDefault();
    
    const button = event.target.querySelector('.search-button');
    const originalText = button.textContent;
    
    // Add loading state
    button.classList.add('loading');
    button.textContent = 'Търсене...';
    button.disabled = true;
    
    // Get form values
    const formData = new FormData(event.target);
    const searchCriteria = {
        type: formData.get('type'),
        transaction: formData.get('transaction'),
        location: formData.get('location'),
        priceMin: formData.get('priceMin'),
        priceMax: formData.get('priceMax'),
        rooms: formData.get('rooms'),
        areaMin: formData.get('areaMin'),
        areaMax: formData.get('areaMax'),
        newBuild: formData.get('newBuild') === '1'
    };
    
    // Simulate search delay
    setTimeout(() => {
        button.classList.remove('loading');
        button.textContent = originalText;
        button.disabled = false;
        
        // Perform search
        performSearch(searchCriteria);
    }, 2000);
}

function performSearch(criteria) {
    // Filter properties based on criteria
    let results = properties;
    
    // Filter by type
    if (criteria.type && criteria.type !== 'Всички типове') {
        if (criteria.type === 'Ново строителство') {
            results = results.filter(p => p.condition && p.condition.toLowerCase().includes('ново строителство'));
        } else {
            const typeMap = {
                'Апартамент': 'apartment',
                'Къща': 'house',
                'Вила': 'house',
                'Парцел': 'land',
                'Офис': 'commercial',
                'Търговски обект': 'commercial',
                'apartment': 'apartment',
                'house': 'house',
                'villa': 'house',
                'land': 'land',
                'commercial': 'commercial'
            };
            results = results.filter(p => p.type === typeMap[criteria.type]);
        }
    }
    
    // Filter by location
    if (criteria.location && criteria.location !== 'Всички локации') {
        results = results.filter(p => p.location.includes(criteria.location.split(' - ')[0]));
    }
    
    // Filter by price
    if (criteria.priceMin || criteria.priceMax) {
        results = results.filter(p => {
            const price = parseFloat(p.price.replace(/[^0-9.]/g, ''));
            const min = criteria.priceMin ? parseFloat(criteria.priceMin) : 0;
            const max = criteria.priceMax ? parseFloat(criteria.priceMax) : Infinity;
            return price >= min && price <= max;
        });
    }
    
    // Filter by area
    if (criteria.areaMin || criteria.areaMax) {
        results = results.filter(p => {
            const area = parseFloat(p.area.replace(/[^0-9.]/g, ''));
            const min = criteria.areaMin ? parseFloat(criteria.areaMin) : 0;
            const max = criteria.areaMax ? parseFloat(criteria.areaMax) : Infinity;
            return area >= min && area <= max;
        });
    }
    
    // Display results
    displaySearchResults(results);
}

function displaySearchResults(results) {
    const resultsSection = document.getElementById('searchResults');
    const resultsGrid = document.getElementById('searchResultsGrid');
    const resultsCount = document.getElementById('resultsCount');
    
    resultsSection.style.display = 'block';
    resultsCount.textContent = results.length;
    
    if (results.length === 0) {
        resultsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #8b4513; margin-bottom: 1rem; display: block;"></i>
                <h3 style="color: #3e2723; margin-bottom: 1rem;">Няма намерени имоти</h3>
                <p style="color: #5d4e37;">Опитайте с различни критерии за търсене</p>
            </div>
        `;
    } else {
        resultsGrid.innerHTML = results.map(property => createPropertyCard(property)).join('');
    }
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Show notification
    showNotification(`Намерени са ${results.length} имота, отговарящи на вашите критерии!`, 'success');
    
    // Reinitialize animations
    setTimeout(() => {
        initializeAnimations();
    }, 100);
}

// Check for URL parameters on page load
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Pre-fill form if parameters exist
    if (urlParams.has('type')) {
        document.getElementById('adv-type').value = urlParams.get('type');
    }
    if (urlParams.has('location')) {
        document.getElementById('adv-location').value = urlParams.get('location');
    }
    if (urlParams.has('price')) {
        const priceRange = urlParams.get('price');
        // Parse price range and set min/max
    }
    
    // Auto-submit if parameters exist
    if (urlParams.toString()) {
        setTimeout(() => {
            document.getElementById('advancedSearchForm').dispatchEvent(new Event('submit'));
        }, 500);
    }
});