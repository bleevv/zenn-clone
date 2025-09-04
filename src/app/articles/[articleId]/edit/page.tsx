export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;
  return <div>EditArticle {articleId}</div>;
}
