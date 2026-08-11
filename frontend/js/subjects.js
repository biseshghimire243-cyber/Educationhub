document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadSubjects();

    }
);


/* ==========================================
   GLOBAL SUBJECTS
   ========================================== */

let allSubjects = [];


/* ==========================================
   LOAD SUBJECTS
   ========================================== */

async function loadSubjects() {

    const grid =
        document.getElementById(
            "subjectGrid"
        );

    try {

        const response =
            await fetch(
                "/api/subjects"
            );

        const data =
            await response.json();

        console.log(
            "Subjects:",
            data
        );


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Failed to load subjects"
            );

        }


        allSubjects =
            data.subjects || [];


        renderSubjects(
            allSubjects
        );


    }
    catch (error) {

        console.error(
            "Subject error:",
            error
        );

        grid.innerHTML = `

            <div class="loading">

                <h3>
                    Unable to load subjects
                </h3>

                <p>
                    ${escapeHTML(
                        error.message
                    )}
                </p>

            </div>

        `;

    }

}


/* ==========================================
   RENDER SUBJECTS
   ========================================== */

function renderSubjects(
    subjects
) {

    const grid =
        document.getElementById(
            "subjectGrid"
        );

    const noResults =
        document.getElementById(
            "noResults"
        );


    if (
        subjects.length === 0
    ) {

        grid.innerHTML = "";

        noResults.style.display =
            "block";

        return;

    }


    noResults.style.display =
        "none";


    grid.innerHTML =
        subjects
            .map(
                subject =>
                    createSubjectCard(
                        subject
                    )
            )
            .join("");

}


/* ==========================================
   CREATE SUBJECT CARD
   ========================================== */

function createSubjectCard(
    subject
) {

    const icon =
        getSubjectIcon(
            subject.name
        );


    const description =
        subject.description ||
        "Explore courses and develop your skills in this subject.";


    return `

        <article
            class="subject-card"
            onclick="openSubject(${subject.id})"
        >

            <div class="subject-icon">
                ${icon}
            </div>


            <h3>
                ${escapeHTML(
                    subject.name
                )}
            </h3>


            <p>
                ${escapeHTML(
                    description
                )}
            </p>


            <div class="subject-card-footer">

                <span class="course-count">

                    📚 Explore courses

                </span>


                <span class="explore-btn">

                    Explore →

                </span>

            </div>

        </article>

    `;

}


/* ==========================================
   SUBJECT ICON
   ========================================== */

function getSubjectIcon(
    name
) {

    const subject =
        String(name)
            .toLowerCase();


    if (
        subject.includes(
            "web"
        )
    ) {
        return "🌐";
    }


    if (
        subject.includes(
            "python"
        )
    ) {
        return "🐍";
    }


    if (
        subject.includes(
            "database"
        ) ||
        subject.includes(
            "sql"
        )
    ) {
        return "🗄️";
    }


    if (
        subject.includes(
            "design"
        ) ||
        subject.includes(
            "ui"
        )
    ) {
        return "🎨";
    }


    if (
        subject.includes(
            "java"
        )
    ) {
        return "☕";
    }


    if (
        subject.includes(
            "javascript"
        )
    ) {
        return "⚡";
    }


    if (
        subject.includes(
            "programming"
        )
    ) {
        return "💻";
    }


    return "📚";

}


/* ==========================================
   SEARCH
   ========================================== */

const searchInput =
    document.getElementById(
        "subjectSearch"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const keyword =
                this.value
                    .toLowerCase()
                    .trim();


            const filtered =
                allSubjects.filter(
                    subject => {

                        const name =
                            String(
                                subject.name
                            )
                            .toLowerCase();


                        const description =
                            String(
                                subject.description ||
                                ""
                            )
                            .toLowerCase();


                        return (
                            name.includes(
                                keyword
                            ) ||
                            description.includes(
                                keyword
                            )
                        );

                    }
                );


            renderSubjects(
                filtered
            );

        }
    );

}


/* ==========================================
   OPEN SUBJECT
   ========================================== */

function openSubject(
    subjectId
) {

    window.location.href =
        `course.html?subject_id=${subjectId}`;

}


/* ==========================================
   ESCAPE HTML
   ========================================== */

function escapeHTML(
    value
) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}