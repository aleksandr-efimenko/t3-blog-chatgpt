import React, { useEffect, useState } from "react";


export type OpenAiSettingsProps = {
  prompt: string;
  description: string;
  model: string;
  temperature: number;
  max_tokens: number;
  keywords: string[];
  format: "" | "markdown" | "html" | "text" | "json";
  useMaximumTokens: boolean;
  finalPrompt: string;
};

export default function OpenAiSettings({
  settings,
  setSettings,
}: {
  settings: OpenAiSettingsProps;
  setSettings: (settings: OpenAiSettingsProps) => void;
}) {
  //   const { data, error } = api.openAi.getOpenAiModels.useQuery();
  //   if (error) {
  //     return <div>Error while fetching models from openAi: {error.message}</div>;
  //   }

  //   if (!data) {
  //     return (
  //       <div className="flex flex-col items-center justify-center gap-8 text-white">
  //         <AnimatedSpinner />
  //       </div>
  //     );
  //   }
  //   console.log(data);

  //helper function to update settings
  const updateSettings = (key: string) => {
    return function (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) {
      setSettings((prev: OpenAiSettingsProps) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };
  };
  const models = ["text-davinci-001", "text-davinci-003"];

  return (
    <div className="w-full text-white">
      <div className="">
        <label htmlFor="prompt" className="block">
          Prompt
        </label>
        <input
          type="text"
          id="prompt"
          className="rounded-input"
          value={settings.prompt}
          onChange={updateSettings("prompt")}
        />
      </div>
      <div className="">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          className="rounded-input"
          value={settings.description}
          onChange={updateSettings("description")}
        />
      </div>

      <div className="">
        <label htmlFor="keywords">Keywords</label>
        <input
          type="text"
          id="keywords"
          className="rounded-input"
          value={settings.keywords}
          onChange={(e) => {
            setSettings((prev: OpenAiSettingsProps) => ({
              ...prev,
              keywords: e.target.value.split(","),
            }));
          }}
        />
      </div>
      <div className="">
        <label htmlFor="model">Model: {settings.model}</label>
        <select
          value={settings.model}
          name="model"
          id="model"
          className="rounded-input"
          onChange={updateSettings("model")}
        >
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      <div className="">
        <label htmlFor="temperature">Temperature: {settings.temperature}</label>
        <input
          className="rounded-input"
          type="range"
          min="0"
          max="2"
          step="0.1"
          id="temperature"
          value={settings.temperature}
          onChange={(e) => {
            setSettings((prev: OpenAiSettingsProps) => ({
              ...prev,
              temperature: parseFloat(e.target.value),
            }));
          }}
        />
      </div>
      <div className="">
        <label htmlFor="max_tokens">Max tokens: {settings.max_tokens}</label>
        <input
          className="rounded-input"
          type="range"
          min="0"
          max="2048"
          step="1"
          id="max_tokens"
          value={settings.max_tokens}
          onChange={(e) => {
            setSettings((prev: OpenAiSettingsProps) => ({
              ...prev,
              max_tokens: parseInt(e.target.value),
            }));
          }}
        />
      </div>
      <div className="">
        <label htmlFor="format">Format {settings.format} </label>
        <select
          name="format"
          id="format"
          className="rounded-input"
          value={settings.format}
          onChange={updateSettings("format")}
        >
          <option value=""></option>
          <option value="markdown">Markdown</option>
          <option value="html">HTML</option>
          <option value="text">Text</option>
          <option value="json">JSON</option>
        </select>
      </div>

      <div className="">
        <input  className="" type="checkbox" id="useMaximumTokens" checked={settings.useMaximumTokens} 
        onChange={(e) =>
          setSettings((prev: OpenAiSettingsProps) => ({
            ...prev,
            useMaximumTokens: e.target.checked,
          }))
        } />
        <label className="ml-5" htmlFor="useMaximumTokens">Use maximum provided tokens</label>
      </div>
    </div>
  );
}
