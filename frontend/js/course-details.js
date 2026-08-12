// ==========================================
// COURSE DETAILS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadCourse
);


async function loadCourse() {

    const loading =
        document.getElementById(
            "loading"
        );

    const error =
        document.getElementById(
            "error"
        );

    const courseDetails =
        document.getElementById(
            "courseDetails"
        );


    // Get course ID from URL

    const params =
        new URLSearchParams(
            window.location.search
        );

    const courseId =
        params.get("id");


    if (!courseId) {

        showError();

        return;

    }


    try {

        const response =
            await fetch(
                `/api/courses/${courseId}`
            );


        const result =
            await response.json();


        if (
            !response.ok ||
            !result.success
        ) {

            throw new Error(
                result.message ||
                "Course not found"
            );

        }


        const course =
            result.course;


        displayCourse(course);


        loading.style.display =
            "none";

        courseDetails.style.display =
            "block";


    }
    catch (error) {

        console.error(
            "Course details error:",
            error
        );

        showError();

    }

}


// ==========================================
// DISPLAY COURSE
// ==========================================

function displayCourse(course) {

    document.title =
        `${course.title} | EducationHub`;


    document.getElementById(
        "breadcrumbTitle"
    ).textContent =
        course.title;


    document.getElementById(
        "courseTitle"
    ).textContent =
        course.title;


    document.getElementById(
        "courseDescription"
    ).textContent =
        course.description ||
        "Learn practical skills through this course.";


    document.getElementById(
        "fullDescription"
    ).textContent =
        course.description ||
        "No description available.";


    document.getElementById(
        "teacherName"
    ).textContent =
        course.teacher_name ||
        "EducationHub Teacher";


    document.getElementById(
        "subjectName"
    ).textContent =
        course.subject_name ||
        "General";


    document.getElementById(
        "courseLevel"
    ).textContent =
        course.level ||
        "Beginner";


    document.getElementById(
        "courseLevelMeta"
    ).textContent =
        course.level ||
        "Beginner";


    const price =
        Number(course.price || 0);


    document.getElementById(
        "coursePrice"
    ).textContent =
        `NPR ${price.toLocaleString()}`;


    // Enrollment button

    const enrollButton =
        document.getElementById(
            "enrollButton"
        );


    enrollButton.addEventListener(
        "click",
        () => {

            alert(
                `You selected "${course.title}". Enrollment will be available after login.`
            );

        }
    );

}


// ==========================================
// ERROR
// ==========================================

function showError() {

    document.getElementById(
        "loading"
    ).style.display =
        "none";


    document.getElementById(
        "courseDetails"
    ).style.display =
        "none";


    document.getElementById(
        "error"
    ).style.display =
        "block";

}