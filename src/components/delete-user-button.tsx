"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { deleteUserAction } from "@/actions/delete-user.action";

// Props definition for DeleteUserButton component
interface DeleteUserButtonProps {
  userId: string; // The ID of the user to be deleted
}

export const DeleteUserButton = ({ userId }: DeleteUserButtonProps) => {
  const [isPending, setIsPending] = useState(false);
  // Tracks whether the delete action is currently running (used to disable the button)

  // Handles the delete action when button is clicked
  async function handleClick() {
    setIsPending(true); // Disable button while request is in progress

    const { error } = await deleteUserAction({ userId });
    // Call the server action to delete the user

    if (error) {
      toast.error(error); // Show error toast if deletion failed
    } else {
      toast.success("User deleted Successfully!"); // Success toast on completion
    }

    setIsPending(false); // Re-enable button after request finishes
  }

  return (
    <Button
      onClick={handleClick} // Trigger delete on click
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
