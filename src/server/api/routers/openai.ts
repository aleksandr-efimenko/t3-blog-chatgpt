import { z } from "zod";
import OpenAiSettings from "~/components/OpenAiSettings";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const openAiRouter = createTRPCRouter({
  getOpenAiModels: publicProcedure.query(async () => {
    const response = await openai.listModels().then((response) => {
      console.log(response);
      return response?.data;
    });

    return response;
  }),
  generateCompletion: publicProcedure
  
    .input(z.object( { 
      model: z.string(),
      prompt: z.string(),
      max_tokens: z.number(),
      temperature: z.number(),
     }) )
    .mutation(async ({ input }) => {
      const response = await openai
        .createCompletion({
          model: input.model,
          prompt: input.prompt,
          max_tokens: input.max_tokens,
          temperature: input.temperature,
        })
        .then((response) => {
          // console.log(response);
          return {
            response: response?.data,
          };
        });
      return response;
    }),
});
