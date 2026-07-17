document.addEventListener("DOMContentLoaded", () => {
    const galleryImageNames = [
        "IMG_2831",
        "IMG_7593",
        "IMG_3030",
        "IMG_0363",
        "IMG_9556",
        "IMG_0709",
        "IMG_0356",
        "IMG_0691",
        "IMG_3026",
        "IMG_3679",
        "IMG_3020",
        "IMG_3031",
        "IMG_3021",
        "IMG_1418",
        "IMG_0708",
        "IMG_3530",
        "IMG_1420",
        "IMG_0695",
        "IMG_1413",
        "IMG_0702",
        "IMG_0364",
        "IMG_9637",
        "IMG_3653",
        "IMG_1440",
        "IMG_2495",
        "IMG_2925",
        "IMG_0324",
        "IMG_0357",
        "IMG_0360",
        "IMG_1454",
        "IMG_0337",
        "IMG_3018",
        "IMG_0345",
        "IMG_2319",
        "IMG_3025",
        "IMG_2464",
        "IMG_3678",
        "IMG_3275",
        "IMG_0724",
        "IMG_9546",
        "IMG_0355",
        "IMG_3762",
        "IMG_0715",
        "IMG_9538",
        "IMG_4152",
        "IMG_0729",
        "IMG_1452",
        "IMG_2916",
        "IMG_0726",
        "IMG_0351",
        "IMG_0365",
        "IMG_7587",
        "IMG_0693",
        "IMG_1444",
        "IMG_0325",
        "IMG_0687",
        "IMG_2330",
        "IMG_0369",
        "IMG_9673",
        "IMG_3015",
        "IMG_2318",
        "IMG_0696",
        "IMG_2320",
        "IMG_3644",
        "IMG_0684",
        "IMG_0349",
        "IMG_2476",
        "IMG_0327",
        "IMG_3522",
        "IMG_3022",
        "IMG_2329",
        "IMG_0323",
        "IMG_3521",
        "IMG_5085",
        "IMG_0329",
        "IMG_0714",
        "IMG_0701",
        "IMG_0722",
        "IMG_3544",
        "IMG_3761",
        "IMG_0326",
        "IMG_3674",
        "IMG_3529",
        "IMG_3019",
        "IMG_3658",
        "IMG_1455",
        "IMG_0371",
        "IMG_1411",
        "IMG_1422",
        "IMG_1441",
        "IMG_0321",
        "IMG_1448",
        "IMG_2326",
        "IMG_2335",
        "IMG_3676",
        "IMG_3032",
        "IMG_0699",
        "IMG_3523",
        "IMG_2332",
        "IMG_1428",
        "IMG_0328",
    ];
    const galleryItems = galleryImageNames.map((imageName, index) => ({
        thumbnail: `images/gallery/thumbs/${imageName}.jpg`,
        fullSize: `images/gallery/full/${imageName}.jpg`,
        alt: `TimTim Ceramic kézzel készített kerámia – ${index + 1}. kép`
    }));

    const galleryGrid = document.getElementById("galleryGrid");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeButton = document.getElementById("lightboxClose");
    const previousButton = document.getElementById("lightboxPrev");
    const nextButton = document.getElementById("lightboxNext");

    if (!galleryGrid || !lightbox || !lightboxImage) {
        return;
    }

    let currentIndex = 0;
    let touchStartX = 0;
    let lastFocusedItem = null;

    galleryItems.forEach((item, index) => {
        const button = document.createElement("button");
        const image = document.createElement("img");

        button.className = "gallery-item";
        button.type = "button";
        button.dataset.index = String(index);
        button.setAttribute("aria-label", `${item.alt} megnyitása`);

        image.src = item.thumbnail;
        image.alt = item.alt;
        image.loading = index < 8 ? "eager" : "lazy";
        image.decoding = "async";

        if (index < 4) {
            image.fetchPriority = "high";
        }

        button.appendChild(image);
        galleryGrid.appendChild(button);
    });

    const normalizeIndex = (index) => {
        if (index < 0) {
            return galleryItems.length - 1;
        }

        if (index >= galleryItems.length) {
            return 0;
        }

        return index;
    };

    const updateLightbox = (index) => {
        currentIndex = normalizeIndex(index);
        lightboxImage.src = galleryItems[currentIndex].fullSize;
        lightboxImage.alt = galleryItems[currentIndex].alt;
    };

    const openLightbox = (index, trigger) => {
        lastFocusedItem = trigger;
        updateLightbox(index);
        lightbox.classList.add("show");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
        closeButton?.focus();
    };

    const closeLightbox = () => {
        lightbox.classList.remove("show");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");
        lightboxImage.removeAttribute("src");
        lastFocusedItem?.focus();
    };

    galleryGrid.addEventListener("click", (event) => {
        const button = event.target.closest(".gallery-item");

        if (!button) {
            return;
        }

        openLightbox(Number(button.dataset.index), button);
    });

    closeButton?.addEventListener("click", closeLightbox);
    previousButton?.addEventListener("click", () => updateLightbox(currentIndex - 1));
    nextButton?.addEventListener("click", () => updateLightbox(currentIndex + 1));

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (!lightbox.classList.contains("show")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        } else if (event.key === "ArrowLeft") {
            updateLightbox(currentIndex - 1);
        } else if (event.key === "ArrowRight") {
            updateLightbox(currentIndex + 1);
        }
    });

    lightbox.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener("touchend", (event) => {
        const distance = event.changedTouches[0].clientX - touchStartX;

        if (Math.abs(distance) < 50) {
            return;
        }

        updateLightbox(distance < 0 ? currentIndex + 1 : currentIndex - 1);
    }, { passive: true });
});
