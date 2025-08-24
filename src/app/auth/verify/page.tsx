import { SendVerificationEmailForm } from "@/components/send-verification-email-form";
import { ReturnButton } from "@/components/ui/return-button";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const error = (await searchParams).error;

  if (!error) redirect("/profile");

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/auth/login" label="Back to Login" />
        <h1 className="text-3xl font-bold">Verify Email</h1>
      </div>

      <p className="text-destructive">
        {error == "invalid_token" || error == "token_expired"
          ? "Your email verification link is invalid. Please request a new one."
          : error == "email_not_verified"
          ? "Please verify your email, or request a new verification below"
          : "An unknown error occurred."}
      </p>

      <SendVerificationEmailForm />
    </div>
  );
}
