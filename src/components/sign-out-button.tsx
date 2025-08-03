"use client";

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";

export const SignOutButton = () => {

    const router = useRouter();

    async function handleClick() {
        await signOut({
            fetchOptions: {
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
                onSuccess: () => {
                    toast.success("Signed out successfully");
                    router.push("/auth/login");
                },
            },
        });
    }

    return (
        <Button onClick={handleClick} size="sm" variant="destructive">Sign Out</Button>
    )
};