import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const articlesRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const [article] = await db
      .insert(articles)
      .values({
        userId: ctx.user.id,
      })
      .returning();
    if (!article) {
      return new TRPCError({
        message: "新しい記事を作ることに失敗しました",
        code: "BAD_REQUEST",
      });
    }
    return article;
  }),
});
