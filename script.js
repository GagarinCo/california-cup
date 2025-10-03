// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Debounced scroll handler for better performance
let scrollTimeout;
function handleScroll() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        const scrollY = window.scrollY;
        const navbar = document.querySelector('.navbar');
        const hero = document.querySelector('.hero');
        const heroSection = document.querySelector('.hero');
        const heroTitle = document.querySelector('.hero-title');
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Navbar background change
        if (navbar) {
            if (scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
        
        // Parallax effect for hero section
        if (hero) {
            const rate = scrollY * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Hide hero title animation when scrolling past hero section
        if (heroSection && heroTitle) {
            const heroHeight = heroSection.offsetHeight;
            if (scrollY > heroHeight * 0.8) {
                heroTitle.classList.add('scrolled-past');
            } else {
                heroTitle.classList.remove('scrolled-past');
            }
        }
        
        // Active navigation link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 10); // 10ms debounce
}

window.addEventListener('scroll', handleScroll);

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
    const animateElements = document.querySelectorAll('.section, .team-card, .timeline-item, .gallery-item, .feature');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent.replace(/\D/g, ''));
                if (target) {
                    animateCounter(stat, target);
                }
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Gallery lightbox functionality
let currentImageIndex = 0;
let galleryImages = [];

// Initialize gallery images array
function initGalleryImages() {
    galleryImages = Array.from(document.querySelectorAll('.gallery-img')).map(img => ({
        src: img.src,
        alt: img.alt
    }));
}

// Open lightbox with specific image
function openLightbox(index) {
    console.log('Opening lightbox with index:', index);
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (!lightbox || !lightboxImg || !lightboxCaption) {
        console.error('Lightbox elements not found');
        return;
    }
    
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxImg.alt = galleryImages[currentImageIndex].alt;
    lightboxCaption.textContent = galleryImages[currentImageIndex].alt;
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
    console.log('Lightbox opened successfully');
}

// Close lightbox
function closeLightbox() {
    console.log('Closing lightbox');
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('Lightbox closed successfully');
    }
}

// Navigate to previous image
function prevImage() {
    console.log('Previous image clicked');
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (lightboxImg && lightboxCaption) {
        lightboxImg.src = galleryImages[currentImageIndex].src;
        lightboxImg.alt = galleryImages[currentImageIndex].alt;
        lightboxCaption.textContent = galleryImages[currentImageIndex].alt;
        console.log('Switched to image index:', currentImageIndex);
    }
}

// Navigate to next image
function nextImage() {
    console.log('Next image clicked');
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (lightboxImg && lightboxCaption) {
        lightboxImg.src = galleryImages[currentImageIndex].src;
        lightboxImg.alt = galleryImages[currentImageIndex].alt;
        lightboxCaption.textContent = galleryImages[currentImageIndex].alt;
        console.log('Switched to image index:', currentImageIndex);
    }
}

// Initialize gallery lightbox
function initGalleryLightbox() {
    console.log('Initializing gallery lightbox');
    initGalleryImages();
    console.log('Gallery images loaded:', galleryImages.length);
    
    // Add click listeners to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    console.log('Found gallery items:', galleryItems.length);
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
    
    // Add event listeners for lightbox controls with error checking
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightbox = document.getElementById('lightbox');
    
    console.log('Lightbox elements found:', {
        close: !!lightboxClose,
        prev: !!lightboxPrev,
        next: !!lightboxNext,
        lightbox: !!lightbox
    });
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked directly');
            closeLightbox();
        });
        console.log('Close button event listener added');
    } else {
        console.error('Close button not found!');
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            prevImage();
        });
        console.log('Previous button event listener added');
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            nextImage();
        });
        console.log('Next button event listener added');
    }
    
    if (lightbox) {
        // Close lightbox when clicking on background
        lightbox.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                closeLightbox();
            }
        });
        console.log('Background click event listener added');
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        }
    });
    console.log('Keyboard navigation event listener added');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initGalleryLightbox);

// Visitor counter functionality
function initVisitorCounter() {
    const visitorCountElement = document.getElementById('visitor-count');
    if (!visitorCountElement) return;
    
    // Get current count from localStorage or start at 0
    let currentCount = parseInt(localStorage.getItem('visitorCount')) || 0;
    
    // Increment the count
    currentCount++;
    
    // Save the new count to localStorage
    localStorage.setItem('visitorCount', currentCount.toString());
    
    // Update the display
    visitorCountElement.textContent = currentCount.toLocaleString();
}

// Initialize visitor counter when DOM is loaded
document.addEventListener('DOMContentLoaded', initVisitorCounter);

// Load Google Maps on demand
function loadMap() {
    const placeholder = document.querySelector('.map-placeholder');
    const iframe = document.getElementById('google-map-iframe');
    
    if (iframe.src === '') {
        iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.5!2d-121.9!3d37.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDE4JzAwLjAiTiAxMjHCsDU0JzAwLjAiVw!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus&q=Camden+Community+Center,+3369+Union+Ave,+San+Jose,+CA+95124';
    }
    
    placeholder.style.display = 'none';
    iframe.style.display = 'block';
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .nav-link.active {
        color: #1e40af;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .lightbox {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);
