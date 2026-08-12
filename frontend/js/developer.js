document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "EducationHub Developer Page Loaded"
        );

    }
);


// =========================
// DEVELOPER PAGE
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const timelineItems =
        document.querySelectorAll(".timeline-item");

    const projectCards =
        document.querySelectorAll(".project-card");


    // =========================
    // SCROLL ANIMATION
    // =========================

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    timelineItems.forEach((item) => {
        observer.observe(item);
    });


    projectCards.forEach((card) => {
        observer.observe(card);
    });

});