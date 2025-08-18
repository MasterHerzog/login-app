import {
  DeleteUserButton,
  PlaceHolderDeleteUserButton,
} from "@/components/delete-user-button";
import { ReturnButton } from "@/components/ui/return-button";
import { UserRoleSelect } from "@/components/user-role-select";
import { UserRole } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const headerList = await headers();

  // Get the current session from the request headers
  const session = await auth.api.getSession({
    headers: headerList,
  });

  // If no session exists, redirect user to the login page
  if (!session) redirect("/auth/login");

  // If the logged-in user is not an admin, show an error message and stop here
  if (session.user.role !== "ADMIN") {
    return (
      <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
        <div className="space-y-8">
          {/* Back button to return to profile */}
          <ReturnButton href="/profile" label="Back to Profile" />

          {/* Page title */}
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          {/* Error message shown when user has no admin permissions */}
          <p className="p-2 rounded-md text-lg bg-red-600 text-white font-bold">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  // If the user is an admin, fetch all users
  const { users } = await auth.api.listUsers({
    headers: headerList,
    query: {
      sortBy: "name",
    },
  });

  // Sort users so admins appear first
  const sortedUsers = users.sort((a, b) => {
    if (a.role === "ADMIN" && b.role !== "ADMIN") return -1;
    if (a.role !== "ADMIN" && b.role === "ADMIN") return 1;
    return 0;
  });

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        {/* Back button to return to profile */}
        <ReturnButton href="/profile" label="Back to Profile" />

        {/* Page title */}
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        {/* Success message shown when user has admin access */}
        <p className="p-2 rounded-md text-lg bg-green-600 text-white font-bold">
          Welcome, {session.user.name}! You have admin access.
        </p>
      </div>

      {/* Users table */}
      <div className="w-full overflow-x-auto">
        <table className="table-auto min-w-full whitespace-nowrap">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2 text-center">Role</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Render each user in a table row */}
            {sortedUsers.map((user) => (
              <tr key={user.id}>
                {/* Shortened ID (first 8 chars only) */}
                <td className="border px-4 py-2">{user.id.slice(0, 8)}</td>

                {/* User details */}
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 text-center">
                  <UserRoleSelect
                    userId={user.id}
                    role={user.role as UserRole}
                  />
                </td>

                {/* Show delete button only for USER role, otherwise show placeholder */}
                <td className="border px-4 py-2 text-center">
                  {user.role === "USER" ? (
                    <DeleteUserButton userId={user.id} />
                  ) : (
                    <PlaceHolderDeleteUserButton />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
