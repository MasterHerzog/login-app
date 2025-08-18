"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteUserAction({ userId }: { userId: string }) {
  // 🔹 Get request headers (needed for auth and API calls)
  const headersList = await headers();

  // 🔹 Retrieve the current session from the authentication system
  const session = await auth.api.getSession({
    headers: headersList,
  });

  // 🔹 If no session exists → user is not logged in
  if (!session) {
    throw new Error("You must be logged in to delete a user.");
  }

  // 🔹 Only allow ADMINs to delete users
  if (session.user.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }

  try {
    // 🔹 Delete user from the database, but only if the user has role USER
    await prisma.user.delete({
      where: {
        id: userId,
        role: "USER", // prevents deleting other admins
      },
    });

    // 🔹 If the admin deletes their own account → sign them out
    if (session.user.id === userId) {
      await auth.api.signOut({
        headers: headersList,
      });
      redirect("/auth/sign-in"); // force redirect to sign-in page
    }

    // 🔹 Revalidate the admin dashboard so the deleted user no longer shows up
    revalidatePath("/admin/dashboard");

    // 🔹 Return success response (no error)
    return { error: null };
  } catch (err) {
    // 🔹 Handle special redirect errors (must be re-thrown to work correctly)
    if (isRedirectError(err)) {
      throw err;
    }

    // 🔹 If it's a known error → return message
    if (err instanceof Error) {
      return { error: err.message };
    }

    // 🔹 Fallback for unexpected errors
    return { error: "UNKNOWN_ERROR" };
  }
}
