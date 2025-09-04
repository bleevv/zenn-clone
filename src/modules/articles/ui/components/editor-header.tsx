"use client";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { ArrowLeftIcon, MessageCircleIcon, Settings2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  articleIdAtom,
  contentAtom,
  hasUnsavedChangesAtom,
  markAsSavedAtom,
  publicModeAtom,
  titleAtom,
  togglePublicModeAtom,
} from "@/modules/articles/lib/state";
import { trpc } from "@/trpc/client";

export const EditorHeader = () => {
  const router = useRouter();
  const utils = trpc.useUtils();
  const articleId = useAtomValue(articleIdAtom);
  const title = useAtomValue(titleAtom);
  const content = useAtomValue(contentAtom);
  const [publicMode, setPublicMode] = useAtom(publicModeAtom);
  const hasUnsavedChanges = useAtomValue(hasUnsavedChangesAtom);

  const togglePublicMode = useSetAtom(togglePublicModeAtom);
  const markAsSaved = useSetAtom(markAsSavedAtom);

  const { mutate, isPending } = trpc.articles.update.useMutation({
    onSuccess: () => {
      markAsSaved();
      utils.articles.getOne.invalidate({ id: articleId });
      utils.articles.getMany.invalidate();
    },
  });

  const handleSave = () => {
    mutate({
      id: articleId,
      title,
      content,
      published: publicMode,
    });
  };

  const handlePublicModeChange = (isPublic: boolean) => {
    setPublicMode(isPublic);
    togglePublicMode(isPublic);
  };

  return (
    <header className="sticky top-0 z-100 mx-auto flex h-16 max-w-[1600px] items-center justify-between border-b bg-[#edf2f7] px-10">
      <Button onClick={() => router.back()} variant="ghost">
        <ArrowLeftIcon className="size-4" />
      </Button>
      <div className="flex items-center gap-2">
        <Button variant="ghost">
          <Settings2Icon className="size-4" />
        </Button>
        <Button variant="ghost">
          <MessageCircleIcon className="size-4" />
        </Button>
        <Switch checked={publicMode} onCheckedChange={handlePublicModeChange} />
        <span className="text-sm">公開する</span>
        <Button disabled={isPending || !hasUnsavedChanges} onClick={handleSave}>
          {/** biome-ignore lint/style/noNestedTernary: <intention> */}
          {isPending ? "保存中..." : publicMode ? "公開する" : "下書き保存"}
        </Button>
      </div>
    </header>
  );
};
