// ===============================
// EDUCATIONHUB ABOUT PAGE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // Reveal elements when they enter the screen
    const revealElements = document.querySelectorAll(
        ".story-section, .mission-card, .stat, .about-cta"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

        observer.observe(element);

    });


    // ===============================
    // ACTIVE NAVIGATION
    // ===============================

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    const navLinks =
        document.querySelectorAll(".nav-links a");


    navLinks.forEach((link) => {

        const linkPage =
            link.getAttribute("href")
                ?.split("/")
                .pop()
                .split("#")[0];


        if (
            linkPage === currentPage
        ) {

            link.classList.add("active");

        }

    });


    // ===============================
    // SIMPLE COUNTER ANIMATION
    // ===============================

    const stats =
        document.querySelectorAll(".stat strong");


    stats.forEach((stat) => {

        const originalText =
            stat.textContent.trim();


        // Only animate numeric values
        const match =
            originalText.match(/\d+/);


        if (!match) return;


        const target =
            parseInt(match[0]);


        const suffix =
            originalText.replace(
                match[0],
                ""
            );


        let current = 0;

        const duration = 1200;

        const steps = 40;

        const increment =
            target / steps;


        const interval =
            duration / steps;


        const counter =
            setInterval(() => {

                current += increment;


                if (current >= target) {

                    current = target;

                    clearInterval(counter);

                }


                stat.textContent =
                    Math.floor(current) +
                    suffix;

            }, interval);

    });

});