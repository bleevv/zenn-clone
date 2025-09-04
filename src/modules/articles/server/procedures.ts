import { TRPCError } from "@trpc/server";
import { and, desc, eq, getTableColumns } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { articles, user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const articlesRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async () => {
    const data = await db
      .select({
        id: articles.id,
        title: articles.title,
        published: articles.published,
        likeCount: articles.likeCount,
        publishedAt: articles.publishedAt,
        user,
      })
      .from(articles)
      .innerJoin(user, eq(articles.userId, user.id))
      .where(eq(articles.published, true))
      .orderBy(desc(articles.createdAt));
    return data;
  }),
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        editMode: z.boolean().optional().default(false),
      })
    )
    .query(async ({ input, ctx }) => {
      const article = await db
        .select({
          ...getTableColumns(articles),
          creator: user,
        })
        .from(articles)
        .innerJoin(user, eq(articles.userId, user.id))
        .where(
          and(
            eq(articles.id, input.id),
            input.editMode ? eq(articles.userId, ctx.user.id) : undefined
          )
        );
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
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
        published: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [existingArticle] = await db
        .select()
        .from(articles)
        .where(
          and(eq(articles.id, input.id), eq(articles.userId, ctx.user.id))
        );
      if (!existingArticle) {
        throw new TRPCError({
          message: "記事が見つかりません",
          code: "NOT_FOUND",
        });
      }
      const publishedAt = input.published ? new Date() : undefined;
      const [updatedArticle] = await db
        .update(articles)
        .set({ ...input, publishedAt })
        .where(eq(articles.id, input.id))
        .returning();
      if (!updatedArticle) {
        throw new TRPCError({
          message: "記事を更新することに失敗しました",
          code: "BAD_REQUEST",
        });
      }
      return updatedArticle;
    }),
});
