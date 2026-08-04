/* ==========================================================================
   Elite Estate - Animations Engine
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lenis Smooth Scroll
    initSmoothScroll();

    // 2. Initialize AOS (Animate On Scroll)
    initAOS();

    // 3. Initialize GSAP Custom ScrollAnimations
    initGSAPAnimations();
});

/**
 * Sets up Lenis smooth scrolling and integrates it
 * directly with GSAP's ScrollTrigger mechanism.
 */
function initSmoothScroll() {
    if (typeof Lenis === "undefined") return;

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom premium bezier
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    window.lenisInstance = lenis;

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Keep GSAP ScrollTrigger updated with Lenis
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        lenis.on('scroll', ScrollTrigger.update);
    }
}

/**
 * Initializes light, elegant AOS reveal animations.
 */
function initAOS() {
    if (typeof AOS === "undefined") return;

    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
    });
}

/**
 * Configures all high-end GSAP ScrollTrigger animations,
 * including parallax shifts, numeric counters, text typing,
 * and elegant slide reveals.
 */
function initGSAPAnimations() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    // Register ScrollTrigger Plugin
    gsap.registerPlugin(ScrollTrigger);

    // A. Hero Parallax Effect
    const heroBg = document.querySelector(".hero-parallax-bg");
    if (heroBg) {
        gsap.to(heroBg, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // B. Stats Counter Animation
    const counters = document.querySelectorAll(".counter-val");
    if (counters.length > 0) {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target"), 10);
            if (isNaN(target)) return;

            gsap.fromTo(counter, 
                { textContent: 0 }, 
                {
                    textContent: target,
                    duration: 2.2,
                    ease: "power3.out",
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    },
                    onUpdate: function() {
                        const val = Math.ceil(this.targets()[0].textContent);
                        const suffix = counter.getAttribute("data-suffix") || "";
                        counter.innerHTML = val + suffix + "+";
                    }
                }
            );
        });
    }

    // C. Luxury Floating Elements Parallax (Micro-interaction)
    const floaters = document.querySelectorAll(".luxury-float-ui");
    if (floaters.length > 0) {
        floaters.forEach((floater, index) => {
            const depth = (index + 1) * 15;
            gsap.to(floater, {
                y: -depth,
                ease: "none",
                scrollTrigger: {
                    trigger: floater.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }

    // D. Image Luxury Sweep Reveal Effect
    const revealWraps = document.querySelectorAll(".reveal-image-wrap");
    if (revealWraps.length > 0) {
        revealWraps.forEach(wrap => {
            const block = wrap.querySelector(".reveal-block");
            const img = wrap.querySelector("img");
            
            if (block && img) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: wrap,
                        start: "top 80%",
                    }
                });

                tl.to(block, {
                    xPercent: 101,
                    duration: 1.4,
                    ease: "power4.inOut"
                })
                .from(img, {
                    scale: 1.25,
                    duration: 1.4,
                    ease: "power4.out"
                }, "<");
            }
        });
    }

    // E. Client Journey Step Scroll Glow Effect
    const journeyTriggers = document.querySelectorAll(".journey-step-trigger");
    if (journeyTriggers.length > 0) {
        journeyTriggers.forEach(trigger => {
            const card = trigger.querySelector(".journey-card");
            const dot = trigger.querySelector(".timeline-dot");
            
            ScrollTrigger.create({
                trigger: trigger,
                start: "top 75%",
                end: "bottom 25%",
                onEnter: () => {
                    if (card) card.classList.add("journey-card-active");
                    if (dot) {
                        dot.classList.add("timeline-dot-scroll-active");
                        dot.classList.remove("bg-luxuryBorder");
                    }
                },
                onLeave: () => {
                    if (card) card.classList.remove("journey-card-active");
                    if (dot) {
                        dot.classList.remove("timeline-dot-scroll-active");
                        dot.classList.add("bg-luxuryBorder");
                    }
                },
                onEnterBack: () => {
                    if (card) card.classList.add("journey-card-active");
                    if (dot) {
                        dot.classList.add("timeline-dot-scroll-active");
                        dot.classList.remove("bg-luxuryBorder");
                    }
                },
                onLeaveBack: () => {
                    if (card) card.classList.remove("journey-card-active");
                    if (dot) {
                        dot.classList.remove("timeline-dot-scroll-active");
                        dot.classList.add("bg-luxuryBorder");
                    }
                }
            });
        });
    }

    // D. Featured Listings Slider
    const slider = document.getElementById("property-slider");
    const prevBtn = document.getElementById("slider-prev");
    const nextBtn = document.getElementById("slider-next");

    if (slider && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const firstCard = slider.querySelector(".flex-shrink-0");
            if (firstCard) {
                return firstCard.offsetWidth + 32; // card width + 32px gap
            }
            return slider.clientWidth;
        };

        const scrollSlider = (direction) => {
            const amount = getScrollAmount();
            if (direction === "next") {
                const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
                if (slider.scrollLeft >= maxScrollLeft - 15) {
                    slider.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    slider.scrollBy({ left: amount, behavior: "smooth" });
                }
            } else {
                if (slider.scrollLeft <= 15) {
                    slider.scrollTo({ left: slider.scrollWidth, behavior: "smooth" });
                } else {
                    slider.scrollBy({ left: -amount, behavior: "smooth" });
                }
            }
        };

        nextBtn.addEventListener("click", () => {
            scrollSlider("next");
            resetAutoPlay();
        });

        prevBtn.addEventListener("click", () => {
            scrollSlider("prev");
            resetAutoPlay();
        });

        let autoPlayInterval = setInterval(() => {
            scrollSlider("next");
        }, 4000);

        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                scrollSlider("next");
            }, 4000);
        };

        slider.addEventListener("mouseenter", () => {
            clearInterval(autoPlayInterval);
        });

        slider.addEventListener("mouseleave", () => {
            resetAutoPlay();
        });
    }
}
