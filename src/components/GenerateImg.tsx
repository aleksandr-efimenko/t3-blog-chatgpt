import { api } from "~/utils/api";
import Button from "./Button";
import { useState } from "react";
import { CreateImageRequestSizeEnum } from "openai";
import AnimatedSpinner from "./AnimatedSpinner";

export default function GenerateImg() {
  const [imgPrompt, setImgPrompt] = useState("");

  const [imgGenStatus, setimgGenStatus] = useState<
    "idle" | "pending" | "fulfilled" | "rejected"
  >("idle");
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [size, setSize] = useState('256x256');
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
      setImages((prev) => [...imgUrls, ...prev]);
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
            onChange={(e) => setSize(e.target.value)}
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

// const imgPromptSuggestion = api.openAi.generateCompletion.useMutation({
//     onMutate: () => {
//       console.log("pending");
//     },
//     onError: (error) => {
//       console.log(error);
//     },
//     onSuccess: (data) => {
//       console.log("success");
//       if (!data.response) return;
//       const text = data.response?.choices?.[0]?.text || "No response";
//       //remove leading blank lines
//       setImgPrompt(text);
//     },
//   });

// useEffect(()=>
// {
//   generateImgPrompt();
// }, [content])
// const generateImgPrompt = () => {
//   if (openAIFetchingStatus === "pending") return;
//   if (!content) return;
//   console.log(content);
//   imgPromptSuggestion.mutate({
//     ...settings,
//     prompt:
//       "Generate a short description for image for website for the article: " + content,
//   });
// };
