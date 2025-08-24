"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { changePasswordAction } from "@/actions/change-password.action";
import { toast } from "sonner";

export const ChangePasswordForm = () => {
  const [isPending, setIsPending] = React.useState(false);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setIsPending(true);

    const formData = new FormData(evt.target as HTMLFormElement);

    const { error } = await changePasswordAction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Password changed successfully");
      (evt.target as HTMLFormElement).reset();
    }

    setIsPending(false);
  }

  return (
    <div>
      <form className="max-w-sm w-full space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input id="currentPassword" name="currentPassword" type="password" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input id="newPassword" name="newPassword" type="password" />
        </div>
        <Button type="submit" disabled={isPending}>
          Update
        </Button>
      </form>
    </div>
  );
};
