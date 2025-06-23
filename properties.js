let currentFilter = 'all';

// Property filtering
function filterProperties(type) {
    currentFilter = type;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadProperties();
}

// Load properties
function loadProperties() {
    const grid = document.getElementById('propertiesGrid');
    if (!grid) return;
    
    let filteredProperties = properties;
    
    if (currentFilter !== 'all') {
        filteredProperties = properties.filter(property => property.type === currentFilter);
    }
    
    grid.innerHTML = filteredProperties.map(property => createPropertyCard(property)).join('');
    
    // Update count
    showNotification(`Показани са ${filteredProperties.length} имота`, 'info');
    
    // Reinitialize animations
    setTimeout(() => {
        initializeAnimations();
    }, 100);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProperties();
});