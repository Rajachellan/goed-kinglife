/* ==========================================================================
   Elite Estate - Navigation Drawer & Sticky Header controller
   ========================================================================== */

/**
 * Initializes navbar behaviors once the dynamically fetched header HTML
 * is injected into the DOM.
 */
function initNavbar() {
    const header = document.getElementById("main-header");
    const hamburger = document.getElementById("mobile-menu-btn");
    const drawer = document.getElementById("mobile-nav-drawer");
    const closeDrawerBtn = document.getElementById("close-drawer-btn");
    const drawerOverlay = document.getElementById("drawer-overlay");
    const drawerLinks = document.querySelectorAll("#mobile-nav-drawer a");

    // 1. Sticky Glass header transform on scroll
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add("glass-luxury", "shadow-lg");
            header.classList.remove("bg-transparent", "border-transparent");
            header.classList.add("border-b", "border-luxuryBorder/30");
        } else {
            header.classList.remove("glass-luxury", "shadow-lg");
            header.classList.add("bg-transparent", "border-transparent");
            header.classList.remove("border-b", "border-luxuryBorder/30");
        }
    };

    // Run initial scroll check
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    // 2. Mobile Drawer open & close functionality
    const openDrawer = () => {
        drawer.classList.remove("translate-x-full");
        drawerOverlay.classList.remove("opacity-0", "pointer-events-none");
        drawerOverlay.classList.add("opacity-100", "pointer-events-auto");
        document.body.classList.add("overflow-hidden");
    };

    const closeDrawer = () => {
        drawer.classList.add("translate-x-full");
        drawerOverlay.classList.remove("opacity-100", "pointer-events-auto");
        drawerOverlay.classList.add("opacity-0", "pointer-events-none");
        document.body.classList.remove("overflow-hidden");
    };

    if (hamburger) {
        hamburger.addEventListener("click", openDrawer);
    }

    if (closeDrawerBtn) {
        closeDrawerBtn.addEventListener("click", closeDrawer);
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener("click", closeDrawer);
    }

    // Close mobile drawer when link is clicked
    drawerLinks.forEach(link => {
        link.addEventListener("click", closeDrawer);
    });
}
