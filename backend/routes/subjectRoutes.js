const express = require("express");

const router = express.Router();

const db = require("../config/database");


/* ==========================================
   GET ALL SUBJECTS
   ========================================== */

router.get("/", async (req, res) => {

    try {

        const [subjects] = await db.query(`
            SELECT
                id,
                name,
                description,
                created_at
            FROM subjects
            ORDER BY name ASC
        `);


        res.json({
            success: true,
            count: subjects.length,
            subjects: subjects
        });


    } catch (error) {

        console.error(
            "Subject loading error:",
            error
        );


        res.status(500).json({

            success: false,

            message: "Failed to load subjects",

            error: error.message

        });

    }

});


module.exports = router;