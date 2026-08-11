document.addEventListener("DOMContentLoaded", () => {

    loadFeaturedCourses();

});


// ==========================================
// LOAD COURSES
// ==========================================

async function loadFeaturedCourses() {

    const container =
        document.getElementById("featuredCourses");

    if (!container) {
        return;
    }

    try {

        const response =
            await fetch("/api/courses");

        const data =
            await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        if (data.courses.length === 0) {

            container.innerHTML = `
                <div class="loading">
                    <h3>No courses available</h3>
                </div>
            `;

            return;
        }

        const courses =
            data.courses.slice(0, 6);

        container.innerHTML =
            courses
                .map(course => createCourseCard(course))
                .join("");

    } catch (error) {

        console.error("Course loading error:", error);

        container.innerHTML = `
            <div class="loading">
                <h3>Unable to load courses</h3>
                <p>Please try again later.</p>
            </div>
        `;

    }

}


// ==========================================
// COURSE CARD
// ==========================================

function createCourseCard(course) {

    const image = course.thumbnail
        ? `<img src="${course.thumbnail}" alt="${escapeHTML(course.title)}">`
        : `<div class="course-placeholder">📚</div>`;

    return `

        <article class="course-card">

            <div class="course-image">
                ${image}
            </div>

            <div class="course-content">

                <span class="course-level">
                    ${escapeHTML(course.level)}
                </span>

                <h3>
                    ${escapeHTML(course.title)}
                </h3>

                <p>
                    ${escapeHTML(
                        course.description ||
                        "Learn valuable skills with EducationHub."
                    )}
                </p>

                <div class="course-info">

                    <span>
                        📚 ${escapeHTML(
                            course.subject_name ||
                            "General"
                        )}
                    </span>

                    <span>
                        👨‍🏫 ${escapeHTML(
                            course.teacher_name ||
                            "EducationHub Teacher"
                        )}
                    </span>

                </div>

                <div class="course-bottom">

                    <strong>
                        Rs. ${Number(course.price)
                            .toLocaleString()}
                    </strong>

                    <button
                        onclick="viewCourse(${course.id})"
                        class="course-btn">
                        View Course
                    </button>

                </div>

            </div>

        </article>

    `;
}


// ==========================================
// VIEW COURSE
// ==========================================

function viewCourse(courseId) {

    window.location.href =
        `course-details.html?id=${courseId}`;

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}