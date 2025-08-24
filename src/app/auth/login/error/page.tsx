import { ReturnButton } from "@/components/ui/return-button";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParams;
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/auth/login" label="Back to Login" />
        <h1 className="text-3xl font-bold">Login Error</h1>
      </div>

      <p className="text-destructive">
        {sp.error == "account_not_linked"
          ? "Your account is not linked. Please link your account."
          : "An unknown error occurred."}
      </p>
    </div>
  );
}
