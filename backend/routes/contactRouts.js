const express = require("express");

const router = express.Router();

const db = require("../config/database");


/* ==========================================
   SEND CONTACT MESSAGE
   ========================================== */

router.post("/", async (req, res) => {

    try {

        const {
            name,
            email,
            subject,
            message
        } = req.body;


        /* VALIDATION */

        if (
            !name ||
            !email ||
            !subject ||
            !message
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "All fields are required"

            });

        }


        /* INSERT MESSAGE */

        const [result] =
            await db.query(

                `INSERT INTO contact_messages
                (name, email, subject, message)
                VALUES (?, ?, ?, ?)`,
                
                [
                    name.trim(),
                    email.trim(),
                    subject.trim(),
                    message.trim()
                ]

            );


        res.status(201).json({

            success: true,

            message:
                "Your message has been sent successfully",

            id: result.insertId

        });


    }
    catch (error) {

        console.error(
            "Contact message error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to send contact message",

            error:
                error.message

        });

    }

});


module.exports = router;