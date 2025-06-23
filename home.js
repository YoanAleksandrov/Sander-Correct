// Load featured properties
function loadFeaturedProperties() {
    const grid = document.getElementById('featuredProperties');
    if (!grid) return;
    
    const featuredProperties = properties.filter(property => property.featured).slice(0, 6);
    grid.innerHTML = featuredProperties.map(property => createPropertyCard(property)).join('');
    
    // Reinitialize animations
    setTimeout(() => {
        initializeAnimations();
    }, 100);
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProperties();
    
    // Initialize home map if Leaflet is available
    if (typeof L !== 'undefined') {
        setTimeout(initializeHomeMap, 500);
    }
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Добре дошли в Sander Correct! Открийте идеалния имот за вас.', 'info');
    }, 2000);
});