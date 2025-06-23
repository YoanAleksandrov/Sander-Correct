let fullMap = null;
let mapMarkers = [];
let currentMapFilter = 'all';

// Initialize full page map
function initializeFullMap() {
    if (fullMap) return;
    
    // Initialize map centered on Sofia
    fullMap = L.map('fullPageMap').setView([42.6977, 23.3219], 11);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(fullMap);
    
    // Add properties to map
    addPropertiesToMap();
    
    // Update stats
    updateMapStats();
}

// Add properties to map
function addPropertiesToMap() {
    // Clear existing markers
    mapMarkers.forEach(marker => fullMap.removeLayer(marker));
    mapMarkers = [];
    
    let filteredProperties = mapProperties;
    if (currentMapFilter !== 'all') {
        filteredProperties = mapProperties.filter(property => property.type === currentMapFilter);
    }
    
    filteredProperties.forEach(property => {
        // Create custom marker
        const markerElement = L.divIcon({
            className: 'custom-marker-container',
            html: `<div class="custom-marker ${property.type}">${getPropertyTypeIcon(property.type)}</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        
        // Create popup content
        const popupContent = `
            <div class="property-popup">
                <div class="popup-image">
                    <i class="fas fa-${getPropertyIcon(property.type)}"></i>
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
                        <button class="popup-btn popup-btn-primary" onclick="contactAboutMapProperty('${property.title}')">
                            <i class="fas fa-phone"></i> Контакт
                        </button>
                        <button class="popup-btn popup-btn-secondary" onclick="scheduleMapViewing('${property.title}')">
                            <i class="fas fa-eye"></i> Оглед
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add marker to map
        const marker = L.marker(property.coordinates, { icon: markerElement })
            .addTo(fullMap)
            .bindPopup(popupContent, {
                maxWidth: 300,
                className: 'custom-popup'
            });
        
        mapMarkers.push(marker);
        
        // Add click animation
        marker.on('click', function() {
            setTimeout(() => {
                const markerEl = this.getElement();
                if (markerEl) {
                    markerEl.querySelector('.custom-marker').style.animation = 'bounce 0.6s ease';
                    setTimeout(() => {
                        markerEl.querySelector('.custom-marker').style.animation = '';
                    }, 600);
                }
            }, 100);
        });
    });
}

// Get property type icon
function getPropertyTypeIcon(type) {
    const icons = {
        'apartment': 'А',
        'house': 'К',
        'land': 'П',
        'commercial': 'Т'
    };
    return icons[type] || 'И';
}

// Get property FA icon
function getPropertyIcon(type) {
    const icons = {
        'apartment': 'building',
        'house': 'home',
        'land': 'map',
        'commercial': 'store'
    };
    return icons[type] || 'building';
}

// Filter map properties
function filterMapProperties(type) {
    currentMapFilter = type;
    
    // Update active button
    document.querySelectorAll('.map-control-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update markers
    addPropertiesToMap();
    
    // Update stats
    updateMapStats();
    
    // Show notification
    const typeNames = {
        'all': 'всички имоти',
        'apartment': 'апартаменти',
        'house': 'къщи',
        'land': 'парцели',
        'commercial': 'търговски обекти'
    };
    
    showNotification(`Показват се ${typeNames[type]} на картата`, 'info');
}

// Update map statistics
function updateMapStats() {
    const totalElement = document.getElementById('totalProperties');
    const filteredElement = document.getElementById('filteredProperties');
    
    if (totalElement && filteredElement) {
        totalElement.textContent = mapProperties.length;
        
        let filteredCount = mapProperties.length;
        if (currentMapFilter !== 'all') {
            filteredCount = mapProperties.filter(p => p.type === currentMapFilter).length;
        }
        filteredElement.textContent = filteredCount;
    }
}

// Contact about map property
window.contactAboutMapProperty = function(propertyTitle) {
    window.location.href = 'contact.html?property=' + encodeURIComponent(propertyTitle);
};

// Schedule map viewing
window.scheduleMapViewing = function(propertyTitle) {
    showNotification(`За да насрочите оглед на "${propertyTitle}", моля обадете се на +359 888 123 456`, 'info');
};

// Add custom CSS for bounce animation
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
`;
document.head.appendChild(style);

// Initialize map on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeFullMap, 500);
    
    // Show notification
    setTimeout(() => {
        showNotification('Използвайте филтрите за да видите различни типове имоти на картата!', 'info');
    }, 2000);
});