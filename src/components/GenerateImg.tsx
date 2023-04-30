import { api } from "~/utils/api";
import Button from "./Button";
import { useState } from "react";
import { CreateImageRequestSizeEnum } from "openai";
import AnimatedSpinner from "./AnimatedSpinner";

export default function GenerateImg({
    imgPrompt,
    setImgPrompt,
}: {
    imgPrompt: string;
    setImgPrompt: (prompt: string) => void;
}) {
  const [imgGenStatus, setimgGenStatus] = useState<
    "idle" | "pending" | "fulfilled" | "rejected"
  >("idle");
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [size, setSize] = useState(CreateImageRequestSizeEnum._256x256);
  const [images, setImages] = useState<(string | undefined)[]>([]);
  const generateImageMutation = api.openAi.generateImage.useMutation({
    onMutate: () => {
      console.log("pending");
      setimgGenStatus("pending");
    },
    onError: (error) => {
      console.log(error);
      setimgGenStatus("rejected");
    },
    onSuccess: (data) => {
      console.log("success");
      if (!data.response) return;
      setimgGenStatus("fulfilled");
      const imgUrls = data.response?.data.map((d) => d.url);
      if (!imgUrls) return;
      setImages((prev) => [...imgUrls, ...prev ]);
    },
  });

  const generateImg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imgGenStatus === "pending") return;
    generateImageMutation.mutate({
      prompt: imgPrompt,
      n: numberOfImages,
      size: CreateImageRequestSizeEnum._512x512,
    });
  };
  const sizes = Object.values(CreateImageRequestSizeEnum).map((size) => (
    <option key={size} value={size}>
      {size}
    </option>
  ));
  return (
    <div className="flex w-full flex-col text-white">
      <h1 className="text-2xl font-bold">Generate Images</h1>
      <div className="flex w-full">
        <form onSubmit={generateImg} className=" w-1/3">
          <input
            type="text"
            className="rounded-input"
            placeholder="Prompt"
            onChange={(e) => setImgPrompt(e.target.value)}
            value={imgPrompt}
          />
          <input
            type="number"
            className="rounded-input"
            placeholder="Number of Images"
            onChange={(e) => setNumberOfImages(parseInt(e.target.value))}
            value={numberOfImages}
          />
          <select
            className="rounded-input"
            onChange={(e) =>
              setSize(e.target.value as CreateImageRequestSizeEnum)
            }
            value={size}
          >
            {sizes}
          </select>
          <Button type="submit">Generate Images</Button>
        </form>
        <div className="m-5 grid grid-cols-3 gap-3">
          {imgGenStatus === "pending" && <AnimatedSpinner />}
          {images.map((image) => (
            <img
              key={image}
              src={image}
              alt="Generated Image"
              width={500}
              height={500}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
