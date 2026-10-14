// JavaScript Controller for Tejashri Patil's Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // 1. TYPING TEXT ANIMATION
  const typingElement = document.getElementById('typing-text');
  const roles = [
    'Computer Engineering Student',
    'DSA Problem Solver (Rating: 1446)',
    'CodeChef 1000 Rating (2000+ Solved)',
    'Java, C, Python & SQL Developer',
    'Smart India Hackathon Participant',
    'CodeAlpha Software Intern'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseEnd = 2000;
  const pauseStart = 500;

  function typeEffect() {
    if (!typingElement) return;
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, pauseEnd);
        return;
      }
      setTimeout(typeEffect, typingSpeed);
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, pauseStart);
        return;
      }
      setTimeout(typeEffect, deletingSpeed);
    }
  }

  typeEffect();

  // 2. THEME TOGGLE (DARK / LIGHT)
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Initialize theme from localStorage or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    if (savedTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  } else {
    // Default to dark mode for sleek modern feel
    html.classList.add('dark');
    localStorage.setItem('portfolio-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('portfolio-theme', 'light');
        showToast('Switched to Light theme', 'fa-sun text-amber-500');
      } else {
        html.classList.add('dark');
        localStorage.setItem('portfolio-theme', 'dark');
        showToast('Switched to Dark theme', 'fa-moon text-indigo-400');
      }
    });
  }

  // 3. MOBILE MENU TOGGLE
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 4. NAVBAR BLUR ON SCROLL & ACTIVE LINK HIGHLIGHTING
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Scroll blur enhancement
    if (window.scrollY > 50) {
      navbar.classList.add('py-1');
    } else {
      navbar.classList.remove('py-1');
    }

    // Active link highlighting
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-brand-600', 'dark:text-brand-400', 'font-semibold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-brand-600', 'dark:text-brand-400', 'font-semibold');
      }
    });
  });

  // 5. PROJECT FILTER MECHANISM
  const filterButtons = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button styles
      filterButtons.forEach(b => {
        b.className = 'project-filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-surface';
      });
      btn.className = 'project-filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-brand-600 text-white shadow-md';

      // Filter cards
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 200);
        }
      });
    });
  });

  // 6. CONTACT FORM SUBMISSION HANDLER
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim() || 'Portfolio Contact Inquiry';
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill all required fields.', 'fa-circle-exclamation text-amber-500');
        return;
      }

      // Generate mailto link
      const mailtoUrl = `mailto:tejashrip31@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent("Sender Name: " + name + "\nSender Email: " + email + "\n\nMessage:\n" + message)}`;

      showToast('Opening your email client...', 'fa-paper-plane text-emerald-400');
      
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);

      contactForm.reset();
    });
  }

  // 7. RESUME MODAL HANDLERS
  const resumeBtn = document.getElementById('resume-btn');
  const mobileResumeBtn = document.getElementById('mobile-resume-btn');
  const resumeModal = document.getElementById('resume-modal');

  if (resumeBtn) resumeBtn.addEventListener('click', openResumeModal);
  if (mobileResumeBtn) mobileResumeBtn.addEventListener('click', openResumeModal);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !resumeModal.classList.contains('hidden')) {
        closeResumeModal();
      }
    });
  }
});

// GLOBAL FUNCTIONS
function openResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

function closeResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }
}

// Copy to Clipboard with Toast
function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage, 'fa-circle-check text-emerald-400');
    }).catch(() => {
      fallbackCopyTextToClipboard(text, successMessage);
    });
  } else {
    fallbackCopyTextToClipboard(text, successMessage);
  }
}

function fallbackCopyTextToClipboard(text, successMessage) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMessage, 'fa-circle-check text-emerald-400');
  } catch (err) {
    showToast('Failed to copy', 'fa-circle-xmark text-red-400');
  }
  document.body.removeChild(textArea);
}

// Toast Alert
function showToast(message, iconClass = 'fa-circle-check text-emerald-400') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');

  if (!toast || !toastMessage || !toastIcon) return;

  toastMessage.textContent = message;
  toastIcon.className = `fa-solid ${iconClass}`;

  toast.classList.remove('hidden');
  toast.classList.remove('translate-y-24', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-24', 'opacity-0');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 300);
  }, 3000);
}
