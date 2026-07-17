document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const mainMenu = document.getElementById("mainMenu");

    const updateHeader = () => {
        header?.classList.toggle("scrolled", window.scrollY > 12);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    if (menuToggle && mainMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = mainMenu.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Menü bezárása" : "Menü megnyitása");
        });

        mainMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mainMenu.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    const slides = [...document.querySelectorAll(".hero-slide")];
    const dots = [...document.querySelectorAll(".slider-dots button")];

    if (!slides.length || !dots.length) {
        return;
    }

    let currentSlide = 0;
    let sliderTimer;

    const showSlide = (index) => {
        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle("active", slideIndex === currentSlide);
        });

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle("active", dotIndex === currentSlide);
        });
    };

    const startSlider = () => {
        window.clearInterval(sliderTimer);
        sliderTimer = window.setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    };

    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            showSlide(Number(dot.dataset.slide));
            startSlider();
        });
    });

    startSlider();
});
