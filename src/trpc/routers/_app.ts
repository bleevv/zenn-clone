import { articlesRouter } from "@/modules/articles/server/procedures";
import { createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  articles: articlesRouter,
});
export type AppRouter = typeof appRouter;
