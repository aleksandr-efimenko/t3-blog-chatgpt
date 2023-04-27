import React from "react";
import Button from "./Button";
import { api } from "~/utils/api";

export default function PostButtonsBar({ postId } : { postId: string }) {
  const deletePost = api.posts.deletePost.useMutation();

  const handleDelete = async () => {
    await deletePost.mutateAsync({ id: postId });
  };

  return (
    <div className="mt-2 flex gap-2">
      <Button>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
}
