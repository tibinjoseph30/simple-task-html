document.addEventListener("DOMContentLoaded", function () {
    // Select elements
    const header = document.querySelector("header");
    const scrollLinks = document.querySelectorAll("nav .navbar-menu .nav-link");
    const sections = document.querySelectorAll("section");
    const sideMenuBtn = document.querySelector(".side-menu-btn");
    const sideMenuBtnClose = document.querySelector(".side-menu-close-btn");
    const sidemenu = document.querySelector("nav .navbar-content");
    const body = document.body;

    // Sticky Header on Scroll
    function handleScroll() {
        if (window.scrollY > 0) {
            header?.classList.add("header-sticky");
        } else {
            header?.classList.remove("header-sticky");
        }
    }

    // Smooth Scroll and Active Link
    function handleNavClick(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: "smooth",
            });

            sidemenu?.classList.remove("menu-active");
            body?.classList.remove("overflow-hidden");

            scrollLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");
        }
    }

    // Highlight Active Section on Scroll
    function highlightActiveSection() {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = `#${section.id}`;
            }
        });

        scrollLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === current) {
                link.classList.add("active");
            }
        });

        requestAnimationFrame(highlightActiveSection);
    }

    // Side Menu Toggle
    function toggleSideMenu(state) {
        if (state) {
            sidemenu?.classList.add("menu-active");
            body?.classList.add("overflow-hidden");
        } else {
            sidemenu?.classList.remove("menu-active");
            body?.classList.remove("overflow-hidden");
        }
    }

    // Attach Event Listeners
    window.addEventListener("scroll", handleScroll);
    scrollLinks.forEach(link => link.addEventListener("click", handleNavClick));
    sideMenuBtn?.addEventListener("click", () => toggleSideMenu(true));
    sideMenuBtnClose?.addEventListener("click", () => toggleSideMenu(false));

    // Start tracking active section on scroll
    highlightActiveSection();
});
