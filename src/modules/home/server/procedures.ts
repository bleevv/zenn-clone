import { db } from "@/db";
import { articles } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const homeRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(articles);
    return data;
  }),
});
