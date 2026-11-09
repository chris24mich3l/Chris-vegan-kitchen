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
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        link.classList.remove('active');

        if (linkHref === currentPage) {
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
