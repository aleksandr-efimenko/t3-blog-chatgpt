import React, { useState } from "react";
import { api } from "~/utils/api";
import AnimatedSpinner from "./AnimatedSpinner";

export type OpenAiSettingsProps = {
  model: string;
  temperature: number;
  max_tokens: number;
  prompt: string;
  keywords: string[];
};

export default function OpenAiSettings() {
  const [settings, setSettings] = useState<OpenAiSettingsProps>({
    prompt: "",
    keywords: [],
    model: "",
    temperature: 0.8,
    max_tokens: 200,
  });

  const { data, error } = api.openAi.getOpenAiModels.useQuery();
  if (error) {
    return <div>Error while fetching models from openAi: {error.message}</div>;
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 text-white">
        <AnimatedSpinner />
      </div>
    );
  }
  console.log(data);

  return (
    <div>
      <div className="">
        <label htmlFor="prompt">Prompt</label>
        <input type="text" id="prompt" />
      </div>
      <div className="">
        <label htmlFor="keywords">Keywords</label>
        <input type="text" id="keywords" />
      </div>
      <div className="">
        <label htmlFor="model">Model</label>
        <select name="model" id="model">
          {data.data.map((model) => (
            <option key={model.id} value={model.id}>
              {model.id}
            </option>
          ))}
        </select>
      </div>

      <div className="">
        <label htmlFor="temperature">Temperature</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          id="temperature"
          value={settings.temperature}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              temperature: parseFloat(e.target.value),
            }))
          }
        />
      </div>
    </div>
  );
}
