// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initVideoBackground();
    initCounters();
    initScrollAnimations();
    initSmoothScrolling();
    initLoadingScreen();
    initContactForm();
    initWowAnimations();
    initServicesHover();
    initProjectHover();
    initMobileMenu();
    initStatsAnimations();
    initServicesScrollAnimation(); // New function for services scroll animation
});

// Services Scroll Animation - Trigger on scroll
function initServicesScrollAnimation() {
    const servicesSection = document.querySelector('.services-section');
    const sectionHeader = servicesSection.querySelector('.section-header');
    const headerTitle = sectionHeader.querySelector('h5');
    const headerSubtitle = sectionHeader.querySelector('h2');
    const serviceItems = servicesSection.querySelectorAll('.service-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate header
                if (entry.target === sectionHeader) {
                    headerTitle.classList.add('animate-in');
                    headerSubtitle.classList.add('animate-in');
                }
                
                // Animate service items
                if (entry.target.classList.contains('service-item')) {
                    entry.target.classList.add('animate-in');
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe section header
    observer.observe(sectionHeader);
    
    // Observe each service item
    serviceItems.forEach(item => {
        observer.observe(item);
    });
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
}

// Video Background with Fallback
function initVideoBackground() {
    const video = document.getElementById('heroVideo');
    
    // Check if video can play
    video.addEventListener('error', function() {
        // If video fails to load, set background image
        document.querySelector('.video-background').style.backgroundImage = 'url("assets/fallback-bg.jpg")';
        video.style.display = 'none';
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
                const count = +counter.innerText;
                
                const inc = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(() => updateCounter(counter, target, speed), 1);
                } else {
                    counter.innerText = target;
                }
                
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

// WOW.js like animations
function initWowAnimations() {
    const wowElements = document.querySelectorAll('.wow');
    
    const wowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-wow-delay') || '0s';
                entry.target.style.animationDelay = delay;
                entry.target.style.visibility = 'visible';
                wowObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    wowElements.forEach(element => {
        wowObserver.observe(element);
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
            }
        });
    });
}

// Loading Screen
function initLoadingScreen() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    // loading.innerHTML = '<div class="spinner"></div>';
     loading.innerHTML = ' <img class="logo" src="./assets/logo.png" alt="">';
    document.body.appendChild(loading);
    
    // Hide loading screen when page is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.remove();
            }, 500);
        }, 1000);
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
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
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
            showNotification('Tracking feature will be implemented soon!', 'info');
        });
    }
}

// Services Hover Effects
function initServicesHover() {
    const serviceItems = document.querySelectorAll('.services-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Project Hover Effects
function initProjectHover() {
    const projectItems = document.querySelectorAll('.project-item');

    projectItems.forEach((item, index) => {
        // Add staggered animation on page load
        item.style.animation = `fadeIn 0.6s ease ${index * 0.2}s forwards`;
        item.style.opacity = '0';

        // Add hover sound effect (optional)
        item.addEventListener('mouseenter', function() {
            // Add any additional interaction logic here
            console.log('Project hovered:', this);
        });

        item.addEventListener('mouseleave', function() {
            // Reset any additional state
        });
    });
}

// Mobile menu enhancement
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Add mobile contact info
        const mobileContact = document.createElement('div');
        mobileContact.className = 'mobile-contact-info';
        mobileContact.innerHTML = `
            <div class="text-white">
                <p class="mb-1"><strong>Have any questions?</strong></p>
                <p class="mb-0">
                    Call: <a href="tel:+971562580737" class="phone-link">+971 56 258 0737</a><br>
                    <a href="tel:+971562735172" class="phone-link">+971 56 273 5172</a>
                </p>
            </div>
        `;
        
        navbarCollapse.appendChild(mobileContact);
        
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close mobile menu when clicking on links
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }
}

// Enhanced Stats Animation
function initStatsAnimations() {
    const statCards = document.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const animation = card.getAttribute('data-animation');
                const delay = card.getAttribute('data-delay') || '0s';
                
                // Apply delay
                card.style.animationDelay = delay;
                card.style.transitionDelay = delay;
                
                // Add animated class
                card.classList.add('animated');
                
                // Start counter animation
                const counter = card.querySelector('.counter');
                if (counter) {
                    startCounterAnimation(counter);
                }
                
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

// Enhanced Counter Animation
function startCounterAnimation(counter) {
    const target = parseFloat(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const steps = 40;
    const step = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            counter.textContent = target % 1 === 0 ? Math.floor(target) : target.toFixed(1);
            clearInterval(timer);
            
            // Add completion animation
            counter.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                counter.style.animation = '';
            }, 500);
        } else {
            counter.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
        }
    }, duration / steps);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.custom-alert').forEach(alert => alert.remove());
    
    const notification = document.createElement('div');
    notification.className = `custom-alert alert alert-${type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
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
const notificationStyles = `
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

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Performance optimization for mobile
if (window.innerWidth < 768) {
    // Reduce animation intensity on mobile
    document.documentElement.style.setProperty('--animation-duration', '0.5s');
}

// Handle resize events
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Reinitialize components on resize
        if (window.innerWidth < 768) {
            document.documentElement.style.setProperty('--animation-duration', '0.5s');
        } else {
            document.documentElement.style.setProperty('--animation-duration', '1s');
        }
    }, 250);
});

// Stats Card Click Animation
document.addEventListener('DOMContentLoaded', function() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
        
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});



// Scroll Animation
    const elements = document.querySelectorAll('.scroll-anim');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));

