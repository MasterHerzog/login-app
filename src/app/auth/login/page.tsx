import { MagicLinkForm } from "@/components/magic-link-form";
import { LoginForm } from "@/components/ui/login-form";
import { ReturnButton } from "@/components/ui/return-button";
import { SignInOAuthButton } from "@/components/ui/sign-in-oauth-button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/" label="Back to Home" />
        <h1 className="text-3xl font-bold">Login</h1>
      </div>

      <div className="text-muted-foreground test-sm">
        <MagicLinkForm />

        <LoginForm />
        <p className="text-muted-foreground text-sm">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>

        <hr className="max-w-sm" />
      </div>

      <div className="flex flex-col max-w-sm gap-4">
        <SignInOAuthButton provider="google" />
        <SignInOAuthButton provider="github" />
      </div>
    </div>
  );
}
