import { RegisterForm } from "@/components/ui/register-form";
import { ReturnButton } from "@/components/ui/return-button";
import { SignInOAuthButton } from "@/components/ui/sign-in-oauth-button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/auth/login" label="Back to Login" />
        <h1 className="text-3xl font-bold">Register</h1>
      </div>

      <div className="text-muted-foreground test-sm">
        <RegisterForm />
        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

        <hr className="max-w-sm" />
      </div>

      <div className="flex flex-col max-w-sm gap-4">
        <SignInOAuthButton signUp provider="google" />
        <SignInOAuthButton signUp provider="github" />
      </div>
    </div>
  );
}
