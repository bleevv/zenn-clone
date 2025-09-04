"use client";

import { CheckIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <SunIcon className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem
          className={cn(
            theme === "light" && "bg-primary text-primary-foreground"
          )}
          onClick={() => setTheme("light")}
        >
          ライトテーマ
          {theme === "light" && <CheckIcon className="size-4 text-sky-500" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            theme === "dark" && "bg-primary text-primary-foreground"
          )}
          onClick={() => setTheme("dark")}
        >
          ダークテーマ
          {theme === "dark" && <CheckIcon className="size-4 text-sky-500" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            theme === "system" && "bg-primary text-primary-foreground"
          )}
          onClick={() => setTheme("system")}
        >
          システムテーマ
          {theme === "system" && <CheckIcon className="size-4 text-sky-500" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
