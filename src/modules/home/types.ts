import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

export type Article =
  inferRouterOutputs<AppRouter>["articles"]["getMany"][number];
