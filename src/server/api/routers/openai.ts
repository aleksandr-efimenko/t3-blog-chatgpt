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
    .mutation(async ({ ctx, input }) => {
      const response = await openai
        .createCompletion({
          model: "text-davinci-003",
          prompt: input.text,
          max_tokens: 2000,
          temperature: 0.7,
        })
        .then((response) => {
          console.log(response);

          return {
            response: response?.data?.choices?.[0]?.text || "No response",
          };
        });

      // generate query to save to db with prisma
      const query = await ctx.prisma.post.create({
        data: {
          title: input.text,
          content: response.response,
          published: true,
        },
      });

      return response;
    }),

  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),

  createPost: publicProcedure.mutation(async ({ ctx, input }) => {
     await ctx.prisma.post.create({
      data: {
        title: input.title,
        content: input.content,
        published: input.published,
      },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
