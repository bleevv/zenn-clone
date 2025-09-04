"use client";
import markdownHtml from "zenn-markdown-html";
import "zenn-content-css";
import { useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

type Props = {
  content: string;
  className?: string;
};

export default function Markdown({ content, className }: Props) {
  const html = useMemo(
    () =>
      markdownHtml(content, {
        // TODO バックエンドのAPIを作成できたら、ここを設定します
        // embedOrigin: '',
      }),
    [content]
  );
  useEffect(() => {
    import("zenn-embed-elements");
  }, []);
  return (
    <div
      className={cn("znc", className)}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <zenn-markdown-html need dangerouslySetInnerHTML>
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
