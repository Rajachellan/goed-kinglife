/* ==========================================================================
   Elite Estate - Core Javascript & Bootstrapper
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Preloader Handler
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";
            }, 600); // Elegant luxury delay
        });
        
        // Fallback if load event doesn't fire fast
        setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
        }, 3000);
    }

    // 2. Load Modular Header & Footer
    loadHeaderAndFooter();

    // 3. Setup Scroll Progress Indicator
    setupScrollProgress();

    // 4. Setup Back to Top Button
    setupBackToTop();
});

/**
 * Loads header and footer HTML parts asynchronously
 * to promote reuse across all static pages.
 */
function loadHeaderAndFooter() {
    const headerPlaceholder = document.getElementById("header-placeholder");
    const footerPlaceholder = document.getElementById("footer-placeholder");

    // Load Header
    if (headerPlaceholder) {
        fetch("assets/compounent/header.html")
            .then(response => {
                if (!response.ok) throw new Error("Failed to load header template");
                return response.text();
            })
            .then(html => {
                headerPlaceholder.innerHTML = html;
                highlightActiveLink();
                if (typeof initNavbar === "function") {
                    initNavbar();
                }
            })
            .catch(err => console.error("Header injection error:", err));
    }

    // Load Footer
    if (footerPlaceholder) {
        fetch("assets/compounent/footer.html")
            .then(response => {
                if (!response.ok) throw new Error("Failed to load footer template");
                return response.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;
                setupFooterNewsletter();
            })
            .catch(err => console.error("Footer injection error:", err));
    }
}

/**
 * Adds styling classes to the navigation link
 * corresponding to the user's current page location.
 */
function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    // Find all links in the header navbar
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        
        // Match home page cases: empty, /, index.html
        if ((pageName === "" || pageName === "index.html") && (linkHref === "index.html" || linkHref === "./")) {
            link.classList.add("active", "text-brandRed");
        } else if (pageName && linkHref.includes(pageName)) {
            link.classList.add("active", "text-brandRed");
        } else {
            link.classList.remove("active", "text-brandRed");
        }
    });
}

/**
 * Tracks scrolling progress and updates top horizontal progress indicator.
 */
function setupScrollProgress() {
    const progressBar = document.getElementById("scroll-progress");
    if (!progressBar) return;

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + "%";
    });
}

/**
 * Manages visibility and click scroll behavior for the back-to-top button.
 */
function setupBackToTop() {
    const backBtn = document.getElementById("back-to-top");
    if (!backBtn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backBtn.classList.add("visible");
        } else {
            backBtn.classList.remove("visible");
        }
    });

    backBtn.addEventListener("click", () => {
        // If Lenis is active, let it handle the smooth scroll
        if (window.lenisInstance) {
            window.lenisInstance.scrollTo(0, { duration: 1.5 });
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    });
}

/**
 * Newsletter confirmation utility inside the injected footer
 */
function setupFooterNewsletter() {
    const form = document.querySelector("footer form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector("input[type='email']");
        if (input && input.value.trim() !== "") {
            alert(`Thank you for subscribing! Exquisite updates will be sent to ${input.value}.`);
            input.value = "";
        }
    });
}
