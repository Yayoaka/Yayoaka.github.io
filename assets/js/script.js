// Création des particules animées
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;

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
        container.appendChild(particle);
    }
}

// Défilement fluide pour les liens de navigation
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
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
function initPopups() {
    const openBtns = document.querySelectorAll('.open-popup-btn');
    const closeBtns = document.querySelectorAll('.close-popup-btn');

    openBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const popup = document.getElementById(btn.dataset.popup);
            if (popup) {
                popup.classList.add('visible');
                popup.setAttribute('aria-hidden', 'false');
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const popup = btn.closest('.popup');
            if (popup) {
                popup.classList.remove('visible');
                popup.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // Clic en dehors
    window.addEventListener('click', e => {
        document.querySelectorAll('.popup.visible').forEach(popup => {
            if (e.target === popup) {
                popup.classList.remove('visible');
                popup.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // Touche Échap
    window.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.popup.visible').forEach(popup => {
                popup.classList.remove('visible');
                popup.setAttribute('aria-hidden', 'true');
            });
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
        let currentIndex = 0;

        function updateCarousel() {
            const slideWidth = slides[0].clientWidth + 10;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
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
    initSmoothScrolling();
    initFormSubmission();
    initScrollEffect();
    addHoverEffects();
    initPopups();
    initCarousels();
});
