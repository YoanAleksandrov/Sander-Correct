// Documents Page JavaScript - documents.js
// ПЪЛЕН РАБОТЕЩ КОД С DEMO РЕЖИМ И ZOOM ФУНКЦИОНАЛНОСТ

let currentDocumentFile = '';
let currentDocumentType = '';
let currentZoom = 100;

document.addEventListener('DOMContentLoaded', function() {
    initializeDocumentsPage();
});

function initializeDocumentsPage() {
    setupFadeInAnimations();
    setupDocumentInteractions();
    setupScrollEffects();
    setupDocumentModalControls();
    setupCategoryAnimations();
    addDynamicStyles();
    setupAccessibility();
    optimizePerformance();
    initializeTooltips();
    initializeDocumentSearch();
    handleThemeChanges();
    
    // Ensure modal close functionality works immediately
    setupModalCloseHandlers();
}

// Dedicated function for modal close handlers
function setupModalCloseHandlers() {
    // Wait for DOM to be fully ready, then set up close handlers
    setTimeout(() => {
        // Try multiple possible selectors for close button
        const possibleCloseSelectors = [
            '.close-btn',
            '.modal-close', 
            '[data-close]',
            '.fa-times',
            '.fa-x',
            '.close',
            '#documentModal .close',
            '#documentModal button[aria-label*="Close"]',
            '#documentModal button[aria-label*="close"]'
        ];
        
        possibleCloseSelectors.forEach(selector => {
            const closeElements = document.querySelectorAll(selector);
            closeElements.forEach(element => {
                // Remove existing listeners to prevent duplicates
                element.removeEventListener('click', closeDocumentModal);
                
                // Add new listener
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Close button clicked:', selector);
                    closeDocumentModal();
                });
            });
        });
        
        // Also add listeners to any element with specific text content
        const allButtons = document.querySelectorAll('#documentModal button');
        allButtons.forEach(button => {
            const text = button.textContent.toLowerCase().trim();
            if (text === 'x' || text === '×' || text === 'close' || text === 'затвори') {
                button.removeEventListener('click', closeDocumentModal);
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Close button found by text:', text);
                    closeDocumentModal();
                });
            }
        });
        
    }, 100);
}

// Fade-in animations
function setupFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Document interactions
function setupDocumentInteractions() {
    const documentItems = document.querySelectorAll('.document-item');
    
    documentItems.forEach(item => {
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px) scale(1.02)';
            
            // Add subtle animation to icon
            const icon = this.querySelector('.document-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            
            // Reset icon animation
            const icon = this.querySelector('.document-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Add click feedback
        item.addEventListener('click', function() {
            // Visual feedback
            this.style.transform = 'translateX(8px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateX(8px) scale(1.02)';
            }, 150);
        });
    });
}

// Scroll effects
function setupScrollEffects() {
    const scrollElements = document.querySelectorAll('.document-item, .info-section');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2
    });

    scrollElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(element);
    });
}

// Category animations
function setupCategoryAnimations() {
    const categories = document.querySelectorAll('.document-category');
    
    categories.forEach((category, index) => {
        category.style.animationDelay = `${index * 0.2}s`;
        
        const categoryHeader = category.querySelector('.category-header');
        if (categoryHeader) {
            categoryHeader.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.category-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(10deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            categoryHeader.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.category-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        }
    });
}

// View document function
function viewDocument(filename, title, type = 'image') {
    currentDocumentFile = filename;
    currentDocumentType = type;
    
    // Track document view
    trackDocumentAction('view', filename);
    
    // Set modal title
    document.getElementById('documentModalTitle').textContent = title;
    
    // Show modal
    const modal = document.getElementById('documentModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Show loading indicator
    document.getElementById('documentLoadingIndicator').style.display = 'flex';
    document.getElementById('pdfViewer').style.display = 'none';
    document.getElementById('imageViewer').style.display = 'none';
    document.getElementById('documentError').style.display = 'none';
    
    // Reset zoom and position
    currentZoom = 100;
    resetDocumentPosition();
    updateZoomDisplay();
    
    // Load document
    loadDocument(filename, type);
}

// Актуализирана loadDocument функция за demo режим
function loadDocument(filename, type) {
    const loading = document.getElementById('documentLoadingIndicator');
    const error = document.getElementById('documentError');
    
    // Симулираме зареждане
    setTimeout(() => {
        loading.style.display = 'none';
        error.style.display = 'none';
        
        if (type === 'image') {
            // Директно показваме demo изображение
            showDemoImage(filename);
        } else {
            // Директно показваме demo PDF
            showDemoPdf(filename);
        }
    }, 800); // Кратка пауза за реалистичност
}

// Demo изображение функция
function showDemoImage(filename) {
    const imageViewer = document.getElementById('imageViewer');
    const pdfViewer = document.getElementById('pdfViewer');
    
    // Скриваме PDF viewer
    pdfViewer.style.display = 'none';
    
    // Създаваме demo изображение
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Размери на canvas
    canvas.width = 800;
    canvas.height = 1000;
    
    // Фон
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Заглавие на документа
    const docTitle = getDocumentDisplayName(filename);
    
    // Заглавие
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(docTitle, canvas.width/2, 80);
    
    // Подзаглавие
    ctx.fillStyle = '#7f8c8d';
    ctx.font = '18px Arial';
    ctx.fillText('DEMO ДОКУМЕНТ', canvas.width/2, 120);
    
    // Лого/Икона (квадрат с инициали)
    ctx.fillStyle = '#3498db';
    ctx.fillRect(canvas.width/2 - 50, 150, 100, 100);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Arial';
    ctx.fillText('РЕ', canvas.width/2, 210);
    
    // Основно съдържание
    ctx.fillStyle = '#2c3e50';
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    
    const content = [
        'Това е демонстрационен документ, който показва как би изглеждал',
        'реалният документ след качване. Документът съдържа следните',
        'основни секции:',
        '',
        '• Заглавна част с данни на агенцията',
        '• Детайли на услугата или договора', 
        '• Условия и клаузи',
        '• Подписи и печати',
        '',
        'За да видите реалното съдържание, моля качете',
        'съответните файлове в папката images/documents/',
        '',
        'Документът поддържа пълна zoom функционалност:',
        '• Използвайте + и - бутоните',
        '• Клавиши + и - на клавиатурата', 
        '• Бутон "Fit to Width" за оптимален размер',
        '• Бутон "Reset" за връщане на 100%',
        '',
        'Zoom диапазон: 25% - 300%'
    ];
    
    let y = 300;
    content.forEach(line => {
        if (line.startsWith('•')) {
            ctx.fillStyle = '#e74c3c';
            ctx.fillText('•', 100, y);
            ctx.fillStyle = '#2c3e50';
            ctx.fillText(line.substring(1), 120, y);
        } else {
            ctx.fillText(line, 100, y);
        }
        y += 25;
    });
    
    // Долен колонтитул
    ctx.fillStyle = '#95a5a6';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Реал Естейт - Вашият надежден партньор в недвижимите имоти', canvas.width/2, canvas.height - 30);
    
    // Конвертираме canvas в изображение
    const dataURL = canvas.toDataURL('image/png');
    
    // Задаваме като източник на imageViewer
    imageViewer.src = dataURL;
    imageViewer.alt = docTitle;
    imageViewer.style.display = 'block';
    
    // Важно: уведомяваме че е заредено
    imageViewer.onload = function() {
        console.log(`Demo изображение заредено: ${filename}`);
    };
}

// Demo PDF функция
function showDemoPdf(filename) {
    const pdfViewer = document.getElementById('pdfViewer');
    const imageViewer = document.getElementById('imageViewer');
    
    // Скриваме image viewer
    imageViewer.style.display = 'none';
    
    const docTitle = getDocumentDisplayName(filename);
    
    // Създаваме HTML съдържание за PDF viewer
    const pdfContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>${docTitle}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 40px;
                    line-height: 1.6;
                    background: white;
                    color: #333;
                }
                .header {
                    text-align: center;
                    border-bottom: 3px solid #3498db;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .header h1 {
                    color: #2c3e50;
                    margin: 0;
                    font-size: 28px;
                }
                .header .subtitle {
                    color: #7f8c8d;
                    font-style: italic;
                    margin-top: 10px;
                }
                .logo {
                    width: 80px;
                    height: 80px;
                    background: #3498db;
                    margin: 20px auto;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 24px;
                }
                .content {
                    margin: 30px 0;
                }
                .section {
                    margin: 25px 0;
                    padding: 20px;
                    border-left: 4px solid #3498db;
                    background: #f8f9fa;
                }
                .section h3 {
                    color: #2c3e50;
                    margin-top: 0;
                }
                .highlight {
                    background: #fff3cd;
                    padding: 15px;
                    border-radius: 5px;
                    border-left: 4px solid #ffc107;
                    margin: 20px 0;
                }
                .footer {
                    margin-top: 50px;
                    text-align: center;
                    color: #7f8c8d;
                    border-top: 2px solid #ecf0f1;
                    padding-top: 20px;
                }
                ul {
                    margin: 15px 0;
                    padding-left: 20px;
                }
                li {
                    margin: 8px 0;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>${docTitle}</h1>
                <div class="subtitle">ДЕМОНСТРАЦИОНЕН ДОКУМЕНТ</div>
                <div class="logo">РЕ</div>
            </div>
            
            <div class="content">
                <div class="highlight">
                    <strong>Внимание:</strong> Това е демонстрационно съдържание. За да видите реалните документи, 
                    качете съответните PDF файлове в папката documents/
                </div>
                
                <div class="section">
                    <h3>Основна информация</h3>
                    <p>Този документ представлява примерно съдържание за <strong>${docTitle}</strong>. 
                    В реалната версия тук ще намерите подробната информация относно услугата или договора.</p>
                </div>
                
                <div class="section">
                    <h3>Функционалности на viewer-а</h3>
                    <ul>
                        <li><strong>Zoom In/Out:</strong> Използвайте + и - бутоните</li>
                        <li><strong>Клавиатурни преки пътища:</strong> +, -, 0 (reset), F (fit to width)</li>
                        <li><strong>Диапазон:</strong> 25% до 300% zoom</li>
                        <li><strong>Auto-fit:</strong> Автоматично приспособяване към ширината</li>
                    </ul>
                </div>
                
                <div class="section">
                    <h3>Как да добавите реални документи</h3>
                    <ol>
                        <li>Създайте папка <code>documents/</code> в root директорията</li>
                        <li>Качете PDF файловете с точните имена от HTML</li>
                        <li>Или използвайте папка <code>images/documents/</code> за изображения</li>
                        <li>Уверете се че имената съвпадат с onclick функциите</li>
                    </ol>
                </div>
                
                <div class="section">
                    <h3>Поддържани формати</h3>
                    <ul>
                        <li>PDF документи (.pdf)</li>
                        <li>Изображения (.jpg, .jpeg, .png)</li>
                        <li>Автоматично разпознаване на типа</li>
                    </ul>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>Реал Естейт</strong> - Вашият надежден партньор в недвижимите имоти</p>
                <p>Този документ е генериран автоматично в demo режим</p>
            </div>
        </body>
        </html>
    `;
    
    // Задаваме HTML съдържанието
    pdfViewer.srcdoc = pdfContent;
    pdfViewer.style.display = 'block';
    
    console.log(`Demo PDF заредено: ${filename}`);
}

// Setup modal controls
function setupDocumentModalControls() {
    // Zoom controls
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const fitToWidthBtn = document.getElementById('fitToWidth');
    const resetZoomBtn = document.getElementById('resetZoom');
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', function() {
            if (currentZoom < 300) {
                currentZoom += 25;
                updateDocumentZoom();
            }
        });
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', function() {
            if (currentZoom > 25) {
                currentZoom -= 25;
                updateDocumentZoom();
            }
        });
    }
    
    if (fitToWidthBtn) {
        fitToWidthBtn.addEventListener('click', function() {
            fitImageToWidth();
        });
    }
    
    if (resetZoomBtn) {
        resetZoomBtn.addEventListener('click', function() {
            currentZoom = 100;
            resetDocumentPosition();
            updateDocumentZoom();
        });
    }
    
    // Download from modal
    const downloadBtn = document.getElementById('downloadFromModal');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            downloadDocument(currentDocumentFile);
        });
    }
    
    // Close modal controls - множество селектори за сигурност
    const closeButtons = document.querySelectorAll('#documentModal .close-btn, #documentModal .modal-close, #documentModal [data-close], #documentModal .fa-times');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeDocumentModal();
        });
    });
    
    // Close modal on overlay click
    const overlay = document.querySelector('.document-modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            // Затвори само ако е кликнато върху overlay-а, не върху modal съдържанието
            if (e.target === overlay) {
                closeDocumentModal();
            }
        });
    }
    
    // Setup document dragging functionality
    setupDocumentDragging();
    
    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('documentModal');
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeDocumentModal();
            } else if (e.key === '+' || e.key === '=') {
                if (currentZoom < 300) {
                    currentZoom += 25;
                    updateDocumentZoom();
                }
            } else if (e.key === '-') {
                if (currentZoom > 25) {
                    currentZoom -= 25;
                    updateDocumentZoom();
                }
            } else if (e.key === '0') {
                currentZoom = 100;
                resetDocumentPosition();
                updateDocumentZoom();
            } else if (e.key.toLowerCase() === 'f') {
                fitImageToWidth();
            }
        }
    });
}

// Setup document dragging functionality
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let documentOffsetX = 0;
let documentOffsetY = 0;

function setupDocumentDragging() {
    const modalBody = document.querySelector('.document-modal-body');
    if (!modalBody) return;
    
    modalBody.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    
    // Touch events for mobile
    modalBody.addEventListener('touchstart', startDragTouch);
    document.addEventListener('touchmove', dragTouch);
    document.addEventListener('touchend', endDrag);
}

function startDrag(e) {
    const modal = document.getElementById('documentModal');
    if (!modal || !modal.classList.contains('active')) return;
    
    // Only allow dragging if document is zoomed
    if (currentZoom <= 100) return;
    
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    
    const modalBody = document.querySelector('.document-modal-body');
    modalBody.style.cursor = 'grabbing';
    
    e.preventDefault();
}

function startDragTouch(e) {
    if (e.touches.length !== 1) return;
    
    const modal = document.getElementById('documentModal');
    if (!modal || !modal.classList.contains('active')) return;
    
    if (currentZoom <= 100) return;
    
    isDragging = true;
    dragStartX = e.touches[0].clientX;
    dragStartY = e.touches[0].clientY;
    
    e.preventDefault();
}

function drag(e) {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;
    
    // Calculate new positions with boundaries
    const newOffsetX = documentOffsetX + deltaX;
    const newOffsetY = documentOffsetY + deltaY;
    
    // Apply boundaries
    const constrainedOffset = applyDragBoundaries(newOffsetX, newOffsetY);
    documentOffsetX = constrainedOffset.x;
    documentOffsetY = constrainedOffset.y;
    
    updateDocumentPosition();
    
    dragStartX = e.clientX;
    dragStartY = e.clientY;
}

function dragTouch(e) {
    if (!isDragging || e.touches.length !== 1) return;
    
    const deltaX = e.touches[0].clientX - dragStartX;
    const deltaY = e.touches[0].clientY - dragStartY;
    
    // Calculate new positions with boundaries
    const newOffsetX = documentOffsetX + deltaX;
    const newOffsetY = documentOffsetY + deltaY;
    
    // Apply boundaries
    const constrainedOffset = applyDragBoundaries(newOffsetX, newOffsetY);
    documentOffsetX = constrainedOffset.x;
    documentOffsetY = constrainedOffset.y;
    
    updateDocumentPosition();
    
    dragStartX = e.touches[0].clientX;
    dragStartY = e.touches[0].clientY;
    
    e.preventDefault();
}

function applyDragBoundaries(offsetX, offsetY) {
    const modalBody = document.querySelector('.document-modal-body');
    if (!modalBody) return { x: offsetX, y: offsetY };
    
    const scale = currentZoom / 100;
    const modalRect = modalBody.getBoundingClientRect();
    
    // Get document dimensions (estimated)
    let docWidth = 800;  // Default canvas width
    let docHeight = 1000; // Default canvas height
    
    const imageViewer = document.getElementById('imageViewer');
    const pdfViewer = document.getElementById('pdfViewer');
    
    if (currentDocumentType === 'image' && imageViewer && imageViewer.naturalWidth) {
        docWidth = imageViewer.naturalWidth;
        docHeight = imageViewer.naturalHeight;
    }
    
    // Calculate scaled document dimensions
    const scaledWidth = docWidth * scale;
    const scaledHeight = docHeight * scale;
    
    // Calculate boundaries - how much the document can be moved
    const maxOffsetX = Math.max(0, (scaledWidth - modalRect.width) / 2 / scale);
    const maxOffsetY = Math.max(0, (scaledHeight - modalRect.height) / 2 / scale);
    
    // Constrain offsets
    const constrainedX = Math.max(-maxOffsetX, Math.min(maxOffsetX, offsetX));
    const constrainedY = Math.max(-maxOffsetY, Math.min(maxOffsetY, offsetY));
    
    return { x: constrainedX, y: constrainedY };
}

function endDrag() {
    if (!isDragging) return;
    
    isDragging = false;
    
    const modalBody = document.querySelector('.document-modal-body');
    if (modalBody) {
        modalBody.style.cursor = currentZoom > 100 ? 'grab' : 'default';
    }
}

function updateDocumentPosition() {
    const imageViewer = document.getElementById('imageViewer');
    const pdfViewer = document.getElementById('pdfViewer');
    
    const scale = currentZoom / 100;
    const transform = `scale(${scale}) translate(${documentOffsetX / scale}px, ${documentOffsetY / scale}px)`;
    
    if (currentDocumentType === 'image' && imageViewer) {
        imageViewer.style.transform = transform;
    } else if (currentDocumentType === 'pdf' && pdfViewer && pdfViewer.srcdoc) {
        pdfViewer.style.transform = transform;
    }
}

function resetDocumentPosition() {
    documentOffsetX = 0;
    documentOffsetY = 0;
    updateDocumentPosition();
}
function fitImageToWidth() {
    const imageViewer = document.getElementById('imageViewer');
    const pdfViewer = document.getElementById('pdfViewer');
    const modalBody = document.querySelector('.document-modal-body');
    
    if (modalBody) {
        const modalWidth = modalBody.offsetWidth - 40; // Account for padding
        
        if (currentDocumentType === 'image' && imageViewer && imageViewer.style.display !== 'none') {
            // For images, calculate zoom to fit width
            const imageNaturalWidth = imageViewer.naturalWidth || 800;
            const fitZoom = Math.round((modalWidth / imageNaturalWidth) * 100);
            currentZoom = Math.max(25, Math.min(300, fitZoom));
            updateDocumentZoom();
        } else if (pdfViewer && pdfViewer.style.display !== 'none') {
            // For PDFs, set a reasonable fit zoom
            currentZoom = 85;
            updateDocumentZoom();
        }
    }
}

// Update document zoom
function updateDocumentZoom() {
    const imageViewer = document.getElementById('imageViewer');
    const pdfViewer = document.getElementById('pdfViewer');
    const modalBody = document.querySelector('.document-modal-body');
    
    if (currentDocumentType === 'image' && imageViewer) {
        const scale = currentZoom / 100;
        const transform = `scale(${scale}) translate(${documentOffsetX / scale}px, ${documentOffsetY / scale}px)`;
        imageViewer.style.transform = transform;
        imageViewer.style.transformOrigin = 'center center';
        imageViewer.style.transition = 'transform 0.3s ease';
    } else if (currentDocumentType === 'pdf' && pdfViewer) {
        if (pdfViewer && pdfViewer.src && !pdfViewer.srcdoc) {
            // For real PDFs, update the URL with new zoom
            const baseUrl = pdfViewer.src.split('#')[0];
            pdfViewer.src = `${baseUrl}#view=FitH&toolbar=1&navpanes=0&scrollbar=1&page=1&zoom=${currentZoom}`;
        } else if (pdfViewer && pdfViewer.srcdoc) {
            // For demo PDFs, simulate zoom with transform
            const scale = currentZoom / 100;
            const transform = `scale(${scale}) translate(${documentOffsetX / scale}px, ${documentOffsetY / scale}px)`;
            pdfViewer.style.transform = transform;
            pdfViewer.style.transformOrigin = 'top left';
            pdfViewer.style.transition = 'transform 0.3s ease';
            
            // Adjust container size to account for scaling
            if (scale !== 1) {
                pdfViewer.style.width = `${100 / scale}%`;
                pdfViewer.style.height = `${100 / scale}%`;
            } else {
                pdfViewer.style.width = '100%';
                pdfViewer.style.height = '100%';
            }
        }
    }
    
    // Update cursor based on zoom level
    if (modalBody) {
        modalBody.style.cursor = currentZoom > 100 ? 'grab' : 'default';
    }
    
    updateZoomDisplay();
}

// Update zoom display
function updateZoomDisplay() {
    const zoomLevel = document.getElementById('zoomLevel');
    if (zoomLevel) {
        zoomLevel.textContent = currentZoom + '%';
    }
}

// Close document modal
function closeDocumentModal() {
    const modal = document.getElementById('documentModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset document position
        resetDocumentPosition();
        
        // Clear viewers
        setTimeout(() => {
            const pdfViewer = document.getElementById('pdfViewer');
            const imageViewer = document.getElementById('imageViewer');
            
            if (pdfViewer) {
                pdfViewer.src = '';
                pdfViewer.srcdoc = '';
                pdfViewer.style.transform = 'scale(1)';
                pdfViewer.style.width = '100%';
                pdfViewer.style.height = '100%';
            }
            if (imageViewer) {
                imageViewer.src = '';
                imageViewer.style.transform = 'scale(1)';
            }
        }, 300);
    }
}

// Download current document
function downloadCurrentDocument() {
    if (currentDocumentFile) {
        downloadDocument(currentDocumentFile);
    }
}

// Download document function
function downloadDocument(filename) {
    // Track download action
    trackDocumentAction('download', filename);
    
    // Show loading state
    showDownloadFeedback(filename);
    
    // В реална имплементация тук ще бъде логиката за сваляне на файла
    console.log(`Downloading: ${filename}`);
    
    // Simulate download process
    setTimeout(() => {
        try {
            // За демо цели показваме съобщение
            showSuccessMessage(`Документът "${getDocumentDisplayName(filename)}" е готов за изтегляне.`);
        } catch (err) {
            logError(err, 'downloadDocument');
            showErrorMessage(`Грешка при изтегляне на "${getDocumentDisplayName(filename)}".`);
        }
    }, 1000);
}

// Show download feedback
function showDownloadFeedback(filename) {
    const displayName = getDocumentDisplayName(filename);
    
    // Create temporary notification
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Подготвяне на "${displayName}" за изтегляне...</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(139, 69, 19, 0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 350px;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Get document display name
function getDocumentDisplayName(filename) {
    const displayNames = {
        'protocol-ogled-pokupka.jpg': 'Протокол за оглед за покупка',
        'dogovor-posrednichestvo-prodajba.jpg': 'Договор за посредничество при продажба',
        'ekskluzivenm-dogovor-prodajba.jpg': 'Ексклузивен договор за посредничество при продажба',
        'dogovor-naem-posrednichestvo.jpg': 'Договор за посредничество при наем',
        'dogovor-investitori.jpg': 'Договор за посредничество за инвеститори',
        'deklaracia-suglasie.jpg': 'Декларация за съгласие',
        'uslovnia-polzvane.jpg': 'Условия за ползване'
    };
    
    return displayNames[filename] || filename.replace(/\.(jpg|jpeg|png|pdf)$/i, '');
}

// Dynamic styles
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes documentHover {
            0% { transform: translateX(0) scale(1); }
            50% { transform: translateX(4px) scale(1.01); }
            100% { transform: translateX(8px) scale(1.02); }
        }
        
        @keyframes iconFloat {
            0% { transform: scale(1) rotate(0deg) translateY(0px); }
            50% { transform: scale(1.05) rotate(2deg) translateY(-2px); }
            100% { transform: scale(1.1) rotate(5deg) translateY(-3px); }
        }
        
        .document-item:hover {
            animation: documentHover 0.3s ease forwards;
        }
        
        .document-icon:hover {
            animation: iconFloat 0.4s ease forwards;
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .fade-in.visible {
            animation: slideInRight 0.8s ease forwards;
        }
        
        /* Document viewer cursor styles */
        .document-modal-body {
            user-select: none;
        }
        
        .document-modal-body.draggable {
            cursor: grab;
        }
        
        .document-modal-body.dragging {
            cursor: grabbing;
        }
    `;
    document.head.appendChild(style);
}

// Utility functions
function isValidDocumentType(filename) {
    const allowedExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif'];
    const extension = filename.split('.').pop().toLowerCase();
    return allowedExtensions.includes(extension);
}

// Show success message
function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 120px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
            z-index: 10001;
            font-weight: 600;
            max-width: 350px;
        ">
            <i class="fas fa-check-circle" style="margin-right: 8px;"></i>
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Show error message
function showErrorMessage(message) {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 120px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
            z-index: 10001;
            font-weight: 600;
            max-width: 350px;
        ">
            <i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i>
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 4000);
}

// Document analytics (for tracking document views/downloads)
function trackDocumentAction(action, filename) {
    console.log(`Document ${action}: ${filename} at ${new Date().toISOString()}`);
    
    // В реална имплементация тук може да изпратите данни към analytics service
    try {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': 'Documents',
                'event_label': filename,
                'value': 1
            });
        }
    } catch (err) {
        logError(err, 'trackDocumentAction');
    }
}

// Error logging functionality
function logError(error, context) {
    console.error(`Error in ${context}:`, error);
    
    // В реална имплементация тук може да изпратите грешката към error tracking service
    try {
        if (typeof Sentry !== 'undefined') {
            Sentry.captureException(error, {
                tags: {
                    context: context
                }
            });
        }
    } catch (err) {
        console.error('Failed to log error to external service:', err);
    }
}

// Accessibility improvements
function setupAccessibility() {
    // Add ARIA labels for better screen reader support
    const documentItems = document.querySelectorAll('.document-item');
    documentItems.forEach(item => {
        const titleElement = item.querySelector('.document-info h4');
        if (titleElement) {
            const title = titleElement.textContent;
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `Преглед на документ: ${title}`);
            item.setAttribute('tabindex', '0');
            
            // Add keyboard navigation
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
    });
    
    // Add ARIA labels for buttons
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.setAttribute('aria-label', 'Преглед на документ');
    });
    
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.setAttribute('aria-label', 'Изтегляне на документ');
    });
    
    // Add modal accessibility
    const modal = document.getElementById('documentModal');
    if (modal) {
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'documentModalTitle');
        
        // Focus management
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                // Trap focus within modal
                const focusableElements = modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }
}

// Performance optimizations
function optimizePerformance() {
    // Lazy loading for animations
    const animatedElements = document.querySelectorAll('.document-item, .fade-in');
    
    // Use Intersection Observer for better performance
    const performanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                performanceObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    animatedElements.forEach(element => {
        performanceObserver.observe(element);
    });
    
    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Handle scroll events here if needed
        }, 16); // ~60fps
    });
    
    // Preload critical resources
    const preloadLinks = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Initialize tooltips and help texts
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background: #2c3e50;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                white-space: nowrap;
                z-index: 10000;
                opacity: 0;
                transform: translateY(-10px);
                transition: all 0.3s ease;
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(0)';
            }, 10);
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip && this._tooltip.parentNode) {
                this._tooltip.style.opacity = '0';
                this._tooltip.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    if (this._tooltip && this._tooltip.parentNode) {
                        this._tooltip.parentNode.removeChild(this._tooltip);
                    }
                }, 300);
            }
        });
    });
}

// Search functionality (if needed in future)
function initializeDocumentSearch() {
    const searchInput = document.getElementById('documentSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const documentItems = document.querySelectorAll('.document-item');
            
            documentItems.forEach(item => {
                const title = item.querySelector('.document-info h4').textContent.toLowerCase();
                const description = item.querySelector('.document-info p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
        });
    }
}

// Dark mode support (if implemented)
function handleThemeChanges() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    function handleThemeChange(e) {
        if (e.matches) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }
    
    prefersDarkScheme.addEventListener('change', handleThemeChange);
    handleThemeChange(prefersDarkScheme);
}

// Export functions for external use
window.DocumentsPage = {
    viewDocument: viewDocument,
    downloadDocument: downloadDocument,
    closeDocumentModal: closeDocumentModal,
    updateDocumentZoom: updateDocumentZoom,
    initializeDocumentsPage: initializeDocumentsPage
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDocumentsPage);
} else {
    initializeDocumentsPage();
}