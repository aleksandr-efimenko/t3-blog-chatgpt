import React, { useState } from "react";

export type OpenAiSettingsProps = {
  model: string;
  temperature: number;
  max_tokens: number;
  prompt: string;
  keywords: string[];
};

const models = [
  "davinci",
  "curie",
  "babbage",
  "ada",
  "cushman",
  "davinci-instruct-beta",
  "content-filter-alpha",
  "davinci-codex",
  "curie-instruct-beta",
  "davinci-codex-beta",
  "curie-codex",
  "curie-codex-beta",
  "davinci-codex-closed-beta",
  "curie-codex-closed-beta",
  "lumin",
];

export default function OpenAiSettings() {
  const [settings, setSettings] = useState<OpenAiSettingsProps>({
    prompt: "",
    keywords: [],
    model: "",
    temperature: 0.8,
    max_tokens: 200,
  });

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
          {models.map((model) => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>

      <div className="">
        <label htmlFor="temperature">Temperature</label>
        <input type="range" min="0" max="2" step="0.1" id="temperature" />
      </div>
    </div>
  );
}
