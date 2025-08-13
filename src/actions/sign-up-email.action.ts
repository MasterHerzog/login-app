"use server"

import { auth } from "@/lib/auth";

export async function signUpEmailAction(formData: FormData) {
    const name = String(formData.get("name"));
    if (!name) return {error: "Name is required"}

    const email = String(formData.get("email"));
    if (!email) return {error: "Email is required"};

    const password = String(formData.get("password"));
    if (!password) return {error: "Password is required"};

    try {
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password
            }
        });
        return {error: null}
    } catch (err) {
        if (err instanceof Error) {
            return {error: "Oops! Something went wrong while registering"};
        }

        return {error: "Internal server error occurred"};
    }
}