"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ArticleCard } from "@/modules/home/ui/components/article-card";
import { trpc } from "@/trpc/client";

export const ArticleSection = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>Error</div>}>
        <ArticleSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const ArticleSectionSuspense = () => {
  const [articles] = trpc.articles.getMany.useSuspenseQuery();
  return (
    <div className="py-10">
      <div className="mx-auto grid max-w-[960px] grid-cols-2">
        {articles.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>
    </div>
  );
};
