import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/modules/home/types";

export const ArticleCard = ({ article }: { article: Article }) => {
  const publishedAt = article.publishedAt
    ? formatDistanceToNow(article.publishedAt, {
        addSuffix: true,
        locale: ja,
      })
    : "公開日不明";

  return (
    <Link className="flex items-center gap-2" href={`/articles/${article.id}`}>
      <Image
        alt={article.user.name ?? ""}
        className="rounded-xl"
        height={72}
        src={article.user.image ?? ""}
        width={72}
      />
      <div>
        <h2>{article.title}</h2>
        <div className="flex items-center gap-2">
          <span>{article.user.name}</span>
          <span>{publishedAt}</span>
          <span className="flex items-center gap-1">
            <HeartIcon className="size-4" /> {article.likeCount}
          </span>
        </div>
      </div>
    </Link>
  );
};
