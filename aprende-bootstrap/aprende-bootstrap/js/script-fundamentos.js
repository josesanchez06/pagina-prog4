// ===== VARIABLES GLOBALES =====
let currentView = 'main-menu';
let currentCategory = '';
let currentLesson = '';
let userProgress = {
    completedLessons: [],
    points: 0,
    achievements: [],
    currentStreak: 0
};

// ===== DATOS DE LECCIONES - FUNDAMENTOS =====
const lessonCategories = {
    fundamentals: {
        title: 'Fundamentos de Bootstrap',
        lessons: {
            'grid-system': {
                title: 'Sistema de Grillas',
                difficulty: 'Principiante',
                theory: `
                    <h6>🏗️ Sistema de Grillas de Bootstrap</h6>
                    <p>El sistema de grillas de Bootstrap utiliza un sistema de 12 columnas con contenedores, filas y columnas.</p>
                    
                    <h6>Contenedores:</h6>
                    <ul>
                        <li><code>.container</code> - Ancho fijo responsivo</li>
                        <li><code>.container-fluid</code> - Ancho completo</li>
                        <li><code>.container-{breakpoint}</code> - Contenedor responsivo</li>
                    </ul>

                    <div class="alert alert-info">
                        <strong>💡 Tip:</strong> Siempre usa la estructura: Container → Row → Column
                    </div>

                    <h6>Breakpoints Responsivos:</h6>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Clase</th>
                                    <th>Tamaño</th>
                                    <th>Dispositivo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>.col-</td><td>&lt;576px</td><td>Extra small</td></tr>
                                <tr><td>.col-sm-</td><td>≥576px</td><td>Small</td></tr>
                                <tr><td>.col-md-</td><td>≥768px</td><td>Medium</td></tr>
                                <tr><td>.col-lg-</td><td>≥992px</td><td>Large</td></tr>
                                <tr><td>.col-xl-</td><td>≥1200px</td><td>Extra large</td></tr>
                                <tr><td>.col-xxl-</td><td>≥1400px</td><td>Extra extra large</td></tr>
                            </tbody>
                        </table>
                    </div>
                `,
                initialCode: {
                    html: `<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">
      <div class="bg-primary text-white p-3 text-center mb-3">
        Columna 1
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
      <div class="bg-success text-white p-3 text-center mb-3">
        Columna 2
      </div>
    </div>
    <div class="col-12 col-md-12 col-lg-4">
      <div class="bg-danger text-white p-3 text-center mb-3">
        Columna 3
      </div>
    </div>
  </div>
  
  <div class="row mt-4">
    <div class="col-12">
      <div class="alert alert-success">
        <h5>¡Perfecto!</h5>
        <p>Redimensiona la ventana para ver cómo las columnas se adaptan.</p>
      </div>
    </div>
  </div>
</div>`,
                    css: `/* Estilos personalizados */
.container {
  margin-top: 20px;
}

.row > div > div:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
  cursor: pointer;
}

/* Efectos adicionales */
.col-12:hover .alert {
  background-color: #28a745;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}`,
                    js: `// JavaScript interactivo
console.log('Grid system loaded!');

function changeColors() {
  const colors = ['primary', 'success', 'danger', 'warning', 'info', 'secondary'];
  const divs = document.querySelectorAll('.row > div > div:not(.alert)');
  
  divs.forEach((div, index) => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    div.className = div.className.replace(/bg-\\w+/, 'bg-' + newColor);
  });
}

// Auto-cambiar colores cada 4 segundos
setInterval(changeColors, 4000);

// Agregar interactividad al hacer click
document.addEventListener('click', function(e) {
  if (e.target.closest('.row > div > div:not(.alert)')) {
    changeColors();
  }
});`
                }
        updateProgressDisplay();
    } catch (error) {
        console.error('Error cargando progreso:', error);
        userProgress = {
            completedLessons: [],
            points: 0,
            achievements: [],
            currentStreak: 0
        };
    }
}

function saveProgress() {
    try {
        localStorage.setItem('bootstrapAcademyProgress', JSON.stringify(userProgress));
    } catch (error) {
        console.error('Error guardando progreso:', error);
    }
}

function updateProgressDisplay() {
    try {
        const totalLessons = Object.values(lessonCategories).reduce((total, category) => {
            return total + Object.keys(category.lessons).length;
        }, 0);
        
        const completedCount = userProgress.completedLessons.length;
        const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
        
        // Actualizar textos de manera segura
        const progressPercentage = document.getElementById('progress-percentage');
        const circlePercentage = document.getElementById('circle-percentage');
        const achievementsCount = document.getElementById('achievements-count');
        const pointsCount = document.getElementById('points-count');
        
        if (progressPercentage) progressPercentage.textContent = percentage + '%';
        if (circlePercentage) circlePercentage.textContent = percentage + '%';
        if (achievementsCount) achievementsCount.textContent = userProgress.achievements.length;
        if (pointsCount) pointsCount.textContent = userProgress.points;
        
        // Actualizar círculo de progreso
        const progressCircle = document.getElementById('progress-circle');
        if (progressCircle) {
            const circumference = 2 * Math.PI * 50; // radio = 50
            const strokeDasharray = (percentage / 100) * circumference;
            progressCircle.style.strokeDasharray = `${strokeDasharray} ${circumference}`;
        }
    } catch (error) {
        console.error('Error actualizando progreso:', error);
    }
}

function completeLesson() {
    try {
        if (!userProgress.completedLessons.includes(currentLesson)) {
            userProgress.completedLessons.push(currentLesson);
            userProgress.points += 100;
            userProgress.currentStreak++;
            
            // Verificar logros
            checkAchievements();
            
            // Guardar progreso
            saveProgress();
            
            // Actualizar UI
            updateProgressDisplay();
            
            // Mostrar notificación
            showAchievement('¡Lección completada!', `Has ganado 100 puntos. Racha: ${userProgress.currentStreak}`);
            
            // Ocultar botón
            const completeBtn = document.getElementById('complete-lesson');
            if (completeBtn) {
                completeBtn.style.display = 'none';
            }
        }
    } catch (error) {
        console.error('Error completando lección:', error);
    }
}

function checkAchievements() {
    try {
        const achievements = [
            {
                id: 'first-lesson',
                name: 'Primer Paso',
                description: 'Completa tu primera lección',
                condition: () => userProgress.completedLessons.length >= 1,
                points: 50
            },
            {
                id: 'five-lessons',
                name: 'Estudiante Dedicado',
                description: 'Completa 5 lecciones',
                condition: () => userProgress.completedLessons.length >= 5,
                points: 200
            },
            {
                id: 'streak-3',
                name: 'En Racha',
                description: 'Completa 3 lecciones seguidas',
                condition: () => userProgress.currentStreak >= 3,
                points: 150
            }
        ];
        
        achievements.forEach(achievement => {
            if (!userProgress.achievements.includes(achievement.id) && achievement.condition()) {
                userProgress.achievements.push(achievement.id);
                userProgress.points += achievement.points;
                showAchievement(achievement.name, achievement.description);
            }
        });
    } catch (error) {
        console.error('Error verificando logros:', error);
    }
}

function showAchievement(title, description) {
    try {
        const badge = document.getElementById('achievement-badge');
        const text = document.getElementById('achievement-text');
        
        if (badge && text) {
            text.innerHTML = `<strong>${title}</strong><br><small>${description}</small>`;
            badge.classList.add('show');
            
            setTimeout(() => {
                badge.classList.remove('show');
            }, 5000);
        }
    } catch (error) {
        console.error('Error mostrando logro:', error);
    }
}

// ===== FUNCIONES DE NAVEGACIÓN =====

function backToMenu() {
    try {
        // Ocultar todas las vistas
        const views = ['lesson-view', 'category-view', 'playground-view', 'challenges-view'];
        views.forEach(viewId => {
            const view = document.getElementById(viewId);
            if (view) view.style.display = 'none';
        });
        
        // Mostrar menú principal
        const mainMenu = document.getElementById('main-menu');
        if (mainMenu) {
            mainMenu.style.display = 'block';
        }
        
        currentView = 'main-menu';
    } catch (error) {
        console.error('Error volviendo al menú:', error);
    }
}

function backToCategory() {
    try {
        const lessonView = document.getElementById('lesson-view');
        const categoryView = document.getElementById('category-view');
        
        if (lessonView) lessonView.style.display = 'none';
        if (categoryView) categoryView.style.display = 'block';
    } catch (error) {
        console.error('Error volviendo a categoría:', error);
    }
}

// ===== FUNCIONES DE UTILIDAD =====

function resetProgress() {
    try {
        if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso?')) {
            userProgress = {
                completedLessons: [],
                points: 0,
                achievements: [],
                currentStreak: 0
            };
            saveProgress();
            updateProgressDisplay();
            alert('Progreso reiniciado');
        }
    } catch (error) {
        console.error('Error reiniciando progreso:', error);
    }
}

function showHelp() {
    try {
        const helpModal = `
            <div class="modal fade" id="helpModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title">
                                <i class="fas fa-question-circle me-2"></i>Ayuda - Fundamentos
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <h6>🏗️ Fundamentos de Bootstrap</h6>
                            <p>En esta sección aprenderás:</p>
                            <ul>
                                <li><strong>Sistema de Grillas:</strong> Cómo crear layouts responsivos</li>
                                <li><strong>Utilidades:</strong> Clases para spacing, colores y más</li>
                                <li><strong>Flexbox:</strong> Alineación y distribución de elementos</li>
                            </ul>
                            
                            <h6>💡 Consejos</h6>
                            <ul>
                                <li>Practica modificando los valores en tiempo real</li>
                                <li>Redimensiona la ventana para ver la responsividad</li>
                                <li>Experimenta con diferentes combinaciones de clases</li>
                            </ul>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                                <i class="fas fa-thumbs-up me-2"></i>¡Entendido!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Verificar si el modal ya existe
        if (!document.getElementById('helpModal')) {
            document.body.insertAdjacentHTML('beforeend', helpModal);
        }
        
        const modal = new bootstrap.Modal(document.getElementById('helpModal'));
        modal.show();
    } catch (error) {
        console.error('Error mostrando ayuda:', error);
    }
}

// ===== FUNCIONES DE MANEJO DE ERRORES =====

function handleError(error, context = 'Aplicación') {
    console.error(`Error en ${context}:`, error);
    
    // Mostrar error al usuario de manera amigable
    const errorAlert = document.createElement('div');
    errorAlert.className = 'alert alert-warning alert-dismissible fade show position-fixed';
    errorAlert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 400px;';
    errorAlert.innerHTML = `
        <strong>Oops!</strong> Algo salió mal. Por favor, recarga la página.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(errorAlert);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (errorAlert && errorAlert.parentNode) {
            errorAlert.remove();
        }
    }, 5000);
}

// ===== INICIALIZACIÓN =====

function initializeApp() {
    try {
        console.log('🎉 Iniciando Bootstrap Academy - Fundamentos...');
        
        // Cargar progreso guardado
        loadProgress();
        
        // Configurar auto-ejecución de código con debounce
        setupAutoExecution();
        
        console.log('✅ Bootstrap Academy - Fundamentos inicializada correctamente');
    } catch (error) {
        console.error('❌ Error inicializando la aplicación:', error);
        handleError(error, 'Inicialización');
    }
}

function setupAutoExecution() {
    try {
        let debounceTimer;
        
        // Auto-ejecutar código en lecciones
        const lessonTextareas = ['html-code', 'css-code', 'js-code'];
        lessonTextareas.forEach(id => {
            const textarea = document.getElementById(id);
            if (textarea) {
                textarea.addEventListener('input', function() {
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(() => {
                        runCode();
                    }, 1000);
                });
            }
        });
        
        console.log('✅ Auto-ejecución de código configurada');
    } catch (error) {
        console.error('Error configurando auto-ejecución:', error);
    }
}

// ===== INICIALIZACIÓN PRINCIPAL =====

document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('🚀 DOM cargado, inicializando Bootstrap Academy - Fundamentos...');
        
        // Inicializar la aplicación
        initializeApp();
        
        // Mensaje de bienvenida en consola
        console.log(`
🎓 Bootstrap Academy - Fundamentos
==================================

¡Aprende los fundamentos de Bootstrap!

Lecciones disponibles:
- Sistema de Grillas
- Utilidades y Spacing  
- Flexbox Bootstrap

¡Feliz aprendizaje! 🚀
        `);
        
    } catch (error) {
        console.error('❌ Error crítico durante la inicialización:', error);
        handleError(error, 'Inicialización');
    }
});
            },
            'utilities': {
                title: 'Utilidades y Spacing',
                difficulty: 'Principiante',
                theory: `
                    <h6>🛠️ Utilidades de Bootstrap</h6>
                    <p>Bootstrap incluye cientos de clases de utilidad para modificar espaciado, colores, posicionamiento y más.</p>
                    
                    <h6>Spacing (Espaciado):</h6>
                    <div class="row">
                        <div class="col-md-6">
                            <h6>Margin:</h6>
                            <ul>
                                <li><code>m-{size}</code> - Todos los lados</li>
                                <li><code>mt-{size}</code> - Top</li>
                                <li><code>mb-{size}</code> - Bottom</li>
                                <li><code>ms-{size}</code> - Start (left)</li>
                                <li><code>me-{size}</code> - End (right)</li>
                                <li><code>mx-{size}</code> - Horizontal</li>
                                <li><code>my-{size}</code> - Vertical</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6>Padding:</h6>
                            <ul>
                                <li><code>p-{size}</code> - Todos los lados</li>
                                <li><code>pt-{size}</code> - Top</li>
                                <li><code>pb-{size}</code> - Bottom</li>
                                <li><code>ps-{size}</code> - Start (left)</li>
                                <li><code>pe-{size}</code> - End (right)</li>
                                <li><code>px-{size}</code> - Horizontal</li>
                                <li><code>py-{size}</code> - Vertical</li>
                            </ul>
                        </div>
                    </div>

                    <h6>Tamaños disponibles:</h6>
                    <div class="d-flex flex-wrap gap-2 mb-3">
                        <span class="badge bg-secondary">0</span>
                        <span class="badge bg-secondary">1 (0.25rem)</span>
                        <span class="badge bg-secondary">2 (0.5rem)</span>
                        <span class="badge bg-secondary">3 (1rem)</span>
                        <span class="badge bg-secondary">4 (1.5rem)</span>
                        <span class="badge bg-secondary">5 (3rem)</span>
                        <span class="badge bg-secondary">auto</span>
                    </div>
                `,
                initialCode: {
                    html: `<div class="container">
  <div class="bg-light p-4 mb-4 rounded">
    <h4 class="text-primary mb-3">Ejemplo de Spacing</h4>
    <div class="bg-primary text-white p-3 mb-3 rounded">Padding grande (p-3)</div>
    <div class="bg-success text-white p-1 mb-3 rounded">Padding pequeño (p-1)</div>
    <div class="bg-danger text-white px-4 py-2 mb-3 rounded">Padding horizontal y vertical diferente</div>
    <div class="bg-warning text-dark p-2 rounded">Padding mediano (p-2)</div>
  </div>

  <div class="bg-dark p-4 rounded">
    <h4 class="text-light mb-3">Paleta de Colores</h4>
    <div class="d-flex flex-wrap gap-2">
      <span class="badge bg-primary fs-6 p-2">Primary</span>
      <span class="badge bg-secondary fs-6 p-2">Secondary</span>
      <span class="badge bg-success fs-6 p-2">Success</span>
      <span class="badge bg-danger fs-6 p-2">Danger</span>
      <span class="badge bg-warning text-dark fs-6 p-2">Warning</span>
      <span class="badge bg-info fs-6 p-2">Info</span>
    </div>
  </div>

  <div class="bg-light p-4 mt-4 rounded">
    <h4 class="text-center mb-4">Flexbox Utilities</h4>
    <div class="d-flex justify-content-between align-items-center bg-white p-3 rounded shadow-sm">
      <div class="bg-primary text-white px-3 py-2 rounded">Izquierda</div>
      <div class="bg-success text-white px-3 py-2 rounded">Centro</div>
      <div class="bg-danger text-white px-3 py-2 rounded">Derecha</div>
    </div>
  </div>
</div>`,
                    css: `/* Estilos adicionales */
.container {
  margin-top: 30px;
}

.badge:hover {
  transform: scale(1.1);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.shadow-sm {
  transition: box-shadow 0.3s ease;
}

.shadow-sm:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.bg-primary:hover,
.bg-success:hover,
.bg-danger:hover,
.bg-warning:hover {
  filter: brightness(1.1);
  transition: filter 0.3s ease;
}`,
                    js: `console.log('Utilities lesson loaded!');

function changeSpacing() {
  const elements = document.querySelectorAll('.p-3, .p-1, .p-2');
  const spacings = ['p-1', 'p-2', 'p-3', 'p-4', 'p-5'];
  
  elements.forEach(el => {
    const currentSpacing = spacings[Math.floor(Math.random() * spacings.length)];
    el.className = el.className.replace(/p-\\d/, currentSpacing);
  });
}

function changeBadgeColors() {
  const badges = document.querySelectorAll('.badge');
  const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
  
  badges.forEach(badge => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    badge.className = badge.className.replace(/bg-\\w+/, 'bg-' + newColor);
    
    // Ajustar color de texto para warning
    if (newColor === 'warning') {
      badge.classList.add('text-dark');
      badge.classList.remove('text-white');
    } else {
      badge.classList.remove('text-dark');
      badge.classList.add('text-white');
    }
  });
}

// Auto-ejecutar funciones
setInterval(changeSpacing, 5000);
setInterval(changeBadgeColors, 3000);

// Agregar eventos de click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('badge')) {
    changeBadgeColors();
  }
});`
                }
            },
            'flexbox': {
                title: 'Flexbox Bootstrap',
                difficulty: 'Intermedio',
                theory: `
                    <h6>🔄 Flexbox en Bootstrap</h6>
                    <p>Bootstrap incluye utilidades completas para Flexbox que te permiten crear layouts complejos fácilmente.</p>
                    
                    <h6>Clases de Display:</h6>
                    <ul>
                        <li><code>.d-flex</code> - Activa flexbox</li>
                        <li><code>.d-inline-flex</code> - Flexbox inline</li>
                        <li><code>.d-{breakpoint}-flex</code> - Responsivo</li>
                    </ul>

                    <h6>Dirección del Flex:</h6>
                    <ul>
                        <li><code>.flex-row</code> - Horizontal (default)</li>
                        <li><code>.flex-column</code> - Vertical</li>
                        <li><code>.flex-row-reverse</code> - Horizontal inverso</li>
                        <li><code>.flex-column-reverse</code> - Vertical inverso</li>
                    </ul>

                    <h6>Justificación (eje principal):</h6>
                    <ul>
                        <li><code>.justify-content-start</code> - Inicio</li>
                        <li><code>.justify-content-center</code> - Centro</li>
                        <li><code>.justify-content-end</code> - Final</li>
                        <li><code>.justify-content-between</code> - Espaciado entre elementos</li>
                        <li><code>.justify-content-around</code> - Espaciado alrededor</li>
                        <li><code>.justify-content-evenly</code> - Espaciado uniforme</li>
                    </ul>

                    <h6>Alineación (eje cruzado):</h6>
                    <ul>
                        <li><code>.align-items-start</code> - Inicio</li>
                        <li><code>.align-items-center</code> - Centro</li>
                        <li><code>.align-items-end</code> - Final</li>
                        <li><code>.align-items-stretch</code> - Estirar</li>
                        <li><code>.align-items-baseline</code> - Línea base</li>
                    </ul>
                `,
                initialCode: {
                    html: `<div class="container">
  <!-- Ejemplo 1: Centrado perfecto -->
  <div class="bg-primary text-white mb-4 rounded" style="height: 200px;">
    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="bg-white text-primary px-4 py-2 rounded fw-bold">
        ¡Perfectamente Centrado!
      </div>
    </div>
  </div>

  <!-- Ejemplo 2: Navegación horizontal -->
  <div class="bg-light p-3 mb-4 rounded">
    <div class="d-flex justify-content-between align-items-center">
      <div class="fw-bold text-primary">Logo</div>
      <div class="d-flex gap-3">
        <a href="#" class="text-decoration-none">Inicio</a>
        <a href="#" class="text-decoration-none">Productos</a>
        <a href="#" class="text-decoration-none">Contacto</a>
      </div>
      <button class="btn btn-primary btn-sm">Login</button>
    </div>
  </div>

  <!-- Ejemplo 3: Cards flexibles -->
  <div class="d-flex flex-wrap gap-3 mb-4">
    <div class="flex-fill bg-success text-white p-3 rounded text-center">
      <h5>Card 1</h5>
      <p class="mb-0">Contenido flexible</p>
    </div>
    <div class="flex-fill bg-warning text-dark p-3 rounded text-center">
      <h5>Card 2</h5>
      <p class="mb-0">Se adapta automáticamente</p>
    </div>
    <div class="flex-fill bg-info text-white p-3 rounded text-center">
      <h5>Card 3</h5>
      <p class="mb-0">Mismo ancho para todas</p>
    </div>
  </div>

  <!-- Ejemplo 4: Layout vertical -->
  <div class="bg-dark text-white p-4 rounded" style="height: 300px;">
    <div class="d-flex flex-column h-100">
      <div class="bg-primary p-2 rounded mb-2 text-center">Header</div>
      <div class="flex-grow-1 bg-secondary p-2 rounded mb-2 d-flex align-items-center justify-content-center">
        Contenido que crece
      </div>
      <div class="bg-success p-2 rounded text-center">Footer</div>
    </div>
  </div>
</div>`,
                    css: `/* Estilos para flexbox */
.container {
  margin-top: 20px;
}

.gap-3 {
  gap: 1rem;
}

.flex-fill:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  cursor: pointer;
}

.d-flex > * {
  transition: all 0.3s ease;
}

.bg-white:hover {
  transform: scale(1.05) rotate(2deg);
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .d-flex.flex-wrap {
    flex-direction: column;
  }
  
  .gap-3 {
    gap: 0.5rem;
  }
}`,
                    js: `console.log('Flexbox lesson loaded!');

let isColumn = false;
let currentJustification = 0;
const justifications = [
  'justify-content-start',
  'justify-content-center', 
  'justify-content-end',
  'justify-content-between',
  'justify-content-around',
  'justify-content-evenly'
];

function toggleFlexDirection() {
  const flexContainer = document.querySelector('.d-flex.flex-wrap');
  if (flexContainer) {
    if (isColumn) {
      flexContainer.classList.remove('flex-column');
      flexContainer.classList.add('flex-row');
    } else {
      flexContainer.classList.remove('flex-row');
      flexContainer.classList.add('flex-column');
    }
    isColumn = !isColumn;
  }
}

function cycleJustification() {
  const navContainer = document.querySelector('.bg-light .d-flex');
  if (navContainer) {
    // Remover justificación actual
    justifications.forEach(j => navContainer.classList.remove(j));
    
    // Agregar nueva justificación
    navContainer.classList.add(justifications[currentJustification]);
    currentJustification = (currentJustification + 1) % justifications.length;
  }
}

// Cambiar dirección cada 6 segundos
setInterval(toggleFlexDirection, 6000);

// Cambiar justificación cada 3 segundos
setInterval(cycleJustification, 3000);

// Agregar interactividad a las cards
document.querySelectorAll('.flex-fill').forEach(card => {
  card.addEventListener('click', function() {
    this.style.transform = 'scale(1.05) rotate(5deg)';
    setTimeout(() => {
      this.style.transform = '';
    }, 300);
  });
});

// Efecto especial al hacer click en el elemento centrado
document.querySelector('.bg-white.text-primary')?.addEventListener('click', function() {
  this.style.animation = 'pulse 0.6s ease';
  setTimeout(() => {
    this.style.animation = '';
  }, 600);
});`
                }
            }
        }
    }
};

// ===== FUNCIONES PRINCIPALES =====

// Función para obtener color según dificultad
function getDifficultyColor(difficulty) {
    try {
        switch(difficulty) {
            case 'Principiante': return 'bg-success';
            case 'Intermedio': return 'bg-warning';
            case 'Avanzado': return 'bg-danger';
            default: return 'bg-secondary';
        }
    } catch (error) {
        console.error('Error obteniendo color de dificultad:', error);
        return 'bg-secondary';
    }
}

// Función para mostrar categoría
function showCategory(categoryId) {
    try {
        if (categoryId !== 'fundamentals') {
            alert('Esta categoría está disponible en otro script. Carga el script correspondiente.');
            return;
        }
        
        currentCategory = categoryId;
        document.getElementById('main-menu').style.display = 'none';
        document.getElementById('category-view').style.display = 'block';
        
        const category = lessonCategories[categoryId];
        if (!category) {
            console.error('Categoría no encontrada:', categoryId);
            return;
        }
        
        document.getElementById('category-title').textContent = category.title;
        
        const lessonsGrid = document.getElementById('lessons-grid');
        lessonsGrid.innerHTML = '';
        
        Object.keys(category.lessons).forEach(lessonId => {
            const lesson = category.lessons[lessonId];
            const isCompleted = userProgress.completedLessons.includes(lessonId);
            
            const lessonCard = `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="lesson-card h-100 ${isCompleted ? 'border-success' : ''}" onclick="startLesson('${lessonId}')">
                        <div class="card-body p-4">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <h5 class="card-title">${lesson.title}</h5>
                                ${isCompleted ? '<i class="fas fa-check-circle text-success"></i>' : ''}
                            </div>
                            <span class="badge ${getDifficultyColor(lesson.difficulty)} mb-3">${lesson.difficulty}</span>
                            <p class="card-text text-muted">Aprende sobre ${lesson.title.toLowerCase()}.</p>
                            <div class="mt-auto">
                                <div class="d-flex justify-content-between align-items-center">
                                    <small class="text-muted">
                                        <i class="fas fa-clock me-1"></i>15-20 min
                                    </small>
                                    <button class="btn btn-sm btn-outline-primary">
                                        ${isCompleted ? 'Repasar' : 'Comenzar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            lessonsGrid.innerHTML += lessonCard;
        });
    } catch (error) {
        console.error('Error mostrando categoría:', error);
        handleError(error, 'Mostrar Categoría');
    }
}

// Función para iniciar lección
function startLesson(lessonId) {
    try {
        currentLesson = lessonId;
        
        // Encontrar la lección
        let lesson = null;
        for (const categoryId in lessonCategories) {
            if (lessonCategories[categoryId].lessons[lessonId]) {
                lesson = lessonCategories[categoryId].lessons[lessonId];
                break;
            }
        }
        
        if (!lesson) {
            console.error('Lección no encontrada:', lessonId);
            return;
        }
        
        // Mostrar vista de lección
        document.getElementById('category-view').style.display = 'none';
        document.getElementById('lesson-view').style.display = 'block';
        
        // Cargar contenido
        document.getElementById('lesson-title').textContent = lesson.title;
        document.getElementById('lesson-difficulty').textContent = lesson.difficulty;
        document.getElementById('lesson-difficulty').className = `badge ${getDifficultyColor(lesson.difficulty)} me-2`;
        document.getElementById('theory-content').innerHTML = lesson.theory;
        
        // Cargar código inicial
        const htmlCode = document.getElementById('html-code');
        const cssCode = document.getElementById('css-code');
        const jsCode = document.getElementById('js-code');
        
        if (htmlCode) htmlCode.value = lesson.initialCode.html || '';
        if (cssCode) cssCode.value = lesson.initialCode.css || '';
        if (jsCode) jsCode.value = lesson.initialCode.js || '';
        
        // Ejecutar código inicial
        runCode();
        
        // Mostrar botón de completar si no está completada
        const isCompleted = userProgress.completedLessons.includes(lessonId);
        const completeBtn = document.getElementById('complete-lesson');
        if (completeBtn) {
            completeBtn.style.display = isCompleted ? 'none' : 'block';
        }
    } catch (error) {
        console.error('Error iniciando lección:', error);
        handleError(error, 'Iniciar Lección');
    }
}

// ===== FUNCIONES DEL EDITOR =====

// Función para cambiar tabs del editor
function switchTab(tabType) {
    try {
        // Ocultar todos los editores
        const editors = ['html-editor', 'css-editor', 'js-editor'];
        editors.forEach(editorId => {
            const editor = document.getElementById(editorId);
            if (editor) editor.style.display = 'none';
        });
        
        // Remover clase active de todos los tabs
        document.querySelectorAll('.editor-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Mostrar editor seleccionado
        const selectedEditor = document.getElementById(tabType + '-editor');
        if (selectedEditor) {
            selectedEditor.style.display = 'block';
        }
        
        // Activar tab seleccionado
        const activeTab = document.querySelector(`.editor-tab[onclick="switchTab('${tabType}')"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
    } catch (error) {
        console.error('Error cambiando tab:', error);
    }
}

// Función para ejecutar código
function runCode() {
    try {
        const htmlCodeEl = document.getElementById('html-code');
        const cssCodeEl = document.getElementById('css-code');
        const jsCodeEl = document.getElementById('js-code');
        
        const htmlCode = htmlCodeEl ? htmlCodeEl.value : '';
        const cssCode = cssCodeEl ? cssCodeEl.value : '';
        const jsCode = jsCodeEl ? jsCodeEl.value : '';
        
        const fullCode = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
                <style>
                    body { 
                        font-family: system-ui, -apple-system, sans-serif; 
                        padding: 10px;
                    }
                    ${cssCode}
                </style>
            </head>
            <body>
                ${htmlCode}
                <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
                <script>
                    try {
                        ${jsCode}
                    } catch (error) {
                        console.error('Error en JavaScript:', error);
                        document.body.innerHTML += '<div class="alert alert-danger mt-3"><strong>Error JavaScript:</strong> ' + error.message + '</div>';
                    }
                </script>
            </body>
            </html>
        `;
        
        const iframe = document.getElementById('preview-frame');
        if (iframe) {
            iframe.srcdoc = fullCode;
        }
    } catch (error) {
        console.error('Error ejecutando código:', error);
    }
}

// Función para resetear código
function resetCode() {
    try {
        // Encontrar la lección actual
        let lesson = null;
        for (const categoryId in lessonCategories) {
            if (lessonCategories[categoryId].lessons[currentLesson]) {
                lesson = lessonCategories[categoryId].lessons[currentLesson];
                break;
            }
        }
        
        if (lesson) {
            const htmlCode = document.getElementById('html-code');
            const cssCode = document.getElementById('css-code');
            const jsCode = document.getElementById('js-code');
            
            if (htmlCode) htmlCode.value = lesson.initialCode.html || '';
            if (cssCode) cssCode.value = lesson.initialCode.css || '';
            if (jsCode) jsCode.value = lesson.initialCode.js || '';
            
            runCode();
        }
    } catch (error) {
        console.error('Error reseteando código:', error);
    }
}

// ===== SISTEMA DE PROGRESO =====

function loadProgress() {
    try {
        const savedProgress = localStorage.getItem('bootstrapAcademyProgress');
        if (savedProgress) {
            const parsed = JSON.parse(savedProgress);
            if (parsed && typeof parsed === 'object') {
                userProgress = {
                    completedLessons: parsed.completedLessons || [],
                    points: parsed.points || 0,
                    achievements: parsed.achievements || [],
                    currentStreak: parsed.currentStreak || 0
                };
            }
        }