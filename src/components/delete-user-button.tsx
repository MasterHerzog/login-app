"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { deleteUserAction } from "@/actions/delete-user.action";

interface DeleteUserButtonProps {
  userId: string;
}

export const DeleteUserButton = ({ userId }: DeleteUserButtonProps) => {
  const [isPending, setIsPending] = useState(false);
  async function handleClick() {
    setIsPending(true);

    const { error } = await deleteUserAction({ userId });

    if (error) {
      toast.error(error);
    } else {
      toast.success("User deleted Successfully!");
    }

    setIsPending(false);
  }

  return (
    <Button
      onClick={handleClick}
      size="icon"
      variant="destructive"
      className="size-7 rounded-sm"
      disabled={isPending}
    >
      <span className="sr-only">Delete User</span>
      <TrashIcon />
    </Button>
  );
};

export const PlaceHolderDeleteUserButton = () => {
  return (
    <Button
      size="icon"
      variant="destructive"
      className="size-7 rounded-sm"
      disabled
    >
      <span className="sr-only">Delete User</span>
      <TrashIcon />
    </Button>
  );
};
