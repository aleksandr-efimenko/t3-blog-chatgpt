import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useState } from "react";
import Button from "~/components/Button";

const CreatePost: NextPage = () => {
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [openAIFetchingStatus, setOpenAIFetchingStatus] = useState<
    "idle" | "pending" | "fulfilled" | "rejected"
  >("idle");
  const response = api.openAi.generateCompletion.useMutation({
    onMutate: (variables) => {
      setOpenAIFetchingStatus("pending");
    },
    onError: (error) => {
      setOpenAIFetchingStatus("rejected");
    },
    onSuccess: (data) => {
      if (!data.response) return;
      setContent(data.response);
      setOpenAIFetchingStatus("fulfilled");
    },
  });

  const createPost = api.posts.createPost.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  createPost.mutate({ title: prompt, text: content, published: true });

    // if (openAIFetchingStatus === "pending") return;
    // setContent("");
    // response.mutate({ text: prompt });
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-2xl tracking-tight text-white">Create post</h1>
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                className="my-2 block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 text-2xl shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Add prompt"
                type="text"
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
              />

              <textarea
                className="my-2 block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 text-2xl shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                cols={50}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                rows={20}
                value={content}
              />

              <Button
                loading={openAIFetchingStatus === "pending"}
                disabled={!prompt || openAIFetchingStatus === "pending"}
              >
                {openAIFetchingStatus === "pending"
                  ? "In progress"
                  : "Generate"}
              </Button>

              {/* <Link className="back" href="#" onClick={() => router.push("/")}>
                    or Cancel
                  </Link> */}
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreatePost;
