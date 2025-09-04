import { homeRouter } from "@/modules/home/server/procedures";
import { createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  home: homeRouter,
});
export type AppRouter = typeof appRouter;
