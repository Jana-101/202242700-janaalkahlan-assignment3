/* ============================================================
   PORTFOLIO — script.js
   Author: Jana Alkahlan
   ============================================================ */

/* ─── 1. TIME-BASED GREETING ────────────────────────────────── */
function setGreeting() {
  const el = document.getElementById('greeting');
  if (!el) return;
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    el.textContent = 'Software Engineering Student ☀';
  } else if (hour >= 12 && hour < 18) {
    el.textContent = 'Software Engineering Student ✦';
  } else {
    el.textContent = 'Software Engineering Student ✦';
  }
}

/* ─── 2. THEME TOGGLE ───────────────────────────────────────── */
const themeBtn  = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlEl    = document.documentElement;

function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'light' ? '☾' : '☀';
  localStorage.setItem('portfolio-theme', theme);
}

// Restore saved preference (default: light)
const saved = localStorage.getItem('portfolio-theme') || 'light';
applyTheme(saved);

themeBtn.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  applyTheme(current === 'light' ? 'dark' : 'light');
});

/* ─── 3. STICKY NAV ─────────────────────────────────────────── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─── 4. HAMBURGER MENU ─────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen     = false;

function toggleMenu(open) {
  menuOpen = open;
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';

  const bars = hamburger.querySelectorAll('span');
  if (open) {
    bars[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    bars[1].style.opacity   = '0';
    bars[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    bars[0].style.transform = '';
    bars[1].style.opacity   = '';
    bars[2].style.transform = '';
  }
}

hamburger.addEventListener('click', () => toggleMenu(!menuOpen));

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menuOpen) toggleMenu(false);
});

/* ─── 5. SCROLL REVEAL ──────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── 6. SMOOTH SCROLLING ───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = target.getBoundingClientRect().top
                 + window.scrollY
                 - nav.offsetHeight;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

/* ─── 7. PROJECT FILTERING + LIVE SEARCH ───────────────────── */
const cards       = Array.from(document.querySelectorAll('.card[data-category]'));
const emptyState  = document.getElementById('projectsEmpty');
const searchInput = document.getElementById('projectSearch');
const searchClear = document.getElementById('searchClear');
const filterBtns  = document.querySelectorAll('.filter-btn');

let activeFilter  = 'all';
let searchQuery   = '';

/**
 * Animates a card in with fade/slide effect.
 */
function showCard(card) {
  card.classList.remove('card--hidden');
  card.classList.remove('card--fade-in');
  // Trigger reflow so animation restarts cleanly
  void card.offsetWidth;
  card.classList.add('card--fade-in');
}

/**
 * Hides a card instantly.
 */
function hideCard(card) {
  card.classList.add('card--hidden');
  card.classList.remove('card--fade-in');
}

/**
 * Applies current filter + search state to all cards.
 */
function applyFilters() {
  const query = searchQuery.toLowerCase().trim();
  let visibleCount = 0;

  cards.forEach(card => {
    const category = card.dataset.category || '';
    const title    = (card.dataset.title    || '').toLowerCase();
    const desc     = (card.dataset.desc     || '').toLowerCase();

    const matchesFilter = activeFilter === 'all' || category === activeFilter;
    const matchesSearch = !query || title.includes(query) || desc.includes(query);

    if (matchesFilter && matchesSearch) {
      showCard(card);
      visibleCount++;
    } else {
      hideCard(card);
    }
  });

  // Show/hide empty state
  if (emptyState) {
    emptyState.hidden = visibleCount > 0;
  }

  // Show/hide clear button
  if (searchClear) {
    searchClear.hidden = query.length === 0;
  }
}

// Filter button clicks
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    applyFilters();
  });
});

// Live search input
if (searchInput) {
  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value;
    applyFilters();
  });
}

// Clear button
if (searchClear) {
  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    applyFilters();
    searchInput.focus();
  });
}

/* ─── 8. FORM VALIDATION ────────────────────────────────────── */
const form         = document.getElementById('contactForm');
const submitBtn    = document.getElementById('submitBtn');
const successMsg   = document.getElementById('formSuccess');
const errorSummary = document.getElementById('formErrorSummary');

/**
 * Validates a single field.
 * Returns an error string, or '' if valid.
 */
function validate(id, type) {
  const el  = document.getElementById(id);
  const val = el.value.trim();
  if (!val) return 'This field is required.';
  if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
    return 'Please enter a valid email address.';
  if (type === 'textarea' && val.length < 10)
    return 'Please write at least 10 characters.';
  return '';
}

/**
 * Shows or clears an inline error for a field,
 * and toggles the invalid CSS class.
 */
function setFieldError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const errEl = document.getElementById(errorId);
  if (message) {
    errEl.textContent = message;
    input.classList.add('invalid');
  } else {
    errEl.textContent = '';
    input.classList.remove('invalid');
  }
}

// Clear errors on input so user gets instant feedback
['name', 'email', 'message'].forEach(id => {
  const el   = document.getElementById(id);
  const type = id === 'message' ? 'textarea' : id;
  el.addEventListener('input', () => {
    const err = validate(id, type);
    setFieldError(id, id + 'Error', err);
  });
});

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const nameErr    = validate('name',    'text');
    const emailErr   = validate('email',   'email');
    const messageErr = validate('message', 'textarea');

    setFieldError('name',    'nameError',    nameErr);
    setFieldError('email',   'emailError',   emailErr);
    setFieldError('message', 'messageError', messageErr);

    const hasErrors = nameErr || emailErr || messageErr;

    // Show / hide error summary
    if (errorSummary) {
      errorSummary.hidden = !hasErrors;
    }

    if (hasErrors) {
      // Scroll to first invalid field
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalid.focus();
      }
      return;
    }

    // ── Sending state ──────────────────────────────
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';
    if (successMsg) successMsg.classList.remove('show');

    // Simulate async send (replace with real API call if needed)
    setTimeout(() => {
      submitBtn.textContent = 'Sent ✓';

      if (successMsg) successMsg.classList.add('show');
      if (errorSummary) errorSummary.hidden = true;

      // Reset after 4 seconds
      setTimeout(() => {
        form.reset();
        submitBtn.disabled    = false;
        submitBtn.textContent = 'Send Message';
        ['name', 'email', 'message'].forEach(id => {
          setFieldError(id, id + 'Error', '');
        });
        if (successMsg) successMsg.classList.remove('show');
      }, 4000);

    }, 1200);
  });
}

/* ─── INIT ──────────────────────────────────────────────────── */
setGreeting();
applyFilters(); // ensure initial state is correct
