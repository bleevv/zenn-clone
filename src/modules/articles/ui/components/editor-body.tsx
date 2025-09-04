"use client";

import { useAtom, useSetAtom } from "jotai";
import { PenIcon, PlayIcon } from "lucide-react";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  contentAtom,
  initializeArticleAtom,
  previewModeAtom,
  titleAtom,
  updateContentAtom,
  updateTitleAtom,
} from "@/modules/articles/lib/state";
import { trpc } from "@/trpc/client";
import Markdown from "./markdown";

export const EditorBody = ({ articleId }: { articleId: string }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>Error</div>}>
        <EditorBodySuspense articleId={articleId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const EditorBodySuspense = ({ articleId }: { articleId: string }) => {
  const [article] = trpc.articles.getOne.useSuspenseQuery({
    id: articleId,
    editMode: true,
  });

  // Jotai atoms
  const [title] = useAtom(titleAtom);
  const [content] = useAtom(contentAtom);
  const [previewMode, setPreviewMode] = useAtom(previewModeAtom);

  // Action atoms
  const updateTitle = useSetAtom(updateTitleAtom);
  const updateContent = useSetAtom(updateContentAtom);
  const initializeArticle = useSetAtom(initializeArticleAtom);

  // Initialize article data on mount
  useEffect(() => {
    initializeArticle({
      id: articleId,
      title: article.title ?? undefined,
      content: article.content ?? undefined,
      published: article.published ?? undefined,
    });
  }, [article, articleId, initializeArticle]);

  return (
    <div className="mx-auto max-w-[960px] p-10">
      <Textarea
        className="w-full resize-none overflow-hidden border-none p-0 font-bold text-3xl shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={(e) => updateTitle(e.target.value)}
        placeholder="Title"
        rows={2}
        value={title}
      />
      <div className="flex gap-4">
        <div className="flex-1 overflow-hidden rounded-xl bg-white p-6">
          {previewMode ? (
            <div className="min-h-[500px] overflow-x-auto">
              <Markdown className="max-w-none break-words" content={content} />
            </div>
          ) : (
            <Textarea
              className="min-h-[500px] w-full resize-none break-words border-none text-base tracking-wider shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => updateContent(e.target.value)}
              placeholder="Write in markdown"
              value={content}
            />
          )}
        </div>
        <div className="flex flex-col">
          <div className="relative flex w-full justify-between rounded-full bg-white p-1">
            <div
              className={cn(
                "absolute z-0 size-9 rounded-full bg-gray-200 transition-transform duration-300",
                previewMode ? "translate-x-full" : "translate-x-0"
              )}
            />
            <button
              className={cn("z-10 grid size-9 place-items-center")}
              onClick={() => setPreviewMode(false)}
              type="button"
            >
              <PenIcon className="size-4" />
            </button>
            <button
              className={cn("z-10 grid size-9 place-items-center")}
              onClick={() => setPreviewMode(true)}
              type="button"
            >
              <PlayIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
