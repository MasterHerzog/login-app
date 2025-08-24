import { ResetPasswordForm } from "@/components/reset-password-form";
import { ReturnButton } from "@/components/ui/return-button";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const token = (await searchParams).token;

  if (!token) redirect("/auth/login");
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/auth/login" label="Back to Login" />
        <h1 className="text-3xl font-bold">Reset Password</h1>
      </div>

      <p className="text-muted-foreground">
        Please enter your new password below.
      </p>

      <ResetPasswordForm token={token} />
    </div>
  );
}
