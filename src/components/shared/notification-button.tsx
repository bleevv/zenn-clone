"use client";

import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const NotificationButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <BellIcon className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <Tabs className="w-full" defaultValue="all">
          <div className="border-b px-4 py-3">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">すべて</TabsTrigger>
              <TabsTrigger value="highlights">ハイライト</TabsTrigger>
            </TabsList>
          </div>
          {/* TODO: 通知一覧を表示 */}
          <TabsContent className="mt-0 px-4 py-8" value="all">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <BellIcon className="size-12 text-muted-foreground/50" />
              <p className="text-muted-foreground text-sm">
                まだ通知はありません
              </p>
            </div>
          </TabsContent>

          <TabsContent className="mt-0 px-4 py-8" value="highlights">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <BellIcon className="size-12 text-muted-foreground/50" />
              <p className="text-muted-foreground text-sm">
                まだ通知はありません
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
