const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Création des particules animées
function createParticles() {
    if (prefersReducedMotion) return;

    const container = document.getElementById('particles');
    const particleCount = 50;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDelay = `${Math.random() * 6}s`;
        particle.style.animationDuration = `${Math.random() * 3 + 3}s`;
        fragment.appendChild(particle);
    }
    container.appendChild(fragment);
}

// Fermeture du menu mobile au clic sur un lien de nav
// (la navigation elle-même est gérée nativement : liens <a href="#..."> +
// `scroll-behavior: smooth` / `scroll-padding-top` en CSS, pour que l'URL
// se mette à jour correctement et reste partageable/navigable au retour arrière)
function initMobileNav() {
    const toggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (!toggle || !navLinks) return;

    const closeMenu = () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Ouvrir le menu');
    };

    toggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMenu();
    });
}

// Coordonnées construites au chargement plutôt qu'écrites en clair dans le HTML,
// pour limiter le scraping automatisé par des robots qui ne lisent que le HTML statique.
function initContactLinks() {
    const phoneDigits = ['+33', '6', '51', '28', '33', '75'];
    const phoneLink = document.getElementById('phoneLink');
    if (phoneLink) {
        phoneLink.textContent = phoneDigits.join(' ');
        phoneLink.href = 'tel:' + phoneDigits.join('');
    }

    const user = 'lucas';
    const domain = 'studer.fr';
    const emailLink = document.getElementById('emailLink');
    if (emailLink) {
        emailLink.textContent = `${user}@${domain}`;
        emailLink.href = `mailto:${user}@${domain}`;
    }
}

// Gestion de la soumission du formulaire
function initFormSubmission() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            alert('Message envoyé ! Je vous répondrai dans les plus brefs délais.');
            form.reset();
        });
    }
}

// Effet de scroll sur le header
function initScrollEffect() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.style.background = window.scrollY > 100
            ? 'rgba(0, 0, 0, 0.95)'
            : 'rgba(0, 0, 0, 0.9)';
    });
}

// Effets au survol des cartes
function addHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .skill-category');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Gestion des popups
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function initPopups() {
    const openBtns = document.querySelectorAll('.open-popup-btn');
    const closeBtns = document.querySelectorAll('.close-popup-btn');
    let lastFocused = null;

    const openPopup = (popup, trigger) => {
        lastFocused = trigger;
        popup.classList.add('visible');
        popup.setAttribute('aria-hidden', 'false');
        const closeBtn = popup.querySelector('.close-popup-btn');
        if (closeBtn) closeBtn.focus();
    };

    const closePopup = popup => {
        popup.classList.remove('visible');
        popup.setAttribute('aria-hidden', 'true');
        if (lastFocused) lastFocused.focus();
    };

    openBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const popup = document.getElementById(btn.dataset.popup);
            if (popup) openPopup(popup, btn);
        });
    });

    closeBtns.forEach(btn => {
        const close = () => {
            const popup = btn.closest('.popup');
            if (popup) closePopup(popup);
        };
        btn.addEventListener('click', close);
        // Le bouton fermer est un <span role="button">, pas un <button> natif :
        // il faut donc gérer Entrée/Espace manuellement pour rester accessible au clavier.
        btn.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                close();
            }
        });
    });

    // Clic en dehors
    window.addEventListener('click', e => {
        document.querySelectorAll('.popup.visible').forEach(popup => {
            if (e.target === popup) closePopup(popup);
        });
    });

    // Clavier : Échap referme, ← / → naviguent le carousel, Tab reste piégé dans la popup ouverte
    window.addEventListener('keydown', e => {
        const popup = document.querySelector('.popup.visible');
        if (!popup) return;

        if (e.key === 'Escape') {
            closePopup(popup);
            return;
        }

        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const btn = popup.querySelector(e.key === 'ArrowLeft' ? '.carousel-btn.prev' : '.carousel-btn.next');
            if (btn) btn.click();
            return;
        }

        if (e.key === 'Tab') {
            const focusable = Array.from(popup.querySelectorAll(FOCUSABLE_SELECTOR));
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
}

// Initialisation du carousel
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = track.querySelectorAll('img');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const counter = carousel.querySelector('.carousel-counter');
        let currentIndex = 0;

        function updateCarousel() {
            const slideWidth = slides[0].clientWidth + 10
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            if (counter) counter.textContent = `${currentIndex + 1} / ${slides.length}`;
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        });

        window.addEventListener('resize', updateCarousel);
        updateCarousel();
    });
}

function closeAllPopupsOnLoad() {
    document.querySelectorAll('.popup.visible').forEach(popup => {
        popup.classList.remove('visible');
        popup.setAttribute('aria-hidden', 'true');
    });
}


// Initialisation globale
document.addEventListener('DOMContentLoaded', () => {
    closeAllPopupsOnLoad();
    createParticles();
    initMobileNav();
    initContactLinks();
    initFormSubmission();
    initScrollEffect();
    addHoverEffects();
    initPopups();
    initCarousels();
});
