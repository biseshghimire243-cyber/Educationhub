const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const db = require("./config/database");

const app = express();

const PORT = process.env.PORT || 5000;

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// ===============================
// TEST ROUTE
// ===============================

app.get("/api/health", async (req, res) => {
    try {
        const [result] = await db.query("SELECT 1 AS database_test");

        res.json({
            success: true,
            message: "EducationHub backend is running!",
            database: result[0].database_test === 1
                ? "MySQL connected"
                : "MySQL connection failed"
        });

    } catch (error) {
        console.error("Database Error:", error);

        res.status(500).json({
            success: false,
            message: "Backend is running but database connection failed",
            error: error.message
        });
    }
});

// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
    console.log("=================================");
    console.log(" EducationHub Server Started");
    console.log(` http://localhost:${PORT}`);
    console.log("=================================");
});