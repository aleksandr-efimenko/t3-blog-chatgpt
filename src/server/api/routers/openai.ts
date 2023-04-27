import { z } from "zod";

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
      return response;
    });

    console.log(response);
    return "response";
  }),
  generateCompletion: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      const response = await openai
        .createCompletion({
          model: "text-davinci-003",
          prompt: input.text,
          max_tokens: 2000,
          temperature: 0.7,
        })
        .then((response) => {
          // console.log(response);
          return {
            response: response?.data
          };
        });
      return response;
    }),

});
