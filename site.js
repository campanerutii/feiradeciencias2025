document.addEventListener('DOMContentLoaded', function() {

            // Sticky Header
            const header = document.getElementById('main-header');
            if (header) {
                const stickyOffset = header.offsetTop > 0 ? header.offsetTop : 60;
                window.addEventListener('scroll', function() { 
                    header.classList.toggle("scrolled", window.pageYOffset > stickyOffset); 
                }, { passive: true });
            } else { 
                console.warn("Header element not found."); 
            }

            // Mobile Nav Toggle
            const menuToggle = document.getElementById('mobile-menu-toggle');
            const mainNav = document.getElementById('main-navigation');
            if (menuToggle && mainNav) {
                menuToggle.addEventListener('click', () => {
                    const isExpanded = mainNav.classList.toggle('mobile-nav-active');
                    menuToggle.classList.toggle('active');
                    menuToggle.setAttribute('aria-expanded', isExpanded);
                });
                mainNav.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        if (mainNav.classList.contains('mobile-nav-active')) {
                            mainNav.classList.remove('mobile-nav-active');
                            menuToggle.classList.remove('active');
                            menuToggle.setAttribute('aria-expanded', 'false');
                        }
                    });
                });
            } else { 
                console.warn("Mobile menu elements not found."); 
            }

            // Testimonial Slider
            if (typeof Swiper !== 'undefined') {
                try {
                    new Swiper('.testimonial-slider', {
                        loop: true, 
                        autoplay: { delay: 5500, disableOnInteraction: true }, 
                        slidesPerView: 1, 
                        spaceBetween: 30, 
                        grabCursor: true,
                        pagination: { el: '.swiper-pagination', clickable: true }, 
                        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, 
                        watchSlidesProgress: true,
                    });
                } catch (e) { 
                    console.error("Swiper init failed:", e); 
                }
            } else { 
                console.warn("Swiper library not found."); 
            }

            // Footer Year
            const yearSpan = document.getElementById('current-year');
            if (yearSpan) { 
                yearSpan.textContent = new Date().getFullYear(); 
            }

            // Scroll Animations
            const animatedElements = document.querySelectorAll('.fade-in-hidden');
            if ("IntersectionObserver" in window) {
                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('fade-in-visible'); 
                            entry.target.classList.remove('fade-in-hidden'); 
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });
                animatedElements.forEach(el => { observer.observe(el); });
            } else { 
                animatedElements.forEach(el => { 
                    el.classList.remove('fade-in-hidden'); 
                    el.classList.add('fade-in-visible'); 
                }); 
            }

            // Lightbox
            const lightboxModal = document.getElementById('lightbox-modal');
            const lightboxImage = document.getElementById('lightbox-image');
            const closeButton = document.querySelector('.lightbox-close');
            const galleryImages = document.querySelectorAll('.gallery-item img');
            
            if (lightboxModal && lightboxImage && closeButton && galleryImages.length > 0) {
                const openLightbox = (imgSrc, imgAlt) => { 
                    lightboxImage.src = imgSrc; 
                    lightboxImage.alt = imgAlt; 
                    lightboxModal.classList.add('active'); 
                    document.body.classList.add('lightbox-open'); 
                };
                
                const closeLightbox = () => { 
                    lightboxModal.classList.remove('active'); 
                    document.body.classList.remove('lightbox-open'); 
                    setTimeout(() => { 
                        lightboxImage.src = ""; 
                        lightboxImage.alt = ""; 
                    }, 400); 
                };
                
                galleryImages.forEach(image => { 
                    image.addEventListener('click', (e) => { 
                        e.preventDefault(); 
                        openLightbox(image.src, image.alt); 
                    }); 
                });
                
                closeButton.addEventListener('click', closeLightbox);
                
                lightboxModal.addEventListener('click', (e) => { 
                    if (e.target === lightboxModal) { 
                        closeLightbox(); 
                    } 
                });
                
                document.addEventListener('keydown', (e) => { 
                    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) { 
                        closeLightbox(); 
                    } 
                });
            } else { 
                console.warn("Lightbox elements not found."); 
            }

        });