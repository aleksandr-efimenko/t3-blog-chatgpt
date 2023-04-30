import React from "react";
import Link from "next/link";
import { api } from "~/utils/api";
import type { Post } from "@prisma/client";
import AnimatedSpinner from "~/components/AnimatedSpinner";
import PostElement from "~/components/PostElement";
import PostButtonsBar from "~/components/PostButtonsBar";

export default function Posts() {
  const { data, error } = api.posts.getAllPosts.useQuery();
  if (error) {
    return <div>Error while fetching posts: {error.message}</div>;
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 text-white">
        <AnimatedSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      {data.map((post: Post) => (
        <div key={post.id} className=" border  border-x-gray-200 p-4 w-full">
          <PostElement key={post.id} post={post} />
          <PostButtonsBar postId={post.id} />
        </div>
      ))}
    </div>
  );
}
