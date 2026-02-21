document.addEventListener('DOMContentLoaded', function() {
    if (window.lessonCategories && window.lessonCategories.advanced && window.lessonCategories.advanced.lessons) {

        lessonCategories.advanced.lessons['custom-css'].initialCode.js = `
console.log('Custom CSS lesson loaded!');

// Hacer las funciones accesibles globalmente si se llaman desde onclick en HTML
window.animateProgress = function() {
  try {
    const progressBar = document.getElementById('customProgress');
    const progressText = progressBar ? progressBar.querySelector('.custom-progress-text') : null;
    
    if (!progressBar || !progressText) return;
    
    let width = 0;
    const targetWidth = Math.floor(Math.random() * 81) + 20; // Random 20-100
    
    progressBar.style.width = '0%';
    progressText.textContent = '0%';
    progressBar.style.background = ''; // Reset background
    
    const interval = setInterval(() => {
      width = Math.min(width + 2, targetWidth); // Increment but don't exceed target
      progressBar.style.width = width + '%';
      progressText.textContent = width + '%';
      
      if (width >= targetWidth) {
        clearInterval(interval);
        if (width === 100) { // Special effect for 100%
            progressBar.style.background = 'linear-gradient(45deg, var(--custom-success), var(--custom-warning))';
            progressText.textContent = '¡Completado!';
        } else {
            progressText.textContent = targetWidth + '% ¡Hecho!';
        }
      }
    }, 50);
  } catch (error) {
    console.error('Error animando progreso:', error);
  }
}

function animateCardsOnLoad() {
  try {
    const cards = document.querySelectorAll('.custom-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px)';
      
      setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 150 + 300); // Staggered delay, start after a bit
    });
  } catch (error) {
    console.error('Error animando cards:', error);
  }
}

function parallaxEffectHero() {
  try {
    const hero = document.querySelector('.custom-hero');
    if (!hero) return;
    
    // This parallax might be tricky inside an iframe.
    // For a real page, window.scrollY is used. Inside iframe, it refers to iframe's scroll.
    // If the iframe itself doesn't scroll but the parent page does, this won't work as expected.
    // Assuming the content INSIDE the iframe might scroll or for demonstration:
    const previewDocument = document.getElementById('preview-frame').contentWindow.document;
    previewDocument.addEventListener('scroll', () => { // Listen to scroll inside iframe
      const scrolled = previewDocument.documentElement.scrollTop;
      const rate = scrolled * -0.1; // Slower rate
      hero.style.transform = \`translateY(\${rate}px)\`; // Corrected template literal
    });
  } catch (error) {
    // console.warn('Error agregando efecto parallax (puede ser por contexto de iframe):', error);
  }
}

function createFloatingParticlesInHero() {
  try {
    const hero = document.querySelector('.custom-hero');
    if (!hero) return;
    
    // Remove existing particles to avoid duplication on re-run
    hero.querySelectorAll('.floating-particle').forEach(p => p.remove());

    for (let i = 0; i < 15; i++) { // Reduced number
      const particle = document.createElement('div');
      particle.classList.add('floating-particle'); // For easier removal
      particle.style.cssText = \`
        position: absolute;
        width: \${Math.random() * 3 + 2}px; /* 2px to 5px */
        height: \${particle.style.width};
        background: rgba(255, 255, 255, \${Math.random() * 0.3 + 0.3}); /* 0.3 to 0.6 opacity */
        border-radius: 50%;
        left: \${Math.random() * 100}%;
        top: \${Math.random() * 100}%;
        animation: floatParticle \${Math.random() * 5 + 3}s ease-in-out infinite alternate; /* Alternate direction */
        animation-delay: \${Math.random() * 3}s;
        z-index: 1; /* Ensure below text but above background pattern */
      \`; // Corrected template literal
      hero.appendChild(particle);
    }
    
    const styleId = 'floating-particles-style';
    if (!document.getElementById(styleId)) {
        const styleSheet = document.createElement('style');
        styleSheet.id = styleId;
        styleSheet.textContent = \`
          @keyframes floatParticle {
            0% { transform: translateY(0px) translateX(0px) scale(1); }
            100% { transform: translateY(\${Math.random() * 20 - 10}px) translateX(\${Math.random() * 20 - 10}px) scale(\${Math.random() * 0.4 + 0.8}); } /* Random small movements & scale */
          }
        \`; // Corrected template literal
        document.head.appendChild(styleSheet);
    }
  } catch (error) {
    console.error('Error creando partículas:', error);
  }
}

function typingEffectTitle() {
  try {
    const titleElement = document.querySelector('.custom-hero .custom-title');
    if (!titleElement) return;
    
    const originalText = titleElement.dataset.text || titleElement.textContent; // Store original
    titleElement.dataset.text = originalText; // Ensure it's stored for reruns
    titleElement.textContent = '';
    
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < originalText.length) {
        titleElement.textContent += originalText.charAt(i);
        i++;
      } else {
        clearInterval(typingInterval);
        // Optional: add blinking cursor (can be CSS only too)
        titleElement.classList.add('typing-done');
      }
    }, 80); // Typing speed
  } catch (error) {
    console.error('Error con efecto de typing:', error);
  }
}

// Initialize effects for this lesson
animateCardsOnLoad();
typingEffectTitle(); // Start typing
createFloatingParticlesInHero();
parallaxEffectHero(); // Attempt parallax

document.querySelectorAll('.custom-card').forEach(card => {
  card.addEventListener('click', function() {
    this.style.transition = 'transform 0.1s ease-out'; // Faster transition for click
    this.style.transform = 'scale(0.97)';
    setTimeout(() => {
      this.style.transform = ''; // Reset to allow CSS hover effects
    }, 100);
  });
});
        `;

        lessonCategories.advanced.lessons['animations'].initialCode.js = `
console.log('Animations lesson loaded!');

// Asegurar que las funciones sean globales si se llaman desde onclick en HTML
window.startWaveAnimation = function() {
  try {
    const playground = document.getElementById('animationPlayground');
    if (!playground) return;
    resetAnimationsInternal(); // Internal reset
    playground.innerHTML = '<div class="wave-animation-preview"></div>'; // Unique class for preview
    // CSS for wave-animation-preview should be in initialCode.css or injected
  } catch (error) { console.error('Error en startWaveAnimation:', error); }
}

window.startRainAnimation = function() {
  try {
    const playground = document.getElementById('animationPlayground');
    if (!playground) return;
    resetAnimationsInternal();
    for (let i = 0; i < 40; i++) { // More drops
      const drop = document.createElement('div');
      drop.className = 'rain-drop-preview'; // Unique class
      drop.style.left = Math.random() * 100 + '%';
      // Animation properties should be set by CSS class .rain-drop-preview
      // For dynamic durations/delays:
      drop.style.animationDuration = (Math.random() * 0.8 + 0.4) + 's'; // 0.4s to 1.2s
      drop.style.animationDelay = Math.random() * 1.5 + 's';
      playground.appendChild(drop);
    }
  } catch (error) { console.error('Error en startRainAnimation:', error); }
}

window.startFireworksAnimation = function() {
  try {
    const playground = document.getElementById('animationPlayground');
    if (!playground) return;
    resetAnimationsInternal();
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57', '#ff9ff3', '#54a0ff', '#57E35D', '#F4D35E'];
    for (let i = 0; i < 8; i++) { // Number of fireworks
      setTimeout(() => createFireworkInternal(playground, colors), i * 200); // Staggered
    }
  } catch (error) { console.error('Error en startFireworksAnimation:', error); }
}

function createFireworkInternal(container, colors) {
  const firework = document.createElement('div');
  firework.className = 'firework-preview'; // Unique class
  firework.style.background = colors[Math.floor(Math.random() * colors.length)];
  firework.style.left = Math.random() * 80 + 10 + '%'; // Avoid edges
  firework.style.top = Math.random() * 50 + 20 + '%';  // Higher up
  // Optional: Add box-shadow for glow through JS if not in CSS
  // firework.style.boxShadow = \`0 0 15px 3px \${firework.style.background}\`;
  container.appendChild(firework);
  setTimeout(() => firework.remove(), 1000); // Match animation duration
}

window.resetAnimations = function() {
  try {
    resetAnimationsInternal();
  } catch (error) { console.error('Error en resetAnimations:', error); }
}

function resetAnimationsInternal() {
    const playground = document.getElementById('animationPlayground');
    if (playground) {
      playground.innerHTML = \`
        <div class="text-center py-5">
          <h4 class="text-muted">Haz click en los botones para ver las animaciones</h4>
        </div>
      \`;
    }
}

// Initial staggered entrance for cards (if any are present at top level)
document.querySelectorAll('.animated-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(40px)';
  setTimeout(() => {
    card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, index * 100 + 300); // Delay start slightly
});

// Add dynamic CSS for preview animations if not in main CSS
const animationStylesId = 'preview-animation-styles';
if (!document.getElementById(animationStylesId)) {
    const styleSheet = document.createElement("style");
    styleSheet.id = animationStylesId;
    styleSheet.textContent = \`
        .wave-animation-preview {
            position: absolute; bottom: 0; left: 0; width: 100%; height: 50px;
            background: linear-gradient(45deg, #007bffAA, #0056b3AA); /* Added alpha for transparency */
            animation: wavePreview 2.5s cubic-bezier(0.36, 0, 0.66, -0.56) infinite; /* Smoother wave */
        }
        @keyframes wavePreview {
            0%, 100% { clip-path: polygon(0 60%, 15% 70%, 30% 55%, 50% 65%, 70% 50%, 85% 60%, 100% 55%, 100% 100%, 0% 100%); }
            50% { clip-path: polygon(0 50%, 15% 60%, 30% 75%, 50% 55%, 70% 70%, 85% 50%, 100% 65%, 100% 100%, 0% 100%); }
        }
        .rain-drop-preview {
            position: absolute; width: 2px; height: 15px; /* Smaller drops */
            background: linear-gradient(to bottom, #007bffBB, transparent);
            animation: fallPreview linear infinite;
        }
        @keyframes fallPreview {
            from { transform: translateY(-50px) scaleY(1); opacity: 1; } /* Start off-screen */
            to { transform: translateY(350px) scaleY(1.5); opacity: 0; } /* Fall further, stretch slightly */
        }
        .firework-preview {
            position: absolute; width: 5px; height: 5px; border-radius: 50%;
            animation: explodePreview 0.8s ease-out forwards;
            box-shadow: 0 0 10px 2px currentColor; /* Use current color for shadow */
        }
        @keyframes explodePreview {
            0% { transform: scale(0.5) translate(-50%, -50%); opacity: 1; }
            100% { transform: scale(25) translate(-50%, -50%); opacity: 0; } /* Explode wider */
        }
    \`; // End of template literal
    document.head.appendChild(styleSheet);
}
        `;
    } else {
        console.error("Advanced lessons data structure not found or incomplete in main_script.js");
    }
});