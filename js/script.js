// Main JavaScript File - FIXED VERSION
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoadingScreen();
    initNavigation();
    initMobileMenu();
    initVideoBackground();
    initCounters();
    initScrollAnimations();
    initSmoothScrolling();
    initContactForm();
    initServicesHover();
    initStatsAnimations();
    initProjectsAnimation();
    initServicesScrollAnimation();
});

// ===== LOADING SCREEN - NEW =====
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after fade out
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 500); // Show for at least 1 second
    });
    
    // Fallback: Hide after 3 seconds even if not fully loaded
    setTimeout(() => {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.remove();
                }
            }, 500);
        }
    }, 3000);
}

// ===== MOBILE MENU FIX - COMPLETE SOLUTION =====
function initMobileMenu() {
    const navbarToggler = document.getElementById('navbarToggler');
    const navbarCollapse = document.getElementById('navbarNav');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    if (navbarToggler && navbarCollapse) {
        // Toggle menu on button click
        navbarToggler.addEventListener('click', function(e) {
            e.stopPropagation();
            navbarCollapse.classList.toggle('show');
        });
        
        // Close menu when clicking on any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const isClickInsideNav = navbarCollapse.contains(e.target);
            const isClickOnToggler = navbarToggler.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnToggler && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
        
        // Add mobile contact info
        const mobileContact = document.createElement('div');
        mobileContact.className = 'mobile-contact-info d-lg-none';
        mobileContact.innerHTML = `
            <div class="text-center py-3">
                <p class="mb-1"><strong>Have any questions?</strong></p>
                <p class="mb-0">
                    Call: <a href="tel:+971562580737" class="phone-link">+971 56 258 0737</a><br>
                    <a href="tel:+971562735172" class="phone-link">+971 56 273 5172</a>
                </p>
            </div>
        `;
        
        navbarCollapse.appendChild(mobileContact);
    }
}

// Navigation Scroll Effect
function initNavigation() {
    const navbar = document.querySelector('.custom-navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', function() {
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
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Video Background with Fallback
function initVideoBackground() {
    const video = document.getElementById('heroVideo');
    
    if (!video) return;
    
    // Check if video can play
    video.addEventListener('error', function() {
        // If video fails to load, set background image
        const videoBackground = document.querySelector('.video-background');
        if (videoBackground) {
            videoBackground.style.backgroundImage = 'url("assets/fallback-bg.jpg")';
            videoBackground.style.backgroundSize = 'cover';
            videoBackground.style.backgroundPosition = 'center';
            video.style.display = 'none';
        }
    });
    
    // Play video when user interacts (for autoplay restrictions)
    document.addEventListener('click', function() {
        if (video.paused) {
            video.play().catch(e => console.log('Video play failed:', e));
        }
    }, { once: true });
    
    // Mobile video optimization
    if (window.innerWidth < 768) {
        video.setAttribute('muted', 'true');
        video.setAttribute('playsinline', 'true');
    }
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                
                updateCounter(counter, target, speed);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function updateCounter(counter, target, speed) {
    const count = +counter.innerText;
    const inc = target / speed;
    
    if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(() => updateCounter(counter, target, speed), 1);
    } else {
        counter.innerText = target;
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animation]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.getAttribute('data-animation');
                entry.target.classList.add('animate__animated', `animate__${animation}`);
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Projects Animation
function initProjectsAnimation() {
    const projectItems = document.querySelectorAll('.project-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    projectItems.forEach(item => {
        observer.observe(item);
    });
}

// ===== SERVICES SCROLL ANIMATION - LEFT SIDE FADE IN =====
function initServicesScrollAnimation() {
    const servicesSection = document.querySelector('.services-section');
    if (!servicesSection) return;
    
    const sectionHeader = servicesSection.querySelector('.section-header');
    const headerTitle = sectionHeader.querySelector('h5');
    const headerSubtitle = sectionHeader.querySelector('h2');
    const serviceItems = servicesSection.querySelectorAll('.service-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Animate header
                if (entry.target === sectionHeader) {
                    setTimeout(() => {
                        headerTitle.classList.add('animate-in');
                    }, 100);
                    setTimeout(() => {
                        headerSubtitle.classList.add('animate-in');
                    }, 100);
                }
                
                // Animate service items with stagger
                if (entry.target.classList.contains('service-item')) {
                    const items = Array.from(serviceItems);
                    const itemIndex = items.indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, itemIndex * 150);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe section header
    if (sectionHeader) {
        observer.observe(sectionHeader);
    }
    
    // Observe each service item
    serviceItems.forEach(item => {
        observer.observe(item);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.custom-navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
}

// Contact Form Handler
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const inputs = this.querySelectorAll('input, textarea');
            
            // Simple validation
            let isValid = true;
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                showNotification('Please fill in all required fields.', 'warning');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }
    
    // Tracking form
    const trackingForm = document.querySelector('.tracking-form');
    if (trackingForm) {
        trackingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            if (input && input.value.trim()) {
                showNotification('Tracking feature will be implemented soon!', 'info');
            } else {
                showNotification('Please enter a tracking number.', 'warning');
            }
        });
    }
}

// Services Hover Effects
function initServicesHover() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('.service-img img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('.service-img img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
}

// Enhanced Stats Animation
function initStatsAnimations() {
    const statCards = document.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                
                // Add animated class
                card.classList.add('animated');
                
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    statCards.forEach(card => {
        observer.observe(card);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.custom-alert').forEach(alert => alert.remove());
    
    const notification = document.createElement('div');
    notification.className = `custom-alert alert alert-${type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    // Icon based on type
    let icon = '';
    switch(type) {
        case 'success':
            icon = '<i class="fas fa-check-circle me-2"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle me-2"></i>';
            break;
        case 'info':
            icon = '<i class="fas fa-info-circle me-2"></i>';
            break;
        case 'danger':
            icon = '<i class="fas fa-times-circle me-2"></i>';
            break;
    }
    
    notification.innerHTML = `
        ${icon}${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.custom-alert {
    border-radius: 10px;
    font-weight: 500;
}
`;
document.head.appendChild(notificationStyles);

// Performance optimization for mobile
if (window.innerWidth < 768) {
    document.documentElement.style.setProperty('--animation-duration', '0.5s');
}

// Handle resize events
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (window.innerWidth < 768) {
            document.documentElement.style.setProperty('--animation-duration', '0.5s');
        } else {
            document.documentElement.style.setProperty('--animation-duration', '1s');
        }
    }, 250);
});

// Prevent menu from staying open on window resize
window.addEventListener('resize', function() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (window.innerWidth >= 992 && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
    }
});