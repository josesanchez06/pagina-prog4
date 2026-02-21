document.addEventListener('DOMContentLoaded', function() {
    if (window.lessonCategories && window.lessonCategories.fundamentals && window.lessonCategories.fundamentals.lessons) {
        
        lessonCategories.fundamentals.lessons['grid-system'].initialCode.js = `
// JavaScript interactivo
console.log('Grid system loaded!');

function changeColors() {
  const colors = ['primary', 'success', 'danger', 'warning', 'info', 'secondary'];
  const divs = document.querySelectorAll('.row > div > div:not(.alert)');
  
  divs.forEach((div, index) => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    // Preserve other classes, only replace bg-related one
    let currentClasses = div.className.split(' ');
    currentClasses = currentClasses.filter(cls => !cls.startsWith('bg-'));
    currentClasses.push('bg-' + newColor);
    div.className = currentClasses.join(' ');
  });
}

// Auto-cambiar colores cada 4 segundos
let colorInterval = setInterval(changeColors, 4000);

// Agregar interactividad al hacer click
document.addEventListener('click', function(e) {
  if (e.target.closest('.row > div > div:not(.alert)')) {
    changeColors();
  }
});

// Limpiar intervalo si la lección cambia o se cierra
window.addEventListener('beforeunload', () => clearInterval(colorInterval)); // For page unload
// For dynamic view changes, you'd need a mechanism in main_script.js
// to call a cleanup function for the current lesson when navigating away.
// This is a simplified cleanup.
        `;

        lessonCategories.fundamentals.lessons['utilities'].initialCode.js = `
console.log('Utilities lesson loaded!');

function changeSpacing() {
  const elements = document.querySelectorAll('.p-3, .p-1, .p-2, .px-4.py-2'); // Added the specific padding
  const spacings = ['p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'px-2 py-1', 'px-5 py-3']; // Added more variations
  
  elements.forEach(el => {
    const randomSpacing = spacings[Math.floor(Math.random() * spacings.length)];
    // A more robust way to replace multiple padding classes
    let classes = el.className.split(' ').filter(c => !c.match(/^p[xylrtbse]?-\\d$/));
    randomSpacing.split(' ').forEach(s => classes.push(s));
    el.className = classes.join(' ');
  });
}

function changeBadgeColors() {
  const badges = document.querySelectorAll('.badge');
  const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
  
  badges.forEach(badge => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    let currentClasses = badge.className.split(' ');
    currentClasses = currentClasses.filter(cls => !cls.startsWith('bg-') && cls !== 'text-dark' && cls !== 'text-white');
    currentClasses.push('bg-' + newColor);
    
    if (newColor === 'warning' || newColor === 'info' || newColor === 'light') { // Info and light also often need dark text
      currentClasses.push('text-dark');
    } else {
      currentClasses.push('text-white');
    }
    badge.className = currentClasses.join(' ');
  });
}

// Auto-ejecutar funciones
let spacingInterval = setInterval(changeSpacing, 5000);
let badgeColorInterval = setInterval(changeBadgeColors, 3000);

// Agregar eventos de click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('badge')) {
    changeBadgeColors();
  }
});
// Simplified cleanup
window.addEventListener('beforeunload', () => {
    clearInterval(spacingInterval);
    clearInterval(badgeColorInterval);
});
        `;

        lessonCategories.fundamentals.lessons['flexbox'].initialCode.js = `
console.log('Flexbox lesson loaded!');

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
  const flexContainer = document.querySelector('.d-flex.flex-wrap'); // Targets the cards container
  if (flexContainer) {
    // Check current media query state, this is a bit tricky as JS doesn't directly know CSS media queries easily
    // For simplicity, this example doesn't check media queries, behavior might be odd on resize
    if (isColumn) {
      flexContainer.classList.remove('flex-column');
      flexContainer.classList.add('flex-row'); // Bootstrap default is row, explicit add might not be needed
    } else {
      flexContainer.classList.remove('flex-row');
      flexContainer.classList.add('flex-column');
    }
    isColumn = !isColumn;
  }
}

function cycleJustification() {
  const navContainer = document.querySelector('.bg-light .d-flex'); // Targets the nav example
  if (navContainer) {
    justifications.forEach(j => navContainer.classList.remove(j));
    navContainer.classList.add(justifications[currentJustification]);
    currentJustification = (currentJustification + 1) % justifications.length;
  }
}

let flexDirectionInterval = setInterval(toggleFlexDirection, 6000);
let justificationInterval = setInterval(cycleJustification, 3000);

document.querySelectorAll('.flex-fill').forEach(card => {
  card.addEventListener('click', function() {
    this.style.transform = 'scale(1.05) rotate(5deg)';
    setTimeout(() => {
      this.style.transform = ''; // Reset to original or CSS hover state
    }, 300);
  });
});

const centeredElement = document.querySelector('.bg-white.text-primary');
if (centeredElement) {
    centeredElement.addEventListener('click', function() {
        this.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 600);
    });
}

// Add keyframes for pulse if not in main CSS, or ensure it's scoped
const pulseKeyframes = \`
  @keyframes pulse { 
    0% { transform: scale(1); } 
    50% { transform: scale(1.1); } 
    100% { transform: scale(1); } 
  }
\`;
if (!document.getElementById('pulse-keyframes-style')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'pulse-keyframes-style';
    styleSheet.innerText = pulseKeyframes;
    document.head.appendChild(styleSheet);
}


// Simplified cleanup
window.addEventListener('beforeunload', () => {
    clearInterval(flexDirectionInterval);
    clearInterval(justificationInterval);
});
        `;
    } else {
        console.error("Fundamentals lessons data structure not found or incomplete in main_script.js");
    }
});