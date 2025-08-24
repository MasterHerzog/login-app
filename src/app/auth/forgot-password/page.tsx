import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { ReturnButton } from "@/components/ui/return-button";

export default function Page() {
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/auth/login" label="Back to Login" />
        <h1 className="text-3xl font-bold">Success</h1>
      </div>

      <p className="text-muted-foreground">
        Please enter your email address to receive a password reset link.
      </p>

      <ForgotPasswordForm />
    </div>
  );
}
