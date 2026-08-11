document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadTeachers();

    }
);


/* ==========================================
   ALL TEACHERS
   ========================================== */

let allTeachers = [];


/* ==========================================
   LOAD TEACHERS
   ========================================== */

async function loadTeachers() {

    const grid =
        document.getElementById(
            "teacherGrid"
        );

    try {

        const response =
            await fetch(
                "/api/teachers"
            );

        const data =
            await response.json();

        console.log(
            "Teachers:",
            data
        );


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Failed to load teachers"
            );

        }


        allTeachers =
            data.teachers || [];


        renderTeachers(
            allTeachers
        );


    }
    catch (error) {

        console.error(
            "Teacher loading error:",
            error
        );

        grid.innerHTML = `

            <div class="loading">

                <h3>
                    Unable to load teachers
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
   RENDER TEACHERS
   ========================================== */

function renderTeachers(
    teachers
) {

    const grid =
        document.getElementById(
            "teacherGrid"
        );

    const noResults =
        document.getElementById(
            "noResults"
        );


    if (
        teachers.length === 0
    ) {

        grid.innerHTML = "";

        noResults.style.display =
            "block";

        return;

    }


    noResults.style.display =
        "none";


    grid.innerHTML =
        teachers
            .map(
                teacher =>
                    createTeacherCard(
                        teacher
                    )
            )
            .join("");

}


/* ==========================================
   CREATE TEACHER CARD
   ========================================== */

function createTeacherCard(
    teacher
) {

    const name =
        teacher.full_name ||
        teacher.name ||
        "EducationHub Teacher";


    const initials =
        getInitials(name);


    return `

        <article class="teacher-card">


            <div class="teacher-avatar">

                ${escapeHTML(
                    initials
                )}

            </div>


            <h3>

                ${escapeHTML(
                    name
                )}

            </h3>


            <span class="teacher-specialization">

                ${escapeHTML(
                    teacher.specialization ||
                    "Education"
                )}

            </span>


            <p class="teacher-bio">

                ${escapeHTML(
                    teacher.bio ||
                    "Passionate educator dedicated to helping students learn and grow."
                )}

            </p>


            <div class="teacher-qualification">

                🎓

                ${escapeHTML(
                    teacher.qualification ||
                    "Qualified Educator"
                )}

            </div>


            <button
                class="teacher-profile-btn"
                onclick="viewTeacher(${teacher.id})"
            >

                View Profile →

            </button>


        </article>

    `;

}


/* ==========================================
   GET INITIALS
   ========================================== */

function getInitials(
    name
) {

    return String(name)

        .trim()

        .split(/\s+/)

        .slice(0, 2)

        .map(
            word =>
                word.charAt(0)
                    .toUpperCase()
        )

        .join("");

}


/* ==========================================
   SEARCH
   ========================================== */

const searchInput =
    document.getElementById(
        "teacherSearch"
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
                allTeachers.filter(
                    teacher => {

                        const name =
                            String(
                                teacher.full_name ||
                                teacher.name ||
                                ""
                            )
                            .toLowerCase();


                        const specialization =
                            String(
                                teacher.specialization ||
                                ""
                            )
                            .toLowerCase();


                        const qualification =
                            String(
                                teacher.qualification ||
                                ""
                            )
                            .toLowerCase();


                        return (
                            name.includes(
                                keyword
                            ) ||

                            specialization.includes(
                                keyword
                            ) ||

                            qualification.includes(
                                keyword
                            )
                        );

                    }
                );


            renderTeachers(
                filtered
            );

        }
    );

}


/* ==========================================
   VIEW TEACHER
   ========================================== */

function viewTeacher(
    teacherId
) {

    window.location.href =
        `teacher-details.html?id=${teacherId}`;

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