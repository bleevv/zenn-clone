"use client";

import { CommonHeader } from "@/components/shared/common-header";
import { ArticleSection } from "@/modules/home/ui/sections/article-section";

export const HomeView = () => {
  return (
    <div className="min-h-svh bg-[#edf2f7]">
      <CommonHeader />
      <ArticleSection />
    </div>
  );
};
