import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const articlesRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(articles);
    return data;
  }),
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const article = await db
        .select()
        .from(articles)
        .where(eq(articles.id, input.id));
      if (!article) {
        throw new TRPCError({
          message: "記事が見つかりません",
          code: "NOT_FOUND",
        });
      }
      return article[0];
    }),
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const [article] = await db
      .insert(articles)
      .values({
        userId: ctx.user.id,
      })
      .returning();
    if (!article) {
      throw new TRPCError({
        message: "新しい記事を作ることに失敗しました",
        code: "BAD_REQUEST",
      });
    }
    return article;
  }),
});
