import { LoginForm } from "@/components/ui/login-form";
import { ReturnButton } from "@/components/ui/return-button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/" label="Back to Home" />
        <h1 className="text-3xl font-bold">Login</h1>
      </div>

      <LoginForm />
      <p className="text-muted-foreground text-sm">
        Don't have an account?{" "}
        <Link href="/auth/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}