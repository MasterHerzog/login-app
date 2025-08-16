import { SignOutButton } from "@/components/sign-out-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ReturnButton } from "@/components/ui/return-button";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/auth/login");
  }

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/auth/login" label="Back to Login" />
        <h1 className="text-3xl font-bold">Profile</h1>
      </div>

      <SignOutButton />

      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
