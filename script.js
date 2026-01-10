/* ============================================
   MAIN JAVASCRIPT - SAI PORTFOLIO
   ============================================
   Features:
   - Mobile navigation
   - Scroll animations
   - Particle background
   - Skill bar animations
   - Form validation
   - Smooth scrolling
   ============================================ */

// ============================================
// NAVIGATION
// ============================================

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// PARTICLE BACKGROUND (Hero Section)
// ============================================

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap particles around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        ctx.fillStyle = `rgba(0, 255, 249, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particle array
const particlesArray = [];
const numberOfParticles = 80;

function initParticles() {
    particlesArray.length = 0;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

initParticles();

// Connect particles with lines
function connectParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const opacity = 1 - (distance / 100);
                ctx.strokeStyle = `rgba(0, 255, 249, ${opacity * 0.2})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
}

// Animate particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    connectParticles();
    requestAnimationFrame(animateParticles);
}

animateParticles();

// ============================================
// SCROLL ANIMATIONS (AOS - Animate On Scroll)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Animate skill bars when they come into view
            if (entry.target.classList.contains('skills-category')) {
                animateSkillBars(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
const animatedElements = document.querySelectorAll('[data-aos]');
animatedElements.forEach(element => observer.observe(element));

// ============================================
// SKILL BAR ANIMATIONS
// ============================================

function animateSkillBars(categoryElement) {
    const skillBars = categoryElement.querySelectorAll('.skill-fill');
    
    skillBars.forEach((bar, index) => {
        const percent = bar.getAttribute('data-percent');
        
        setTimeout(() => {
            bar.style.width = percent + '%';
        }, index * 100); // Stagger animation
    });
}

// ============================================
// CONTACT FORM VALIDATION
// ============================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const formStatus = document.getElementById('formStatus');

// Validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateSubject(subject) {
    return subject.trim().length >= 3;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

// Show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.opacity = '1';
}

// Remove error message
function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');
    errorElement.textContent = '';
    errorElement.style.opacity = '0';
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    if (!validateName(nameInput.value)) {
        showError(nameInput, 'Name must be at least 2 characters long');
    } else {
        removeError(nameInput);
    }
});

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
    } else {
        removeError(emailInput);
    }
});

subjectInput.addEventListener('blur', () => {
    if (!validateSubject(subjectInput.value)) {
        showError(subjectInput, 'Subject must be at least 3 characters long');
    } else {
        removeError(subjectInput);
    }
});

messageInput.addEventListener('blur', () => {
    if (!validateMessage(messageInput.value)) {
        showError(messageInput, 'Message must be at least 10 characters long');
    } else {
        removeError(messageInput);
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset previous errors
    removeError(nameInput);
    removeError(emailInput);
    removeError(subjectInput);
    removeError(messageInput);
    
    // Validate all fields
    let isValid = true;
    
    if (!validateName(nameInput.value)) {
        showError(nameInput, 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!validateSubject(subjectInput.value)) {
        showError(subjectInput, 'Subject must be at least 3 characters long');
        isValid = false;
    }
    
    if (!validateMessage(messageInput.value)) {
        showError(messageInput, 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    // If form is valid, simulate submission
    if (isValid) {
        // Show loading state
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalText = submitButton.querySelector('span').textContent;
        submitButton.querySelector('span').textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call (replace with actual backend call)
        setTimeout(() => {
            // Show success message
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.querySelector('span').textContent = originalText;
            submitButton.disabled = false;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }, 1500);
    } else {
        // Show error message
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fix the errors above and try again.';
        
        // Hide error message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
});

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// TYPING ANIMATION (Hero Section)
// ============================================

const typingTexts = document.querySelectorAll('.typing-text');
let currentTextIndex = 0;

// Simple typing effect
function typeEffect() {
    typingTexts.forEach((text, index) => {
        if (index === currentTextIndex) {
            text.style.opacity = '1';
        } else {
            text.style.opacity = '0.3';
        }
    });
    
    currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
}

// Alternate typing texts every 3 seconds
setInterval(typeEffect, 3000);

// ============================================
// PROJECT CARDS TILT EFFECT
// ============================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

// Create scroll progress bar
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #00fff9, #b026ff);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

// Update progress on scroll
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for project images (if images are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// CONSOLE MESSAGE (Easter Egg)
// ============================================

console.log('%c👾 Welcome to Sai\'s Portfolio!', 'font-size: 20px; color: #00fff9; font-weight: bold;');
console.log('%cLooking for something? Check out the source code on GitHub!', 'font-size: 14px; color: #b026ff;');
console.log('%cBuilt with ❤️ using vanilla HTML, CSS, and JavaScript', 'font-size: 12px; color: #8892b0;');

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    // Remove any loading screen if present
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// KEYBOARD NAVIGATION ACCESSIBILITY
// ============================================

// Add focus styles for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============================================
// MATRIX RAIN EFFECT (Optional Easter Egg)
// ============================================

// Uncomment to enable Matrix-style rain effect on background
/*
function createMatrixRain() {
    const matrixCanvas = document.createElement('canvas');
    matrixCanvas.id = 'matrix-rain';
    matrixCanvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.1;
        pointer-events: none;
    `;
    document.body.appendChild(matrixCanvas);
    
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        ctx.fillStyle = '#00fff9';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 50);
}

// Uncomment to activate
// createMatrixRain();
*/

// ============================================
// INITIALIZE ALL FEATURES
// ============================================

console.log('Portfolio initialized successfully! 🚀');
