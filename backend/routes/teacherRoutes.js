const express = require("express");

const router = express.Router();

const db = require("../config/database");


/* ==========================================
   GET ALL TEACHERS
   ========================================== */

router.get("/", async (req, res) => {

    try {

        const [teachers] = await db.query(`

            SELECT
                teachers.id,
                teachers.user_id,
                users.full_name,
                users.email,
                teachers.phone,
                teachers.specialization,
                teachers.qualification,
                teachers.bio,
                teachers.created_at

            FROM teachers

            INNER JOIN users
                ON teachers.user_id = users.id

            WHERE users.role = 'teacher'

            ORDER BY teachers.created_at DESC

        `);


        res.json({

            success: true,

            count: teachers.length,

            teachers: teachers

        });


    } catch (error) {

        console.error(
            "Teacher loading error:",
            error
        );


        res.status(500).json({

            success: false,

            message: "Failed to load teachers",

            error: error.message

        });

    }

});


module.exports = router;