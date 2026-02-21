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

// ===== DATOS DE LECCIONES =====
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
    },
    components: {
        title: 'Componentes de Bootstrap',
        lessons: {
            'navbar': {
                title: 'Navbar Responsiva',
                difficulty: 'Intermedio',
                theory: `
                    <h6>🧭 Navbar en Bootstrap</h6>
                    <p>La navbar es uno de los componentes más importantes para la navegación. Bootstrap 5 ofrece navbars completamente responsivas.</p>
                    
                    <h6>Estructura básica:</h6>
                    <pre><code>&lt;nav class="navbar navbar-expand-lg navbar-dark bg-primary"&gt;
  &lt;div class="container"&gt;
    &lt;a class="navbar-brand" href="#"&gt;Brand&lt;/a&gt;
    &lt;button class="navbar-toggler"&gt;...&lt;/button&gt;
    &lt;div class="navbar-nav"&gt;...&lt;/div&gt;
  &lt;/div&gt;
&lt;/nav&gt;</code></pre>

                    <h6>Clases importantes:</h6>
                    <ul>
                        <li><code>.navbar-expand-{breakpoint}</code> - Cuándo expandir</li>
                        <li><code>.navbar-dark</code> - Texto claro</li>
                        <li><code>.navbar-light</code> - Texto oscuro</li>
                        <li><code>.bg-{color}</code> - Color de fondo</li>
                        <li><code>.fixed-top</code> - Fija arriba</li>
                        <li><code>.sticky-top</code> - Pegajosa</li>
                    </ul>

                    <h6>Componentes de la navbar:</h6>
                    <ul>
                        <li><strong>Brand:</strong> Logo o nombre del sitio</li>
                        <li><strong>Toggler:</strong> Botón para móviles</li>
                        <li><strong>Nav items:</strong> Enlaces de navegación</li>
                        <li><strong>Dropdown:</strong> Menús desplegables</li>
                        <li><strong>Forms:</strong> Formularios inline</li>
                    </ul>
                `,
                initialCode: {
                    html: `<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
  <div class="container">
    <a class="navbar-brand fw-bold" href="#">
      <i class="fas fa-rocket me-2"></i>MiSitio
    </a>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link active" href="#">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Productos</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
            Servicios
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Diseño Web</a></li>
            <li><a class="dropdown-item" href="#">Desarrollo</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Consultoría</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contacto</a>
        </li>
      </ul>
      
      <form class="d-flex me-3">
        <input class="form-control me-2" type="search" placeholder="Buscar...">
        <button class="btn btn-outline-light" type="submit">
          <i class="fas fa-search"></i>
        </button>
      </form>
      
      <div class="d-flex">
        <button class="btn btn-outline-light me-2">Login</button>
        <button class="btn btn-warning">Registro</button>
      </div>
    </div>
  </div>
</nav>

<div class="container mt-4">
  <div class="alert alert-info">
    <h4 class="alert-heading">¡Navbar Responsiva!</h4>
    <p>Esta navbar se adapta automáticamente a diferentes tamaños de pantalla. Prueba a redimensionar la ventana para ver cómo se comporta.</p>
    <hr>
    <p class="mb-0">En móviles, aparecerá un botón hamburguesa que mostrará/ocultará el menú.</p>
  </div>
  
  <div class="row">
    <div class="col-md-8">
      <h2>Contenido Principal</h2>
      <p>Este es el contenido principal de la página. La navbar se mantiene en la parte superior y proporciona navegación consistente.</p>
      <p>Puedes hacer scroll para ver cómo se comporta la navbar.</p>
    </div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">
          <h5>Sidebar</h5>
        </div>
        <div class="card-body">
          <p>Contenido lateral o información adicional.</p>
          <button class="btn btn-sm btn-primary">Acción</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
                    css: `/* Estilos personalizados para navbar */
.navbar-brand {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.navbar-brand:hover {
  transform: scale(1.05);
}

.navbar-brand i {
  color: #ffc107;
  text-shadow: 0 0 10px rgba(255, 193, 7, 0.5);
}

.nav-link {
  transition: all 0.3s ease;
  border-radius: 5px;
  margin: 0 2px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.dropdown-menu {
  border: none;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  border-radius: 10px;
  margin-top: 0.5rem;
}

.dropdown-item {
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
}

.dropdown-item:hover {
  background-color: #007bff;
  color: white;
  transform: translateX(5px);
}

.form-control:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25);
}

.btn:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}

.navbar-toggler:focus {
  box-shadow: none;
}

@media (max-width: 991px) {
  .navbar-nav {
    margin-top: 1rem;
  }
  
  .d-flex.me-3 {
    margin: 1rem 0;
  }
  
  .navbar-nav .nav-link {
    padding: 0.75rem 1rem;
  }
}`,
                    js: `console.log('Navbar lesson loaded!');

// Efecto de scroll en la navbar
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(13, 110, 253, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
      navbar.style.backgroundColor = '';
      navbar.style.backdropFilter = '';
      navbar.style.boxShadow = '';
    }
  }
});

// Cerrar dropdown al hacer click fuera
document.addEventListener('click', function(e) {
  const dropdowns = document.querySelectorAll('.dropdown-menu.show');
  dropdowns.forEach(dropdown => {
    if (!dropdown.parentElement.contains(e.target)) {
      const dropdownToggle = bootstrap.Dropdown.getInstance(dropdown.previousElementSibling);
      if (dropdownToggle) {
        dropdownToggle.hide();
      }
    }
  });
});

// Smooth scroll para enlaces
document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Highlight del nav-link activo
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    // Remover active de todos los enlaces
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    // Agregar active al enlace clickeado
    this.classList.add('active');
  });
});

// Funcionalidad de búsqueda
const searchForm = document.querySelector('form.d-flex');
if (searchForm) {
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const searchInput = this.querySelector('input[type="search"]');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
      alert(`Buscando: "${searchTerm}"`);
      searchInput.value = '';
    }
  });
}

// Animación del brand
const brand = document.querySelector('.navbar-brand');
if (brand) {
  brand.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) rotate(5deg)';
  });
  
  brand.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
}`
                }
            },
            'cards': {
                title: 'Cards Avanzadas',
                difficulty: 'Intermedio',
                theory: `
                    <h6>🃏 Cards en Bootstrap</h6>
                    <p>Las cards son contenedores flexibles y extensibles que pueden incluir headers, footers, imágenes y mucho más contenido.</p>
                    
                    <h6>Estructura básica:</h6>
                    <pre><code>&lt;div class="card"&gt;
  &lt;div class="card-header"&gt;Header&lt;/div&gt;
  &lt;div class="card-body"&gt;
    &lt;h5 class="card-title"&gt;Título&lt;/h5&gt;
    &lt;p class="card-text"&gt;Contenido&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class="card-footer"&gt;Footer&lt;/div&gt;
&lt;/div&gt;</code></pre>

                    <h6>Tipos de contenido:</h6>
                    <ul>
                        <li><strong>card-img-top:</strong> Imagen en la parte superior</li>
                        <li><strong>card-title:</strong> Título principal</li>
                        <li><strong>card-subtitle:</strong> Subtítulo</li>
                        <li><strong>card-text:</strong> Texto del contenido</li>
                        <li><strong>card-link:</strong> Enlaces</li>
                    </ul>

                    <h6>Variaciones:</h6>
                    <ul>
                        <li><code>.card-group</code> - Agrupa cards</li>
                        <li><code>.border-{color}</code> - Bordes coloreados</li>
                        <li><code>.text-{color}</code> - Colores de texto</li>
                        <li><code>.bg-{color}</code> - Fondos coloreados</li>
                    </ul>
                `,
                initialCode: {
                    html: `<div class="container">
  <div class="row mb-4">
    <div class="col-md-4 mb-4">
      <div class="card h-100 shadow-sm">
        <img src="https://picsum.photos/400/200?random=1" class="card-img-top" alt="Imagen">
        <div class="card-body">
          <h5 class="card-title">Card con Imagen</h5>
          <p class="card-text">Esta card incluye una imagen en la parte superior y contenido textual.</p>
          <a href="#" class="btn btn-primary">Ver más</a>
        </div>
      </div>
    </div>
    
    <div class="col-md-4 mb-4">
      <div class="card h-100 shadow-sm border-success">
        <div class="card-header bg-success text-white">
          <i class="fas fa-check-circle me-2"></i>Featured
        </div>
        <div class="card-body">
          <h5 class="card-title text-success">Card con Header</h5>
          <p class="card-text">Card destacada con header coloreado y borde verde.</p>
          <span class="badge bg-success">Nuevo</span>
        </div>
        <div class="card-footer text-muted">
          <small>Actualizado hace 2 mins</small>
        </div>
      </div>
    </div>
    
    <div class="col-md-4 mb-4">
      <div class="card h-100 shadow-sm bg-primary text-white">
        <div class="card-body text-center">
          <i class="fas fa-star fa-3x mb-3"></i>
          <h5 class="card-title">Card Especial</h5>
          <p class="card-text">Card con fondo coloreado y texto centrado.</p>
          <button class="btn btn-light">Acción</button>
        </div>
      </div>
    </div>
  </div>

  <div class="row mb-4">
    <div class="col-md-6 mb-4">
      <div class="card shadow-lg">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="https://picsum.photos/200/200?random=2" class="img-fluid rounded-start h-100" style="object-fit: cover;" alt="Imagen horizontal">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Card Horizontal</h5>
              <p class="card-text">Esta card tiene un layout horizontal con imagen a la izquierda.</p>
              <p class="card-text"><small class="text-muted">Última actualización hace 3 mins</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-md-6 mb-4">
      <div class="card shadow-lg">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <a class="nav-link active" href="#" data-tab="tab1">Tab 1</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-tab="tab2">Tab 2</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-tab="tab3">Tab 3</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="tab-content">
            <div class="tab-pane active" id="tab1">
              <h5 class="card-title">Contenido Tab 1</h5>
              <p class="card-text">Este es el contenido del primer tab.</p>
            </div>
            <div class="tab-pane" id="tab2">
              <h5 class="card-title">Contenido Tab 2</h5>
              <p class="card-text">Contenido del segundo tab con información diferente.</p>
            </div>
            <div class="tab-pane" id="tab3">
              <h5 class="card-title">Contenido Tab 3</h5>
              <p class="card-text">Tercer tab con más opciones y funcionalidades.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-8 mx-auto">
      <div class="card shadow-lg border-0">
        <div class="card-header text-white text-center" style="background: linear-gradient(45deg, #007bff, #6f42c1);">
          <h4 class="mb-0"><i class="fas fa-cog me-2"></i>Card Interactiva</h4>
        </div>
        <div class="card-body p-4">
          <div class="row">
            <div class="col-md-6">
              <h5>Controles</h5>
              <div class="mb-3">
                <label class="form-label">Color de fondo:</label>
                <select class="form-select" id="bgColorSelect">
                  <option value="bg-light">Claro</option>
                  <option value="bg-primary">Primario</option>
                  <option value="bg-success">Éxito</option>
                  <option value="bg-danger">Peligro</option>
                  <option value="bg-warning">Advertencia</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Tamaño de texto:</label>
                <input type="range" class="form-range" id="textSizeRange" min="12" max="24" value="16">
                <span id="textSizeValue">16px</span>
              </div>
              <button class="btn btn-success" onclick="animateCard()">
                <i class="fas fa-magic me-2"></i>Animar
              </button>
            </div>
            <div class="col-md-6">
              <div id="previewCard" class="card bg-light h-100">
                <div class="card-body text-center">
                  <h5>Vista Previa</h5>
                  <p id="previewText">Este texto cambia de tamaño dinámicamente.</p>
                  <span class="badge bg-info">Interactivo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
                    css: `/* Estilos para cards avanzadas */
.card {
  transition: all 0.3s ease;
  border: none;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
}

.card-img-top {
  transition: transform 0.3s ease;
  height: 200px;
  object-fit: cover;
}

.card:hover .card-img-top {
  transform: scale(1.05);
}

.shadow-lg {
  box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important;
}

.nav-tabs .nav-link {
  border: none;
  color: #6c757d;
  transition: all 0.3s ease;
}

.nav-tabs .nav-link.active {
  background-color: transparent;
  border-bottom: 3px solid #007bff;
  color: #007bff;
  font-weight: bold;
}

.nav-tabs .nav-link:hover {
  border-color: transparent;
  background-color: rgba(0, 123, 255, 0.1);
}

.tab-pane {
  display: none;
}

.tab-pane.active {
  display: block;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.badge:hover {
  transform: scale(1.1);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.animate-pulse {
  animation: pulse 0.6s ease;
}

@media (max-width: 768px) {
  .card-body {
    padding: 1rem;
  }
  
  .row.g-0 {
    flex-direction: column;
  }
  
  .col-md-4 img {
    height: 200px;
    width: 100%;
  }
}`,
                    js: `console.log('Cards lesson loaded!');

// Función para cambiar tabs
function switchTab(tabId) {
  try {
    // Ocultar todos los tabs
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });
    
    // Remover active de todos los nav-links
    document.querySelectorAll('.nav-tabs .nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // Mostrar el tab seleccionado
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
      targetTab.classList.add('active');
    }
    
    // Activar el nav-link correspondiente
    const activeLink = document.querySelector(\`[data-tab="\${tabId}"]\`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  } catch (error) {
    console.error('Error cambiando tab:', error);
  }
}

// Event listeners para tabs
document.querySelectorAll('.nav-tabs .nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const tabId = this.getAttribute('data-tab');
    if (tabId) {
      switchTab(tabId);
    }
  });
});

// Controles interactivos
const bgColorSelect = document.getElementById('bgColorSelect');
const textSizeRange = document.getElementById('textSizeRange');
const textSizeValue = document.getElementById('textSizeValue');
const previewCard = document.getElementById('previewCard');
const previewText = document.getElementById('previewText');

// Event listener para cambio de color de fondo
if (bgColorSelect && previewCard) {
  bgColorSelect.addEventListener('change', function() {
    try {
      // Remover clases de color previas
      previewCard.className = previewCard.className.replace(/bg-\\w+/g, '');
      previewCard.classList.add(this.value);
      
      // Ajustar color de texto según el fondo
      if (this.value === 'bg-light' || this.value === 'bg-warning') {
        previewCard.classList.add('text-dark');
        previewCard.classList.remove('text-white');
      } else {
        previewCard.classList.add('text-white');
        previewCard.classList.remove('text-dark');
      }
    } catch (error) {
      console.error('Error cambiando color:', error);
    }
  });
}

// Event listener para cambio de tamaño de texto
if (textSizeRange && previewText && textSizeValue) {
  textSizeRange.addEventListener('input', function() {
    try {
      const size = this.value + 'px';
      previewText.style.fontSize = size;
      textSizeValue.textContent = size;
    } catch (error) {
      console.error('Error cambiando tamaño:', error);
    }
  });
}

// Función para animar card
function animateCard() {
  try {
    const card = document.getElementById('previewCard');
    if (card) {
      card.classList.add('animate-pulse');
      setTimeout(() => {
        card.classList.remove('animate-pulse');
      }, 600);
    }
  } catch (error) {
    console.error('Error animando card:', error);
  }
}

// Agregar interactividad a todas las cards
document.addEventListener('DOMContentLoaded', function() {
  try {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
      card.addEventListener('click', function(e) {
        // No animar si se hizo click en un botón o enlace
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
          return;
        }
        
        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
          this.style.transform = '';
        }, 200);
      });
      
      // Efecto parallax sutil en las imágenes
      const img = card.querySelector('.card-img-top');
      if (img) {
        card.addEventListener('mousemove', function(e) {
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;
          
          img.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale(1.05)\`;
        });
        
        card.addEventListener('mouseleave', function() {
          img.style.transform = '';
        });
      }
    });
    
    // Lazy loading para imágenes
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
    
  } catch (error) {
    console.error('Error configurando interactividad de cards:', error);
  }
});`
                }
            },
            'modals': {
                title: 'Modals Interactivos',
                difficulty: 'Avanzado',
                theory: `
                    <h6>🪟 Modals en Bootstrap</h6>
                    <p>Los modals son ventanas superpuestas que se utilizan para mostrar contenido adicional sin abandonar la página actual.</p>
                    
                    <h6>Estructura básica:</h6>
                    <pre><code>&lt;div class="modal fade" id="exampleModal"&gt;
  &lt;div class="modal-dialog"&gt;
    &lt;div class="modal-content"&gt;
      &lt;div class="modal-header"&gt;
        &lt;h5 class="modal-title"&gt;Título&lt;/h5&gt;
        &lt;button type="button" class="btn-close" data-bs-dismiss="modal"&gt;&lt;/button&gt;
      &lt;/div&gt;
      &lt;div class="modal-body"&gt;
        Contenido del modal
      &lt;/div&gt;
      &lt;div class="modal-footer"&gt;
        &lt;button type="button" class="btn btn-primary"&gt;Guardar&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

                    <h6>Tamaños de modal:</h6>
                    <ul>
                        <li><code>.modal-sm</code> - Pequeño</li>
                        <li><code>.modal-lg</code> - Grande</li>
                        <li><code>.modal-xl</code> - Extra grande</li>
                        <li><code>.modal-fullscreen</code> - Pantalla completa</li>
                    </ul>

                    <h6>Opciones avanzadas:</h6>
                    <ul>
                        <li><strong>Centrado vertical:</strong> <code>.modal-dialog-centered</code></li>
                        <li><strong>Scrollable:</strong> <code>.modal-dialog-scrollable</code></li>
                        <li><strong>Sin animación:</strong> Remover clase <code>.fade</code></li>
                    </ul>
                `,
                initialCode: {
                    html: `<div class="container">
  <div class="text-center mb-4">
    <h2 class="mb-4">Modals Interactivos</h2>
    <button class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#basicModal">
      Modal Básico
    </button>
    <button class="btn btn-success me-2" data-bs-toggle="modal" data-bs-target="#formModal">
      Modal con Formulario
    </button>
    <button class="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#imageModal">
      Galería de Imágenes
    </button>
    <button class="btn btn-danger" onclick="createCustomModal()">
      Modal Dinámico
    </button>
  </div>

  <div class="alert alert-info">
    <h4 class="alert-heading">¡Explora los Modals!</h4>
    <p>Haz clic en los botones de arriba para ver diferentes tipos de modals en acción.</p>
  </div>
</div>

<!-- Modal Básico -->
<div class="modal fade" id="basicModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title">
          <i class="fas fa-info-circle me-2"></i>Modal Básico
        </h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p>Este es un modal básico con contenido simple.</p>
        <p>Los modals son perfectos para mostrar información adicional, confirmaciones o formularios sin salir de la página actual.</p>
        <div class="text-center mt-3">
          <i class="fas fa-lightbulb fa-3x text-warning"></i>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary">Entendido</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal con Formulario -->
<div class="modal fade" id="formModal" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header bg-success text-white">
        <h5 class="modal-title">
          <i class="fas fa-user-plus me-2"></i>Registro de Usuario
        </h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <form id="userForm">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="firstName" required>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName" class="form-label">Apellido</label>
              <input type="text" class="form-control" id="lastName" required>
            </div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" required>
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Teléfono</label>
            <input type="tel" class="form-control" id="phone">
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">Mensaje</label>
            <textarea class="form-control" id="message" rows="3"></textarea>
          </div>
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="acceptTerms" required>
            <label class="form-check-label" for="acceptTerms">
              Acepto los términos y condiciones
            </label>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-success" onclick="submitForm()">
          <i class="fas fa-save me-2"></i>Registrar
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Modal de Galería -->
<div class="modal fade" id="imageModal" tabindex="-1">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header bg-warning text-dark">
        <h5 class="modal-title">
          <i class="fas fa-images me-2"></i>Galería de Imágenes
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body p-0">
        <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="https://picsum.photos/800/400?random=1" class="d-block w-100" alt="Imagen 1">
              <div class="carousel-caption d-none d-md-block">
                <h5>Primera Imagen</h5>
                <p>Descripción de la primera imagen de la galería.</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://picsum.photos/800/400?random=2" class="d-block w-100" alt="Imagen 2">
              <div class="carousel-caption d-none d-md-block">
                <h5>Segunda Imagen</h5>
                <p>Descripción de la segunda imagen con más detalles.</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://picsum.photos/800/400?random=3" class="d-block w-100" alt="Imagen 3">
              <div class="carousel-caption d-none d-md-block">
                <h5>Tercera Imagen</h5>
                <p>Descripción de la tercera imagen de la colección.</p>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
            <span class="visually-hidden">Anterior</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
            <span class="visually-hidden">Siguiente</span>
          </button>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-warning" onclick="downloadImage()">
          <i class="fas fa-download me-2"></i>Descargar
        </button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<!-- Contenedor para modal dinámico -->
<div id="customModalContainer"></div>`,
                    css: `/* Estilos para modals personalizados */
.modal-content {
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.modal-header {
  border-bottom: none;
  padding: 1.5rem;
}

.modal-footer {
  border-top: none;
  padding: 1.5rem;
}

.modal.fade .modal-dialog {
  transition: all 0.3s ease-out;
  transform: translate(0, -50px) scale(0.9);
}

.modal.show .modal-dialog {
  transform: translate(0, 0) scale(1);
}

.carousel-item img {
  height: 400px;
  object-fit: cover;
}

.carousel-caption {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 1rem;
  backdrop-filter: blur(5px);
}

.form-control:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}

.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.custom-modal {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.custom-modal .modal-content {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

@media (max-width: 768px) {
  .modal-lg, .modal-xl {
    max-width: 95%;
  }
  
  .carousel-item img {
    height: 250px;
  }
  
  .modal-body {
    padding: 1rem;
  }
}

@keyframes modalBounce {
  0% { transform: scale(0.3); }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); }
}

.modal-bounce .modal-dialog {
  animation: modalBounce 0.5s ease;
}`,
                    js: `console.log('Modals lesson loaded!');

// Función para enviar formulario
function submitForm() {
  try {
    const form = document.getElementById('userForm');
    if (!form) return;
    
    if (form.checkValidity()) {
      const submitBtn = event.target;
      const originalText = submitBtn.innerHTML;
      
      // Mostrar loading
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
      submitBtn.disabled = true;
      
      // Simular envío
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>¡Registrado!';
        submitBtn.classList.remove('btn-success');
        submitBtn.classList.add('btn-success');
        
        setTimeout(() => {
          const modal = bootstrap.Modal.getInstance(document.getElementById('formModal'));
          if (modal) {
            modal.hide();
          }
          form.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('btn-success');
          submitBtn.classList.add('btn-success');
        }, 1500);
      }, 2000);
    } else {
      form.reportValidity();
    }
  } catch (error) {
    console.error('Error enviando formulario:', error);
  }
}

// Función para descargar imagen (simulada)
function downloadImage() {
  try {
    const activeSlide = document.querySelector('.carousel-item.active img');
    if (!activeSlide) return;
    
    const imageSrc = activeSlide.src;
    
    // Simular descarga
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'imagen-' + Date.now() + '.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Mostrar mensaje
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check me-2"></i>¡Descargado!';
    setTimeout(() => {
      btn.innerHTML = originalText;
    }, 2000);
  } catch (error) {
    console.error('Error descargando imagen:', error);
  }
}

// Función para crear modal dinámico
function createCustomModal() {
  try {
    const modalHTML = `
      <div class="modal fade custom-modal" id="customModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                <i class="fas fa-magic me-2"></i>Modal Mágico
              </h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body text-center">
              <div class="mb-4">
                <i class="fas fa-star fa-3x text-warning mb-3"></i>
                <h4>¡Modal creado dinámicamente!</h4>
                <p>Este modal fue generado completamente con JavaScript.</p>
              </div>
              <div class="d-flex justify-content-center gap-2 mb-3">
                <button class="btn btn-warning btn-sm" onclick="changeModalColor('warning')">Amarillo</button>
                <button class="btn btn-danger btn-sm" onclick="changeModalColor('danger')">Rojo</button>
                <button class="btn btn-success btn-sm" onclick="changeModalColor('success')">Verde</button>
              </div>
              <div class="progress mb-3">
                <div class="progress-bar progress-bar-striped progress-bar-animated" 
                     style="width: 0%" id="magicProgress"></div>
              </div>
              <button class="btn btn-light" onclick="startMagic()">
                <i class="fas fa-wand-magic me-2"></i>Hacer Magia
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    const container = document.getElementById('customModalContainer');
    if (container) {
      container.innerHTML = modalHTML;
      
      const modal = new bootstrap.Modal(document.getElementById('customModal'));
      modal.show();
      
      // Limpiar cuando se cierre
      document.getElementById('customModal').addEventListener('hidden.bs.modal', function() {
        container.innerHTML = '';
      });
    }
  } catch (error) {
    console.error('Error creando modal personalizado:', error);
  }
}

// Función para cambiar color del modal
function changeModalColor(color) {
  try {
    const modal = document.querySelector('#customModal .modal-content');
    if (modal) {
      const colorMap = {
        warning: 'linear-gradient(135deg, #f39c12 0%, #f1c40f 100%)',
        danger: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
        success: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)'
      };
      
      modal.style.background = colorMap[color] || colorMap.warning;
    }
  } catch (error) {
    console.error('Error cambiando color del modal:', error);
  }
}

// Función de magia
function startMagic() {
  try {
    const progressBar = document.getElementById('magicProgress');
    if (!progressBar) return;
    
    let width = 0;
    
    const interval = setInterval(() => {
      width += 10;
      progressBar.style.width = width + '%';
      
      if (width >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          progressBar.style.width = '0%';
          showMagicEffect();
        }, 500);
      }
    }, 100);
  } catch (error) {
    console.error('Error en función de magia:', error);
  }
}

// Efecto mágico
function showMagicEffect() {
  try {
    const modalBody = document.querySelector('#customModal .modal-body');
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="text-center">
          <div class="mb-4" style="font-size: 4rem;">✨🎉✨</div>
          <h3>¡Magia realizada!</h3>
          <p>Has completado el tutorial de modals con éxito.</p>
          <button class="btn btn-warning" data-bs-dismiss="modal">
            <i class="fas fa-trophy me-2"></i>¡Genial!
          </button>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error mostrando efecto mágico:', error);
  }
}

// Event listeners para mejorar la experiencia
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Autoplay del carousel cuando se abre el modal
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
      imageModal.addEventListener('shown.bs.modal', function() {
        const carousel = new bootstrap.Carousel(document.getElementById('carouselExample'), {
          interval: 3000,
          wrap: true
        });
      });
    }
    
    // Focus en el primer campo cuando se abre el modal de formulario
    const formModal = document.getElementById('formModal');
    if (formModal) {
      formModal.addEventListener('shown.bs.modal', function() {
        const firstInput = document.getElementById('firstName');
        if (firstInput) {
          firstInput.focus();
        }
      });
    }
    
    // Animación bounce para modals
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('show.bs.modal', function() {
        this.classList.add('modal-bounce');
      });
      
      modal.addEventListener('hidden.bs.modal', function() {
        this.classList.remove('modal-bounce');
      });
    });
    
  } catch (error) {
    console.error('Error configurando event listeners de modals:', error);
  }
});`
                }
            }
        }
    },
    advanced: {
        title: 'Técnicas Avanzadas',
        lessons: {
            'custom-css': {
                title: 'CSS Personalizado',
                difficulty: 'Avanzado',
                theory: `
                    <h6>🎨 Personalizando Bootstrap</h6>
                    <p>Aprende a personalizar Bootstrap con CSS propio sin romper la funcionalidad.</p>
                    
                    <h6>Buenas prácticas:</h6>
                    <ul>
                        <li>Usa variables CSS para colores</li>
                        <li>Sobrescribe clases específicamente</li>
                        <li>Mantén la estructura de Bootstrap</li>
                        <li>Usa selectores específicos para evitar conflictos</li>
                    </ul>

                    <h6>Variables CSS Personalizadas:</h6>
                    <pre><code>:root {
  --custom-primary: #6c5ce7;
  --custom-secondary: #a29bfe;
}</code></pre>

                    <h6>Sobrescribir componentes:</h6>
                    <pre><code>.btn-custom {
  background: var(--custom-primary);
  border: none;
  border-radius: 25px;
}</code></pre>
                `,
                initialCode: {
                    html: `<div class="container">
  <div class="custom-hero text-center py-5 mb-4">
    <h1 class="custom-title">Diseño Personalizado</h1>
    <p class="lead">Bootstrap + CSS personalizado = ¡Increíble!</p>
    <button class="btn custom-btn me-2">Botón Personalizado</button>
    <button class="btn custom-btn-outline">Botón Outline</button>
  </div>

  <div class="row">
    <div class="col-md-4 mb-4">
      <div class="custom-card">
        <div class="custom-card-header">
          <i class="fas fa-palette fa-2x"></i>
        </div>
        <div class="custom-card-body">
          <h5>Colores Vibrantes</h5>
          <p>Paleta de colores personalizada que mantiene la accesibilidad.</p>
        </div>
      </div>
    </div>
    
    <div class="col-md-4 mb-4">
      <div class="custom-card">
        <div class="custom-card-header">
          <i class="fas fa-magic fa-2x"></i>
        </div>
        <div class="custom-card-body">
          <h5>Efectos Únicos</h5>
          <p>Animaciones y transiciones que mejoran la experiencia.</p>
        </div>
      </div>
    </div>
    
    <div class="col-md-4 mb-4">
      <div class="custom-card">
        <div class="custom-card-header">
          <i class="fas fa-cog fa-2x"></i>
        </div>
        <div class="custom-card-body">
          <h5>Totalmente Funcional</h5>
          <p>Mantiene toda la funcionalidad de Bootstrap.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="custom-section">
    <h3 class="text-center mb-4">Sección Personalizada</h3>
    <div class="custom-progress-container">
      <div class="custom-progress-bar" id="customProgress">
        <span class="custom-progress-text">0%</span>
      </div>
    </div>
    <div class="text-center mt-4">
      <button class="btn custom-btn" onclick="animateProgress()">
        <i class="fas fa-play me-2"></i>Animar Progreso
      </button>
    </div>
  </div>
</div>`,
                    css: `:root {
  --custom-primary: #6c5ce7;
  --custom-secondary: #a29bfe;
  --custom-accent: #fd79a8;
  --custom-success: #00b894;
  --custom-warning: #fdcb6e;
  --custom-dark: #2d3436;
}

.custom-hero {
  background: linear-gradient(135deg, var(--custom-primary), var(--custom-secondary));
  color: white;
  border-radius: 20px;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
}

.custom-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255,255,255,0.05) 10px,
    rgba(255,255,255,0.05) 20px
  );
  animation: movePattern 20s linear infinite;
}

@keyframes movePattern {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.custom-title {
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  position: relative;
  z-index: 2;
}

.custom-btn {
  background: white;
  color: var(--custom-primary);
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-weight: bold;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.custom-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s ease;
}

.custom-btn:hover::before {
  left: 100%;
}

.custom-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  color: var(--custom-primary);
}

.custom-btn-outline {
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 10px 28px;
  border-radius: 25px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.custom-btn-outline:hover {
  background: white;
  color: var(--custom-primary);
  transform: translateY(-3px);
}

.custom-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.custom-card:hover {
  transform: translateY(-10px) rotateX(5deg);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  border-color: var(--custom-primary);
}

.custom-card-header {
  background: linear-gradient(135deg, var(--custom-primary), var(--custom-accent));
  color: white;
  padding: 2rem;
  text-align: center;
  position: relative;
}

.custom-card-header i {
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

.custom-card-body {
  padding: 1.5rem;
  text-align: center;
}

.custom-section {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 3rem 2rem;
  border-radius: 20px;
  margin: 3rem 0;
  border: 1px solid rgba(108, 92, 231, 0.2);
}

.custom-progress-container {
  background: #e9ecef;
  border-radius: 50px;
  overflow: hidden;
  height: 50px;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}

.custom-progress-bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(45deg, var(--custom-primary), var(--custom-accent));
  border-radius: 50px;
  transition: width 2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.custom-progress-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.custom-progress-text {
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  z-index: 2;
  position: relative;
}

/* Responsive */
@media (max-width: 768px) {
  .custom-title {
    font-size: 2rem;
  }
  
  .custom-hero {
    padding: 2rem 1rem;
  }
  
  .custom-card:hover {
    transform: translateY(-5px);
  }
}`,
                    js: `console.log('Custom CSS lesson loaded!');

// Función para animar progreso
function animateProgress() {
  try {
    const progressBar = document.getElementById('customProgress');
    const progressText = document.querySelector('.custom-progress-text');
    
    if (!progressBar || !progressText) return;
    
    let width = 0;
    const targetWidth = Math.floor(Math.random() * 100) + 1;
    
    // Reset
    progressBar.style.width = '0%';
    progressText.textContent = '0%';
    
    // Animar
    const interval = setInterval(() => {
      width += 2;
      progressBar.style.width = width + '%';
      progressText.textContent = width + '%';
      
      if (width >= targetWidth) {
        clearInterval(interval);
        
        // Efecto de celebración
        setTimeout(() => {
          progressBar.style.background = 'linear-gradient(45deg, var(--custom-success), var(--custom-warning))';
          progressText.textContent = '¡Completado!';
          
          setTimeout(() => {
            progressBar.style.background = '';
            progressText.textContent = targetWidth + '%';
          }, 2000);
        }, 500);
      }
    }, 50);
  } catch (error) {
    console.error('Error animando progreso:', error);
  }
}

// Animación de entrada para las cards
function animateCards() {
  try {
    const cards = document.querySelectorAll('.custom-card');
    
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 200);
    });
  } catch (error) {
    console.error('Error animando cards:', error);
  }
}

// Efecto parallax sutil
function addParallaxEffect() {
  try {
    const hero = document.querySelector('.custom-hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;
      hero.style.transform = \`translateY(\${rate}px)\`;
    });
  } catch (error) {
    console.error('Error agregando efecto parallax:', error);
  }
}

// Partículas flotantes
function createFloatingParticles() {
  try {
    const hero = document.querySelector('.custom-hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = \`
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        left: \${Math.random() * 100}%;
        top: \${Math.random() * 100}%;
        animation: float \${3 + Math.random() * 4}s ease-in-out infinite;
        animation-delay: \${Math.random() * 2}s;
        z-index: 1;
      \`;
      hero.appendChild(particle);
    }
    
    // CSS para animación de partículas
    const style = document.createElement('style');
    style.textContent = \`
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
      }
    \`;
    document.head.appendChild(style);
  } catch (error) {
    console.error('Error creando partículas:', error);
  }
}

// Efecto de typing en el título
function typingEffect() {
  try {
    const title = document.querySelector('.custom-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
      title.textContent += text.charAt(i);
      i++;
      
      if (i >= text.length) {
        clearInterval(typeInterval);
        
        // Agregar cursor parpadeante
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.style.animation = 'blink 1s infinite';
        title.appendChild(cursor);
        
        // CSS para cursor
        const style = document.createElement('style');
        style.textContent = \`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        \`;
        document.head.appendChild(style);
        
        // Remover cursor después de 3 segundos
        setTimeout(() => {
          if (cursor.parentNode) {
            cursor.remove();
          }
        }, 3000);
      }
    }, 100);
  } catch (error) {
    console.error('Error con efecto de typing:', error);
  }
}

// Inicializar efectos cuando carga el DOM
document.addEventListener('DOMContentLoaded', function() {
  try {
    setTimeout(animateCards, 500);
    setTimeout(typingEffect, 1000);
    setTimeout(createFloatingParticles, 2000);
    addParallaxEffect();
    
    // Agregar eventos a las cards
    document.querySelectorAll('.custom-card').forEach(card => {
      card.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      });
    });
    
  } catch (error) {
    console.error('Error inicializando efectos:', error);
  }
});`
                }
            },
            'animations': {
                title: 'Animaciones CSS',
                difficulty: 'Avanzado',
                theory: `
                    <h6>✨ Animaciones con Bootstrap</h6>
                    <p>Combina Bootstrap con animaciones CSS para crear experiencias dinámicas y atractivas.</p>
                    
                    <h6>Tipos de animaciones:</h6>
                    <ul>
                        <li><strong>Transitions:</strong> Para cambios suaves en hover</li>
                        <li><strong>Keyframes:</strong> Para animaciones complejas</li>
                        <li><strong>Transform:</strong> Para efectos 3D y movimiento</li>
                        <li><strong>CSS Variables:</strong> Para animaciones dinámicas</li>
                    </ul>

                    <h6>Ejemplo de Keyframe:</h6>
                    <pre><code>@keyframes slideIn {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}</code></pre>

                    <h6>Buenas prácticas:</h6>
                    <ul>
                        <li>Usa <code>transform</code> y <code>opacity</code> para mejor rendimiento</li>
                        <li>Evita animar propiedades que causan reflow</li>
                        <li>Usa <code>will-change</code> para optimizar</li>
                        <li>Respeta <code>prefers-reduced-motion</code></li>
                    </ul>
                `,
                initialCode: {
                    html: `<div class="container">
  <div class="text-center mb-5">
    <h1 class="animated-title" data-text="Animaciones CSS">Animaciones CSS</h1>
    <p class="lead fade-in-up">Explora diferentes tipos de animaciones</p>
  </div>

  <div class="row mb-5">
    <div class="col-md-4 mb-4">
      <div class="card animated-card hover-lift">
        <div class="card-body text-center">
          <i class="fas fa-heart fa-3x text-danger mb-3 pulse-heart"></i>
          <h5>Pulso</h5>
          <p>Corazón que late continuamente</p>
          <button class="btn btn-danger btn-animated">Hacer click</button>
        </div>
      </div>
    </div>
    
    <div class="col-md-4 mb-4">
      <div class="card animated-card hover-rotate">
        <div class="card-body text-center">
          <i class="fas fa-cog fa-3x text-primary mb-3 spin-gear"></i>
          <h5>Rotación</h5>
          <p>Engranaje girando constantemente</p>
          <button class="btn btn-primary btn-animated">Hacer click</button>
        </div>
      </div>
    </div>
    
    <div class="col-md-4 mb-4">
      <div class="card animated-card hover-bounce">
        <div class="card-body text-center">
          <i class="fas fa-rocket fa-3x text-success mb-3 bounce-rocket"></i>
          <h5>Rebote</h5>
          <p>Cohete rebotando arriba y abajo</p>
          <button class="btn btn-success btn-animated">Hacer click</button>
        </div>
      </div>
    </div>
  </div>

  <div class="row mb-5">
    <div class="col-12">
      <div class="animated-section">
        <h3 class="text-center mb-4">Sección Interactiva</h3>
        <div class="animation-controls text-center mb-4">
          <button class="btn btn-primary me-2" onclick="startWaveAnimation()">
            <i class="fas fa-water me-2"></i>Onda
          </button>
          <button class="btn btn-success me-2" onclick="startRainAnimation()">
            <i class="fas fa-cloud-rain me-2"></i>Lluvia
          </button>
          <button class="btn btn-warning me-2" onclick="startFireworksAnimation()">
            <i class="fas fa-star me-2"></i>Fuegos Artificiales
          </button>
          <button class="btn btn-danger" onclick="resetAnimations()">
            <i class="fas fa-stop me-2"></i>Reset
          </button>
        </div>
        <div class="animation-playground" id="animationPlayground">
          <div class="text-center py-5">
            <h4 class="text-muted">Haz click en los botones para ver las animaciones</h4>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-6 mb-4">
      <div class="card morphing-card">
        <div class="card-header">
          <h5>Card Transformable</h5>
        </div>
        <div class="card-body">
          <p>Esta card cambia de forma cuando haces hover.</p>
          <div class="morphing-shape"></div>
        </div>
      </div>
    </div>
    
    <div class="col-md-6 mb-4">
      <div class="card gradient-card">
        <div class="card-header">
          <h5>Gradiente Animado</h5>
        </div>
        <div class="card-body">
          <p>Fondo con gradiente que cambia constantemente.</p>
          <div class="gradient-bar"></div>
        </div>
      </div>
    </div>
  </div>
</div>`,
                    css: `/* Variables para animaciones */
:root {
  --animation-duration: 1s;
  --animation-ease: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Título animado */
.animated-title {
  position: relative;
  display: inline-block;
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(45deg, #007bff, #6f42c1, #e83e8c, #fd7e14);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.fade-in-up {
  animation: fadeInUp 1s ease 0.5s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Cards animadas */
.animated-card {
  transition: all 0.3s var(--animation-ease);
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.animated-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s ease;
}

.animated-card:hover::before {
  left: 100%;
}

.hover-lift:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.hover-rotate:hover {
  transform: rotateY(10deg) scale(1.02);
}

.hover-bounce:hover {
  animation: hoverBounce 0.6s ease;
}

@keyframes hoverBounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

/* Iconos animados */
.pulse-heart {
  animation: pulse 1.5s ease-in-out infinite;
}

.spin-gear {
  animation: spin 3s linear infinite;
}

.bounce-rocket {
  animation: bounce 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  60% { transform: translateY(-10px); }
}

/* Pausar animaciones en hover de card */
.animated-card:hover .pulse-heart,
.animated-card:hover .spin-gear,
.animated-card:hover .bounce-rocket {
  animation-play-state: paused;
}

/* Botones animados */
.btn-animated {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.btn-animated::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  transition: all 0.6s ease;
  transform: translate(-50%, -50%);
}

.btn-animated:active::before {
  width: 300px;
  height: 300px;
}

/* Sección animada */
.animated-section {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.animation-playground {
  min-height: 300px;
  background: #fff;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  border: 2px dashed #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Animaciones del playground */
.wave-animation {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(45deg, #007bff, #0056b3);
  animation: wave 2s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { 
    clip-path: polygon(0 40%, 15% 50%, 30% 35%, 50% 45%, 70% 30%, 85% 40%, 100% 35%, 100% 100%, 0% 100%);
  }
  50% { 
    clip-path: polygon(0 30%, 15% 40%, 30% 55%, 50% 35%, 70% 50%, 85% 30%, 100% 45%, 100% 100%, 0% 100%);
  }
}

.rain-drop {
  position: absolute;
  width: 2px;
  height: 20px;
  background: linear-gradient(to bottom, #007bff, transparent);
  animation: fall linear infinite;
}

@keyframes fall {
  from { transform: translateY(-100px); opacity: 1; }
  to { transform: translateY(400px); opacity: 0; }
}

.firework {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: explode 1s ease-out forwards;
}

@keyframes explode {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(20);
    opacity: 0;
  }
}

/* Cards morfológicas */
.morphing-card {
  transition: all 0.5s ease;
}

.morphing-card:hover {
  border-radius: 50px 10px 50px 10px;
}

.morphing-shape {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #e83e8c, #fd7e14);
  margin: 20px auto;
  border-radius: 50%;
  transition: all 0.5s ease;
}

.morphing-card:hover .morphing-shape {
  border-radius: 0;
  transform: rotate(45deg);
  background: linear-gradient(45deg, #007bff, #6f42c1);
}

/* Gradiente animado */
.gradient-card {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
  background-size: 400% 400%;
  animation: gradientMove 5s ease infinite;
  color: white;
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.gradient-bar {
  height: 20px;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ff6b6b);
  background-size: 200% 100%;
  animation: gradientSlide 3s linear infinite;
  border-radius: 10px;
}

@keyframes gradientSlide {
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
}

/* Responsive */
@media (max-width: 768px) {
  .animated-title {
    font-size: 2rem;
  }
  
  .animation-playground {
    min-height: 200px;
  }
  
  .animated-card:hover {
    transform: scale(1.02);
  }
}

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`,
                    js: `console.log('Animations lesson loaded!');

// Función para crear animación de onda
function startWaveAnimation() {
  try {
    const playground = document.getElementById('animationPlayground');
    if (!playground) return;
    
    resetAnimations();
    
    playground.innerHTML = '<div class="wave-animation"></div>';
    
    setTimeout(() => {
      const wave = playground.querySelector('.wave-animation');
      if (wave) {
        wave.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
      }
    }, 1000);
    
  } catch (error) {
    console.error('Error creando animación de onda:', error);
  }
}

// Función para crear animación de lluvia
function startRainAnimation() {
  try {
    const playground = document.getElementById('animationPlayground');
    if (!playground) return;
    
    resetAnimations();
    playground.innerHTML = '';
    
    // Crear gotas de lluvia
    for (let i = 0; i < 30; i++) {
      const drop = document.createElement('div');
      drop.className = 'rain-drop';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
      drop.style.animationDelay = Math.random() * 2 + 's';
      playground.appendChild(drop);
    }
    
    // Cambiar color de las gotas después de un tiempo
    setTimeout(() => {
      const drops = playground.querySelectorAll('.rain-drop');
      drops.forEach(drop => {
        drop.style.background = 'linear-gradient(to bottom, #ffc107, transparent)';
      });
    }, 2000);
    
  } catch (error) {
    console.error('Error creando animación de lluvia:', error);
  }
}

// Función para crear animación de fuegos artificiales
function startFireworksAnimation() {
  try {
    const playground = document.getElementById('animationPlayground');
    if (!playground) return;
    
    resetAnimations();
    playground.innerHTML = '';
    
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57', '#ff9ff3', '#54a0ff'];
    
    // Crear múltiples fuegos artificiales
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        createFirework(playground, colors);
      }, i * 300);
    }
    
  } catch (error) {
    console.error('Error creando animación de fuegos artificiales:', error);
  }
}

// Función auxiliar para crear un fuego artificial
function createFirework(container, colors) {
  try {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.background = colors[Math.floor(Math.random() * colors.length)];
    firework.style.left = Math.random() * 80 + 10 + '%';
    firework.style.top = Math.random() * 60 + 20 + '%';
    firework.style.boxShadow = `0 0 20px ${firework.style.background}`;
    
    container.appendChild(firework);
    
    // Remover después de la animación
    setTimeout(() => {
      if (firework.parentNode) {
        firework.remove();
      }
    }, 1000);
    
  } catch (error) {
    console.error('Error creando fuego artificial:', error);
  }
}

// Función para resetear animaciones
function resetAnimations() {
  try {
    const playground = document.getElementById('animationPlayground');
    if (playground) {
      playground.innerHTML = `
        <div class="text-center py-5">
          <h4 class="text-muted">Haz click en los botones para ver las animaciones</h4>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error reseteando animaciones:', error);
  }
}

// Función para agregar efectos de click a las cards
function addCardClickEffects() {
  try {
    document.querySelectorAll('.animated-card').forEach(card => {
      card.addEventListener('click', function(e) {
        // No animar si se hizo click en un botón
        if (e.target.tagName === 'BUTTON') return;
        
        // Crear efecto de ondas
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple 0.6s linear;
          left: ${x - 25}px;
          top: ${y - 25}px;
          width: 50px;
          height: 50px;
          pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
    
    // CSS para el efecto ripple
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
  } catch (error) {
    console.error('Error agregando efectos de click:', error);
  }
}

// Función para animación de entrada escalonada
function staggeredEntrance() {
  try {
    const cards = document.querySelectorAll('.animated-card');
    
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 200 + 500);
    });
    
  } catch (error) {
    console.error('Error en animación escalonada:', error);
  }
}

// Función para efecto parallax en scroll
function addParallaxEffect() {
  try {
    const animatedSection = document.querySelector('.animated-section');
    if (!animatedSection) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.2;
      animatedSection.style.transform = `translateY(${rate}px)`;
    });
    
  } catch (error) {
    console.error('Error agregando efecto parallax:', error);
  }
}

// Función para detectar elementos en viewport
function observeElements() {
  try {
    if (!('IntersectionObserver' in window)) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animated-card, .morphing-card, .gradient-card').forEach(el => {
      observer.observe(el);
    });
    
    // CSS para elementos en vista
    const style = document.createElement('style');
    style.textContent = `
      .animated-card,
      .morphing-card,
      .gradient-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
      }
      
      .in-view {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
    
  } catch (error) {
    console.error('Error configurando observador:', error);
  }
}

// Función para efectos de mouse sobre las cards
function addMouseEffects() {
  try {
    document.querySelectorAll('.animated-card').forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
    
  } catch (error) {
    console.error('Error agregando efectos de mouse:', error);
  }
}

// Función para crear partículas flotantes
function createFloatingParticles() {
  try {
    const container = document.querySelector('.container');
    if (!container) return;
    
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: rgba(0, 123, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        animation: float ${5 + Math.random() * 5}s ease-in-out infinite;
        animation-delay: ${Math.random() * 3}s;
        z-index: -1;
      `;
      document.body.appendChild(particle);
    }
    
    // CSS para animación de partículas
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { 
          transform: translateY(0px) rotate(0deg); 
          opacity: 0.3; 
        }
        50% { 
          transform: translateY(-30px) rotate(180deg); 
          opacity: 0.8; 
        }
      }
    `;
    document.head.appendChild(style);
    
  } catch (error) {
    console.error('Error creando partículas flotantes:', error);
  }
}

// Inicialización cuando carga el DOM
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Esperar un poco antes de iniciar las animaciones
    setTimeout(() => {
      staggeredEntrance();
      addCardClickEffects();
      addParallaxEffect();
      observeElements();
      addMouseEffects();
      createFloatingParticles();
    }, 100);
    
  } catch (error) {
    console.error('Error inicializando animaciones:', error);
  }
});

// Limpiar partículas cuando se cambie de lección
window.addEventListener('beforeunload', function() {
  try {
    document.querySelectorAll('div[style*="position: fixed"]').forEach(particle => {
      if (particle.parentNode === document.body) {
        particle.remove();
      }
    });
  } catch (error) {
    console.error('Error limpiando partículas:', error);
  }
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
}// Función para iniciar lección
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

// ===== FUNCIONES DE PLAYGROUND =====

function openPlayground() {
    try {
        document.getElementById('main-menu').style.display = 'none';
        document.getElementById('playground-view').style.display = 'block';
        
        // Código inicial del playground
        const initialHTML = `<div class="container mt-4">
  <div class="row">
    <div class="col-12 text-center">
      <h1 class="display-4 text-primary">¡Bootstrap Playground!</h1>
      <p class="lead">Experimenta libremente con Bootstrap</p>
      <button class="btn btn-primary btn-lg">¡Empezar a crear!</button>
    </div>
  </div>
</div>`;

        const playgroundHTML = document.getElementById('playground-html-code');
        const playgroundCSS = document.getElementById('playground-css-code');
        const playgroundJS = document.getElementById('playground-js-code');
        
        if (playgroundHTML) playgroundHTML.value = initialHTML;
        if (playgroundCSS) playgroundCSS.value = '/* Tu CSS personalizado aquí */\n\n';
        if (playgroundJS) playgroundJS.value = '// Tu JavaScript aquí\nconsole.log("¡Playground listo!");';
        
        runPlaygroundCode();
    } catch (error) {
        console.error('Error abriendo playground:', error);
    }
}

function switchPlaygroundTab(tabType) {
    try {
        const editors = ['playground-html-editor', 'playground-css-editor', 'playground-js-editor'];
        editors.forEach(editorId => {
            const editor = document.getElementById(editorId);
            if (editor) editor.style.display = 'none';
        });
        
        document.querySelectorAll('#playground-view .editor-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const selectedEditor = document.getElementById('playground-' + tabType + '-editor');
        if (selectedEditor) {
            selectedEditor.style.display = 'block';
        }
        
        const activeTab = document.querySelector(`#playground-view .editor-tab[onclick="switchPlaygroundTab('${tabType}')"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
    } catch (error) {
        console.error('Error cambiando tab del playground:', error);
    }
}

function runPlaygroundCode() {
    try {
        const htmlCodeEl = document.getElementById('playground-html-code');
        const cssCodeEl = document.getElementById('playground-css-code');
        const jsCodeEl = document.getElementById('playground-js-code');
        
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
                    }
                </script>
            </body>
            </html>
        `;
        
        const iframe = document.getElementById('playground-preview');
        if (iframe) {
            iframe.srcdoc = fullCode;
        }
    } catch (error) {
        console.error('Error ejecutando código del playground:', error);
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
}// ===== FUNCIONES DE UTILIDAD =====

function saveProject() {
    try {
        const htmlCodeEl = document.getElementById('playground-html-code');
        const cssCodeEl = document.getElementById('playground-css-code');
        const jsCodeEl = document.getElementById('playground-js-code');
        
        const project = {
            html: htmlCodeEl ? htmlCodeEl.value : '',
            css: cssCodeEl ? cssCodeEl.value : '',
            js: jsCodeEl ? jsCodeEl.value : '',
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('bootstrapPlaygroundProject', JSON.stringify(project));
        
        // Mostrar confirmación
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check me-2"></i>Guardado!';
        btn.classList.add('btn-success');
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('btn-success');
        }, 2000);
    } catch (error) {
        console.error('Error guardando proyecto:', error);
    }
}

function shareProject() {
    try {
        const htmlCodeEl = document.getElementById('playground-html-code');
        const cssCodeEl = document.getElementById('playground-css-code');
        const jsCodeEl = document.getElementById('playground-js-code');
        
        const projectCode = `HTML:\n${htmlCodeEl ? htmlCodeEl.value : ''}\n\nCSS:\n${cssCodeEl ? cssCodeEl.value : ''}\n\nJS:\n${jsCodeEl ? jsCodeEl.value : ''}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(projectCode).then(() => {
                alert('Código copiado al portapapeles');
            }).catch(() => {
                console.log('Error copiando al portapapeles');
            });
        } else {
            console.log('Clipboard API no disponible');
        }
    } catch (error) {
        console.error('Error compartiendo proyecto:', error);
    }
}

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

function showChallenges() {
    try {
        document.getElementById('main-menu').style.display = 'none';
        document.getElementById('challenges-view').style.display = 'block';
        
        const challengesGrid = document.getElementById('challenges-grid');
        if (challengesGrid) {
            challengesGrid.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info">
                        <h4>🚧 Próximamente</h4>
                        <p>Los desafíos estarán disponibles en la próxima versión. ¡Mantente atento!</p>
                        <hr>
                        <p class="mb-0">Mientras tanto, practica con las lecciones y el playground.</p>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error mostrando desafíos:', error);
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
                                <i class="fas fa-question-circle me-2"></i>Ayuda
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <h6>🚀 Cómo usar Bootstrap Academy</h6>
                            <ul>
                                <li><strong>Lecciones:</strong> Aprende paso a paso con teoría y práctica</li>
                                <li><strong>Playground:</strong> Experimenta libremente con Bootstrap</li>
                                <li><strong>Progreso:</strong> Sigue tu avance y gana puntos</li>
                            </ul>
                            
                            <h6>💡 Consejos</h6>
                            <ul>
                                <li>Practica escribiendo el código en lugar de solo copiarlo</li>
                                <li>Experimenta modificando los ejemplos</li>
                                <li>Usa el playground para crear tus propios proyectos</li>
                                <li>No dudes en consultar la documentación oficial de Bootstrap</li>
                            </ul>

                            <h6>🏆 Sistema de Puntos</h6>
                            <ul>
                                <li>Completar lección: +100 puntos</li>
                                <li>Logros especiales: +50-200 puntos</li>
                            </ul>

                            <h6>⌨️ Atajos de Teclado</h6>
                            <ul>
                                <li><kbd>Ctrl + Enter</kbd> - Ejecutar código</li>
                                <li><kbd>Escape</kbd> - Volver al menú principal</li>
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

// ===== FUNCIONES DE COMPATIBILIDAD =====

function checkBrowserCompatibility() {
    try {
        // Verificar características necesarias
        const requiredFeatures = [
            'localStorage' in window,
            'JSON' in window,
            'addEventListener' in document,
            'querySelector' in document
        ];
        
        const isCompatible = requiredFeatures.every(feature => feature);
        
        if (!isCompatible) {
            const warningDiv = document.createElement('div');
            warningDiv.className = 'alert alert-warning';
            warningDiv.innerHTML = `
                <h4>Navegador no compatible</h4>
                <p>Por favor, actualiza tu navegador para una mejor experiencia.</p>
            `;
            document.body.insertBefore(warningDiv, document.body.firstChild);
        }
        
        return isCompatible;
    } catch (error) {
        console.error('Error verificando compatibilidad:', error);
        return false;
    }
}

// ===== INICIALIZACIÓN =====

function initializeApp() {
    try {
        console.log('🎉 Iniciando Bootstrap Academy...');
        
        // Cargar progreso guardado
        loadProgress();
        
        // Configurar auto-ejecución de código con debounce
        setupAutoExecution();
        
        // Configurar event listeners adicionales
        setupEventListeners();
        
        console.log('✅ Bootstrap Academy inicializada correctamente');
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
        
        // Auto-ejecutar código en playground
        const playgroundTextareas = ['playground-html-code', 'playground-css-code', 'playground-js-code'];
        playgroundTextareas.forEach(id => {
            const textarea = document.getElementById(id);
            if (textarea) {
                textarea.addEventListener('input', function() {
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(() => {
                        runPlaygroundCode();
                    }, 1000);
                });
            }
        });
        
        console.log('✅ Auto-ejecución de código configurada');
    } catch (error) {
        console.error('Error configurando auto-ejecución:', error);
    }
}

function setupEventListeners() {
    try {
        // Event listener para cerrar dropdowns al hacer click fuera
        document.addEventListener('click', function(event) {
            try {
                const dropdowns = document.querySelectorAll('.dropdown-menu.show');
                dropdowns.forEach(dropdown => {
                    if (!dropdown.parentElement.contains(event.target)) {
                        const dropdownInstance = bootstrap.Dropdown.getInstance(dropdown.previousElementSibling);
                        if (dropdownInstance) {
                            dropdownInstance.hide();
                        }
                    }
                });
            } catch (error) {
                // Silenciar errores menores de dropdown
            }
        });

        // Event listener para smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(event) {
                try {
                    const href = this.getAttribute('href');
                    if (href && href.startsWith('#') && href.length > 1) {
                        const target = document.querySelector(href);
                        if (target) {
                            event.preventDefault();
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                } catch (error) {
                    console.error('Error en smooth scroll:', error);
                }
            });
        });

        // Event listener para teclas de acceso rápido
        document.addEventListener('keydown', function(event) {
            try {
                // Ctrl + Enter para ejecutar código
                if (event.ctrlKey && event.key === 'Enter') {
                    event.preventDefault();
                    if (currentView === 'main-menu') return;
                    
                    if (document.getElementById('lesson-view').style.display !== 'none') {
                        runCode();
                    } else if (document.getElementById('playground-view').style.display !== 'none') {
                        runPlaygroundCode();
                    }
                }
                
                // Escape para volver
                if (event.key === 'Escape') {
                    if (currentView !== 'main-menu') {
                        backToMenu();
                    }
                }
            } catch (error) {
                console.error('Error manejando teclas:', error);
            }
        });

        console.log('✅ Event listeners configurados');
    } catch (error) {
        console.error('Error configurando event listeners:', error);
    }
}

// ===== MANEJO GLOBAL DE ERRORES =====

window.addEventListener('error', function(event) {
    handleError(event.error, 'JavaScript Global');
});

window.addEventListener('unhandledrejection', function(event) {
    handleError(event.reason, 'Promise Rechazada');
});

// ===== INICIALIZACIÓN PRINCIPAL =====

document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('🚀 DOM cargado, inicializando Bootstrap Academy...');
        
        // Verificar compatibilidad del navegador
        if (!checkBrowserCompatibility()) {
            console.warn('⚠️ Navegador con compatibilidad limitada');
        }
        
        // Inicializar la aplicación
        initializeApp();
        
        // Mensaje de bienvenida en consola
        console.log(`
🎓 Bootstrap Academy
==================

¡Bienvenido al curso interactivo de Bootstrap!

Comandos disponibles:
- Ctrl + Enter: Ejecutar código
- Escape: Volver al menú principal

¡Feliz aprendizaje! 🚀
        `);
        
    } catch (error) {
        console.error('❌ Error crítico durante la inicialización:', error);
        handleError(error, 'Inicialización');
    }
});

// ===== FUNCIONES ADICIONALES PARA DEPURACIÓN =====

// Solo en desarrollo - remover en producción
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.BootstrapAcademy = {
        userProgress,
        lessonCategories,
        showCategory,
        startLesson,
        completeLesson,
        resetProgress,
        // Función para depuración
        debug: {
            getCurrentState: () => ({
                currentView,
                currentCategory,
                currentLesson,
                userProgress
            }),
            simulateProgress: () => {
                userProgress.completedLessons = ['grid-system', 'utilities', 'navbar'];
                userProgress.points = 300;
                userProgress.achievements = ['first-lesson'];
                saveProgress();
                updateProgressDisplay();
                console.log('Progreso simulado aplicado');
            },
            clearAll: () => {
                localStorage.clear();
                location.reload();
            }
        }
    };
    
    console.log('🔧 Modo desarrollo activado. Usa BootstrapAcademy.debug para herramientas de depuración.');
}

// ===== FIN DEL ARCHIVO JAVASCRIPT =====