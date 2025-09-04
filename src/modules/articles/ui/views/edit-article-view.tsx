import { EditorBody } from "@/modules/articles/ui/components/editor-body";
import { EditorHeader } from "@/modules/articles/ui/components/editor-header";

export const EditArticleView = ({ articleId }: { articleId: string }) => {
  return (
    <div className="min-h-svh bg-[#edf2f7]">
      <EditorHeader />
      <EditorBody articleId={articleId} />
    </div>
  );
};
