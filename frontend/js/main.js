document.addEventListener("DOMContentLoaded", function () {

    console.log("EducationHub main.js loaded");

    loadCourses();

});


async function loadCourses() {

    const container =
        document.getElementById("featuredCourses");

    console.log("Course container:", container);

    if (!container) {

        console.error(
            "ERROR: #featuredCourses was not found in index.html"
        );

        return;
    }


    try {

        console.log("Fetching courses...");

        const response =
            await fetch("/api/courses");

        console.log(
            "API response status:",
            response.status
        );


        const data =
            await response.json();

        console.log(
            "Courses received:",
            data
        );


        if (!data.success) {

            throw new Error(
                data.message || "Failed to load courses"
            );

        }


        if (!data.courses.length) {

            container.innerHTML = `
                <p class="no-courses">
                    No courses available.
                </p>
            `;

            return;
        }


        container.innerHTML =
            data.courses
                .map(course => {

                    return `

                        <div class="course-card">

                            <div class="course-image">

                                <div class="course-icon">
                                    📚
                                </div>

                            </div>


                            <div class="course-content">

                                <span class="course-level">
                                    ${course.level}
                                </span>


                                <h3>
                                    ${course.title}
                                </h3>


                                <p>
                                    ${course.description}
                                </p>


                                <div class="course-info">

                                    <span>
                                        📖 ${course.subject_name}
                                    </span>

                                    <span>
                                        👨‍🏫 ${course.teacher_name}
                                    </span>

                                </div>


                                <div class="course-bottom">

                                    <strong>
                                        Rs.
                                        ${Number(course.price)
                                            .toLocaleString()}
                                    </strong>


                                    <button
                                        onclick="viewCourse(${course.id})"
                                        class="course-btn">

                                        View Course

                                    </button>

                                </div>

                            </div>

                        </div>

                    `;

                })
                .join("");

    } catch (error) {

        console.error(
            "COURSE LOADING ERROR:",
            error
        );


        container.innerHTML = `

            <div class="course-error">

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


function viewCourse(id) {

    window.location.href =
        `course-details.html?id=${id}`;

}