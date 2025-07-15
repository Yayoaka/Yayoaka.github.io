// Création des particules animées
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        container.appendChild(particle);
    }
}

// Défilement fluide pour les liens de navigation
function initSmoothScrolling() {
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
}

// Gestion de la soumission du formulaire
function initFormSubmission() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Message envoyé ! Je vous répondrai dans les plus brefs délais.');
            this.reset();
        });
    }
}

// Effet de défilement pour le header
function initScrollEffect() {
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });
}

// Initialisation des fonctionnalités
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    initSmoothScrolling();
    initFormSubmission();
    initScrollEffect();
});

// Fonction pour ajouter des animations au survol des cartes
function addHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .skill-category');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}


document.addEventListener('DOMContentLoaded', function () {
    // Récupère tous les boutons pour ouvrir les popups
    const openPopupBtns = document.querySelectorAll('.open-popup-btn');
    // Récupère toutes les croix pour fermer les popups
    const closePopupBtns = document.querySelectorAll('.close-popup-btn');

    openPopupBtns.forEach(btn => {
        btn.addEventListener('click', function (event) {
            event.preventDefault(); // Empêche le comportement par défaut du lien
            const popupId = btn.getAttribute('data-popup');
            const popup = document.getElementById(popupId);
            if (popup) {
                popup.style.display = 'flex'; // Affiche la popup
            }
        });
    });

    closePopupBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const popup = btn.closest('.popup');
            if (popup) {
                popup.style.display = 'none'; // Cache la popup
            }
        });
    });

    // Fermer la popup si on clique en dehors du contenu
    window.addEventListener('click', function (event) {
        const popups = document.querySelectorAll('.popup');
        popups.forEach(popup => {
            if (event.target === popup) {
                popup.style.display = 'none';
            }
        });
    });
});


// Initialiser les effets de survol
document.addEventListener('DOMContentLoaded', addHoverEffects);