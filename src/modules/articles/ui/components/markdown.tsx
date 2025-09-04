"use client";
import "github-markdown-css";
import markdownHtml from "zenn-markdown-html";
import "zenn-content-css";
import { useEffect, useMemo } from "react";

type Props = {
  content: string;
  className?: string;
};

export default function Markdown({ content }: Props) {
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
  // biome-ignore lint/security/noDangerouslySetInnerHtml: <zenn-markdown-html need dangerouslySetInnerHTML>
  return <div className="znc" dangerouslySetInnerHTML={{ __html: html }} />;
}
