import { ReturnButton } from "@/components/ui/return-button";

export default function Page() {
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/auth/login" label="Back to Login" />
        <h1 className="text-3xl font-bold">Success</h1>
      </div>

      <p className="text-muted-foreground">
        A verification email has been sent to your email address. Please check
        your inbox and follow the instructions to verify your email.
      </p>
    </div>
  );
}
