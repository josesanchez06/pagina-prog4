document.addEventListener('DOMContentLoaded', function() {
    if (window.lessonCategories && window.lessonCategories.components && window.lessonCategories.components.lessons) {

        lessonCategories.components.lessons['navbar'].initialCode.js = `
console.log('Navbar lesson loaded!');

// Efecto de scroll en la navbar
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar'); // Target the one in the preview
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(13, 110, 253, 0.95)'; // Primary color with opacity
      navbar.style.backdropFilter = 'blur(10px)';
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
      // Reset to original (could be transparent or initial bg-primary)
      // For this example, assuming it goes back to default bg-primary without blur
      navbar.style.backgroundColor = ''; // Let CSS class handle it
      navbar.style.backdropFilter = '';
      navbar.style.boxShadow = ''; // Let CSS class handle it
    }
  }
});

// Cerrar dropdown al hacer click fuera (Bootstrap 5 handles this mostly, but good practice)
document.addEventListener('click', function(e) {
  const openDropdownMenu = document.querySelector('.dropdown-menu.show');
  if (openDropdownMenu) {
    const dropdownToggleElement = openDropdownMenu.previousElementSibling;
    if (dropdownToggleElement && !openDropdownMenu.parentElement.contains(e.target)) {
      const dropdownInstance = bootstrap.Dropdown.getInstance(dropdownToggleElement);
      if (dropdownInstance) {
        dropdownInstance.hide();
      }
    }
  }
});

// Smooth scroll para enlaces (solo si hay targets en la misma página de preview)
document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#') && href.length > 1) {
      const target = document.querySelector(href); // In preview context
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Highlight del nav-link activo
document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => { // Exclude dropdown toggles
  link.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent page reload for example links
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    // If it's a dropdown item, also make its parent dropdown-toggle active (optional)
    const parentDropdownToggle = this.closest('.nav-item.dropdown')?.querySelector('.nav-link.dropdown-toggle');
    if(parentDropdownToggle) parentDropdownToggle.classList.add('active');
  });
});

// Funcionalidad de búsqueda (simulada)
const searchForm = document.querySelector('nav form.d-flex'); // Scope to nav
if (searchForm) {
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const searchInput = this.querySelector('input[type="search"]');
    if (searchInput) {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(\`Buscando: "\${searchTerm}"\`); // Use template literal correctly
            searchInput.value = '';
        }
    }
  });
}

// Animación del brand
const brand = document.querySelector('.navbar-brand');
if (brand) {
  brand.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) rotate(3deg)'; // Subtle rotation
  });
  brand.addEventListener('mouseleave', function() {
    this.style.transform = ''; // Reset
  });
}
        `;

        lessonCategories.components.lessons['cards'].initialCode.js = `
console.log('Cards lesson loaded!');

// Función para cambiar tabs (specific to the card with tabs)
function switchLessonTab(tabId) { // Renamed to avoid conflict with main switchTab
  try {
    const tabCard = document.querySelector('.card-header-tabs').closest('.card');
    if (!tabCard) return;

    tabCard.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
      pane.style.display = 'none'; // Ensure display none
    });
    
    tabCard.querySelectorAll('.nav-tabs .nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    const targetTab = tabCard.querySelector('#' + tabId);
    if (targetTab) {
      targetTab.classList.add('active');
      targetTab.style.display = 'block'; // Ensure display block
    }
    
    const activeLink = tabCard.querySelector(\`.nav-tabs .nav-link[data-tab="\${tabId}"]\`); // Corrected template literal
    if (activeLink) {
      activeLink.classList.add('active');
    }
  } catch (error) {
    console.error('Error cambiando tab en lección:', error);
  }
}

// Event listeners para tabs
document.querySelectorAll('.nav-tabs .nav-link[data-tab]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const tabId = this.getAttribute('data-tab');
    if (tabId) {
      switchLessonTab(tabId);
    }
  });
});
// Initialize first tab
if(document.querySelector('.nav-tabs .nav-link.active[data-tab]')) {
    switchLessonTab(document.querySelector('.nav-tabs .nav-link.active[data-tab]').getAttribute('data-tab'));
}


// Controles interactivos para la "Card Interactiva"
const bgColorSelect = document.getElementById('bgColorSelect');
const textSizeRange = document.getElementById('textSizeRange');
const textSizeValue = document.getElementById('textSizeValue');
const previewCard = document.getElementById('previewCard');
const previewText = document.getElementById('previewText');

if (bgColorSelect && previewCard) {
  bgColorSelect.addEventListener('change', function() {
    try {
      previewCard.className = previewCard.className.replace(/bg-\\w+/g, ''); // Remove old bg classes
      previewCard.classList.add(this.value);
      
      if (this.value === 'bg-light' || this.value === 'bg-warning' || this.value === 'bg-info') { // Info also often needs dark text
        previewCard.classList.remove('text-white');
        previewCard.classList.add('text-dark');
      } else {
        previewCard.classList.remove('text-dark');
        previewCard.classList.add('text-white');
      }
    } catch (error) {
      console.error('Error cambiando color:', error);
    }
  });
}

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

// Función para animar card (la previewCard)
// Ensure animateCard is globally accessible if called from HTML onclick
window.animateCard = function() {
  try {
    const cardToAnimate = document.getElementById('previewCard');
    if (cardToAnimate) {
      cardToAnimate.classList.add('animate-pulse'); // Assumes 'animate-pulse' is defined in CSS
      setTimeout(() => {
        cardToAnimate.classList.remove('animate-pulse');
      }, 600);
    }
  } catch (error) {
    console.error('Error animando card:', error);
  }
}

// General card interactivity (subtle click effect)
document.querySelectorAll('.container > .row .card').forEach(card => { // Be more specific to avoid affecting internal cards
  card.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button, a, .form-select, .form-range')) {
      return; // Don't animate if clicking interactive elements within the card
    }
    if (this.id === 'previewCard') return; // Don't apply this to the interactive preview card itself

    this.style.transform = 'scale(0.98)';
    setTimeout(() => {
      this.style.transform = ''; // Reset to CSS defined hover/static state
    }, 150);
  });
});
        `;

        lessonCategories.components.lessons['modals'].initialCode.js = `
console.log('Modals lesson loaded!');

// Hacer las funciones accesibles globalmente si se llaman desde onclick en HTML
window.submitForm = function(event) { // Added event parameter
  try {
    const form = document.getElementById('userForm');
    if (!form) return;
    
    if (form.checkValidity()) {
      const submitBtn = event.target.closest('button') || event.target; // Ensure it's the button
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>¡Registrado!';
        // No need to change btn-success if it's already that
        
        setTimeout(() => {
          const modalElement = document.getElementById('formModal');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) modalInstance.hide();
          }
          form.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 1500);
      }, 2000);
    } else {
      form.reportValidity(); // Shows browser's validation messages
    }
  } catch (error) {
    console.error('Error enviando formulario:', error);
  }
}

window.downloadImage = function(event) { // Added event parameter
  try {
    const activeSlide = document.querySelector('#imageModal .carousel-item.active img');
    if (!activeSlide || !activeSlide.src) return;
    
    const imageSrc = activeSlide.src;
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'imagen-' + Date.now() + '.jpg'; // Unique name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    const btn = event.target.closest('button') || event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check me-2"></i>¡Descargado!';
    setTimeout(() => {
      btn.innerHTML = originalText;
    }, 2000);
  } catch (error) {
    console.error('Error descargando imagen:', error);
  }
}

window.createCustomModal = function() {
  try {
    const modalHTML = \`
      <div class="modal fade custom-modal" id="dynamicCustomModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"><i class="fas fa-magic me-2"></i>Modal Mágico</h5>
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
              <div class="progress mb-3" style="height: 20px;">
                <div class="progress-bar progress-bar-striped progress-bar-animated" 
                     style="width: 0%" id="magicProgress">0%</div>
              </div>
              <button class="btn btn-light" onclick="startMagic()">
                <i class="fas fa-wand-magic me-2"></i>Hacer Magia
              </button>
            </div>
          </div>
        </div>
      </div>
    \`; // End of template literal
    
    const container = document.getElementById('customModalContainer');
    if (container) {
      container.innerHTML = modalHTML; // Replace content
      const modalElement = document.getElementById('dynamicCustomModal');
      if(modalElement){
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
        
        modalElement.addEventListener('hidden.bs.modal', function() {
          if (container) container.innerHTML = ''; // Clean up
          // Remove global functions if they were specific to this modal and added to window
        });
      }
    }
  } catch (error) {
    console.error('Error creando modal personalizado:', error);
  }
}

window.changeModalColor = function(color) {
  try {
    const modalContent = document.querySelector('#dynamicCustomModal .modal-content');
    if (modalContent) {
      const colorMap = {
        warning: 'linear-gradient(135deg, #f39c12 0%, #f1c40f 100%)',
        danger: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
        success: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)'
      };
      modalContent.style.background = colorMap[color] || colorMap.warning; // Fallback to warning
    }
  } catch (error) {
    console.error('Error cambiando color del modal:', error);
  }
}

window.startMagic = function() {
  try {
    const progressBar = document.getElementById('magicProgress');
    if (!progressBar) return;
    
    let width = 0;
    progressBar.style.width = '0%';
    progressBar.textContent = '0%';

    const interval = setInterval(() => {
      width += 10;
      progressBar.style.width = width + '%';
      progressBar.textContent = width + '%';
      
      if (width >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          //progressBar.style.width = '0%'; // Reset or show completion
          //progressBar.textContent = '0%';
          showMagicEffect();
        }, 500);
      }
    }, 100);
  } catch (error) {
    console.error('Error en función de magia:', error);
  }
}

window.showMagicEffect = function() {
  try {
    const modalBody = document.querySelector('#dynamicCustomModal .modal-body');
    if (modalBody) {
      modalBody.innerHTML = \`
        <div class="text-center">
          <div class="mb-4" style="font-size: 4rem;">✨🎉✨</div>
          <h3>¡Magia realizada!</h3>
          <p>Has completado el tutorial de modals con éxito.</p>
          <button class="btn btn-warning" data-bs-dismiss="modal">
            <i class="fas fa-trophy me-2"></i>¡Genial!
          </button>
        </div>
      \`; // End of template literal
    }
  } catch (error) {
    console.error('Error mostrando efecto mágico:', error);
  }
}

// General modal event listeners (applies to modals in the preview)
document.querySelectorAll('.modal').forEach(modalEl => { // Use a more generic selector if needed
  modalEl.addEventListener('shown.bs.modal', function() {
    if (this.id === 'imageModal') {
      const carouselElement = this.querySelector('#carouselExample');
      if (carouselElement && !bootstrap.Carousel.getInstance(carouselElement)) { // Initialize only if not already
         new bootstrap.Carousel(carouselElement, { interval: 3000, wrap: true });
      }
    } else if (this.id === 'formModal') {
      const firstInput = this.querySelector('#firstName');
      if (firstInput) firstInput.focus();
    }
    // Add modal-bounce animation class
    if(this.querySelector('.modal-dialog')) {
        this.querySelector('.modal-dialog').classList.add('modal-bounce-animation');
    }
  });

  modalEl.addEventListener('hidden.bs.modal', function() {
      // Remove animation class to allow re-triggering
      if(this.querySelector('.modal-dialog')) {
        this.querySelector('.modal-dialog').classList.remove('modal-bounce-animation');
      }
      if (this.id === 'imageModal') {
        const carouselElement = this.querySelector('#carouselExample');
        if (carouselElement) {
            const carouselInstance = bootstrap.Carousel.getInstance(carouselElement);
            if(carouselInstance) carouselInstance.pause(); // Pause carousel
        }
      }
  });
});

// Add modalBounce keyframes if not in main CSS
const modalBounceKeyframes = \`
  @keyframes modalBounceAnimationInternal {
    0% { transform: scale(0.3); opacity: 0.5; }
    50% { transform: scale(1.05); opacity: 1;}
    70% { transform: scale(0.9); }
    100% { transform: scale(1); opacity: 1;}
  }
  .modal-bounce-animation { animation: modalBounceAnimationInternal 0.5s ease-out; }
\`;
if (!document.getElementById('modal-bounce-style')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'modal-bounce-style';
    styleSheet.innerText = modalBounceKeyframes;
    document.head.appendChild(styleSheet);
}

        `;
    } else {
        console.error("Components lessons data structure not found or incomplete in main_script.js");
    }
});