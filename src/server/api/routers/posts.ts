import type { Post } from ".prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getPostById: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(({ ctx, input } )  => {
    return ctx.prisma.post.findUnique({
      where: {
        id: input.id,
      },
    });
  }),

  getAllPosts: publicProcedure
  .query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  deletePost: publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(({ ctx, input }) => {
    return ctx.prisma.post.delete({
      where: {
        id: input.id,
      },
    });
  }),
  

  createPost: publicProcedure
  .input(z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean(),
  }))
  .mutation (({ ctx, input }) => {
     return ctx.prisma.post.create({
     data: {
       title: input.title,
       content: input.content,
       published: input.published,
     },
   });
 }),

});
