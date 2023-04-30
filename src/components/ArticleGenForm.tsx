import React, { useCallback, useState } from "react";
import { api } from "~/utils/api";
import Button from "./Button";
import dynamic from "next/dynamic";

const SimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function ArticleGenForm({
  title,
  setTitle,
  content,
  setContent,
  openAIFetchingStatus,
  generatePost,
}: {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  openAIFetchingStatus: "idle" | "pending" | "fulfilled" | "rejected";
  generatePost: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const onChangeMDE = useCallback(
    (value: string) => {
      setContent(value);
    },
    [setContent]
  );

  return (
    <div>
      <form onSubmit={generatePost} className="flex flex-1 flex-col">
        <input
          className="rounded-input"
          placeholder="Title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <Button
          type="submit"
          status={openAIFetchingStatus}
          disabled={!title || openAIFetchingStatus === "pending"}
        >
          {openAIFetchingStatus === "pending" ? "In progress" : "Generate"}
        </Button>

        <div className="mt-3 bg-slate-300">
          <SimpleMdeEditor value={content} onChange={onChangeMDE} />
        </div>
      </form>
    </div>
  );
}
