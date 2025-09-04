"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";

export const NewPostButton = () => {
  const router = useRouter();
  const { mutate, isPending } = trpc.articles.create.useMutation({
    onSuccess: (article) => {
      router.push(`/articles/${article.id}/edit`);
    },
  });
  return (
    <Button className="min-w-24 rounded-full" onClick={() => mutate()}>
      {isPending ? <Loader2 className="size-4 animate-spin" /> : "投稿する"}
    </Button>
  );
};
