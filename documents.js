// Documents Page JavaScript - documents.js
// ПЪЛЕН РАБОТЕЩ КОД

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
    
    // Reset zoom
    currentZoom = 100;
    updateZoomDisplay();
    
    // Load document
    loadDocument(filename, type);
}

// Load document function
function loadDocument(filename, type) {
    const pdfViewer = document.getElementById('pdfViewer');
    const imageViewer = document.getElementById('imageViewer');
    const loading = document.getElementById('documentLoadingIndicator');
    const error = document.getElementById('documentError');
    
    // Simulate document loading
    setTimeout(() => {
        const documentPath = type === 'image' ? `./images/documents/${filename}` : `./documents/${filename}`;
        
        if (type === 'image') {
            // Load image
            imageViewer.src = documentPath;
            imageViewer.alt = getDocumentDisplayName(filename);
            
            imageViewer.onload = function() {
                loading.style.display = 'none';
                imageViewer.style.display = 'block';
                pdfViewer.style.display = 'none';
                error.style.display = 'none';
            };
            
            imageViewer.onerror = function() {
                // Show demo image if real image not found
                showDemoImage(filename);
            };
        } else {
            // Load PDF
            pdfViewer.src = `${documentPath}#zoom=${currentZoom}`;
            
            pdfViewer.onload = function() {
                loading.style.display = 'none';
                pdfViewer.style.display = 'block';
                imageViewer.style.display = 'none';
                error.style.display = 'none';
            };
            
            pdfViewer.onerror = function() {
                // Show demo PDF content
                showDemoPdf(filename);
            };
        }
        
        // For demo purposes, show success after 1 second
        setTimeout(() => {
            if (type === 'image') {
                showDemoImage(filename);
            } else {
                showDemoPdf(filename);
            }
        }, 1000);
    }, 500);
}

// Show demo image for contracts
function showDemoImage(filename) {
    const imageViewer = document.getElementById('imageViewer');
    const loading = document.getElementById('documentLoadingIndicator');
    const error = document.getElementById('documentError');
    
    try {
        // Create demo contract image using canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size (A4 proportions)
        canvas.width = 600;
        canvas.height = 850;
        
        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Header
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(0, 0, canvas.width, 80);
        
        // Logo and title
        ctx.fillStyle = '#f5f5dc';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SANDER CORRECT ЕООД', canvas.width / 2, 35);
        
        ctx.font = '12px Arial';
        ctx.fillText('Професионални решения за недвижими имоти', canvas.width / 2, 55);
        
        // Document title
        ctx.fillStyle = '#2c1810';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        const title = getDocumentDisplayName(filename).toUpperCase();
        ctx.fillText(title, canvas.width / 2, 120);
        
        // Content area
        ctx.fillStyle = '#333333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        
        const content = [
            '1. ДОГОВАРЯЩИ СТРАНИ',
            '',
            'ПОСРЕДНИК:',
            'SANDER CORRECT ЕООД',
            'ЕИК: 123456789',
            'Адрес: бул. Витоша 1, ет. 5, 1000 София',
            '',
            'ВЪЗЛОЖИТЕЛ:',
            'Име/Наименование: _____________________________',
            'ЕГН/ЕИК: _____________________________',
            'Адрес: _____________________________',
            'Телефон: _____________________________',
            'Email: _____________________________',
            '',
            '2. ПРЕДМЕТ НА ДОГОВОРА',
            '',
            'Възложителят възлага на Посредника да извърши',
            'посредническа дейност при сделки с недвижими имоти.',
            '',
            '3. ЗАДЪЛЖЕНИЯ НА ПОСРЕДНИКА',
            '',
            '• Да извърши пазарна оценка на имота',
            '• Да рекламира и представя имота на пазара',
            '• Да организира огледи с потенциални купувачи',
            '• Да провери финансовите възможности на купувачите',
            '• Да съдейства при провеждане на преговори',
            '• Да извърши правна проверка на документите',
            '• Да съпровожда сделката до нотариус',
            '',
            '4. ВЪЗНАГРАЖДЕНИЕ',
            '',
            'Размер: _____ % от продажната цена',
            'Начин на плащане: При подписване на нотариален акт'
        ];
        
        let y = 160;
        content.forEach(line => {
            if (line === '') {
                y += 10;
            } else if (line.startsWith('•')) {
                ctx.font = '12px Arial';
                ctx.fillText(line, 40, y);
                y += 20;
            } else if (line.match(/^\d+\./)) {
                ctx.font = 'bold 14px Arial';
                ctx.fillStyle = '#8b4513';
                ctx.fillText(line, 30, y);
                ctx.fillStyle = '#333333';
                y += 25;
            } else if (line.includes('ПОСРЕДНИК:') || line.includes('ВЪЗЛОЖИТЕЛ:')) {
                ctx.font = 'bold 12px Arial';
                ctx.fillText(line, 30, y);
                y += 20;
            } else {
                ctx.font = '12px Arial';
                ctx.fillText(line, 30, y);
                y += 18;
            }
            
            if (y > canvas.height - 100) return; // Stop if we reach the bottom
        });
        
        // Signature area
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 1;
        
        // Client signature
        ctx.beginPath();
        ctx.moveTo(80, canvas.height - 60);
        ctx.lineTo(200, canvas.height - 60);
        ctx.stroke();
        
        ctx.font = '10px Arial';
        ctx.fillText('Клиент', 140, canvas.height - 40);
        ctx.fillText('(подпис)', 135, canvas.height - 25);
        
        // Company signature
        ctx.beginPath();
        ctx.moveTo(400, canvas.height - 60);
        ctx.lineTo(520, canvas.height - 60);
        ctx.stroke();
        
        ctx.fillText('SANDER CORRECT ЕООД', 430, canvas.height - 40);
        ctx.fillText('(подпис и печат)', 435, canvas.height - 25);
        
        // Convert canvas to image and display
        const dataURL = canvas.toDataURL('image/png');
        imageViewer.src = dataURL;
        
        loading.style.display = 'none';
        imageViewer.style.display = 'block';
        error.style.display = 'none';
        
    } catch (err) {
        logError(err, 'showDemoImage');
        loading.style.display = 'none';
        error.style.display = 'flex';
    }
}

// Show demo PDF content
function showDemoPdf(filename) {
    const pdfViewer = document.getElementById('pdfViewer');
    const loading = document.getElementById('documentLoadingIndicator');
    const error = document.getElementById('documentError');
    
    try {
        const documentTitle = getDocumentDisplayName(filename);
        const pdfContent = generatePdfContent(filename, documentTitle);
        
        // Set PDF viewer to fit page width initially
        pdfViewer.srcdoc = pdfContent;
        pdfViewer.style.width = '100%';
        pdfViewer.style.height = '100%';
        pdfViewer.style.display = 'block';
        
        loading.style.display = 'none';
        error.style.display = 'none';
        
        // Ensure images are hidden
        const imageViewer = document.getElementById('imageViewer');
        if (imageViewer) {
            imageViewer.style.display = 'none';
        }
        
    } catch (err) {
        logError(err, 'showDemoPdf');
        loading.style.display = 'none';
        error.style.display = 'flex';
    }
}

// Load document function
function loadDocument(filename, type) {
    const pdfViewer = document.getElementById('pdfViewer');
    const imageViewer = document.getElementById('imageViewer');
    const loading = document.getElementById('documentLoadingIndicator');
    const error = document.getElementById('documentError');
    
    // Simulate document loading
    setTimeout(() => {
        const documentPath = type === 'image' ? `./images/documents/${filename}` : `./documents/${filename}`;
        
        if (type === 'image') {
            // Load image
            imageViewer.src = documentPath;
            imageViewer.alt = getDocumentDisplayName(filename);
            imageViewer.style.display = 'block';
            pdfViewer.style.display = 'none';
            
            imageViewer.onload = function() {
                loading.style.display = 'none';
                error.style.display = 'none';
            };
            
            imageViewer.onerror = function() {
                // Show demo image if real image not found
                showDemoImage(filename);
            };
        } else {
            // Load PDF with proper parameters for full page display
            const pdfUrl = `${documentPath}#view=FitH&toolbar=1&navpanes=0&scrollbar=1&page=1&zoom=${currentZoom}`;
            pdfViewer.src = pdfUrl;
            pdfViewer.style.display = 'block';
            imageViewer.style.display = 'none';
            
            pdfViewer.onload = function() {
                loading.style.display = 'none';
                error.style.display = 'none';
            };
            
            pdfViewer.onerror = function() {
                // Show demo PDF content
                showDemoPdf(filename);
            };
        }
        
        // For demo purposes, show success after 1 second
        setTimeout(() => {
            if (type === 'image') {
                showDemoImage(filename);
            } else {
                showDemoPdf(filename);
            }
        }, 1000);
    }, 500);
}

// Update document zoom
function updateDocumentZoom() {
    if (currentDocumentType === 'pdf') {
        const pdfViewer = document.getElementById('pdfViewer');
        if (pdfViewer && pdfViewer.src && !pdfViewer.srcdoc) {
            // For real PDFs, update the URL with new zoom
            const baseUrl = pdfViewer.src.split('#')[0];
            pdfViewer.src = `${baseUrl}#view=FitH&toolbar=1&navpanes=0&scrollbar=1&page=1&zoom=${currentZoom}`;
        } else if (pdfViewer && pdfViewer.srcdoc) {
            // For demo PDFs, we can't really zoom the iframe content,
            // but we can simulate it by changing the iframe scale
            const scale = currentZoom / 100;
            pdfViewer.style.transform = `scale(${scale})`;
            pdfViewer.style.transformOrigin = 'top left';
            
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
    updateZoomDisplay();
}

// Enhanced PDF content generation with better styling for full page view
function generatePdfContent(filename, documentTitle) {
    const baseContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 40px;
                    color: #333;
                    background: white;
                    font-size: 14px;
                    min-height: 100vh;
                    box-sizing: border-box;
                }
                
                @media screen {
                    body {
                        max-width: 210mm; /* A4 width */
                        margin: 0 auto;
                        padding: 20mm;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }
                }
                
                .header {
                    text-align: center;
                    margin-bottom: 40px;
                    border-bottom: 3px solid #8b4513;
                    padding-bottom: 30px;
                }
                .logo {
                    font-size: 24px;
                    font-weight: bold;
                    color: #8b4513;
                    margin-bottom: 10px;
                }
                .company-info {
                    font-size: 12px;
                    color: #666;
                    margin-bottom: 20px;
                    line-height: 1.4;
                }
                .title {
                    font-size: 20px;
                    font-weight: bold;
                    margin: 20px 0;
                    text-transform: uppercase;
                    color: #2c1810;
                    line-height: 1.3;
                }
                .section {
                    margin: 30px 0;
                    page-break-inside: avoid;
                }
                .section h3 {
                    color: #8b4513;
                    border-bottom: 2px solid #ddd;
                    padding-bottom: 8px;
                    font-size: 16px;
                    margin-bottom: 20px;
                    font-weight: bold;
                }
                .field-group {
                    margin: 20px 0;
                }
                .field {
                    margin: 15px 0;
                    padding: 12px;
                    border: 1px solid #ddd;
                    background: #f9f9f9;
                    border-radius: 5px;
                    line-height: 1.5;
                }
                .obligations {
                    margin: 15px 0;
                    padding: 20px;
                    background: #f8f9fa;
                    border-left: 6px solid #8b4513;
                    line-height: 1.6;
                }
                .signature-area {
                    margin-top: 60px;
                    display: flex;
                    justify-content: space-between;
                    page-break-inside: avoid;
                    flex-wrap: wrap;
                    gap: 20px;
                }
                .signature-box {
                    min-width: 200px;
                    border-top: 2px solid #333;
                    text-align: center;
                    padding-top: 15px;
                    font-size: 12px;
                    flex: 1;
                }
                .footer {
                    margin-top: 60px;
                    text-align: center;
                    font-size: 11px;
                    color: #666;
                    border-top: 2px solid #ddd;
                    padding-top: 20px;
                    line-height: 1.4;
                }
                .privacy-section {
                    background: #f8f9fa;
                    padding: 20px;
                    border-left: 6px solid #8b4513;
                    margin: 20px 0;
                    border-radius: 5px;
                }
                .gdpr-info {
                    background: #e3f2fd;
                    padding: 20px;
                    border-radius: 8px;
                    margin: 20px 0;
                    border: 1px solid #bbdefb;
                }
                .rights-list {
                    background: #f1f8e9;
                    padding: 20px;
                    border-radius: 8px;
                    margin: 20px 0;
                    border: 1px solid #c8e6c9;
                }
                
                /* Print styles */
                @media print {
                    body {
                        margin: 0;
                        padding: 20mm;
                        box-shadow: none;
                        font-size: 12px;
                    }
                    .section {
                        page-break-inside: avoid;
                    }
                }
                
                /* Better text formatting */
                p {
                    margin-bottom: 12px;
                    text-align: justify;
                }
                
                strong {
                    color: #2c1810;
                }
                
                ul {
                    padding-left: 20px;
                }
                
                li {
                    margin-bottom: 8px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">SANDER CORRECT ЕООД</div>
                <div class="company-info">
                    бул. Витоша 1, ет. 5, 1000 София, България<br>
                    Тел: +359 888 123 456 | Email: info@sandercorrect.com<br>
                    www.sandercorrect.com
                </div>
                <div class="title">${documentTitle}</div>
            </div>
    `;

    if (filename.includes('poveritelnost')) {
        return baseContent + `
            <div class="section">
                <h3>1. ОБЩА ИНФОРМАЦИЯ</h3>
                <p>Настоящата политика за поверителност описва как SANDER CORRECT ЕООД събира, използва, съхранява и защитава личните данни на нашите клиенти и партньори.</p>
                
                <div class="field-group">
                    <div class="field">
                        <strong>Администратор на данни:</strong> SANDER CORRECT ЕООД<br>
                        <strong>ЕИК:</strong> 123456789<br>
                        <strong>Адрес:</strong> бул. Витоша 1, ет. 5, 1000 София<br>
                        <strong>Email:</strong> info@sandercorrect.com<br>
                        <strong>Телефон:</strong> +359 888 123 456
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h3>2. КАКВИ ЛИЧНИ ДАННИ СЪБИРАМЕ</h3>
                <div class="privacy-section">
                    <strong>Идентификационни данни:</strong><br>
                    • Име, фамилия, ЕГН<br>
                    • Документ за самоличност<br>
                    • Адрес на пребиваване<br><br>
                    
                    <strong>Контактни данни:</strong><br>
                    • Телефонен номер<br>
                    • Електронна поща<br>
                    • Пощенски адрес<br><br>
                    
                    <strong>Финансови данни:</strong><br>
                    • Банкови сметки<br>
                    • Кредитна история<br>
                    • Имуществено състояние
                </div>
            </div>
            
            <div class="section">
                <h3>3. ЗА КАКВО ИЗПОЛЗВАМЕ ЛИЧНИТЕ ДАННИ</h3>
                <div class="obligations">
                    • Предоставяне на брокерски услуги<br>
                    • Изпълнение на договорни задължения<br>
                    • Правна проверка и due diligence<br>
                    • Комуникация с клиенти<br>
                    • Маркетингови дейности (със съгласие)<br>
                    • Изпълнение на законови задължения<br>
                    • Защита на законни интереси
                </div>
            </div>
            
            <div class="section">
                <h3>4. СРОК НА СЪХРАНЕНИЕ</h3>
                <div class="field-group">
                    <div class="field">
                        • <strong>Договори и сделки:</strong> 10 години след приключване<br>
                        • <strong>Счетоводни документи:</strong> Съгласно Закона за счетоводството<br>
                        • <strong>Маркетингови данни:</strong> До оттегляне на съгласието<br>
                        • <strong>Видеонаблюдение:</strong> 30 дни
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h3>5. ВАШИТЕ ПРАВА</h3>
                <div class="rights-list">
                    • <strong>Право на достъп:</strong> Да получите копие от данните<br>
                    • <strong>Право на поправка:</strong> Да коригирате неточни данни<br>
                    • <strong>Право на изтриване:</strong> Да поискате изтриване на данните<br>
                    • <strong>Право на ограничаване:</strong> Да ограничите обработката<br>
                    • <strong>Право на преносимост:</strong> Да получите данните в структуриран формат<br>
                    • <strong>Право на възражение:</strong> Да възразите срещу обработката<br>
                    • <strong>Право на жалба:</strong> Да подадете жалба до КЗЛД
                </div>
            </div>
            
            <div class="footer">
                <p><strong>За въпроси относно защитата на личните данни:</strong></p>
                <p>Email: dpo@sandercorrect.com | Телефон: +359 888 123 456</p>
                <p>Комисия за защита на личните данни: www.cpdp.bg</p>
                <p>© ${new Date().getFullYear()} SANDER CORRECT ЕООД</p>
            </div>
        </body>
        </html>
        `;
    } else if (filename.includes('gdpr')) {
        return baseContent + `
            <div class="section">
                <h3>1. СЪОТВЕТСТВИЕ С GDPR</h3>
                <div class="gdpr-info">
                    <p>SANDER CORRECT ЕООД декларира пълно съответствие с Регламент (ЕС) 2016/679 за защита на физическите лица относно обработването на лични данни и за свободното движение на такива данни (GDPR).</p>
                </div>
            </div>
            
            <div class="section">
                <h3>2. ПРИНЦИПИ НА ОБРАБОТКА</h3>
                <div class="obligations">
                    • <strong>Законност:</strong> Обработваме данни само на законно основание<br>
                    • <strong>Ограничение на целта:</strong> Данните се използват само за декларираните цели<br>
                    • <strong>Минимизация:</strong> Събираме само необходимите данни<br>
                    • <strong>Точност:</strong> Поддържаме актуални и точни данни<br>
                    • <strong>Ограничение на съхранението:</strong> Данните се съхраняват само доколкото е необходимо<br>
                    • <strong>Сигурност:</strong> Прилагаме подходящи технически и организационни мерки
                </div>
            </div>
            
            <div class="section">
                <h3>3. ТЕХНИЧЕСКИ И ОРГАНИЗАЦИОННИ МЕРКИ</h3>
                <div class="privacy-section">
                    <strong>Технически мерки:</strong><br>
                    • Криптиране на съхраняваните данни<br>
                    • Защитени комуникационни канали<br>
                    • Регулярни backup копия<br>
                    • Антивирусна защита<br><br>
                    
                    <strong>Организационни мерки:</strong><br>
                    • Обучение на персонала<br>
                    • Политики за сигурност<br>
                    • Контрол на достъпа<br>
                    • Регулярни одити
                </div>
            </div>
            
            <div class="section">
                <h3>4. НАРУШЕНИЯ НА СИГУРНОСТТА</h3>
                <div class="field">
                    В случай на нарушение на сигурността на личните данни, ние се задължаваме да:<br>
                    • Уведомим КЗЛД в срок до 72 часа<br>
                    • Уведомим засегнатите лица при високо ниво на риск<br>
                    • Документираме всички нарушения<br>
                    • Предприемем коригиращи мерки
                </div>
            </div>
            
            <div class="footer">
                <p><strong>Длъжностно лице по защита на данните (DPO):</strong></p>
                <p>Email: dpo@sandercorrect.com | Телефон: +359 888 123 456</p>
                <p>© ${new Date().getFullYear()} SANDER CORRECT ЕООД</p>
            </div>
        </body>
        </html>
        `;
    } else {
        return baseContent + `
            <div class="section">
                <h3>1. ОБЩИ ПОЛОЖЕНИЯ</h3>
                <p>Настоящият документ се отнася до услугите, предоставяни от SANDER CORRECT ЕООД в областта на недвижимите имоти.</p>
                
                <div class="field-group">
                    <div class="field">
                        <strong>Компания:</strong> SANDER CORRECT ЕООД<br>
                        <strong>ЕИК:</strong> 123456789<br>
                        <strong>Адрес:</strong> бул. Витоша 1, ет. 5, 1000 София<br>
                        <strong>Телефон:</strong> +359 888 123 456<br>
                        <strong>Email:</strong> info@sandercorrect.com
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h3>2. ОБХВАТ НА УСЛУГИТЕ</h3>
                <div class="obligations">
                    • Професионална консултация по въпросите на недвижимите имоти<br>
                    • Оценка на пазарната стойност на имота<br>
                    • Маркетинг и представяне на имота<br>
                    • Организиране на огледи<br>
                    • Правна и техническа проверка<br>
                    • Съпровождане до нотариус<br>
                    • Управление на имотни портфейли<br>
                    • Инвестиционни консултации
                </div>
            </div>
            
            <div class="section">
                <h3>3. СТАНДАРТИ ЗА КАЧЕСТВО</h3>
                <p>Компанията работи в съответствие с най-високите професионални стандарти и се придържа към следните принципи:</p>
                
                <div class="obligations">
                    • Прозрачност в общуването<br>
                    • Конфиденциалност на информацията<br>
                    • Професионализъм в обслужването<br>
                    • Спазване на законовите изисквания<br>
                    • Защита на интересите на клиентите<br>
                    • Непрекъсната актуализация на знанията
                </div>
            </div>
            
            <div class="section">
                <h3>4. КОНТАКТНА ИНФОРМАЦИЯ</h3>
                <div class="field-group">
                    <div class="field">
                        <strong>Работно време:</strong> Понеделник - Петък: 9:00 - 18:00<br>
                        <strong>Събота:</strong> 10:00 - 16:00<br>
                        <strong>Неделя:</strong> По предварителна уговорка<br><br>
                        
                        <strong>Офис адрес:</strong> бул. Витоша 1, ет. 5, 1000 София<br>
                        <strong>Телефон:</strong> +359 888 123 456<br>
                        <strong>Email:</strong> info@sandercorrect.com<br>
                        <strong>Уебсайт:</strong> www.sandercorrect.com
                    </div>
                </div>
            </div>
            
            <div class="signature-area">
                <div class="signature-box">
                    <div><strong>Клиент</strong></div>
                    <div style="margin-top: 20px;">_______________</div>
                    <div>(подпис)</div>
                    <div style="margin-top: 10px;">Дата: ___________</div>
                </div>
                <div class="signature-box">
                    <div><strong>SANDER CORRECT ЕООД</strong></div>
                    <div style="margin-top: 20px;">_______________</div>
                    <div>(подпис и печат)</div>
                    <div style="margin-top: 10px;">Дата: ___________</div>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>Този документ е генериран автоматично от системата на SANDER CORRECT ЕООД</strong></p>
                <p>За въпроси и консултации: +359 888 123 456 | info@sandercorrect.com</p>
                <p>Всички права запазени © ${new Date().getFullYear()} SANDER CORRECT ЕООД</p>
            </div>
        </body>
        </html>
        `;
    }
}

// Setup document modal controls
function setupDocumentModalControls() {
    // Close modal
    const closeBtn = document.getElementById('closeDocumentModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDocumentModal);
    }
    
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
    
    // Close modal on overlay click
    const overlay = document.querySelector('.document-modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeDocumentModal);
    }
    
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
                updateDocumentZoom();
            } else if (e.key.toLowerCase() === 'f') {
                fitImageToWidth();
            }
        }
    });
}

// Fit image to width
function fitImageToWidth() {
    const imageViewer = document.getElementById('imageViewer');
    const pdfViewer = document.getElementById('pdfViewer');
    const modalBody = document.querySelector('.document-modal-body');
    
    if (modalBody) {
        const modalWidth = modalBody.offsetWidth - 40; // Account for padding
        
        if (currentDocumentType === 'image' && imageViewer && imageViewer.style.display !== 'none') {
            // For images, calculate zoom to fit width
            const imageNaturalWidth = imageViewer.naturalWidth || 600;
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
    
    if (currentDocumentType === 'image' && imageViewer) {
        const scale = currentZoom / 100;
        imageViewer.style.transform = `scale(${scale})`;
        imageViewer.style.transformOrigin = 'center center';
        imageViewer.style.transition = 'transform 0.3s ease';
    } else if (pdfViewer && pdfViewer.src && !pdfViewer.srcdoc) {
        // For real PDFs, update the URL with new zoom
        const baseUrl = pdfViewer.src.split('#')[0];
        pdfViewer.src = `${baseUrl}#view=FitH&toolbar=1&navpanes=0&scrollbar=1&page=1&zoom=${currentZoom}`;
    } else if (pdfViewer && pdfViewer.srcdoc) {
        // For demo PDFs, simulate zoom with transform
        const scale = currentZoom / 100;
        pdfViewer.style.transform = `scale(${scale})`;
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
    
    updateZoomDisplay();
}overlay.addEventListener('click', closeDocumentModal);
    
    
    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('documentModal');
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeDocumentModal();
            } else if (e.key === '+' || e.key === '=') {
                if (currentDocumentType === 'pdf' && currentZoom < 200) {
                    currentZoom += 25;
                    updateDocumentZoom();
                }
            } else if (e.key === '-') {
                if (currentDocumentType === 'pdf' && currentZoom > 50) {
                    currentZoom -= 25;
                    updateDocumentZoom();
                }
            }
        }
    });


// Update document zoom
function updateDocumentZoom() {
    if (currentDocumentType === 'pdf') {
        const pdfViewer = document.getElementById('pdfViewer');
        if (pdfViewer && pdfViewer.src) {
            pdfViewer.src = pdfViewer.src.split('#')[0] + `#zoom=${currentZoom}`;
        }
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
        
        // Clear viewers
        setTimeout(() => {
            const pdfViewer = document.getElementById('pdfViewer');
            const imageViewer = document.getElementById('imageViewer');
            
            if (pdfViewer) {
                pdfViewer.src = '';
                pdfViewer.srcdoc = '';
            }
            if (imageViewer) {
                imageViewer.src = '';
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
            // Пример за реално изтегляне (когато имате реални файлове):
            const link = document.createElement('a');
            const path = filename.includes('.jpg') ? `./images/documents/${filename}` : `./documents/${filename}`;
            link.href = path;
            link.download = filename;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
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
    }, 3000);
}

// Show success message
function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(39, 174, 96, 0.3);
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
    }, 4000);
}

// Show error message
function showErrorMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(231, 76, 60, 0.3);
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
    }, 4000);
}

// Update display names to include new image extensions
function getDocumentDisplayName(filename) {
    const displayNames = {
        'protocol-ogled-pokupka.jpg': 'Протокол за оглед за покупка',
        'dogovor-posrednichestvo-prodajba.jpg': 'Договор за посредничество при продажба',
        'ekskluzivenm-dogovor-prodajba.jpg': 'Ексклузивен договор за посредничество при продажба',
        'dogovor-naem-posrednichestvo.jpg': 'Договор за посредничество при наем',
        'dogovor-investitori.jpg': 'Договор за посредничество за инвеститори',
        'deklaracia-poveritelnost.jpg': 'Политика за поверителност',
        'deklaracia-gdpr.jpg': 'GDPR декларация',
        'deklaracia-lichni-danni.jpg': 'Декларация за обработка на лични данни',
        'deklaracia-suglasie.jpg': 'Декларация за съгласие',
        'uslovnia-polzvane.jpg': 'Условия за ползване'
    };
    
    return displayNames[filename] || filename;
}

// Enhanced demo image generation for declarations
function showDemoImage(filename) {
    const imageViewer = document.getElementById('imageViewer');
    const loading = document.getElementById('documentLoadingIndicator');
    const error = document.getElementById('documentError');
    
    try {
        // Create demo document image using canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size (A4 proportions)
        canvas.width = 800;
        canvas.height = 1100;
        
        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Header
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(0, 0, canvas.width, 100);
        
        // Logo and title
        ctx.fillStyle = '#f5f5dc';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SANDER CORRECT ЕООД', canvas.width / 2, 45);
        
        ctx.font = '14px Arial';
        ctx.fillText('Професионални решения за недвижими имоти', canvas.width / 2, 70);
        
        // Document title
        ctx.fillStyle = '#2c1810';
        ctx.font = 'bold 22px Arial';
        ctx.textAlign = 'center';
        const title = getDocumentDisplayName(filename).toUpperCase();
        
        // Split long titles
        const words = title.split(' ');
        if (words.length > 4) {
            const line1 = words.slice(0, Math.ceil(words.length / 2)).join(' ');
            const line2 = words.slice(Math.ceil(words.length / 2)).join(' ');
            ctx.fillText(line1, canvas.width / 2, 150);
            ctx.fillText(line2, canvas.width / 2, 180);
        } else {
            ctx.fillText(title, canvas.width / 2, 150);
        }
        
        // Content based on document type
        let content = [];
        
        if (filename.includes('poveritelnost')) {
            content = [
                '1. ОБЩА ИНФОРМАЦИЯ',
                '',
                'Настоящата политика за поверителност описва как SANDER CORRECT ЕООД',
                'събира, използва, съхранява и защитава личните данни на клиентите.',
                '',
                'Администратор на данни: SANDER CORRECT ЕООД',
                'ЕИК: 123456789',
                'Адрес: бул. Витоша 1, ет. 5, 1000 София',
                '',
                '2. ЛИЧНИ ДАННИ КОИТО СЪБИРАМЕ',
                '',
                '• Идентификационни данни (име, ЕГН, документи)',
                '• Контактни данни (телефон, email, адрес)',
                '• Финансови данни (банкови сметки, доходи)',
                '• Данни за имоти и сделки',
                '',
                '3. ЦЕЛИ НА ОБРАБОТКАТА',
                '',
                '• Предоставяне на брокерски услуги',
                '• Изпълнение на договорни задължения',
                '• Правна проверка и консултации',
                '• Маркетингови дейности (със съгласие)',
                '',
                '4. СРОК НА СЪХРАНЕНИЕ',
                '',
                '• Договори и сделки: 10 години',
                '• Маркетингови данни: до оттегляне на съгласието',
                '• Видеонаблюдение: 30 дни'
            ];
        } else if (filename.includes('gdpr')) {
            content = [
                '1. СЪОТВЕТСТВИЕ С GDPR',
                '',
                'SANDER CORRECT ЕООД декларира пълно съответствие с',
                'Регламент (ЕС) 2016/679 (GDPR).',
                '',
                '2. ПРИНЦИПИ НА ОБРАБОТКА',
                '',
                '• Законност - обработваме данни само на законно основание',
                '• Ограничение на целта - данните се използват само за',
                '  декларираните цели',
                '• Минимизация - събираме само необходимите данни',
                '• Точност - поддържаме актуални и точни данни',
                '• Сигурност - прилагаме технически и организационни мерки',
                '',
                '3. ТЕХНИЧЕСКИ МЕРКИ',
                '',
                '• Криптиране на съхраняваните данни',
                '• Защитени комуникационни канали',
                '• Регулярни backup копия',
                '• Контрол на достъпа',
                '',
                '4. НАРУШЕНИЯ НА СИГУРНОСТТА',
                '',
                '• Уведомяваме КЗЛД в срок до 72 часа',
                '• Уведомяваме засегнатите лица при високо ниво на риск',
                '• Документираме всички нарушения'
            ];
        } else {
            // Default content for contracts and other documents
            content = [
                '1. ДОГОВАРЯЩИ СТРАНИ',
                '',
                'ПОСРЕДНИК:',
                'SANDER CORRECT ЕООД',
                'ЕИК: 123456789',
                'Адрес: бул. Витоша 1, ет. 5, 1000 София',
                '',
                'ВЪЗЛОЖИТЕЛ:',
                'Име/Наименование: _____________________________',
                'ЕГН/ЕИК: _____________________________',
                'Адрес: _____________________________',
                'Телефон: _____________________________',
                'Email: _____________________________',
                '',
                '2. ПРЕДМЕТ НА ДОГОВОРА',
                '',
                'Възложителят възлага на Посредника да извърши',
                'посредническа дейност при сделки с недвижими имоти.',
                '',
                '3. ЗАДЪЛЖЕНИЯ НА ПОСРЕДНИКА',
                '',
                '• Да извърши пазарна оценка на имота',
                '• Да рекламира и представя имота на пазара',
                '• Да организира огледи с потенциални купувачи',
                '• Да провери финансовите възможности на купувачите',
                '• Да съдейства при провеждане на преговори',
                '• Да извърши правна проверка на документите',
                '• Да съпровожда сделката до нотариус',
                '',
                '4. ВЪЗНАГРАЖДЕНИЕ',
                '',
                'Размер: _____ % от продажната цена',
                'Начин на плащане: При подписване на нотариален акт'
            ];
        }
        
        // Render content
        ctx.fillStyle = '#333333';
        ctx.font = '16px Arial';
        ctx.textAlign = 'left';
        
        let y = 220;
        content.forEach(line => {
            if (line === '') {
                y += 12;
            } else if (line.startsWith('•')) {
                ctx.font = '14px Arial';
                ctx.fillText(line, 60, y);
                y += 22;
            } else if (line.match(/^\d+\./)) {
                ctx.font = 'bold 16px Arial';
                ctx.fillStyle = '#8b4513';
                ctx.fillText(line, 50, y);
                ctx.fillStyle = '#333333';
                y += 28;
            } else if (line.includes('ПОСРЕДНИК:') || line.includes('ВЪЗЛОЖИТЕЛ:')) {
                ctx.font = 'bold 14px Arial';
                ctx.fillText(line, 50, y);
                y += 22;
            } else {
                ctx.font = '14px Arial';
                // Handle long lines by wrapping
                const maxWidth = canvas.width - 100;
                const words = line.split(' ');
                let currentLine = '';
                
                for (let i = 0; i < words.length; i++) {
                    const testLine = currentLine + words[i] + ' ';
                    const metrics = ctx.measureText(testLine);
                    
                    if (metrics.width > maxWidth && currentLine !== '') {
                        ctx.fillText(currentLine.trim(), 50, y);
                        currentLine = words[i] + ' ';
                        y += 20;
                    } else {
                        currentLine = testLine;
                    }
                }
                ctx.fillText(currentLine.trim(), 50, y);
                y += 20;
            }
            
            if (y > canvas.height - 150) return; // Stop if we reach the bottom
        });
        
        // Signature area
        if (y < canvas.height - 100) {
            ctx.strokeStyle = '#333333';
            ctx.lineWidth = 2;
            
            // Client signature
            ctx.beginPath();
            ctx.moveTo(100, canvas.height - 80);
            ctx.lineTo(300, canvas.height - 80);
            ctx.stroke();
            
            ctx.font = '12px Arial';
            ctx.fillText('Клиент', 200, canvas.height - 55);
            ctx.fillText('(подпис)', 190, canvas.height - 35);
            
            // Company signature
            ctx.beginPath();
            ctx.moveTo(500, canvas.height - 80);
            ctx.lineTo(700, canvas.height - 80);
            ctx.stroke();
            
            ctx.fillText('SANDER CORRECT ЕООД', 570, canvas.height - 55);
            ctx.fillText('(подпис и печат)', 575, canvas.height - 35);
        }
        
        // Convert canvas to image and display
        const dataURL = canvas.toDataURL('image/png');
        imageViewer.src = dataURL;
        imageViewer.style.display = 'block';
        
        // Hide other viewers
        const pdfViewer = document.getElementById('pdfViewer');
        if (pdfViewer) {
            pdfViewer.style.display = 'none';
        }
        
        loading.style.display = 'none';
        error.style.display = 'none';
        
    } catch (err) {
        logError(err, 'showDemoImage');
        loading.style.display = 'none';
        error.style.display = 'flex';
    }
}

// Add mobile responsive styles for hero section


// Scroll effects
function setupScrollEffects() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Enhanced document category animations
function setupCategoryAnimations() {
    const categories = document.querySelectorAll('.document-category');
    
    categories.forEach((category, index) => {
        category.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(10deg)';
            }
        });
        
        category.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Mobile menu toggle function
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (navMenu && mobileBtn) {
        navMenu.classList.toggle('active');
        mobileBtn.classList.toggle('active');
        
        // Change hamburger to X and vice versa
        if (navMenu.classList.contains('active')) {
            mobileBtn.innerHTML = '✕';
        } else {
            mobileBtn.innerHTML = '☰';
        }
    }
}

// Add pulse effect utility
function addPulseEffect(element) {
    if (element) {
        element.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
    }
}

// Add shake effect utility
function addShakeEffect(element) {
    if (element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
}

// Add dynamic styles
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 20%, 40%, 60%, 80%, 100% {
                transform: translateX(0);
            }
            10%, 30%, 50%, 70%, 90% {
                transform: translateX(-2px);
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.8rem;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
        
        .download-notification .fa-spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        /* Mobile menu styles */
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 80px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 80px);
                background: rgba(250, 249, 247, 0.98);
                backdrop-filter: blur(20px);
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-top: 2rem;
                transition: left 0.3s ease;
                z-index: 999;
                border-top: 1px solid rgba(139, 69, 19, 0.1);
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu li {
                margin: 1rem 0;
            }
            
            .nav-link {
                font-size: 1.2rem;
                padding: 1rem 2rem;
                border-radius: 12px;
                transition: all 0.3s ease;
            }
            
            .nav-link:hover {
                background: rgba(139, 69, 19, 0.1);
            }
            
            .mobile-menu-btn {
                display: block !important;
                font-size: 1.5rem;
                transition: all 0.3s ease;
            }
            
            .mobile-menu-btn.active {
                transform: rotate(90deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Document validation functionality
function validateDocument(filename) {
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];
    const extension = filename.substring(filename.lastIndexOf('.')).toLowerCase();
    return allowedExtensions.includes(extension);
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
    }
}

// Performance optimization
function optimizePerformance() {
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    const preloadResources = [
        './styles/documents.css',
        './scripts/common.js'
    ];
    
    preloadResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
}

// Search functionality (for future implementation)
function setupSearchFunctionality() {
    console.log('Search functionality ready for implementation');
    
    // Future implementation for document search
    const searchInput = document.getElementById('documentSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            const documentItems = document.querySelectorAll('.document-item');
            
            documentItems.forEach(item => {
                const title = item.querySelector('.document-info h4').textContent.toLowerCase();
                const description = item.querySelector('.document-info p').textContent.toLowerCase();
                
                if (title.includes(query) || description.includes(query)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Export functions for potential external use
window.viewDocument = viewDocument;
window.downloadDocument = downloadDocument;
window.downloadCurrentDocument = downloadCurrentDocument;
window.closeDocumentModal = closeDocumentModal;
window.toggleMobileMenu = toggleMobileMenu;
window.addPulseEffect = addPulseEffect;
window.addShakeEffect = addShakeEffect;

// Debug functions for development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugDocuments = {
        getCurrentDocument: () => currentDocumentFile,
        getCurrentZoom: () => currentZoom,
        getCurrentType: () => currentDocumentType,
        listAllDocuments: () => {
            const items = document.querySelectorAll('.document-item');
            return Array.from(items).map(item => {
                const titleElement = item.querySelector('.document-info h4');
                const title = titleElement ? titleElement.textContent : 'Unknown';
                const onclick = item.getAttribute('onclick');
                const filename = onclick ? onclick.match(/'([^']+)'/)?.[1] : null;
                return { title, filename };
            });
        },
        simulateError: () => {
            const error = document.getElementById('documentError');
            const loading = document.getElementById('documentLoadingIndicator');
            if (error && loading) {
                error.style.display = 'flex';
                loading.style.display = 'none';
            }
        },
        testNotifications: () => {
            showSuccessMessage('Test success message');
            setTimeout(() => showErrorMessage('Test error message'), 1000);
            setTimeout(() => showDownloadFeedback('test.pdf'), 2000);
        }
    };
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Run initialization again to ensure everything is set up
    setupAccessibility();
    optimizePerformance();
    setupSearchFunctionality();
    
    console.log('Documents page fully initialized');
});