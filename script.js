// Construction Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize progress bar animation
  initProgressBar();
  
  // Initialize form handling
  initFormHandling();
  
  // Initialize interactive elements
  initInteractiveElements();
  
  // Initialize performance optimizations
  initPerformanceOptimizations();
});

// Progress Bar Animation
function initProgressBar() {
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');
  const targetProgress = parseInt(progressFill.dataset.progress);
  
  // Animate progress bar on load
  setTimeout(() => {
    progressFill.style.width = targetProgress + '%';
    animateProgressText(0, targetProgress, 2000);
  }, 1000);
  
  // Randomly update progress every 30 seconds
  setInterval(() => {
    const currentProgress = parseInt(progressText.textContent);
    const newProgress = Math.min(currentProgress + Math.floor(Math.random() * 3) + 1, 95);
    
    progressFill.style.width = newProgress + '%';
    animateProgressText(currentProgress, newProgress, 1500);
    progressFill.dataset.progress = newProgress;
  }, 30000);
}

function animateProgressText(start, end, duration) {
  const progressText = document.querySelector('.progress-text');
  const startTime = performance.now();
  
  function updateProgress(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const currentValue = Math.floor(start + (end - start) * easeOutCubic(progress));
    progressText.textContent = currentValue;
    
    if (progress < 1) {
      requestAnimationFrame(updateProgress);
    }
  }
  
  requestAnimationFrame(updateProgress);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Form Handling
function initFormHandling() {
  const form = document.getElementById('construction-waitlist');
  const thankYouMessage = document.getElementById('construction-thank-you');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Adding you to the list...';
    submitButton.disabled = true;
    submitButton.classList.add('opacity-75');
    
    // Simulate form submission delay
    setTimeout(() => {
      // Hide form and show thank you message
      form.classList.add('animate__animated', 'animate__fadeOut');
      
      setTimeout(() => {
        form.classList.add('hidden');
        thankYouMessage.classList.remove('hidden');
        
        // Trigger confetti effect
        createConfetti();
        
        // Submit to Netlify if not local
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
          const formData = new FormData(form);
          fetch('/', {
            method: 'POST',
            body: formData
          }).catch(error => console.error('Form submission error:', error));
        }
      }, 500);
    }, 1500);
  });
}

// Interactive Elements
function initInteractiveElements() {
  // Add hover effects to UI blocks
  const uiBlocks = document.querySelectorAll('.ui-block');
  uiBlocks.forEach(block => {
    block.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    block.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
  
  // Add click effect to construction button
  const constructionBtn = document.querySelector('.construction-btn');
  if (constructionBtn) {
    constructionBtn.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }
}

// Performance Optimizations
function initPerformanceOptimizations() {
  // Reduce animations on low-end devices
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.body.classList.add('reduced-motion');
  }
  
  // Pause animations when page is not visible
  document.addEventListener('visibilitychange', function() {
    const animations = document.querySelectorAll('.animate__animated');
    if (document.hidden) {
      animations.forEach(el => el.style.animationPlayState = 'paused');
    } else {
      animations.forEach(el => el.style.animationPlayState = 'running');
    }
  });
  
  // Intersection Observer for performance
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
      }
    });
  }, observerOptions);
  
  // Observe elements that should animate on scroll
  const elementsToObserve = document.querySelectorAll('.construction-scene, .progress-container');
  elementsToObserve.forEach(el => observer.observe(el));
}

// Confetti Effect
function createConfetti() {
  const colors = ['#3B82F6', '#F97316', '#10B981', '#8B5CF6', '#EF4444'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
  }
}

function createConfettiPiece(color) {
  const confetti = document.createElement('div');
  confetti.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    background: ${color};
    left: ${Math.random() * 100}vw;
    top: -10px;
    z-index: 1000;
    pointer-events: none;
    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
    animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
  `;
  
  document.body.appendChild(confetti);
  
  setTimeout(() => {
    confetti.remove();
  }, 5000);
}

// Add confetti animation styles
const confettiStyles = document.createElement('style');
confettiStyles.textContent = `
  @keyframes confettiFall {
    0% {
      transform: translateY(-100vh) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
`;
document.head.appendChild(confettiStyles);

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
  konamiCode.push(e.code);
  
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    // Easter egg: Speed up all animations
    document.body.style.animationDuration = '0.5s';
    const allAnimated = document.querySelectorAll('*');
    allAnimated.forEach(el => {
      el.style.animationDuration = '0.5s';
    });
    
    // Show special message
    const easterEgg = document.createElement('div');
    easterEgg.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-2xl text-center animate__animated animate__bounceIn">
          <h3 class="text-2xl font-bold mb-4">🚀 Developer Mode Activated!</h3>
          <p class="text-gray-600">All animations are now in hyperspeed!</p>
          <button onclick="this.parentElement.parentElement.remove()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Cool!
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(easterEgg);
    
    konamiCode = [];
  }
});

// Smooth scroll for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});