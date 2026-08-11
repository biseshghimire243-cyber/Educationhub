const express = require("express");
const db = require("../config/database");

const router = express.Router();

// ==========================================
// GET ALL COURSES
// ==========================================

router.get("/", async (req, res) => {

    try {

        const [courses] = await db.query(`
            SELECT *
            FROM courses
            ORDER BY id DESC
        `);

        res.json({
            success: true,
            count: courses.length,
            courses: courses
        });

    } catch (error) {

        console.error("Course Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch courses",
            error: error.message
        });

    }

});


// ==========================================
// GET SINGLE COURSE
// ==========================================

router.get("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const [courses] = await db.query(
            "SELECT * FROM courses WHERE id = ?",
            [id]
        );

        if (courses.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Course not found"
            });

        }

        res.json({
            success: true,
            course: courses[0]
        });

    } catch (error) {

        console.error("Course Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch course",
            error: error.message
        });

    }

});


module.exports = router;