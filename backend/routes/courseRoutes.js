const express = require("express");
const db = require("../config/database");

const router = express.Router();

// ==========================================
// GET ALL PUBLISHED COURSES
// ==========================================

router.get("/", async (req, res) => {
    try {

        const [courses] = await db.query(`
            SELECT
                c.id,
                c.title,
                c.description,
                c.thumbnail,
                c.price,
                c.level,
                c.status,
                c.created_at,
                s.name AS subject_name,
                u.full_name AS teacher_name

            FROM courses c

            LEFT JOIN subjects s
                ON c.subject_id = s.id

            LEFT JOIN teachers t
                ON c.teacher_id = t.id

            LEFT JOIN users u
                ON t.user_id = u.id

            WHERE c.status = 'published'

            ORDER BY c.created_at DESC
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

        const [courses] = await db.query(`
            SELECT
                c.id,
                c.title,
                c.description,
                c.thumbnail,
                c.price,
                c.level,
                c.status,
                c.created_at,
                s.name AS subject_name,
                u.full_name AS teacher_name

            FROM courses c

            LEFT JOIN subjects s
                ON c.subject_id = s.id

            LEFT JOIN teachers t
                ON c.teacher_id = t.id

            LEFT JOIN users u
                ON t.user_id = u.id

            WHERE c.id = ?
        `, [id]);

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