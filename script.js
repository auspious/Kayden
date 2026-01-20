// ============================================
// KAYDEN CLINIC - INTERACTIVE FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        const mobileNavLinks = mobileNav.querySelectorAll('.nav-link-mobile');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
    }

    // ============================================
    // STICKY HEADER SHADOW ON SCROLL
    // ============================================
    const header = document.getElementById('header');

    function handleScroll() {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only handle internal anchors
            if (href !== '#' && href.startsWith('#')) {
                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();

                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optionally unobserve after animation to improve performance
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 100}ms`;
        observer.observe(card);
    });

    // Observe contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 150}ms`;
        observer.observe(item);
    });

    // ============================================
    // WHATSAPP BUTTON PULSE ANIMATION ON LOAD
    // ============================================
    const whatsappBtn = document.querySelector('.whatsapp-float');

    if (whatsappBtn) {
        // Add entrance animation
        setTimeout(() => {
            whatsappBtn.style.opacity = '0';
            whatsappBtn.style.transform = 'scale(0)';
            whatsappBtn.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

            setTimeout(() => {
                whatsappBtn.style.opacity = '1';
                whatsappBtn.style.transform = 'scale(1)';
            }, 100);
        }, 1000);

        // Periodic pulse to draw attention
        setInterval(() => {
            whatsappBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                whatsappBtn.style.transform = 'scale(1)';
            }, 200);
        }, 5000);
    }

    // ============================================
    // EMERGENCY BADGE ANIMATION
    // ============================================
    const heroBadge = document.querySelector('.hero-badge');

    if (heroBadge) {
        // Add fade-in animation
        heroBadge.style.opacity = '0';
        heroBadge.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            heroBadge.style.transition = 'all 0.6s ease-out';
            heroBadge.style.opacity = '1';
            heroBadge.style.transform = 'translateY(0)';
        }, 300);
    }

    // ============================================
    // HERO CONTENT STAGGERED ANIMATION
    // ============================================
    const heroHeadline = document.querySelector('.hero-headline');
    const heroSubheadline = document.querySelector('.hero-subheadline');
    const heroActions = document.querySelector('.hero-actions');
    const heroImage = document.querySelector('.hero-image');

    const animateElements = [
        { element: heroHeadline, delay: 400 },
        { element: heroSubheadline, delay: 600 },
        { element: heroActions, delay: 800 },
        { element: heroImage, delay: 1000 }
    ];

    animateElements.forEach(({ element, delay }) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';

            setTimeout(() => {
                element.style.transition = 'all 0.6s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay);
        }
    });

    // ============================================
    // PHONE NUMBER CLICK TRACKING (Analytics Ready)
    // ============================================
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

    phoneLinks.forEach(link => {
        link.addEventListener('click', function () {
            console.log('Phone call initiated: ' + this.href);
            // You can add your analytics tracking here
            // Example: gtag('event', 'click', { 'event_category': 'call', 'event_label': 'emergency' });
        });
    });

    // ============================================
    // WHATSAPP LINK CLICK TRACKING (Analytics Ready)
    // ============================================
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function () {
            console.log('WhatsApp chat initiated');
            // You can add your analytics tracking here
            // Example: gtag('event', 'click', { 'event_category': 'whatsapp', 'event_label': 'floating_button' });
        });
    }

    // ============================================
    // PERFORMANCE OPTIMIZATION - LAZY LOAD IFRAME
    // ============================================
    const mapIframe = document.querySelector('.map-container iframe');

    if (mapIframe) {
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Iframe is already loaded with src, but you can add loading state here
                    console.log('Map loaded');
                    mapObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        mapObserver.observe(mapIframe);
    }

    // ============================================
    // ACCESSIBILITY - KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', function (e) {
        // Allow ESC key to close mobile menu
        if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });



    // ============================================
    // SLIDESHOW FUNCTIONALITY
    // ============================================
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slideshow-slide');
    const dots = document.querySelectorAll('.slideshow-dot');
    let slideshowInterval;

    // Show specific slide
    function showSlide(index) {
        // Wrap around if index is out of bounds
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Change slide (for arrow buttons)
    window.changeSlide = function (direction) {
        showSlide(currentSlide + direction);
        resetSlideshowInterval();
    };

    // Go to specific slide (for dots)
    window.goToSlide = function (index) {
        showSlide(index);
        resetSlideshowInterval();
    };

    // Auto advance slideshow
    function startSlideshow() {
        slideshowInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000); // Change slide every 5 seconds
    }

    // Reset interval when user interacts
    function resetSlideshowInterval() {
        clearInterval(slideshowInterval);
        startSlideshow();
    }

    // Start the slideshow if slides exist
    if (slides.length > 0) {
        startSlideshow();

        // Pause slideshow on hover
        const slideshowWrapper = document.querySelector('.slideshow-wrapper');
        if (slideshowWrapper) {
            slideshowWrapper.addEventListener('mouseenter', () => {
                clearInterval(slideshowInterval);
            });

            slideshowWrapper.addEventListener('mouseleave', () => {
                startSlideshow();
            });
        }
    }





    console.log('🏥 Kayden Clinic - Website Loaded Successfully');
});

// ============================================
// CONTACT FORM EMAIL HANDLER
// ============================================
function sendEmail(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const subject = encodeURIComponent(`Contact Form: Message from ${name}`);
    const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n\n` +
        `Message:\n${message}\n\n` +
        `---\n` +
        `Sent from Kayden Medical Centre website contact form`
    );

    const mailtoLink = `mailto:auspicioussagacity@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    // Reset form after a short delay
    setTimeout(() => {
        document.getElementById('contactForm').reset();
    }, 500);

    return false;
}
