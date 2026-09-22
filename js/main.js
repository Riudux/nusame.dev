window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
        },
        accent: {
          cyan: '#0284c7',
          sky: '#0284c7',
        }
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.98)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initNavbarScroll();
  initMobileMenu();
  initSpotlightCards();
  initScrollReveal();
});

function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('bg-white/95', 'shadow-md', 'border-slate-300/80');
      navbar.classList.remove('bg-white/82');
    } else {
      navbar.classList.remove('bg-white/95', 'shadow-md', 'border-slate-300/80');
      navbar.classList.add('bg-white/82');
    }
  }, { passive: true });
}

function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
    } else {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    });
  });
}

function initSpotlightCards() {
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }
}

function switchHeroTab(tabId) {
  const tabs = ['telemetry', 'architecture', 'pipeline'];
  tabs.forEach(tab => {
    const content = document.getElementById(`tab-content-${tab}`);
    const btn = document.getElementById(`tab-btn-${tab}`);
    if (content && btn) {
      if (tab === tabId) {
        content.classList.remove('hidden');
        btn.className = "px-2.5 py-1 rounded-md text-blue-700 bg-white shadow-sm border border-slate-200 font-semibold transition";
      } else {
        content.classList.add('hidden');
        btn.className = "px-2.5 py-1 rounded-md text-slate-600 hover:text-slate-900 transition";
      }
    }
  });
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
window.switchHeroTab = switchHeroTab;

function handleLeadSubmit(event) {
  event.preventDefault();
  const emailInput = document.getElementById('lead-email');
  const submitBtn = document.getElementById('lead-submit-btn');
  const btnText = document.getElementById('btn-text');
  const feedback = document.getElementById('form-feedback');

  if (!emailInput || !submitBtn || !feedback) return;

  const email = emailInput.value.trim();
  if (!email || !email.includes('@')) {
    feedback.className = "mt-3 text-xs font-mono text-rose-600 block";
    feedback.textContent = "⚠ Por favor, introduce una dirección de correo corporativo válida.";
    return;
  }

  submitBtn.disabled = true;
  btnText.textContent = "Procesando...";

  setTimeout(() => {
    submitBtn.disabled = false;
    btnText.textContent = "Enviado con Éxito";
    emailInput.value = "";
    
    feedback.className = "mt-3 text-xs font-mono text-emerald-700 block bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 font-medium";
    feedback.innerHTML = "✓ <strong>Solicitud recibida:</strong> Uno de nuestros arquitectos de software te contactará en menos de 4 horas hábiles.";

    setTimeout(() => {
      btnText.textContent = "Solicitar Diagnóstico";
    }, 5000);
  }, 750);
}
window.handleLeadSubmit = handleLeadSubmit;
