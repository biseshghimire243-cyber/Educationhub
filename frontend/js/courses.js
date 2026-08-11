document.addEventListener("DOMContentLoaded", () => {

    loadCourses();

});


async function loadCourses() {

    const courseGrid =
        document.getElementById("courseGrid");

    if (!courseGrid) {
        console.error("courseGrid not found");
        return;
    }

    try {

        const response =
            await fetch("/api/courses");

        const data =
            await response.json();

        console.log("Courses:", data);

        if (!response.ok || !data.success) {
            throw new Error(
                data.message || "Failed to load courses"
            );
        }


        if (data.courses.length === 0) {

            courseGrid.innerHTML = `
                <div class="loading">

                    <h3>No courses available</h3>

                    <p>
                        Courses will be added soon.
                    </p>

                </div>
            `;

            return;
        }


        courseGrid.innerHTML =
            data.courses
                .map(course => createCourseCard(course))
                .join("");


    } catch (error) {

        console.error(
            "Course loading error:",
            error
        );

        courseGrid.innerHTML = `

            <div class="error-message">

                <h3>
                    Unable to load courses
                </h3>

                <p>
                    ${error.message}
                </p>

            </div>

        `;
    }
}


function createCourseCard(course) {

    let icon = "📚";

    const subject =
        (course.subject_name || "").toLowerCase();


    if (subject.includes("web")) {
        icon = "🌐";
    }
    else if (subject.includes("python")) {
        icon = "🐍";
    }
    else if (subject.includes("database")) {
        icon = "🗄️";
    }
    else if (subject.includes("design")) {
        icon = "🎨";
    }
    else if (subject.includes("java")) {
        icon = "☕";
    }


    return `

        <article class="course-card">

            <div class="course-thumbnail">

                ${
                    course.thumbnail

                    ? `
                        <img
                            src="${course.thumbnail}"
                            alt="${escapeHTML(course.title)}"
                            style="
                                width:100%;
                                height:100%;
                                object-fit:cover;
                            "
                        >
                    `

                    : `
                        <div class="course-icon">
                            ${icon}
                        </div>
                    `
                }

            </div>


            <div class="course-body">

                <span class="course-level">
                    ${escapeHTML(course.level)}
                </span>


                <h3>
                    ${escapeHTML(course.title)}
                </h3>


                <p class="course-description">

                    ${escapeHTML(
                        course.description ||
                        "Learn practical skills with EducationHub."
                    )}

                </p>


                <div class="course-details">

                    <span>
                        📚
                        ${escapeHTML(
                            course.subject_name ||
                            "General"
                        )}
                    </span>

                    <span>
                        👨‍🏫
                        ${escapeHTML(
                            course.teacher_name ||
                            "EducationHub Teacher"
                        )}
                    </span>

                </div>


                <div class="course-footer">

                    <span class="course-price">
                        Rs.
                        ${Number(course.price)
                            .toLocaleString()}
                    </span>


                    <button
                        class="view-course-btn"
                        onclick="viewCourse(${course.id})"
                    >
                        View Course
                    </button>

                </div>

            </div>

        </article>

    `;
}


function viewCourse(id) {

    window.location.href =
        `course-details.html?id=${id}`;

}


function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");
}