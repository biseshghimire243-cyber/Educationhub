const API_URL = "/api/auth";

// ==========================================
// REGISTER
// ==========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const full_name =
            document.getElementById("full_name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const role =
            document.getElementById("role").value;

        const message =
            document.getElementById("registerMessage");

        const button =
            registerForm.querySelector("button");

        message.textContent = "";
        message.className = "message";

        button.disabled = true;
        button.textContent = "Creating Account...";

        try {

            const response = await fetch(
                `${API_URL}/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        full_name,
                        email,
                        password,
                        role
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            message.textContent =
                "Registration successful! Redirecting...";

            message.classList.add("success");

            registerForm.reset();

            setTimeout(() => {

                window.location.href = "login.html";

            }, 1500);

        } catch (error) {

            console.error(error);

            message.textContent =
                error.message || "Registration failed.";

            message.classList.add("error");

        } finally {

            button.disabled = false;

            button.textContent = "Create Account";

        }

    });

}


// ==========================================
// LOGIN
// ==========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");

        const button =
            loginForm.querySelector("button");

        message.textContent = "";
        message.className = "message";

        button.disabled = true;
        button.textContent = "Logging in...";

        try {

            const response = await fetch(
                `${API_URL}/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            // Store authentication data

            localStorage.setItem(
                "educationhub_token",
                data.token
            );

            localStorage.setItem(
                "educationhub_user",
                JSON.stringify(data.user)
            );

            message.textContent =
                "Login successful! Redirecting...";

            message.classList.add("success");

            setTimeout(() => {

                window.location.href = "index.html";

            }, 1000);

        } catch (error) {

            console.error(error);

            message.textContent =
                error.message || "Login failed.";

            message.classList.add("error");

        } finally {

            button.disabled = false;

            button.textContent = "Login";

        }

    });

}