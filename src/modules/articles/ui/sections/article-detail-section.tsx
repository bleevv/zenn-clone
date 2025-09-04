"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { BookmarkIcon, HeartIcon } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import Markdown from "@/modules/articles/ui/components/markdown";
import { trpc } from "@/trpc/client";

export const ArticleDetailSection = ({ articleId }: { articleId: string }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>Error</div>}>
        <ArticleDetailSectionSuspense articleId={articleId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const ArticleDetailSectionSuspense = ({ articleId }: { articleId: string }) => {
  const [article] = trpc.articles.getOne.useSuspenseQuery({ id: articleId });
  const publishedAt = article.publishedAt
    ? format(article.publishedAt, "yyyy/MM/dd HH:mm", { locale: ja })
    : "公開日不明";
  const updatedAt = article.updatedAt
    ? format(article.updatedAt, "yyyy/MM/dd HH:mm", { locale: ja })
    : null;
  return (
    <div>
      <h2 className="font-bold text-2xl">{article.title}</h2>
      <div>
        <span>{publishedAt}</span>
        <span>・</span>
        <span>{updatedAt}</span>
      </div>
      <div className="mx-auto flex max-w-[1200px] px-10">
        <div className="flex flex-col">
          <Button>
            <HeartIcon className="size-4" />
          </Button>
          <Button>
            <BookmarkIcon className="size-4" />
          </Button>
        </div>
        <div className="flex-1">
          <Markdown content={article.content ?? ""} />
        </div>
        <div>metadata area</div>
      </div>
    </div>
  );
};
