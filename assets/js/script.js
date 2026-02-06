// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Animated Statistics Counter
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;

    const statsSection = document.querySelector('.statistics');
    const statsSectionTop = statsSection.offsetTop;
    const statsSectionHeight = statsSection.offsetHeight;
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;

    if (scrollY + windowHeight > statsSectionTop + 100) {
        statsAnimated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + '+';
                }
            };

            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateStats);

// Header Background on Scroll
const header = document.querySelector('.header');

function updateHeader() {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
}

window.addEventListener('scroll', updateHeader);

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (name && email && message) {
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Button Hover Effects
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Portfolio Item Hover Effects
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class to body for any initial animations
    document.body.classList.add('loaded');

    // Trigger stats animation check
    animateStats();
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(section);
});


// Resume Modal Functionality
const resumeBtn = document.getElementById('resumeBtn');
const resumeModal = document.getElementById('resumeModal');
const resumeCloseBtn = document.getElementById('resumeCloseBtn');

// Open modal when resume button is clicked
if (resumeBtn) {
    resumeBtn.addEventListener('click', function() {
        resumeModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
}

// Close modal when close button is clicked
if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', function() {
        resumeModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside the content
if (resumeModal) {
    resumeModal.addEventListener('click', function(e) {
        if (e.target === resumeModal) {
            resumeModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('show')) {
        resumeModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});