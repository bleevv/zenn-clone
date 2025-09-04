import { ArticleDetailView } from "@/modules/articles/ui/views/article-detail-view";
import { HydrateClient, trpc } from "@/trpc/server";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;
  void trpc.articles.getOne.prefetch({ id: articleId });
  return (
    <HydrateClient>
      <ArticleDetailView articleId={articleId} />
    </HydrateClient>
  );
}
