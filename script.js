// Hamburger Menu Toggle
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu';
mobileMenu.innerHTML = `
    <div class="mobile-menu-content">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
    </div>
`;
document.body.appendChild(mobileMenu);

hamburgerMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburgerMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        hamburgerMenu.classList.remove('active');
    }
});

// Button interactions
const viewProjectsBtn = document.querySelector('.btn-primary');
const contactMeBtn = document.querySelector('.btn-secondary');

viewProjectsBtn.addEventListener('click', () => {
    // Open projects website
    window.open('https://project.techraft.store/', '_blank');
});

contactMeBtn.addEventListener('click', () => {
    // Open WhatsApp with pre-typed message
    const phoneNumber = '9743714881';
    const message = 'hi';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});

// Social links interactions
const socialLinks = document.querySelectorAll('.social-links a');
socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.getAttribute('aria-label');
        console.log(`${platform} link clicked`);
        // Add your actual social media URLs here
        const urls = {
            'LinkedIn': 'https://linkedin.com/in/kedaraj-holikatti-235531296?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            'Instagram': 'https://www.instagram.com/kedaraj___?igsh=MW92aXl4NnliYnV4Ng==',
            'GitHub': 'https://github.com/kedaraj'
        };
        if (urls[platform]) {
            window.open(urls[platform], '_blank');
        }
    });
});

// Cursor dot animation
const cursorDot = document.querySelector('.cursor-dot');
let mouseX = 0;
let mouseY = 0;
let dotX = 0;
let dotY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
    const speed = 0.1;
    dotX += (mouseX - dotX) * speed;
    dotY += (mouseY - dotY) * speed;
    
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add typing effect to the main heading
const mainHeading = document.querySelector('.hero-content h2');
const originalText = mainHeading.textContent;
mainHeading.textContent = '';
let charIndex = 0;

function typeWriter() {
    if (charIndex < originalText.length) {
        mainHeading.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Add hover effect to buttons
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        width: 100px;
        height: 100px;
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
        transform: translate(-50%, -50%);
    }
    
    @keyframes ripple-animation {
        from {
            width: 0;
            height: 0;
            opacity: 1;
        }
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.hero-content > *');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
});
