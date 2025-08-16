"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";

export async function signInEmailAction(formData: FormData) {

    const email = String(formData.get("email"));
    if (!email) return {error: "Email is required"};

    const password = String(formData.get("password"));
    if (!password) return {error: "Password is required"};

    try {
        await auth.api.signInEmail({
            headers: await headers(), // we pass the headers
            body: {
                email,
                password
            },
        });

        return {error: null}
    } catch (err) {
        if (err instanceof APIError) {
            return {error: err.message};
        }

        return {error: "Internal server error occurred"};
    }
}