"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUser } from "@/lib/auth-client";

interface UpdateUserProps {
  name: string;
  image: string;
}

export const UpdateUserForm = ({ name, image }: UpdateUserProps) => {
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);
    const name = String(formData.get("name"));
    const image = String(formData.get("image"));

    if (!name && !image) {
      return toast.error("Please enter a name or an image");
    }

    await updateUser({
      ...(name && { name }),
      image,
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("User updated successfully");
          (evt.target as HTMLFormElement).reset();
          router.refresh();
        },
      },
    });
  }

  return (
    <div>
      <form className="max-w-sm w-full space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue={name} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="image">Image URL</Label>
          <Input type="url" id="image" name="image" defaultValue={image} />
        </div>
        <Button type="submit" disabled={isPending}>
          Update
        </Button>
      </form>
    </div>
  );
};
