import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { openAiRouter } from "~/server/api/routers/openai";
import { postsRouter } from "~/server/api/routers/posts";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  openAi: openAiRouter,
  posts: postsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
