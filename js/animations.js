// ========================================
// SCROLL REVEAL
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.program-card, .facility-item, .about-content, ' +
        '.testimonial-card, .stat-item, .contact-wrapper'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
    .program-card.visible,
    .facility-item.visible,
    .about-content.visible,
    .testimonial-card.visible,
    .contact-wrapper.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .program-card:nth-child(2) { transition-delay: 0.1s; }
    .program-card:nth-child(3) { transition-delay: 0.2s; }
    
    .facility-item:nth-child(2) { transition-delay: 0.08s; }
    .facility-item:nth-child(3) { transition-delay: 0.16s; }
    .facility-item:nth-child(4) { transition-delay: 0.24s; }
    .facility-item:nth-child(5) { transition-delay: 0.32s; }
    .facility-item:nth-child(6) { transition-delay: 0.40s; }
    
    .stat-item:nth-child(1) { transition-delay: 0.1s; }
    .stat-item:nth-child(3) { transition-delay: 0.2s; }
    .stat-item:nth-child(5) { transition-delay: 0.3s; }
`;
document.head.appendChild(style);

// ========================================
// COUNTER ANIMATION
// ========================================
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const count = parseInt(target.getAttribute('data-count'));
            animateCounter(target, count);
            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

function animateCounter(element, target) {
    let current = 0;
    const duration = 2500;
    const steps = 60;
    const increment = Math.ceil(target / steps);
    const stepTime = duration / steps;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current + '+';
    }, stepTime);
}

// ========================================
// PARTICLES
// ========================================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 6 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(212, 168, 71, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
            pointer-events: none;
        `;
        
        container.appendChild(particle);
    }
}

// Add particle animation keyframes
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
        }
        25% {
            transform: translate(30px, -20px) scale(1.2);
            opacity: 1;
        }
        50% {
            transform: translate(-10px, -40px) scale(0.8);
            opacity: 0.7;
        }
        75% {
            transform: translate(20px, -10px) scale(1.1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// ========================================
// PARALLAX EFFECT
// ========================================
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.7));
    }
});

// ========================================
// TYPEWRITER EFFECT
// ========================================
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let charIndex = 0;
    const typeInterval = setInterval(() => {
        if (charIndex < originalText.length) {
            heroSubtitle.textContent += originalText.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typeInterval);
        }
    }, 30);
}

// ========================================
// RESET STATS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    statNumbers.forEach(stat => {
        stat.textContent = '0';
    });
});

// ========================================
// 3D CARD EFFECT
// ========================================
const cards = document.querySelectorAll('.program-card, .facility-item');

cards.forEach(card => {
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
        card.style.transform = '';
    });
});