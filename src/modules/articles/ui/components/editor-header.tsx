"use client";
import { ArrowLeftIcon, MessageCircleIcon, Settings2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const EditorHeader = () => {
  const router = useRouter();
  const [publicMode, setPublicMode] = useState(false);
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
        <Switch checked={publicMode} onCheckedChange={setPublicMode} />
        <span className="text-sm">公開する</span>
        <Button>{publicMode ? "公開する" : "下書き保存"}</Button>
      </div>
    </header>
  );
};
