import { fail } from "@sveltejs/kit";
import { RESEND_API_KEY } from "$env/static/private";
import { Resend } from "resend";

const resend = new Resend(RESEND_API_KEY);

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const name = data.get("name")?.toString().trim();
        const email = data.get("email")?.toString().trim();
        const phone = data.get("phone")?.toString().trim();
        const message = data.get("message")?.toString().trim();

        if (!name || !email || !message) {
            return fail(400, {
                error: "Please fill in all required fields.",
                name,
                email,
                phone,
                message
            });
        }

        const { error } = await resend.emails.send({
            from: "BFM Website <onboarding@resend.dev>",
            to: ["annesnouara@gmail.com"],
            subject: `New enquiry from ${name}`,
            html: `
                <h2>New BFM Carwash Enquiry</h2>

                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || "Not provided"}</p>

                <h3>Message</h3>
                <p>${message}</p>
            `
        });

        if (error) {
            console.error(error);

            return fail(500, {
                error: "Something went wrong. Please try again."
            });
        }

        return {
            success: true
        };
    }
};