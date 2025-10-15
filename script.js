/*
CUSTOMIZATION GUIDE FOR SCRIPT.JS:
1. Adjust marquee speed by changing the animation duration in duplicateProjects()
2. Update project details as needed
3. Configure form submission endpoint
*/

// Navigation Menu Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Duplicate Projects for Infinite Marquee
function duplicateProjects() {
    const marquee = document.getElementById('marquee');
    const projectCards = marquee.querySelectorAll('.project-card');
    
    // Clone all project cards to create seamless loop
    projectCards.forEach(card => {
        const clone = card.cloneNode(true);
        marquee.appendChild(clone);
    });
}

// Initialize marquee
duplicateProjects();

// Pause marquee on hover - handled via CSS

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

function showError(inputId, message) {
    const errorElement = document.getElementById(`${inputId}-error`);
    const inputElement = document.getElementById(inputId);
    errorElement.textContent = message;
    inputElement.style.borderColor = '#ef4444';
}

function clearError(inputId) {
    const errorElement = document.getElementById(`${inputId}-error`);
    const inputElement = document.getElementById(inputId);
    errorElement.textContent = '';
    inputElement.style.borderColor = 'var(--border-color)';
}

// Real-time validation
document.getElementById('name').addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        if (validateName(e.target.value)) {
            clearError('name');
        } else {
            showError('name', 'Name must be at least 2 characters');
        }
    } else {
        clearError('name');
    }
});

document.getElementById('email').addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        if (validateEmail(e.target.value)) {
            clearError('email');
        } else {
            showError('email', 'Please enter a valid email address');
        }
    } else {
        clearError('email');
    }
});

document.getElementById('message').addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        if (validateMessage(e.target.value)) {
            clearError('message');
        } else {
            showError('message', 'Message must be at least 10 characters');
        }
    } else {
        clearError('message');
    }
});

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    let isValid = true;
    
    if (!validateName(name)) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    } else {
        clearError('name');
    }
    
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError('email');
    }
    
    if (!validateMessage(message)) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    } else {
        clearError('message');
    }
    
    if (!isValid) {
        return;
    }
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    
    try {
        // CUSTOMIZATION: Replace with your form submission service
        // Option 1: Formspree - https://formspree.io/
        // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name, email, message })
        // });
        
        // Option 2: EmailJS - https://www.emailjs.com/
        // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        //     from_name: name,
        //     from_email: email,
        //     message: message
        // });
        
        // For demo purposes, simulate successful submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        formSuccess.classList.add('show');
        contactForm.reset();
        
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
        
    } catch (error) {
        console.error('Form submission error:', error);
        alert('There was an error sending your message. Please try again or email directly.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});

// Intersection Observer for scroll animations
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

const fadeElements = document.querySelectorAll('.about-container, .skills-title, .timeline-item, .contact-container');

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(element);
});

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky header effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.boxShadow = 'var(--shadow-sm)';
    }
    
    lastScroll = currentScroll;
});

// Animate skill cards on scroll
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    skillObserver.observe(card);
});

// Add smooth reveal animation to about boxes
const aboutBoxes = document.querySelectorAll('.about-box');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

aboutBoxes.forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(30px)';
    box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    aboutObserver.observe(box);
});

// Console message for developers
console.log('%c👋 Hello Developer!', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%cLike what you see? Let\'s connect!', 'color: #6b7280; font-size: 14px;');
console.log('%cEmail: sarthakkothawale@gmail.com', 'color: #3b82f6; font-size: 12px;');

// Accessibility: Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--accent-color);
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 1000;
    border-radius: 4px;
`;
skipLink.addEventListener('focus', function() {
    this.style.top = '10px';
});
skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
    scrollActive();
    document.body.classList.add('loaded');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    const marquee = document.getElementById('marquee');
    if (document.hidden) {
        marquee.style.animationPlayState = 'paused';
    } else {
        marquee.style.animationPlayState = 'running';
    }
});