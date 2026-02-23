// ============================================
// KAYDEN CLINIC - INTERACTIVE FUNCTIONALITY
// Optimized for Performance & UX
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // PAGE LOADER - Smooth Entry
    // ============================================
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        // Hide loader once everything is ready
        window.addEventListener('load', function () {
            setTimeout(() => {
                pageLoader.classList.add('hidden');
                // Remove loader from DOM after transition
                setTimeout(() => {
                    pageLoader.remove();
                }, 500);
            }, 400);
        });

        // Fallback: force-hide if load event already fired
        if (document.readyState === 'complete') {
            setTimeout(() => {
                pageLoader.classList.add('hidden');
                setTimeout(() => pageLoader.remove(), 500);
            }, 300);
        }
    }

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function () {
            const isActive = this.classList.toggle('active');
            mobileNav.classList.toggle('active');

            // Update ARIA state
            this.setAttribute('aria-expanded', isActive.toString());

            // Prevent body scroll when menu is open
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close mobile menu when a link is clicked
        const mobileNavLinks = mobileNav.querySelectorAll('.nav-link-mobile');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // STICKY HEADER SHADOW ON SCROLL
    // ============================================
    const header = document.getElementById('header');
    let lastScrollY = 0;
    let ticking = false;

    function handleScroll() {
        lastScrollY = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (lastScrollY > 20) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href !== '#' && href.startsWith('#')) {
                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();

                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL hash without scrolling
                    history.pushState(null, '', href);
                }
            }
        });
    });

    // ============================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ============================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Unobserve for performance
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
            item.style.transitionDelay = `${index * 120}ms`;
            observer.observe(item);
        });

        // Observe contact cards
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach((card, index) => {
            card.classList.add('reveal');
            card.style.transitionDelay = `${index * 100}ms`;
            observer.observe(card);
        });

        // Observe contact form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.classList.add('reveal');
            observer.observe(contactForm);
        }

        // Observe gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.classList.add('reveal');
            item.style.transitionDelay = `${index * 80}ms`;
            observer.observe(item);
        });

        // Observe value cards (Why Choose Us)
        const valueCards = document.querySelectorAll('.value-card');
        valueCards.forEach((card, index) => {
            card.classList.add('reveal');
            card.style.transitionDelay = `${index * 120}ms`;
            observer.observe(card);
        });

        // Observe community tags
        const communityTags = document.querySelectorAll('.community-tag');
        communityTags.forEach((tag, index) => {
            tag.classList.add('reveal');
            tag.style.transitionDelay = `${index * 100}ms`;
            observer.observe(tag);
        });

        // Observe stat items
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
            item.classList.add('reveal');
            item.style.transitionDelay = `${index * 150}ms`;
            observer.observe(item);
        });

        // Observe story section
        const storyContent = document.querySelector('.story-content');
        if (storyContent) {
            storyContent.classList.add('reveal');
            observer.observe(storyContent);
        }

        const leaderCard = document.querySelector('.leader-card');
        if (leaderCard) {
            leaderCard.classList.add('reveal');
            leaderCard.style.transitionDelay = '200ms';
            observer.observe(leaderCard);
        }
    }

    // ============================================
    // WHATSAPP BUTTON - SMOOTH ENTRANCE
    // ============================================
    const whatsappBtn = document.getElementById('whatsappFloat');

    if (whatsappBtn) {
        // Delayed entrance for better UX
        setTimeout(() => {
            whatsappBtn.classList.add('visible');
        }, 2000);

        // Subtle periodic attention pulse (respects reduced motion)
        if (!prefersReducedMotion) {
            setInterval(() => {
                whatsappBtn.style.transition = 'transform 0.3s ease';
                whatsappBtn.style.transform = 'scale(1.08)';
                setTimeout(() => {
                    whatsappBtn.style.transform = 'scale(1)';
                }, 300);
            }, 8000);
        }
    }

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        // Show/hide based on scroll position
        function updateBackToTop() {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', updateBackToTop, { passive: true });

        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // HERO CONTENT STAGGERED ANIMATION
    // ============================================
    if (!prefersReducedMotion) {
        const heroHeadline = document.querySelector('.hero-headline');
        const heroSubheadline = document.querySelector('.hero-subheadline');
        const heroActions = document.querySelector('.hero-actions');
        const heroImage = document.querySelector('.hero-image');
        const heroBadge = document.querySelector('.hero-badge');

        const animateElements = [
            { element: heroBadge, delay: 200 },
            { element: heroHeadline, delay: 400 },
            { element: heroSubheadline, delay: 600 },
            { element: heroActions, delay: 800 },
            { element: heroImage, delay: 1000 }
        ];

        animateElements.forEach(({ element, delay }) => {
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(25px)';

                setTimeout(() => {
                    element.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }

    // ============================================
    // SLIDESHOW FUNCTIONALITY
    // ============================================
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slideshow-slide');
    const dots = document.querySelectorAll('.slideshow-dot');
    let slideshowInterval;

    function showSlide(index) {
        if (slides.length === 0) return;

        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slides.forEach(slide => slide.classList.remove('active'));
        if (dots.length > 0) {
            dots.forEach(dot => dot.classList.remove('active'));
        }

        slides[currentSlide].classList.add('active');
        if (dots.length > 0 && dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }

    window.changeSlide = function (direction) {
        showSlide(currentSlide + direction);
        resetSlideshowInterval();
    };

    window.goToSlide = function (index) {
        showSlide(index);
        resetSlideshowInterval();
    };

    function startSlideshow() {
        if (slides.length <= 1) return;
        slideshowInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 6000);
    }

    function resetSlideshowInterval() {
        clearInterval(slideshowInterval);
        startSlideshow();
    }

    if (slides.length > 1) {
        startSlideshow();

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

    // ============================================
    // PHONE NUMBER CLICK TRACKING (Analytics Ready)
    // ============================================
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

    phoneLinks.forEach(link => {
        link.addEventListener('click', function () {
            console.log('📞 Phone call initiated: ' + this.href);
            // Analytics: gtag('event', 'click', { 'event_category': 'call', 'event_label': 'emergency' });
        });
    });

    // ============================================
    // WHATSAPP LINK CLICK TRACKING
    // ============================================
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function () {
            console.log('💬 WhatsApp chat initiated');
            // Analytics: gtag('event', 'click', { 'event_category': 'whatsapp', 'event_label': 'chat' });
        });
    });

    // ============================================
    // ACCESSIBILITY - KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            mobileMenuBtn.focus();
        }
    });

    // ============================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length > 0 && navLinks.length > 0) {
        function highlightNav() {
            const scrollPos = window.scrollY + header.offsetHeight + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('nav-active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('nav-active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', highlightNav, { passive: true });
    }

    // ============================================
    // PERFORMANCE - LAZY LOAD IFRAME
    // ============================================
    const mapIframe = document.querySelector('.map-container iframe');

    if (mapIframe) {
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('🗺️ Map section visible');
                    mapObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        mapObserver.observe(mapIframe);
    }

    console.log('🏥 Kayden Clinic - Website Loaded Successfully');
});

// ============================================
// CONTACT FORM EMAIL HANDLER
// ============================================
function sendEmail(event) {
    event.preventDefault();

    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const formContainer = document.getElementById('contactFormContainer');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
        return false;
    }

    // Visual feedback - disable button
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Opening Email Client...';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;

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

    // Show success message after a short delay
    setTimeout(() => {
        // Replace form with success message
        const formHTML = formContainer.innerHTML;
        formContainer.innerHTML = `
            <div class="form-success">
                <div class="form-success-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h4>Message Ready!</h4>
                <p>Your email client should open shortly. If it doesn't, please call us directly at <a href="tel:+263712469830" style="color: var(--color-primary); font-weight: 600;">+263 71 246 9830</a></p>
            </div>
        `;

        // Restore form after 6 seconds
        setTimeout(() => {
            formContainer.innerHTML = formHTML;
            // Re-bind the form
            const newForm = document.getElementById('contactForm');
            if (newForm) {
                newForm.reset();
            }
        }, 6000);
    }, 800);

    return false;
}
