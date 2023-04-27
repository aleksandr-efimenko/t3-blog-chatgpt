import React from "react";
import Link from "next/link";
import { api } from "~/utils/api";
import type { Post } from "@prisma/client";

export default function Posts() {
  const { data, error } = api.posts.getAllPosts.useQuery();
  if (error) {
    return <div>Error while fetching posts: {error.message}</div>;
  }

  if (!data) {
    return (
      <div className="flex flex-col gap-8 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  console.log(data);
  return (
    <div className="flex flex-col gap-8 text-white">
      {data.map((post: Post) => (
        <div key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <h2 className="text-3xl ">{post.title}</h2>
          </Link>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
