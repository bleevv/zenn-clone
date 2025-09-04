import { CommonHeader } from "@/components/shared/common-header";
import { ArticleDetailSection } from "@/modules/articles/ui/sections/article-detail-section";

export const ArticleDetailView = ({ articleId }: { articleId: string }) => {
  return (
    <div className="min-h-svh bg-[#edf2f7]">
      <CommonHeader />
      <ArticleDetailSection articleId={articleId} />
    </div>
  );
};
