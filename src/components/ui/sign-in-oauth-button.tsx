"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

interface SignInOAuthButtonProps {
  provider: "google" | "github";
  signUp?: boolean;
}

export const SignInOAuthButton = ({
  provider,
  signUp,
}: SignInOAuthButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    await signIn.social({
      provider,
      callbackURL: "/profile",
      errorCallbackURL: "/auth/login/error",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  }

  const action = signUp ? "Up" : "In";
  const providerName = provider === "google" ? "Google" : "GitHub";
  return (
    <Button onClick={handleClick} disabled={isPending}>
      Sign {action} with {providerName}
    </Button>
  );
};
