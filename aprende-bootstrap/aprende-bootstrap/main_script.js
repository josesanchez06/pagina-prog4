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

// ===== DATOS DE LECCIONES (Estructura base) =====
// Los initialCode.js se poblarán desde fundamentals_lessons.js, components_lessons.js, advanced_lessons.js
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
                            <thead><tr><th>Clase</th><th>Tamaño</th><th>Dispositivo</th></tr></thead>
                            <tbody>
                                <tr><td>.col-</td><td>&lt;576px</td><td>Extra small</td></tr>
                                <tr><td>.col-sm-</td><td>≥576px</td><td>Small</td></tr>
                                <tr><td>.col-md-</td><td>≥768px</td><td>Medium</td></tr>
                                <tr><td>.col-lg-</td><td>≥992px</td><td>Large</td></tr>
                                <tr><td>.col-xl-</td><td>≥1200px</td><td>Extra large</td></tr>
                                <tr><td>.col-xxl-</td><td>≥1400px</td><td>Extra extra large</td></tr>
                            </tbody>
                        </table>
                    </div>`,
                initialCode: { html: `...`, css: `...`, js: `` } // JS se llenará después
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
                        <span class="badge bg-secondary">0</span><span class="badge bg-secondary">1 (0.25rem)</span><span class="badge bg-secondary">2 (0.5rem)</span><span class="badge bg-secondary">3 (1rem)</span><span class="badge bg-secondary">4 (1.5rem)</span><span class="badge bg-secondary">5 (3rem)</span><span class="badge bg-secondary">auto</span>
                    </div>`,
                initialCode: { html: `...`, css: `...`, js: `` }
            },
            'flexbox': {
                title: 'Flexbox Bootstrap',
                difficulty: 'Intermedio',
                theory: `
                    <h6>🔄 Flexbox en Bootstrap</h6>
                    <p>Bootstrap incluye utilidades completas para Flexbox que te permiten crear layouts complejos fácilmente.</p>
                    <h6>Clases de Display:</h6><ul><li><code>.d-flex</code> - Activa flexbox</li><li><code>.d-inline-flex</code> - Flexbox inline</li><li><code>.d-{breakpoint}-flex</code> - Responsivo</li></ul>
                    <h6>Dirección del Flex:</h6><ul><li><code>.flex-row</code> - Horizontal (default)</li><li><code>.flex-column</code> - Vertical</li><li><code>.flex-row-reverse</code> - Horizontal inverso</li><li><code>.flex-column-reverse</code> - Vertical inverso</li></ul>
                    <h6>Justificación (eje principal):</h6><ul><li><code>.justify-content-start</code> - Inicio</li><li><code>.justify-content-center</code> - Centro</li><li><code>.justify-content-end</code> - Final</li><li><code>.justify-content-between</code> - Espaciado entre elementos</li><li><code>.justify-content-around</code> - Espaciado alrededor</li><li><code>.justify-content-evenly</code> - Espaciado uniforme</li></ul>
                    <h6>Alineación (eje cruzado):</h6><ul><li><code>.align-items-start</code> - Inicio</li><li><code>.align-items-center</code> - Centro</li><li><code>.align-items-end</code> - Final</li><li><code>.align-items-stretch</code> - Estirar</li><li><code>.align-items-baseline</code> - Línea base</li></ul>`,
                initialCode: { html: `...`, css: `...`, js: `` }
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
                    <h6>Estructura básica:</h6><pre><code>&lt;nav class="navbar navbar-expand-lg navbar-dark bg-primary"&gt;\n  &lt;div class="container"&gt;\n    &lt;a class="navbar-brand" href="#"&gt;Brand&lt;/a&gt;\n    &lt;button class="navbar-toggler"&gt;...&lt;/button&gt;\n    &lt;div class="navbar-nav"&gt;...&lt;/div&gt;\n  &lt;/div&gt;\n&lt;/nav&gt;</code></pre>
                    <h6>Clases importantes:</h6><ul><li><code>.navbar-expand-{breakpoint}</code> - Cuándo expandir</li><li><code>.navbar-dark</code> - Texto claro</li><li><code>.navbar-light</code> - Texto oscuro</li><li><code>.bg-{color}</code> - Color de fondo</li><li><code>.fixed-top</code> - Fija arriba</li><li><code>.sticky-top</code> - Pegajosa</li></ul>
                    <h6>Componentes de la navbar:</h6><ul><li><strong>Brand:</strong> Logo o nombre del sitio</li><li><strong>Toggler:</strong> Botón para móviles</li><li><strong>Nav items:</strong> Enlaces de navegación</li><li><strong>Dropdown:</strong> Menús desplegables</li><li><strong>Forms:</strong> Formularios inline</li></ul>`,
                initialCode: { html: `...`, css: `...`, js: `` }
            },
            'cards': {
                title: 'Cards Avanzadas',
                difficulty: 'Intermedio',
                theory: `
                    <h6>🃏 Cards en Bootstrap</h6>
                    <p>Las cards son contenedores flexibles y extensibles que pueden incluir headers, footers, imágenes y mucho más contenido.</p>
                    <h6>Estructura básica:</h6><pre><code>&lt;div class="card"&gt;\n  &lt;div class="card-header"&gt;Header&lt;/div&gt;\n  &lt;div class="card-body"&gt;\n    &lt;h5 class="card-title"&gt;Título&lt;/h5&gt;\n    &lt;p class="card-text"&gt;Contenido&lt;/p&gt;\n  &lt;/div&gt;\n  &lt;div class="card-footer"&gt;Footer&lt;/div&gt;\n&lt;/div&gt;</code></pre>
                    <h6>Tipos de contenido:</h6><ul><li><strong>card-img-top:</strong> Imagen en la parte superior</li><li><strong>card-title:</strong> Título principal</li><li><strong>card-subtitle:</strong> Subtítulo</li><li><strong>card-text:</strong> Texto del contenido</li><li><strong>card-link:</strong> Enlaces</li></ul>
                    <h6>Variaciones:</h6><ul><li><code>.card-group</code> - Agrupa cards</li><li><code>.border-{color}</code> - Bordes coloreados</li><li><code>.text-{color}</code> - Colores de texto</li><li><code>.bg-{color}</code> - Fondos coloreados</li></ul>`,
                initialCode: { html: `...`, css: `...`, js: `` }
            },
            'modals': {
                title: 'Modals Interactivos',
                difficulty: 'Avanzado',
                theory: `
                    <h6>🪟 Modals en Bootstrap</h6>
                    <p>Los modals son ventanas superpuestas que se utilizan para mostrar contenido adicional sin abandonar la página actual.</p>
                    <h6>Estructura básica:</h6><pre><code>&lt;div class="modal fade" id="exampleModal"&gt;\n  &lt;div class="modal-dialog"&gt;\n    &lt;div class="modal-content"&gt;\n      &lt;div class="modal-header"&gt;\n        &lt;h5 class="modal-title"&gt;Título&lt;/h5&gt;\n        &lt;button type="button" class="btn-close" data-bs-dismiss="modal"&gt;&lt;/button&gt;\n      &lt;/div&gt;\n      &lt;div class="modal-body"&gt;Contenido del modal&lt;/div&gt;\n      &lt;div class="modal-footer"&gt;\n        &lt;button type="button" class="btn btn-primary"&gt;Guardar&lt;/button&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;</code></pre>
                    <h6>Tamaños de modal:</h6><ul><li><code>.modal-sm</code> - Pequeño</li><li><code>.modal-lg</code> - Grande</li><li><code>.modal-xl</code> - Extra grande</li><li><code>.modal-fullscreen</code> - Pantalla completa</li></ul>
                    <h6>Opciones avanzadas:</h6><ul><li><strong>Centrado vertical:</strong> <code>.modal-dialog-centered</code></li><li><strong>Scrollable:</strong> <code>.modal-dialog-scrollable</code></li><li><strong>Sin animación:</strong> Remover clase <code>.fade</code></li></ul>`,
                initialCode: { html: `...`, css: `...`, js: `` }
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
                    <h6>Buenas prácticas:</h6><ul><li>Usa variables CSS para colores</li><li>Sobrescribe clases específicamente</li><li>Mantén la estructura de Bootstrap</li><li>Usa selectores específicos para evitar conflictos</li></ul>
                    <h6>Variables CSS Personalizadas:</h6><pre><code>:root {\n  --custom-primary: #6c5ce7;\n  --custom-secondary: #a29bfe;\n}</code></pre>
                    <h6>Sobrescribir componentes:</h6><pre><code>.btn-custom {\n  background: var(--custom-primary);\n  border: none;\n  border-radius: 25px;\n}</code></pre>`,
                initialCode: { html: `...`, css: `...`, js: `` }
            },
            'animations': {
                title: 'Animaciones CSS',
                difficulty: 'Avanzado',
                theory: `
                    <h6>✨ Animaciones con Bootstrap</h6>
                    <p>Combina Bootstrap con animaciones CSS para crear experiencias dinámicas y atractivas.</p>
                    <h6>Tipos de animaciones:</h6><ul><li><strong>Transitions:</strong> Para cambios suaves en hover</li><li><strong>Keyframes:</strong> Para animaciones complejas</li><li><strong>Transform:</strong> Para efectos 3D y movimiento</li><li><strong>CSS Variables:</strong> Para animaciones dinámicas</li></ul>
                    <h6>Ejemplo de Keyframe:</h6><pre><code>@keyframes slideIn {\n  from { transform: translateX(-100%); opacity: 0; }\n  to { transform: translateX(0); opacity: 1; }\n}</code></pre>
                    <h6>Buenas prácticas:</h6><ul><li>Usa <code>transform</code> y <code>opacity</code> para mejor rendimiento</li><li>Evita animar propiedades que causan reflow</li><li>Usa <code>will-change</code> para optimizar</li><li>Respeta <code>prefers-reduced-motion</code></li></ul>`,
                initialCode: { html: `...`, css: `...`, js: `` }
            }
        }
    }
};

// --- Placeholder for HTML/CSS initialCode content ---
// Fundamentals
lessonCategories.fundamentals.lessons['grid-system'].initialCode.html = `<div class="container">\n  <div class="row">\n    <div class="col-12 col-md-6 col-lg-4">\n      <div class="bg-primary text-white p-3 text-center mb-3">\n        Columna 1\n      </div>\n    </div>\n    <div class="col-12 col-md-6 col-lg-4">\n      <div class="bg-success text-white p-3 text-center mb-3">\n        Columna 2\n      </div>\n    </div>\n    <div class="col-12 col-md-12 col-lg-4">\n      <div class="bg-danger text-white p-3 text-center mb-3">\n        Columna 3\n      </div>\n    </div>\n  </div>\n  \n  <div class="row mt-4">\n    <div class="col-12">\n      <div class="alert alert-success">\n        <h5>¡Perfecto!</h5>\n        <p>Redimensiona la ventana para ver cómo las columnas se adaptan.</p>\n      </div>\n    </div>\n  </div>\n</div>`;
lessonCategories.fundamentals.lessons['grid-system'].initialCode.css = `/* Estilos personalizados */\n.container {\n  margin-top: 20px;\n}\n\n.row > div > div:hover {\n  transform: scale(1.05);\n  transition: transform 0.3s ease;\n  cursor: pointer;\n}\n\n/* Efectos adicionales */\n.col-12:hover .alert {\n  background-color: #28a745;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);\n}`;
lessonCategories.fundamentals.lessons['utilities'].initialCode.html = `<div class="container">\n  <div class="bg-light p-4 mb-4 rounded">\n    <h4 class="text-primary mb-3">Ejemplo de Spacing</h4>\n    <div class="bg-primary text-white p-3 mb-3 rounded">Padding grande (p-3)</div>\n    <div class="bg-success text-white p-1 mb-3 rounded">Padding pequeño (p-1)</div>\n    <div class="bg-danger text-white px-4 py-2 mb-3 rounded">Padding horizontal y vertical diferente</div>\n    <div class="bg-warning text-dark p-2 rounded">Padding mediano (p-2)</div>\n  </div>\n\n  <div class="bg-dark p-4 rounded">\n    <h4 class="text-light mb-3">Paleta de Colores</h4>\n    <div class="d-flex flex-wrap gap-2">\n      <span class="badge bg-primary fs-6 p-2">Primary</span>\n      <span class="badge bg-secondary fs-6 p-2">Secondary</span>\n      <span class="badge bg-success fs-6 p-2">Success</span>\n      <span class="badge bg-danger fs-6 p-2">Danger</span>\n      <span class="badge bg-warning text-dark fs-6 p-2">Warning</span>\n      <span class="badge bg-info fs-6 p-2">Info</span>\n    </div>\n  </div>\n\n  <div class="bg-light p-4 mt-4 rounded">\n    <h4 class="text-center mb-4">Flexbox Utilities</h4>\n    <div class="d-flex justify-content-between align-items-center bg-white p-3 rounded shadow-sm">\n      <div class="bg-primary text-white px-3 py-2 rounded">Izquierda</div>\n      <div class="bg-success text-white px-3 py-2 rounded">Centro</div>\n      <div class="bg-danger text-white px-3 py-2 rounded">Derecha</div>\n    </div>\n  </div>\n</div>`;
lessonCategories.fundamentals.lessons['utilities'].initialCode.css = `/* Estilos adicionales */\n.container {\n  margin-top: 30px;\n}\n\n.badge:hover {\n  transform: scale(1.1);\n  cursor: pointer;\n  transition: transform 0.2s ease;\n}\n\n.shadow-sm {\n  transition: box-shadow 0.3s ease;\n}\n\n.shadow-sm:hover {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;\n}\n\n.bg-primary:hover,\n.bg-success:hover,\n.bg-danger:hover,\n.bg-warning:hover {\n  filter: brightness(1.1);\n  transition: filter 0.3s ease;\n}`;
lessonCategories.fundamentals.lessons['flexbox'].initialCode.html = `<div class="container">\n  \n  <div class="bg-primary text-white mb-4 rounded" style="height: 200px;">\n    <div class="d-flex justify-content-center align-items-center h-100">\n      <div class="bg-white text-primary px-4 py-2 rounded fw-bold">\n        ¡Perfectamente Centrado!\n      </div>\n    </div>\n  </div>\n\n  \n  <div class="bg-light p-3 mb-4 rounded">\n    <div class="d-flex justify-content-between align-items-center">\n      <div class="fw-bold text-primary">Logo</div>\n      <div class="d-flex gap-3">\n        <a href="#" class="text-decoration-none">Inicio</a>\n        <a href="#" class="text-decoration-none">Productos</a>\n        <a href="#" class="text-decoration-none">Contacto</a>\n      </div>\n      <button class="btn btn-primary btn-sm">Login</button>\n    </div>\n  </div>\n\n  \n  <div class="d-flex flex-wrap gap-3 mb-4">\n    <div class="flex-fill bg-success text-white p-3 rounded text-center">\n      <h5>Card 1</h5>\n      <p class="mb-0">Contenido flexible</p>\n    </div>\n    <div class="flex-fill bg-warning text-dark p-3 rounded text-center">\n      <h5>Card 2</h5>\n      <p class="mb-0">Se adapta automáticamente</p>\n    </div>\n    <div class="flex-fill bg-info text-white p-3 rounded text-center">\n      <h5>Card 3</h5>\n      <p class="mb-0">Mismo ancho para todas</p>\n    </div>\n  </div>\n\n  \n  <div class="bg-dark text-white p-4 rounded" style="height: 300px;">\n    <div class="d-flex flex-column h-100">\n      <div class="bg-primary p-2 rounded mb-2 text-center">Header</div>\n      <div class="flex-grow-1 bg-secondary p-2 rounded mb-2 d-flex align-items-center justify-content-center">\n        Contenido que crece\n      </div>\n      <div class="bg-success p-2 rounded text-center">Footer</div>\n    </div>\n  </div>\n</div>`;
lessonCategories.fundamentals.lessons['flexbox'].initialCode.css = `/* Estilos para flexbox */\n.container {\n  margin-top: 20px;\n}\n\n.gap-3 {\n  gap: 1rem;\n}\n\n.flex-fill:hover {\n  transform: translateY(-5px);\n  transition: transform 0.3s ease;\n  box-shadow: 0 4px 15px rgba(0,0,0,0.2);\n  cursor: pointer;\n}\n\n.d-flex > * {\n  transition: all 0.3s ease;\n}\n\n.bg-white:hover {\n  transform: scale(1.05) rotate(2deg);\n  transition: transform 0.3s ease;\n}\n\n@media (max-width: 768px) {\n  .d-flex.flex-wrap {\n    flex-direction: column;\n  }\n  \n  .gap-3 {\n    gap: 0.5rem;\n  }\n}`;

// Components
lessonCategories.components.lessons['navbar'].initialCode.html = `<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">\n  <div class="container">\n    <a class="navbar-brand fw-bold" href="#">\n      <i class="fas fa-rocket me-2"></i>MiSitio\n    </a>\n    \n    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">\n      <span class="navbar-toggler-icon"></span>\n    </button>\n    \n    <div class="collapse navbar-collapse" id="navbarNav">\n      <ul class="navbar-nav me-auto">\n        <li class="nav-item">\n          <a class="nav-link active" href="#">Inicio</a>\n        </li>\n        <li class="nav-item">\n          <a class="nav-link" href="#">Productos</a>\n        </li>\n        <li class="nav-item dropdown">\n          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">\n            Servicios\n          </a>\n          <ul class="dropdown-menu">\n            <li><a class="dropdown-item" href="#">Diseño Web</a></li>\n            <li><a class="dropdown-item" href="#">Desarrollo</a></li>\n            <li><hr class="dropdown-divider"></li>\n            <li><a class="dropdown-item" href="#">Consultoría</a></li>\n          </ul>\n        </li>\n        <li class="nav-item">\n          <a class="nav-link" href="#">Contacto</a>\n        </li>\n      </ul>\n      \n      <form class="d-flex me-3">\n        <input class="form-control me-2" type="search" placeholder="Buscar...">\n        <button class="btn btn-outline-light" type="submit">\n          <i class="fas fa-search"></i>\n        </button>\n      </form>\n      \n      <div class="d-flex">\n        <button class="btn btn-outline-light me-2">Login</button>\n        <button class="btn btn-warning">Registro</button>\n      </div>\n    </div>\n  </div>\n</nav>\n\n<div class="container mt-4">\n  <div class="alert alert-info">\n    <h4 class="alert-heading">¡Navbar Responsiva!</h4>\n    <p>Esta navbar se adapta automáticamente a diferentes tamaños de pantalla. Prueba a redimensionar la ventana para ver cómo se comporta.</p>\n    <hr>\n    <p class="mb-0">En móviles, aparecerá un botón hamburguesa que mostrará/ocultará el menú.</p>\n  </div>\n  \n  <div class="row">\n    <div class="col-md-8">\n      <h2>Contenido Principal</h2>\n      <p>Este es el contenido principal de la página. La navbar se mantiene en la parte superior y proporciona navegación consistente.</p>\n      <p>Puedes hacer scroll para ver cómo se comporta la navbar.</p>\n    </div>\n    <div class="col-md-4">\n      <div class="card">\n        <div class="card-header">\n          <h5>Sidebar</h5>\n        </div>\n        <div class="card-body">\n          <p>Contenido lateral o información adicional.</p>\n          <button class="btn btn-sm btn-primary">Acción</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>`;
lessonCategories.components.lessons['navbar'].initialCode.css = `/* Estilos personalizados para navbar */\n.navbar-brand {\n  font-size: 1.5rem;\n  transition: transform 0.3s ease;\n}\n\n.navbar-brand:hover {\n  transform: scale(1.05);\n}\n\n.navbar-brand i {\n  color: #ffc107;\n  text-shadow: 0 0 10px rgba(255, 193, 7, 0.5);\n}\n\n.nav-link {\n  transition: all 0.3s ease;\n  border-radius: 5px;\n  margin: 0 2px;\n}\n\n.nav-link:hover {\n  background-color: rgba(255, 255, 255, 0.1);\n  transform: translateY(-2px);\n}\n\n.dropdown-menu {\n  border: none;\n  box-shadow: 0 10px 25px rgba(0,0,0,0.15);\n  border-radius: 10px;\n  margin-top: 0.5rem;\n}\n\n.dropdown-item {\n  transition: all 0.3s ease;\n  padding: 0.5rem 1rem;\n}\n\n.dropdown-item:hover {\n  background-color: #007bff;\n  color: white;\n  transform: translateX(5px);\n}\n\n.form-control:focus {\n  border-color: #ffc107;\n  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25);\n}\n\n.btn:hover {\n  transform: translateY(-2px);\n  transition: transform 0.2s ease;\n}\n\n.navbar-toggler:focus {\n  box-shadow: none;\n}\n\n@media (max-width: 991px) {\n  .navbar-nav {\n    margin-top: 1rem;\n  }\n  \n  .d-flex.me-3 {\n    margin: 1rem 0;\n  }\n  \n  .navbar-nav .nav-link {\n    padding: 0.75rem 1rem;\n  }\n}`;
lessonCategories.components.lessons['cards'].initialCode.html = `<div class="container">\n  <div class="row mb-4">\n    <div class="col-md-4 mb-4">\n      <div class="card h-100 shadow-sm">\n        <img src="https://picsum.photos/400/200?random=1" class="card-img-top" alt="Imagen">\n        <div class="card-body">\n          <h5 class="card-title">Card con Imagen</h5>\n          <p class="card-text">Esta card incluye una imagen en la parte superior y contenido textual.</p>\n          <a href="#" class="btn btn-primary">Ver más</a>\n        </div>\n      </div>\n    </div>\n    \n    <div class="col-md-4 mb-4">\n      <div class="card h-100 shadow-sm border-success">\n        <div class="card-header bg-success text-white">\n          <i class="fas fa-check-circle me-2"></i>Featured\n        </div>\n        <div class="card-body">\n          <h5 class="card-title text-success">Card con Header</h5>\n          <p class="card-text">Card destacada con header coloreado y borde verde.</p>\n          <span class="badge bg-success">Nuevo</span>\n        </div>\n        <div class="card-footer text-muted">\n          <small>Actualizado hace 2 mins</small>\n        </div>\n      </div>\n    </div>\n    \n    <div class="col-md-4 mb-4">\n      <div class="card h-100 shadow-sm bg-primary text-white">\n        <div class="card-body text-center">\n          <i class="fas fa-star fa-3x mb-3"></i>\n          <h5 class="card-title">Card Especial</h5>\n          <p class="card-text">Card con fondo coloreado y texto centrado.</p>\n          <button class="btn btn-light">Acción</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class="row mb-4">\n    <div class="col-md-6 mb-4">\n      <div class="card shadow-lg">\n        <div class="row g-0">\n          <div class="col-md-4">\n            <img src="https://picsum.photos/200/200?random=2" class="img-fluid rounded-start h-100" style="object-fit: cover;" alt="Imagen horizontal">\n          </div>\n          <div class="col-md-8">\n            <div class="card-body">\n              <h5 class="card-title">Card Horizontal</h5>\n              <p class="card-text">Esta card tiene un layout horizontal con imagen a la izquierda.</p>\n              <p class="card-text"><small class="text-muted">Última actualización hace 3 mins</small></p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    \n    <div class="col-md-6 mb-4">\n      <div class="card shadow-lg">\n        <div class="card-header">\n          <ul class="nav nav-tabs card-header-tabs">\n            <li class="nav-item">\n              <a class="nav-link active" href="#" data-tab="tab1">Tab 1</a>\n            </li>\n            <li class="nav-item">\n              <a class="nav-link" href="#" data-tab="tab2">Tab 2</a>\n            </li>\n            <li class="nav-item">\n              <a class="nav-link" href="#" data-tab="tab3">Tab 3</a>\n            </li>\n          </ul>\n        </div>\n        <div class="card-body">\n          <div class="tab-content">\n            <div class="tab-pane active" id="tab1">\n              <h5 class="card-title">Contenido Tab 1</h5>\n              <p class="card-text">Este es el contenido del primer tab.</p>\n            </div>\n            <div class="tab-pane" id="tab2" style="display:none;">\n              <h5 class="card-title">Contenido Tab 2</h5>\n              <p class="card-text">Contenido del segundo tab con información diferente.</p>\n            </div>\n            <div class="tab-pane" id="tab3" style="display:none;">\n              <h5 class="card-title">Contenido Tab 3</h5>\n              <p class="card-text">Tercer tab con más opciones y funcionalidades.</p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-md-8 mx-auto">\n      <div class="card shadow-lg border-0">\n        <div class="card-header text-white text-center" style="background: linear-gradient(45deg, #007bff, #6f42c1);">\n          <h4 class="mb-0"><i class="fas fa-cog me-2"></i>Card Interactiva</h4>\n        </div>\n        <div class="card-body p-4">\n          <div class="row">\n            <div class="col-md-6">\n              <h5>Controles</h5>\n              <div class="mb-3">\n                <label class="form-label">Color de fondo:</label>\n                <select class="form-select" id="bgColorSelect">\n                  <option value="bg-light">Claro</option>\n                  <option value="bg-primary">Primario</option>\n                  <option value="bg-success">Éxito</option>\n                  <option value="bg-danger">Peligro</option>\n                  <option value="bg-warning">Advertencia</option>\n                </select>\n              </div>\n              <div class="mb-3">\n                <label class="form-label">Tamaño de texto:</label>\n                <input type="range" class="form-range" id="textSizeRange" min="12" max="24" value="16">\n                <span id="textSizeValue">16px</span>\n              </div>\n              <button class="btn btn-success" onclick="animateCard()">\n                <i class="fas fa-magic me-2"></i>Animar\n              </button>\n            </div>\n            <div class="col-md-6">\n              <div id="previewCard" class="card bg-light h-100">\n                <div class="card-body text-center">\n                  <h5>Vista Previa</h5>\n                  <p id="previewText">Este texto cambia de tamaño dinámicamente.</p>\n                  <span class="badge bg-info">Interactivo</span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>`;
lessonCategories.components.lessons['cards'].initialCode.css = `/* Estilos para cards avanzadas */\n.card {\n  transition: all 0.3s ease;\n  border: none;\n}\n\n.card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;\n}\n\n.card-img-top {\n  transition: transform 0.3s ease;\n  height: 200px;\n  object-fit: cover;\n}\n\n.card:hover .card-img-top {\n  transform: scale(1.05);\n}\n\n.shadow-lg {\n  box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important;\n}\n\n.nav-tabs .nav-link {\n  border: none;\n  color: #6c757d;\n  transition: all 0.3s ease;\n}\n\n.nav-tabs .nav-link.active {\n  background-color: transparent;\n  border-bottom: 3px solid #007bff;\n  color: #007bff;\n  font-weight: bold;\n}\n\n.nav-tabs .nav-link:hover {\n  border-color: transparent;\n  background-color: rgba(0, 123, 255, 0.1);\n}\n\n.tab-pane {\n  display: none;\n}\n\n.tab-pane.active {\n  display: block;\n  animation: fadeIn 0.3s ease;\n}\n\n@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(10px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.badge:hover {\n  transform: scale(1.1);\n  cursor: pointer;\n  transition: transform 0.2s ease;\n}\n\n.btn:hover {\n  transform: translateY(-2px);\n  transition: transform 0.2s ease;\n}\n\n@keyframes pulse {\n  0% { transform: scale(1); }\n  50% { transform: scale(1.05); }\n  100% { transform: scale(1); }\n}\n\n.animate-pulse {\n  animation: pulse 0.6s ease;\n}\n\n@media (max-width: 768px) {\n  .card-body {\n    padding: 1rem;\n  }\n  \n  .row.g-0 {\n    flex-direction: column;\n  }\n  \n  .col-md-4 img {\n    height: 200px;\n    width: 100%;\n  }\n}`;
lessonCategories.components.lessons['modals'].initialCode.html = `<div class="container">\n  <div class="text-center mb-4">\n    <h2 class="mb-4">Modals Interactivos</h2>\n    <button class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#basicModal">\n      Modal Básico\n    </button>\n    <button class="btn btn-success me-2" data-bs-toggle="modal" data-bs-target="#formModal">\n      Modal con Formulario\n    </button>\n    <button class="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#imageModal">\n      Galería de Imágenes\n    </button>\n    <button class="btn btn-danger" onclick="createCustomModal()">\n      Modal Dinámico\n    </button>\n  </div>\n\n  <div class="alert alert-info">\n    <h4 class="alert-heading">¡Explora los Modals!</h4>\n    <p>Haz clic en los botones de arriba para ver diferentes tipos de modals en acción.</p>\n  </div>\n</div>\n\n\n<div class="modal fade" id="basicModal" tabindex="-1">\n  <div class="modal-dialog modal-dialog-centered">\n    <div class="modal-content">\n      <div class="modal-header bg-primary text-white">\n        <h5 class="modal-title">\n          <i class="fas fa-info-circle me-2"></i>Modal Básico\n        </h5>\n        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>\n      </div>\n      <div class="modal-body">\n        <p>Este es un modal básico con contenido simple.</p>\n        <p>Los modals son perfectos para mostrar información adicional, confirmaciones o formularios sin salir de la página actual.</p>\n        <div class="text-center mt-3">\n          <i class="fas fa-lightbulb fa-3x text-warning"></i>\n        </div>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>\n        <button type="button" class="btn btn-primary">Entendido</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<div class="modal fade" id="formModal" tabindex="-1">\n  <div class="modal-dialog modal-lg">\n    <div class="modal-content">\n      <div class="modal-header bg-success text-white">\n        <h5 class="modal-title">\n          <i class="fas fa-user-plus me-2"></i>Registro de Usuario\n        </h5>\n        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>\n      </div>\n      <div class="modal-body">\n        <form id="userForm">\n          <div class="row">\n            <div class="col-md-6 mb-3">\n              <label for="firstName" class="form-label">Nombre</label>\n              <input type="text" class="form-control" id="firstName" required>\n            </div>\n            <div class="col-md-6 mb-3">\n              <label for="lastName" class="form-label">Apellido</label>\n              <input type="text" class="form-control" id="lastName" required>\n            </div>\n          </div>\n          <div class="mb-3">\n            <label for="email" class="form-label">Email</label>\n            <input type="email" class="form-control" id="email" required>\n          </div>\n          <div class="mb-3">\n            <label for="phone" class="form-label">Teléfono</label>\n            <input type="tel" class="form-control" id="phone">\n          </div>\n          <div class="mb-3">\n            <label for="message" class="form-label">Mensaje</label>\n            <textarea class="form-control" id="message" rows="3"></textarea>\n          </div>\n          <div class="form-check mb-3">\n            <input class="form-check-input" type="checkbox" id="acceptTerms" required>\n            <label class="form-check-label" for="acceptTerms">\n              Acepto los términos y condiciones\n            </label>\n          </div>\n        </form>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>\n        <button type="button" class="btn btn-success" onclick="submitForm(event)">\n          <i class="fas fa-save me-2"></i>Registrar\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<div class="modal fade" id="imageModal" tabindex="-1">\n  <div class="modal-dialog modal-xl">\n    <div class="modal-content">\n      <div class="modal-header bg-warning text-dark">\n        <h5 class="modal-title">\n          <i class="fas fa-images me-2"></i>Galería de Imágenes\n        </h5>\n        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>\n      </div>\n      <div class="modal-body p-0">\n        <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">\n          <div class="carousel-inner">\n            <div class="carousel-item active">\n              <img src="https://picsum.photos/800/400?random=1" class="d-block w-100" alt="Imagen 1">\n              <div class="carousel-caption d-none d-md-block">\n                <h5>Primera Imagen</h5>\n                <p>Descripción de la primera imagen de la galería.</p>\n              </div>\n            </div>\n            <div class="carousel-item">\n              <img src="https://picsum.photos/800/400?random=2" class="d-block w-100" alt="Imagen 2">\n              <div class="carousel-caption d-none d-md-block">\n                <h5>Segunda Imagen</h5>\n                <p>Descripción de la segunda imagen con más detalles.</p>\n              </div>\n            </div>\n            <div class="carousel-item">\n              <img src="https://picsum.photos/800/400?random=3" class="d-block w-100" alt="Imagen 3">\n              <div class="carousel-caption d-none d-md-block">\n                <h5>Tercera Imagen</h5>\n                <p>Descripción de la tercera imagen de la colección.</p>\n              </div>\n            </div>\n          </div>\n          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">\n            <span class="carousel-control-prev-icon"></span>\n            <span class="visually-hidden">Anterior</span>\n          </button>\n          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">\n            <span class="carousel-control-next-icon"></span>\n            <span class="visually-hidden">Siguiente</span>\n          </button>\n        </div>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-warning" onclick="downloadImage(event)">\n          <i class="fas fa-download me-2"></i>Descargar\n        </button>\n        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<div id="customModalContainer"></div>`;
lessonCategories.components.lessons['modals'].initialCode.css = `/* Estilos para modals personalizados */\n.modal-content {\n  border: none;\n  border-radius: 15px;\n  overflow: hidden;\n  box-shadow: 0 20px 60px rgba(0,0,0,0.3);\n}\n\n.modal-header {\n  border-bottom: none;\n  padding: 1.5rem;\n}\n\n.modal-footer {\n  border-top: none;\n  padding: 1.5rem;\n}\n\n.modal.fade .modal-dialog {\n  transition: all 0.3s ease-out;\n  transform: translate(0, -50px) scale(0.9);\n}\n\n.modal.show .modal-dialog {\n  transform: translate(0, 0) scale(1);\n}\n\n.carousel-item img {\n  height: 400px;\n  object-fit: cover;\n}\n\n.carousel-caption {\n  background: rgba(0, 0, 0, 0.7);\n  border-radius: 10px;\n  padding: 1rem;\n  backdrop-filter: blur(5px);\n}\n\n.form-control:focus {\n  border-color: #28a745;\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);\n}\n\n.btn {\n  transition: all 0.3s ease;\n}\n\n.btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(0,0,0,0.2);\n}\n\n.custom-modal {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n}\n\n.custom-modal .modal-content {\n  background: transparent;\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  backdrop-filter: blur(10px);\n}\n\n@media (max-width: 768px) {\n  .modal-lg, .modal-xl {\n    max-width: 95%;\n  }\n  \n  .carousel-item img {\n    height: 250px;\n  }\n  \n  .modal-body {\n    padding: 1rem;\n  }\n}\n\n@keyframes modalBounce {\n  0% { transform: scale(0.3); }\n  50% { transform: scale(1.05); }\n  70% { transform: scale(0.9); }\n  100% { transform: scale(1); }\n}\n\n.modal-bounce .modal-dialog {\n  animation: modalBounce 0.5s ease;\n}`;

// Advanced
lessonCategories.advanced.lessons['custom-css'].initialCode.html = `<div class="container">\n  <div class="custom-hero text-center py-5 mb-4">\n    <h1 class="custom-title">Diseño Personalizado</h1>\n    <p class="lead">Bootstrap + CSS personalizado = ¡Increíble!</p>\n    <button class="btn custom-btn me-2">Botón Personalizado</button>\n    <button class="btn custom-btn-outline">Botón Outline</button>\n  </div>\n\n  <div class="row">\n    <div class="col-md-4 mb-4">\n      <div class="custom-card">\n        <div class="custom-card-header">\n          <i class="fas fa-palette fa-2x"></i>\n        </div>\n        <div class="custom-card-body">\n          <h5>Colores Vibrantes</h5>\n          <p>Paleta de colores personalizada que mantiene la accesibilidad.</p>\n        </div>\n      </div>\n    </div>\n    \n    <div class="col-md-4 mb-4">\n      <div class="custom-card">\n        <div class="custom-card-header">\n          <i class="fas fa-magic fa-2x"></i>\n        </div>\n        <div class="custom-card-body">\n          <h5>Efectos Únicos</h5>\n          <p>Animaciones y transiciones que mejoran la experiencia.</p>\n        </div>\n      </div>\n    </div>\n    \n    <div class="col-md-4 mb-4">\n      <div class="custom-card">\n        <div class="custom-card-header">\n          <i class="fas fa-cog fa-2x"></i>\n        </div>\n        <div class="custom-card-body">\n          <h5>Totalmente Funcional</h5>\n          <p>Mantiene toda la funcionalidad de Bootstrap.</p>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class="custom-section">\n    <h3 class="text-center mb-4">Sección Personalizada</h3>\n    <div class="custom-progress-container">\n      <div class="custom-progress-bar" id="customProgress">\n        <span class="custom-progress-text">0%</span>\n      </div>\n    </div>\n    <div class="text-center mt-4">\n      <button class="btn custom-btn" onclick="animateProgress()">\n        <i class="fas fa-play me-2"></i>Animar Progreso\n      </button>\n    </div>\n  </div>\n</div>`;
lessonCategories.advanced.lessons['custom-css'].initialCode.css = `:root {\n  --custom-primary: #6c5ce7;\n  --custom-secondary: #a29bfe;\n  --custom-accent: #fd79a8;\n  --custom-success: #00b894;\n  --custom-warning: #fdcb6e;\n  --custom-dark: #2d3436;\n}\n\n.custom-hero {\n  background: linear-gradient(135deg, var(--custom-primary), var(--custom-secondary));\n  color: white;\n  border-radius: 20px;\n  margin-top: 20px;\n  position: relative;\n  overflow: hidden;\n}\n\n.custom-hero::before {\n  content: '';\n  position: absolute;\n  top: -50%;\n  left: -50%;\n  width: 200%;\n  height: 200%;\n  background: repeating-linear-gradient(\n    45deg,\n    transparent,\n    transparent 10px,\n    rgba(255,255,255,0.05) 10px,\n    rgba(255,255,255,0.05) 20px\n  );\n  animation: movePattern 20s linear infinite;\n}\n\n@keyframes movePattern {\n  0% { transform: translate(-50%, -50%) rotate(0deg); }\n  100% { transform: translate(-50%, -50%) rotate(360deg); }\n}\n\n.custom-title {\n  font-size: 3rem;\n  font-weight: bold;\n  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);\n  position: relative;\n  z-index: 2;\n}\n\n.custom-btn {\n  background: white;\n  color: var(--custom-primary);\n  border: none;\n  padding: 12px 30px;\n  border-radius: 25px;\n  font-weight: bold;\n  transition: all 0.3s ease;\n  position: relative;\n  overflow: hidden;\n}\n\n.custom-btn::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);\n  transition: left 0.5s ease;\n}\n\n.custom-btn:hover::before {\n  left: 100%;\n}\n\n.custom-btn:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 10px 20px rgba(0,0,0,0.2);\n  color: var(--custom-primary);\n}\n\n.custom-btn-outline {\n  background: transparent;\n  color: white;\n  border: 2px solid white;\n  padding: 10px 28px;\n  border-radius: 25px;\n  font-weight: bold;\n  transition: all 0.3s ease;\n}\n\n.custom-btn-outline:hover {\n  background: white;\n  color: var(--custom-primary);\n  transform: translateY(-3px);\n}\n\n.custom-card {\n  background: white;\n  border-radius: 15px;\n  overflow: hidden;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n  transition: all 0.3s ease;\n  border: 2px solid transparent;\n}\n\n.custom-card:hover {\n  transform: translateY(-10px) rotateX(5deg);\n  box-shadow: 0 20px 40px rgba(0,0,0,0.2);\n  border-color: var(--custom-primary);\n}\n\n.custom-card-header {\n  background: linear-gradient(135deg, var(--custom-primary), var(--custom-accent));\n  color: white;\n  padding: 2rem;\n  text-align: center;\n  position: relative;\n}\n\n.custom-card-header i {\n  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));\n}\n\n.custom-card-body {\n  padding: 1.5rem;\n  text-align: center;\n}\n\n.custom-section {\n  background: linear-gradient(135deg, #f8f9fa, #e9ecef);\n  padding: 3rem 2rem;\n  border-radius: 20px;\n  margin: 3rem 0;\n  border: 1px solid rgba(108, 92, 231, 0.2);\n}\n\n.custom-progress-container {\n  background: #e9ecef;\n  border-radius: 50px;\n  overflow: hidden;\n  height: 50px;\n  position: relative;\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);\n}\n\n.custom-progress-bar {\n  height: 100%;\n  width: 0%;\n  background: linear-gradient(45deg, var(--custom-primary), var(--custom-accent));\n  border-radius: 50px;\n  transition: width 2s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  overflow: hidden;\n}\n\n.custom-progress-bar::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);\n  animation: shimmer 2s infinite;\n}\n\n@keyframes shimmer {\n  0% { left: -100%; }\n  100% { left: 100%; }\n}\n\n.custom-progress-text {\n  color: white;\n  font-weight: bold;\n  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);\n  z-index: 2;\n  position: relative;\n}\n\n/* Responsive */\n@media (max-width: 768px) {\n  .custom-title {\n    font-size: 2rem;\n  }\n  \n  .custom-hero {\n    padding: 2rem 1rem;\n  }\n  \n  .custom-card:hover {\n    transform: translateY(-5px);\n  }\n}`;
lessonCategories.advanced.lessons['animations'].initialCode.html = `<div class="container">\n  <div class="text-center mb-5">\n    <h1 class="animated-title" data-text="Animaciones CSS">Animaciones CSS</h1>\n    <p class="lead fade-in-up">Explora diferentes tipos de animaciones</p>\n  </div>\n\n  <div class="row mb-5">\n    <div class="col-md-4 mb-4">\n      <div class="card animated-card hover-lift">\n        <div class="card-body text-center">\n          <i class="fas fa-heart fa-3x text-danger mb-3 pulse-heart"></i>\n          <h5>Pulso</h5>\n          <p>Corazón que late continuamente</p>\n          <button class="btn btn-danger btn-animated">Hacer click</button>\n        </div>\n      </div>\n    </div>\n    \n    <div class="col-md-4 mb-4">\n      <div class="card animated-card hover-rotate">\n        <div class="card-body text-center">\n          <i class="fas fa-cog fa-3x text-primary mb-3 spin-gear"></i>\n          <h5>Rotación</h5>\n          <p>Engranaje girando constantemente</p>\n          <button class="btn btn-primary btn-animated">Hacer click</button>\n        </div>\n      </div>\n    </div>\n    \n    <div class="col-md-4 mb-4">\n      <div class="card animated-card hover-bounce">\n        <div class="card-body text-center">\n          <i class="fas fa-rocket fa-3x text-success mb-3 bounce-rocket"></i>\n          <h5>Rebote</h5>\n          <p>Cohete rebotando arriba y abajo</p>\n          <button class="btn btn-success btn-animated">Hacer click</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class="row mb-5">\n    <div class="col-12">\n      <div class="animated-section">\n        <h3 class="text-center mb-4">Sección Interactiva</h3>\n        <div class="animation-controls text-center mb-4">\n          <button class="btn btn-primary me-2" onclick="startWaveAnimation()">\n            <i class="fas fa-water me-2"></i>Onda\n          </button>\n          <button class="btn btn-success me-2" onclick="startRainAnimation()">\n            <i class="fas fa-cloud-rain me-2"></i>Lluvia\n          </button>\n          <button class="btn btn-warning me-2" onclick="startFireworksAnimation()">\n            <i class="fas fa-star me-2"></i>Fuegos Artificiales\n          </button>\n          <button class="btn btn-danger" onclick="resetAnimations()">\n            <i class="fas fa-stop me-2"></i>Reset\n          </button>\n        </div>\n        <div class="animation-playground" id="animationPlayground">\n          <div class="text-center py-5">\n            <h4 class="text-muted">Haz click en los botones para ver las animaciones</h4>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-md-6 mb-4">\n      <div class="card morphing-card">\n        <div class="card-header">\n          <h5>Card Transformable</h5>\n        </div>\n        <div class="card-body">\n          <p>Esta card cambia de forma cuando haces hover.</p>\n          <div class="morphing-shape"></div>\n        </div>\n      </div>\n    </div>\n    \n    <div class="col-md-6 mb-4">\n      <div class="card gradient-card">\n        <div class="card-header">\n          <h5>Gradiente Animado</h5>\n        </div>\n        <div class="card-body">\n          <p>Fondo con gradiente que cambia constantemente.</p>\n          <div class="gradient-bar"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>`;
lessonCategories.advanced.lessons['animations'].initialCode.css = `/* Variables para animaciones */\n:root {\n  --animation-duration: 1s;\n  --animation-ease: cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n/* Título animado */\n.animated-title {\n  position: relative;\n  display: inline-block;\n  font-size: 3rem;\n  font-weight: bold;\n  background: linear-gradient(45deg, #007bff, #6f42c1, #e83e8c, #fd7e14);\n  background-size: 400% 400%;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  animation: gradientShift 3s ease infinite;\n}\n\n@keyframes gradientShift {\n  0% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n  100% { background-position: 0% 50%; }\n}\n\n.fade-in-up {\n  animation: fadeInUp 1s ease 0.5s both;\n}\n\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n/* Cards animadas */\n.animated-card {\n  transition: all 0.3s var(--animation-ease);\n  cursor: pointer;\n  overflow: hidden;\n  position: relative;\n}\n\n.animated-card::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);\n  transition: left 0.5s ease;\n}\n\n.animated-card:hover::before {\n  left: 100%;\n}\n\n.hover-lift:hover {\n  transform: translateY(-15px) scale(1.02);\n  box-shadow: 0 20px 40px rgba(0,0,0,0.15);\n}\n\n.hover-rotate:hover {\n  transform: rotateY(10deg) scale(1.02);\n}\n\n.hover-bounce:hover {\n  animation: hoverBounce 0.6s ease;\n}\n\n@keyframes hoverBounce {\n  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }\n  40% { transform: translateY(-10px); }\n  60% { transform: translateY(-5px); }\n}\n\n/* Iconos animados */\n.pulse-heart {\n  animation: pulse 1.5s ease-in-out infinite;\n}\n\n.spin-gear {\n  animation: spin 3s linear infinite;\n}\n\n.bounce-rocket {\n  animation: bounce 2s ease-in-out infinite;\n}\n\n@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.2); }\n}\n\n@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n\n@keyframes bounce {\n  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }\n  40% { transform: translateY(-20px); }\n  60% { transform: translateY(-10px); }\n}\n\n/* Pausar animaciones en hover de card */\n.animated-card:hover .pulse-heart,\n.animated-card:hover .spin-gear,\n.animated-card:hover .bounce-rocket {\n  animation-play-state: paused;\n}\n\n/* Botones animados */\n.btn-animated {\n  position: relative;\n  overflow: hidden;\n  transition: all 0.3s ease;\n}\n\n.btn-animated::before {\n  content: '';\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 0;\n  height: 0;\n  border-radius: 50%;\n  background: rgba(255,255,255,0.3);\n  transition: all 0.6s ease;\n  transform: translate(-50%, -50%);\n}\n\n.btn-animated:active::before {\n  width: 300px;\n  height: 300px;\n}\n\n/* Sección animada */\n.animated-section {\n  background: linear-gradient(135deg, #f8f9fa, #e9ecef);\n  border-radius: 20px;\n  padding: 2rem;\n  position: relative;\n  overflow: hidden;\n}\n\n.animation-playground {\n  min-height: 300px;\n  background: #fff;\n  border-radius: 15px;\n  position: relative;\n  overflow: hidden;\n  border: 2px dashed #dee2e6;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n/* Animaciones del playground */\n.wave-animation {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 60px;\n  background: linear-gradient(45deg, #007bff, #0056b3);\n  animation: wave 2s ease-in-out infinite;\n}\n\n@keyframes wave {\n  0%, 100% { \n    clip-path: polygon(0 40%, 15% 50%, 30% 35%, 50% 45%, 70% 30%, 85% 40%, 100% 35%, 100% 100%, 0% 100%);\n  }\n  50% { \n    clip-path: polygon(0 30%, 15% 40%, 30% 55%, 50% 35%, 70% 50%, 85% 30%, 100% 45%, 100% 100%, 0% 100%);\n  }\n}\n\n.rain-drop {\n  position: absolute;\n  width: 2px;\n  height: 20px;\n  background: linear-gradient(to bottom, #007bff, transparent);\n  animation: fall linear infinite;\n}\n\n@keyframes fall {\n  from { transform: translateY(-100px); opacity: 1; }\n  to { transform: translateY(400px); opacity: 0; }\n}\n\n.firework {\n  position: absolute;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  animation: explode 1s ease-out forwards;\n}\n\n@keyframes explode {\n  0% {\n    transform: scale(1);\n    opacity: 1;\n  }\n  100% {\n    transform: scale(20);\n    opacity: 0;\n  }\n}\n\n/* Cards morfológicas */\n.morphing-card {\n  transition: all 0.5s ease;\n}\n\n.morphing-card:hover {\n  border-radius: 50px 10px 50px 10px;\n}\n\n.morphing-shape {\n  width: 100px;\n  height: 100px;\n  background: linear-gradient(45deg, #e83e8c, #fd7e14);\n  margin: 20px auto;\n  border-radius: 50%;\n  transition: all 0.5s ease;\n}\n\n.morphing-card:hover .morphing-shape {\n  border-radius: 0;\n  transform: rotate(45deg);\n  background: linear-gradient(45deg, #007bff, #6f42c1);\n}\n\n/* Gradiente animado */\n.gradient-card {\n  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);\n  background-size: 400% 400%;\n  animation: gradientMove 5s ease infinite;\n  color: white;\n}\n\n@keyframes gradientMove {\n  0% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n  100% { background-position: 0% 50%; }\n}\n\n.gradient-bar {\n  height: 20px;\n  background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ff6b6b);\n  background-size: 200% 100%;\n  animation: gradientSlide 3s linear infinite;\n  border-radius: 10px;\n}\n\n@keyframes gradientSlide {\n  0% { background-position: 0% 0%; }\n  100% { background-position: 200% 0%; }\n}\n\n/* Responsive */\n@media (max-width: 768px) {\n  .animated-title {\n    font-size: 2rem;\n  }\n  \n  .animation-playground {\n    min-height: 200px;\n  }\n  \n  .animated-card:hover {\n    transform: scale(1.02);\n  }\n}\n\n/* Accesibilidad */\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n  }\n}`;
// --- End Placeholder ---


// ===== FUNCIONES PRINCIPALES =====

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
}
function startLesson(lessonId) {
    try {
        currentLesson = lessonId;
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
        
        document.getElementById('category-view').style.display = 'none';
        document.getElementById('lesson-view').style.display = 'block';
        
        document.getElementById('lesson-title').textContent = lesson.title;
        document.getElementById('lesson-difficulty').textContent = lesson.difficulty;
        document.getElementById('lesson-difficulty').className = `badge ${getDifficultyColor(lesson.difficulty)} me-2`;
        document.getElementById('theory-content').innerHTML = lesson.theory;
        
        const htmlCode = document.getElementById('html-code');
        const cssCode = document.getElementById('css-code');
        const jsCode = document.getElementById('js-code');
        
        if (htmlCode) htmlCode.value = lesson.initialCode.html || '';
        if (cssCode) cssCode.value = lesson.initialCode.css || '';
        if (jsCode) jsCode.value = lesson.initialCode.js || ''; // This now comes from the specific lesson JS files
        
        runCode();
        
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

function switchTab(tabType) {
    try {
        const editors = ['html-editor', 'css-editor', 'js-editor'];
        editors.forEach(editorId => {
            const editor = document.getElementById(editorId);
            if (editor) editor.style.display = 'none';
        });
        
        document.querySelectorAll('.editor-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const selectedEditor = document.getElementById(tabType + '-editor');
        if (selectedEditor) {
            selectedEditor.style.display = 'block';
        }
        
        const activeTab = document.querySelector(`.editor-tab[onclick="switchTab('${tabType}')"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
    } catch (error) {
        console.error('Error cambiando tab:', error);
    }
}

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
                <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"><\/script>
                <script>
                    try {
                        ${jsCode}
                    } catch (error) {
                        console.error('Error en JavaScript:', error);
                        document.body.innerHTML += '<div class="alert alert-danger mt-3"><strong>Error JavaScript:</strong> ' + error.message + '</div>';
                    }
                <\/script>
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

function resetCode() {
    try {
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
                <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"><\/script>
                <script>
                    try {
                        ${jsCode}
                    } catch (error) {
                        console.error('Error en JavaScript:', error);
                    }
                <\/script>
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
                    completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
                    points: typeof parsed.points === 'number' ? parsed.points : 0,
                    achievements: Array.isArray(parsed.achievements) ? parsed.achievements : [],
                    currentStreak: typeof parsed.currentStreak === 'number' ? parsed.currentStreak : 0
                };
            }
        }
        updateProgressDisplay();
    } catch (error) {
        console.error('Error cargando progreso:', error);
        userProgress = { completedLessons: [], points: 0, achievements: [], currentStreak: 0 };
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
        let totalLessons = 0;
        if (lessonCategories && typeof lessonCategories === 'object') {
            totalLessons = Object.values(lessonCategories).reduce((total, category) => {
                 if (category && category.lessons && typeof category.lessons === 'object') {
                    return total + Object.keys(category.lessons).length;
                }
                return total;
            }, 0);
        }
        
        const completedCount = userProgress.completedLessons.length;
        const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
        
        const progressPercentageEl = document.getElementById('progress-percentage');
        const circlePercentageEl = document.getElementById('circle-percentage');
        const achievementsCountEl = document.getElementById('achievements-count');
        const pointsCountEl = document.getElementById('points-count');
        
        if (progressPercentageEl) progressPercentageEl.textContent = percentage + '%';
        if (circlePercentageEl) circlePercentageEl.textContent = percentage + '%';
        if (achievementsCountEl) achievementsCountEl.textContent = userProgress.achievements.length;
        if (pointsCountEl) pointsCountEl.textContent = userProgress.points;
        
        const progressCircle = document.getElementById('progress-circle');
        if (progressCircle) {
            const radius = parseFloat(progressCircle.getAttribute('r'));
            if (!isNaN(radius)) {
                const circumference = 2 * Math.PI * radius;
                const strokeDasharray = (percentage / 100) * circumference;
                progressCircle.style.strokeDasharray = `${strokeDasharray} ${circumference}`;
            }
        }
    } catch (error) {
        console.error('Error actualizando progreso:', error);
    }
}

function completeLesson() {
    try {
        if (currentLesson && !userProgress.completedLessons.includes(currentLesson)) {
            userProgress.completedLessons.push(currentLesson);
            userProgress.points += 100;
            userProgress.currentStreak++;
            
            checkAchievements();
            saveProgress();
            updateProgressDisplay();
            
            showAchievement('¡Lección completada!', `Has ganado 100 puntos. Racha: ${userProgress.currentStreak}`);
            
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
            { id: 'first-lesson', name: 'Primer Paso', description: 'Completa tu primera lección', condition: () => userProgress.completedLessons.length >= 1, points: 50 },
            { id: 'five-lessons', name: 'Estudiante Dedicado', description: 'Completa 5 lecciones', condition: () => userProgress.completedLessons.length >= 5, points: 200 },
            { id: 'streak-3', name: 'En Racha', description: 'Completa 3 lecciones seguidas', condition: () => userProgress.currentStreak >= 3, points: 150 }
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
        const views = ['lesson-view', 'category-view', 'playground-view', 'challenges-view'];
        views.forEach(viewId => {
            const view = document.getElementById(viewId);
            if (view) view.style.display = 'none';
        });
        
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
        currentView = 'category-view';
    } catch (error) {
        console.error('Error volviendo a categoría:', error);
    }
}
// ===== FUNCIONES DE UTILIDAD =====

// ... (al inicio de main_script.js, donde están otras funciones globales) ...

function toggleLessonFullscreen() {
    const lessonView = document.getElementById('lesson-view');
    const toggleButton = document.getElementById('toggle-fullscreen-lesson');
    const body = document.body;

    if (!lessonView || !toggleButton) {
        console.error("Elementos para pantalla completa no encontrados.");
        return;
    }

    const isFullscreen = lessonView.classList.contains('fullscreen-mode');

    if (isFullscreen) {
        lessonView.classList.remove('fullscreen-mode');
        body.classList.remove('lesson-fullscreen-active');
        toggleButton.innerHTML = '<i class="fas fa-expand me-1"></i>Completa';
        // Forzar un reflujo/repintado puede ayudar a que los iframes/componentes se redimensionen correctamente
        // Esto es un truco, podría no ser necesario o haber mejores formas según el caso.
        lessonView.style.display = 'none';
        // eslint-disable-next-line no-unused-expressions
        lessonView.offsetHeight; // force reflow
        lessonView.style.display = 'block'; // o el valor original
    } else {
        lessonView.classList.add('fullscreen-mode');
        body.classList.add('lesson-fullscreen-active');
        toggleButton.innerHTML = '<i class="fas fa-compress me-1"></i>Salir';
        lessonView.style.display = 'none';
        // eslint-disable-next-line no-unused-expressions
        lessonView.offsetHeight; // force reflow
        lessonView.style.display = 'flex'; // Ya que fullscreen-mode usa display:flex
    }
    
    // Si estás usando una librería para el editor (como CodeMirror) o para los split-panes (como Split.js),
    // podrías necesitar llamar a sus métodos de 'refresh' o 'resize' aquí.
    // Por ejemplo, si tuvieras una instancia de CodeMirror: if (editor) editor.refresh();
    // Con el iframe y textareas simples, el CSS debería ser suficiente la mayor parte del tiempo.
    // El truco de display none/block fuerza al navegador a recalcular layouts.
}


// ... (dentro de la función setupEventListeners, modificar el manejador de 'keydown') ...
        document.addEventListener('keydown', function(event) {
            try {
                if (event.ctrlKey && event.key === 'Enter') {
                    // ... (código existente) ...
                }
                
                if (event.key === 'Escape') {
                    event.preventDefault(); 
                    const lessonView = document.getElementById('lesson-view');

                    // Prioridad 1: Salir de pantalla completa de la lección si está activa
                    if (lessonView && lessonView.classList.contains('fullscreen-mode')) {
                        toggleLessonFullscreen();
                        return; // Pantalla completa de lección manejada
                    }

                    // Prioridad 2: Cerrar cualquier modal abierto
                    const openModal = document.querySelector('.modal.show');
                    if (openModal) {
                        const modalInstance = bootstrap.Modal.getInstance(openModal);
                        if (modalInstance) {
                            modalInstance.hide();
                            return; // Modal abierto manejado
                        }
                    }
                    // Prioridad 3: Navegación hacia atrás
                    if (lessonView && lessonView.style.display !== 'none' && lessonView.style.display !== '') { 
                        backToCategory();
                    } else if (document.getElementById('category-view')?.style.display !== 'none' ||
                               document.getElementById('playground-view')?.style.display !== 'none' ||
                               document.getElementById('challenges-view')?.style.display !== 'none') {
                        backToMenu();
                    }
                }
            } catch (error) {
                console.error('Error manejando teclas:', error);
            }
        });
// ... (resto de main_script.js) ...

function saveProject(event) { // Added event parameter
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
        
        if (event && event.target) { // Check if event and event.target exist
            const btn = event.target.closest('button') || event.target; // Ensure it's the button
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check me-2"></i>Guardado!';
            btn.classList.add('btn-success');
            btn.classList.remove('btn-outline-secondary'); // Ensure correct classes

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('btn-success');
                btn.classList.add('btn-outline-secondary');
            }, 2000);
        } else {
            alert('Proyecto guardado');
        }
    } catch (error) {
        console.error('Error guardando proyecto:', error);
        alert('Error al guardar proyecto.');
    }
}


function shareProject() {
    try {
        const htmlCodeEl = document.getElementById('playground-html-code');
        const cssCodeEl = document.getElementById('playground-css-code');
        const jsCodeEl = document.getElementById('playground-js-code');
        
        const projectCode = `HTML:\n${htmlCodeEl ? htmlCodeEl.value : ''}\n\nCSS:\n${cssCodeEl ? cssCodeEl.value : ''}\n\nJS:\n${jsCodeEl ? jsCodeEl.value : ''}`;
        
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            navigator.clipboard.writeText(projectCode).then(() => {
                alert('Código copiado al portapapeles');
            }).catch(err => {
                console.error('Error copiando al portapapeles:', err);
                alert('Error al copiar. Intenta manualmente.');
            });
        } else {
            alert('La función de copiar no está disponible en tu navegador. Copia manualmente.');
            console.log('Clipboard API no disponible');
        }
    } catch (error) {
        console.error('Error compartiendo proyecto:', error);
        alert('Error al compartir proyecto.');
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
            // Optionally, refresh category/lesson views if they depend on progress for display
            if (currentView === 'category-view' && currentCategory) {
                showCategory(currentCategory);
            }
        }
    } catch (error) {
        console.error('Error reiniciando progreso:', error);
    }
}

function showChallenges() {
    try {
        document.getElementById('main-menu').style.display = 'none';
        const challengesView = document.getElementById('challenges-view');
        if (challengesView) challengesView.style.display = 'block';
        currentView = 'challenges-view';
        
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
        const helpModalHTML = `
            <div class="modal fade" id="helpModalInstance" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title" id="helpModalLabel">
                                <i class="fas fa-question-circle me-2"></i>Ayuda
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                <li><kbd>Ctrl</kbd> + <kbd>Enter</kbd> - Ejecutar código</li>
                                <li><kbd>Escape</kbd> - Volver al menú/vista anterior</li>
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
        
        let helpModalElement = document.getElementById('helpModalInstance');
        if (helpModalElement) { // Remove existing modal to prevent issues if it was malformed
            helpModalElement.remove();
        }
        document.body.insertAdjacentHTML('beforeend', helpModalHTML);
        
        helpModalElement = document.getElementById('helpModalInstance'); // Get the new one
        const modal = new bootstrap.Modal(helpModalElement);
        modal.show();

        // Clean up modal from DOM after it's hidden to prevent ID clashes if function is called again
        helpModalElement.addEventListener('hidden.bs.modal', function () {
            helpModalElement.remove();
        });

    } catch (error) {
        console.error('Error mostrando ayuda:', error);
    }
}


// ===== FUNCIONES DE MANEJO DE ERRORES =====

function handleError(error, context = 'Aplicación') {
    console.error(`Error en ${context}:`, error.message || error, error.stack || '');
    
    const errorAlertId = 'errorAlertGlobal';
    let errorAlert = document.getElementById(errorAlertId);
    if (errorAlert) errorAlert.remove(); // Remove previous if exists

    errorAlert = document.createElement('div');
    errorAlert.id = errorAlertId;
    errorAlert.className = 'alert alert-warning alert-dismissible fade show position-fixed';
    errorAlert.style.cssText = 'top: 20px; right: 20px; z-index: 10000; max-width: 400px;'; // Increased z-index
    errorAlert.innerHTML = `
        <strong>Oops!</strong> Algo salió mal en "${context}". Revisa la consola para detalles.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(errorAlert);
    
    setTimeout(() => {
        if (errorAlert && errorAlert.parentNode) {
             bootstrap.Alert.getOrCreateInstance(errorAlert).close();
        }
    }, 7000); // Increased time
}

// ===== FUNCIONES DE COMPATIBILIDAD =====

function checkBrowserCompatibility() {
    try {
        const requiredFeatures = [
            'localStorage' in window && window.localStorage !== null,
            'JSON' in window && typeof JSON.parse === 'function' && typeof JSON.stringify === 'function',
            'addEventListener' in document,
            'querySelector' in document,
            typeof bootstrap !== 'undefined' // Check if Bootstrap JS is loaded
        ];
        
        const isCompatible = requiredFeatures.every(feature => !!feature); // Ensure boolean conversion
        
        if (!isCompatible) {
            const warningDivId = 'compatibilityWarning';
            if(document.getElementById(warningDivId)) return false; // Don't show multiple times

            const warningDiv = document.createElement('div');
            warningDiv.id = warningDivId;
            warningDiv.className = 'alert alert-danger m-3'; // More prominent
            warningDiv.innerHTML = `
                <h4>Navegador o Entorno no Totalmente Compatible</h4>
                <p>Algunas características podrían no funcionar correctamente. Por favor, usa un navegador moderno actualizado (Chrome, Firefox, Edge, Safari) o asegúrate de que todas las dependencias (como Bootstrap JS) estén cargadas.</p>
            `;
            const mainContainer = document.querySelector('.container-fluid') || document.body;
            mainContainer.insertBefore(warningDiv, mainContainer.firstChild);
            console.warn('Navegador o entorno con compatibilidad limitada.');
        }
        
        return isCompatible;
    } catch (error) {
        console.error('Error verificando compatibilidad:', error);
        return false; // Assume not compatible on error
    }
}

// ===== INICIALIZACIÓN =====

function initializeApp() {
    try {
        console.log('🎉 Iniciando Bootstrap Academy...');
        if (!checkBrowserCompatibility()) {
             // Compatibility check already shows a message if needed
            return; // Stop initialization if not compatible
        }
        
        loadProgress();
        setupAutoExecution();
        setupEventListeners();
        
        console.log('✅ Bootstrap Academy inicializada correctamente');
    } catch (error) {
        console.error('❌ Error inicializando la aplicación:', error);
        handleError(error, 'Inicialización App');
    }
}

function setupAutoExecution() {
    try {
        let debounceTimer;
        const debounceDelay = 750; // milliseconds

        const setupListener = (textareaId, runFunc) => {
            const textarea = document.getElementById(textareaId);
            if (textarea) {
                textarea.addEventListener('input', function() {
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(() => {
                        if (typeof runFunc === 'function') {
                             runFunc();
                        }
                    }, debounceDelay);
                });
            } else {
                // console.warn(`Textarea with ID ${textareaId} not found for auto-execution setup.`);
            }
        };
        
        ['html-code', 'css-code', 'js-code'].forEach(id => setupListener(id, runCode));
        ['playground-html-code', 'playground-css-code', 'playground-js-code'].forEach(id => setupListener(id, runPlaygroundCode));
        
        // console.log('✅ Auto-ejecución de código configurada');
    } catch (error) {
        console.error('Error configurando auto-ejecución:', error);
    }
}

function setupEventListeners() {
    try {
        document.addEventListener('click', function(event) {
            try {
                // Close open dropdowns when clicking outside
                const openDropdown = document.querySelector('.dropdown-menu.show');
                if (openDropdown && openDropdown.previousElementSibling && !openDropdown.parentElement.contains(event.target)) {
                    const dropdownInstance = bootstrap.Dropdown.getInstance(openDropdown.previousElementSibling);
                    if (dropdownInstance) {
                        dropdownInstance.hide();
                    }
                }
            } catch (error) {
                 // console.warn('Minor error closing dropdown:', error);
            }
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(event) {
                try {
                    const href = this.getAttribute('href');
                    if (href && href.startsWith('#') && href.length > 1) {
                        const targetElement = document.querySelector(href);
                        if (targetElement) {
                            event.preventDefault();
                            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                } catch (error) {
                    console.error('Error en smooth scroll:', error);
                }
            });
        });

        document.addEventListener('keydown', function(event) {
            try {
                if (event.ctrlKey && event.key === 'Enter') {
                    event.preventDefault();
                    if (document.getElementById('lesson-view')?.style.display !== 'none') {
                        runCode();
                    } else if (document.getElementById('playground-view')?.style.display !== 'none') {
                        runPlaygroundCode();
                    }
                }
                
                if (event.key === 'Escape') {
                    event.preventDefault(); // Prevent default browser behavior for Escape key
                    // Close any open modal first
                    const openModal = document.querySelector('.modal.show');
                    if (openModal) {
                        const modalInstance = bootstrap.Modal.getInstance(openModal);
                        if (modalInstance) {
                            modalInstance.hide();
                            return; // Modal was open, Escape handled
                        }
                    }
                    // If no modal, then navigate back
                    if (document.getElementById('lesson-view')?.style.display !== 'none') {
                        backToCategory();
                    } else if (document.getElementById('category-view')?.style.display !== 'none' ||
                               document.getElementById('playground-view')?.style.display !== 'none' ||
                               document.getElementById('challenges-view')?.style.display !== 'none') {
                        backToMenu();
                    }
                }
            } catch (error) {
                console.error('Error manejando teclas:', error);
            }
        });

        // console.log('✅ Event listeners configurados');
    } catch (error) {
        console.error('Error configurando event listeners:', error);
    }
}

// ===== MANEJO GLOBAL DE ERRORES =====

window.addEventListener('error', function(event) {
    // event.error contains the error object
    // event.message contains the error message
    // event.filename, event.lineno, event.colno
    handleError(event.error || new Error(event.message), 'JavaScript Global');
});

window.addEventListener('unhandledrejection', function(event) {
    // event.reason contains the rejection reason (could be an Error object or any other value)
    handleError(event.reason, 'Promise Rechazada');
});


// ===== INICIALIZACIÓN PRINCIPAL (se llamará desde HTML después de cargar todos los scripts) =====
// document.addEventListener('DOMContentLoaded', initializeApp); // Moved to HTML

// ===== FUNCIONES ADICIONALES PARA DEPURACIÓN (opcional) =====
function setupDebug() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || new URL(window.location.href).port === '5500' ) { // Common live server port
        window.BootstrapAcademy = {
            userProgress,
            lessonCategories,
            showCategory,
            startLesson,
            completeLesson,
            resetProgress,
            debug: {
                getCurrentState: () => ({ currentView, currentCategory, currentLesson, userProgress }),
                simulateProgress: () => {
                    userProgress.completedLessons = ['grid-system', 'utilities', 'navbar'];
                    userProgress.points = 300;
                    userProgress.achievements = ['first-lesson'];
                    saveProgress();
                    updateProgressDisplay();
                    console.log('Progreso simulado aplicado');
                },
                clearAll: () => {
                    if (confirm("DEBUG: ¿Limpiar localStorage y recargar?")) {
                        localStorage.clear();
                        location.reload();
                    }
                },
                showAllViews: () => { // For layout debugging
                    ['main-menu', 'category-view', 'lesson-view', 'playground-view', 'challenges-view'].forEach(id => {
                        const el = document.getElementById(id);
                        if(el) el.style.display = 'block';
                    });
                     console.log("DEBUG: Todas las vistas principales visibles (pueden superponerse).");
                },
                testError: () => {
                    try {
                        // @ts-ignore
                        nonExistentFunction();
                    } catch (e) {
                        handleError(e, "Error de prueba");
                    }
                }
            }
        };
        console.log('🔧 Modo desarrollo activado. Usa `BootstrapAcademy.debug` para herramientas de depuración.');
    }
}
document.addEventListener('DOMContentLoaded', setupDebug);


// ===== FIN DEL ARCHIVO main_script.js =====