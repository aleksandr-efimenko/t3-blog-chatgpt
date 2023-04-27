import type { Post } from ".prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getPostById: publicProcedure.query(({ ctx, input } )  => {
    return ctx.prisma.post.findUnique({
      where: {
        id: input.id,
      },
    });
  }),

  getAllPosts: publicProcedure.query(({ ctx }): Post[] => {
    return ctx.prisma.post.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
