import { EditArticleView } from "@/modules/articles/ui/views/edit-article-view";
import { HydrateClient, trpc } from "@/trpc/server";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;
  void trpc.articles.getOne.prefetch({ id: articleId });
  return (
    <HydrateClient>
      <EditArticleView articleId={articleId} />
    </HydrateClient>
  );
}
