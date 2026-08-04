/* ==========================================================================
   Elite Estate - Swiper.js Slider Controllers
   ========================================================================== */

/**
 * Initializes Swiper carousels across the project,
 * safeguarding against non-existent containers on specific pages.
 */
function initSliders() {
    // 1. Featured Properties Slider
    const propertiesContainer = document.querySelector(".properties-swiper");
    if (propertiesContainer) {
        new Swiper(".properties-swiper", {
            slidesPerView: 1,
            spaceBetween: 24, // 24px spacing (3 * 8px system)
            loop: true,
            speed: 800,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".properties-pagination",
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: ".properties-next",
                prevEl: ".properties-prev",
            },
            breakpoints: {
                640: {
                    slidesPerView: 1.5,
                    spaceBetween: 24,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 32,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                }
            }
        });
    }

    // 2. Testimonials Slider
    const testimonialsContainer = document.querySelector(".testimonials-swiper");
    if (testimonialsContainer) {
        new Swiper(".testimonials-swiper", {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".testimonials-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".testimonials-next",
                prevEl: ".testimonials-prev",
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 32,
                }
            }
        });
    }
}

// Automatically check and run slider initializations
document.addEventListener("DOMContentLoaded", () => {
    // If Swiper library is loaded, proceed to initialize.
    if (typeof Swiper !== "undefined") {
        initSliders();
    } else {
        // Wait briefly for third-party scripts to mount
        setTimeout(() => {
            if (typeof Swiper !== "undefined") initSliders();
        }, 500);
    }
});
