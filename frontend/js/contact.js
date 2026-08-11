const contactForm =
    document.getElementById(
        "contactForm"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );

const submitBtn =
    document.getElementById(
        "submitBtn"
    );


contactForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const formData =
            new FormData(contactForm);


        const data = {

            name:
                formData.get("name"),

            email:
                formData.get("email"),

            subject:
                formData.get("subject"),

            message:
                formData.get("message")

        };


        formMessage.className =
            "form-message";

        formMessage.textContent =
            "";


        submitBtn.disabled =
            true;

        submitBtn.textContent =
            "Sending...";


        try {

            const response =
                await fetch(
                    "/api/contact",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(data)

                    }
                );


            const result =
                await response.json();


            if (!response.ok ||
                !result.success) {

                throw new Error(
                    result.message ||
                    "Failed to send message"
                );

            }


            formMessage.className =
                "form-message success";

            formMessage.textContent =
                "✓ Your message has been sent successfully!";


            contactForm.reset();


        }
        catch (error) {

            console.error(
                "Contact error:",
                error
            );


            formMessage.className =
                "form-message error";

            formMessage.textContent =
                "✕ " +
                error.message;

        }
        finally {

            submitBtn.disabled =
                false;

            submitBtn.textContent =
                "Send Message →";

        }

    }
);