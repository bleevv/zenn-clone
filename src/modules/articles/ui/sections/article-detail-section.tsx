"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { BookmarkIcon, HeartIcon, RefreshCcwIcon } from "lucide-react";
import Image from "next/image";
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
      <div className="my-16 flex flex-col gap-4">
        <h2 className="text-center font-bold text-2xl">{article.title}</h2>
        <div className="flex items-center justify-center gap-1">
          <span>{publishedAt}</span>
          <span>・</span>
          <span className="flex items-center gap-1">
            <RefreshCcwIcon className="size-4" />
            {updatedAt}
          </span>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1200px] gap-4 px-10">
        <div className="sticky top-24 flex h-fit flex-col gap-2">
          <Button variant="outline">
            <HeartIcon className="size-4" />
          </Button>
          <Button variant="outline">
            <BookmarkIcon className="size-4" />
          </Button>
        </div>
        <div className="min-w-0 flex-1 overflow-hidden bg-white p-10">
          <div className="max-w-none overflow-x-auto break-words">
            <Markdown content={article.content ?? ""} />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 bg-white p-5">
            <Image
              alt={article.creator.name ?? ""}
              height={100}
              src={article.creator.image ?? ""}
              width={100}
            />
            <div className="flex flex-col gap-2">
              <span>{article.creator.name}</span>
              <p>{article.creator.profile ?? "no profile"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
