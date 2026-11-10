// ============================
// Dark Mode Toggle
// ============================
const DARK_MODE_KEY = 'chris-vegan-kitchen-dark-mode';

function getSystemPrefersDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyDarkMode(enabled) {
    // Toggle the dark-mode class on <html> and <body> so CSS variables
    // (which drive colors/backgrounds throughout the entire page) flip.
    document.documentElement.classList.toggle('dark-mode', enabled);
    document.body.classList.toggle('dark-mode', enabled);

    // Update toggle button icon visibility via aria-pressed
    const toggle = document.querySelector('.dark-toggle');
    if (toggle) {
        toggle.setAttribute('aria-pressed', String(enabled));
    }
}

function initDarkMode() {
    const stored = localStorage.getItem(DARK_MODE_KEY);

    // Find or create toggle button
    let toggle = document.querySelector('.dark-toggle');
    if (!toggle) {
        // Button missing from page — inject it into the sticky nav
        toggle = document.createElement('button');
        toggle.className = 'dark-toggle';
        toggle.setAttribute('aria-label', 'Toggle dark mode');
        toggle.setAttribute('aria-pressed', 'false');
        toggle.innerHTML = `
            <svg class="icon-sun" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
            </svg>
            <svg class="icon-moon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
            </svg>`;
        // Place it inside the existing sticky nav
        const nav = document.querySelector('.sticky-nav');
        if (nav) {
            nav.appendChild(toggle);
        } else {
            document.body.appendChild(toggle);
        }
    }

    // Remove any existing listeners by cloning (preserves attributes)
    const newToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(newToggle, toggle);

    // Always attach the click handler
    newToggle.addEventListener('click', function () {
        // Read the current boolean from aria-pressed instead of relying on
        // the class presence (the class may not have been toggled yet
        // if this is the first click on a freshly loaded page).
        const wasPressed = toggle.getAttribute('aria-pressed') === 'true';
        const newPressed = !wasPressed;

        applyDarkMode(newPressed);
        localStorage.setItem(DARK_MODE_KEY, newPressed ? 'true' : 'false');
    });

    // Determine initial state
    let useDark;
    if (stored !== null) {
        useDark = stored === 'true';
    } else {
        useDark = getSystemPrefersDark();
    }

    applyDarkMode(useDark);

    // Listen for system preference changes (only if user hasn't manually overridden)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem(DARK_MODE_KEY) === null) {
            applyDarkMode(e.matches);
        }
    });
}

// FAQ Toggle Functionality
function toggleFaq(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// Scroll Reveal Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('visible');
        }
    });
}

// Sticky Nav Active State based on scroll
function updateNavState() {
    const navLinks = document.querySelectorAll('.sticky-nav a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        link.classList.remove('active');

        if (linkHref === currentPath) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Dark mode
    initDarkMode();

    // FAQ event listeners
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            toggleFaq(this);
        });
    });

    // Scroll events
    window.addEventListener('scroll', () => {
        revealOnScroll();
        updateNavState();
    }, { passive: true });

    // Initial check
    revealOnScroll();
    updateNavState();
});
