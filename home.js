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

// Initialize mini map
function initializeMiniMap() {
    const miniMapElement = document.getElementById('miniMap');
    if (!miniMapElement || typeof L === 'undefined') return;
    
    // Initialize mini map
    const miniMap = L.map('miniMap', {
        center: [42.6977, 23.3219],
        zoom: 11,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        tap: false,
        touchZoom: false
    });
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ''
    }).addTo(miniMap);
    
    // Add sample markers
    const sampleProperties = mapProperties.slice(0, 4);
    sampleProperties.forEach(property => {
        const icon = L.divIcon({
            className: 'custom-marker-container',
            html: `<div class="custom-marker ${property.type}" style="width: 20px; height: 20px; font-size: 0.6rem;">${property.type === 'apartment' ? 'A' : property.type === 'house' ? 'К' : 'П'}</div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        L.marker(property.coordinates, { icon: icon })
            .addTo(miniMap)
            .bindPopup(`<b>${property.price}</b><br>${property.location}`);
    });
}

// Handle property card clicks for map pins
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('map-pin')) {
        const price = e.target.textContent;
        const pinClass = e.target.className.split(' ')[1];
        
        let location = '';
        let description = '';
        
        switch(pinClass) {
            case 'pin-1':
                location = 'София, Център';
                description = `Луксозен апартамент в центъра на София за ${price}. Отлична локация с всички удобства наблизо.`;
                break;
            case 'pin-2':
                location = 'София, Лозенец';
                description = `Просторен тристаен апартамент в престижния квартал Лозенец за ${price}. Модерен и напълно обзаведен.`;
                break;
            case 'pin-3':
                location = 'София, Витоша';
                description = `Двустаен апартамент с гледка към Витоша за ${price}. Тиха локация с лесен достъп до центъра.`;
                break;
            case 'pin-4':
                location = 'София, Бояна';
                description = `Ексклузивна вила в Бояна за ${price}. Голям двор, басейн и панорамна гледка към планината.`;
                break;
        }
        
        showPropertyModal(`Имот в ${location}`, price, location, description);
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProperties();
    
    // Initialize mini map if Leaflet is available
    if (typeof L !== 'undefined') {
        setTimeout(initializeMiniMap, 500);
    }
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Добре дошли в Sander Correct! Открийте идеалния имот за вас.', 'info');
    }, 2000);
});