import type { Post } from "@prisma/client";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function PostElement({ post }: { post: Post }) {
  return (
    <div className="w-full text-left">
      <Link href={`/posts/${post.id}`}>
        <h2 className="pb-2 text-3xl text-slate-100">{post.title}</h2>
      </Link>
      <div className="text-white">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-2xl font-bold" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-xl font-bold" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-lg font-bold" {...props} />
            ),
            p: ({ node, ...props }) => <p className="text-base" {...props} />,
            a: ({ node, ...props }) => (
              <a className="text-base text-blue-500" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-inside list-disc" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-inside list-decimal" {...props} />
            ),
            li: ({ node, ...props }) => <li className="text-base" {...props} />,
          }}
          /* eslint-disable */
          children={post.content || ""}
          /* eslint-enable */
        />
      </div>
    </div>
  );
}
