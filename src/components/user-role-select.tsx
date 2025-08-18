"use client";

import { UserRole } from "@/generated/prisma";
import { admin } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface UserRoleSelectProps {
  userId: string;
  role: UserRole;
}

export const UserRoleSelect = ({ userId, role }: UserRoleSelectProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    const newRole = evt.target.value as UserRole;

    const canChangeRole = await admin.hasPermission({
      permissions: {
        user: ["set-role"],
      },
    });

    if (canChangeRole.error) {
      return toast.error("You do not have permission to change user roles.");
    }

    await admin.setRole({
      userId,
      role: newRole,
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error("Failed to update user role.");
        },
        onSuccess: () => {
          toast.success("User role updated successfully.");
          router.refresh();
        },
      },
    });
  }

  return (
    <select
      value={role}
      onChange={handleChange}
      disabled={role === UserRole.ADMIN || isPending}
      className="px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value={UserRole.USER}>User</option>
      <option value={UserRole.ADMIN}>Admin</option>
    </select>
  );
};
