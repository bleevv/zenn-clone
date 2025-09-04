import { Book, SearchIcon } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { UserButton } from "@/components/shared/user-button";
import { Button } from "@/components/ui/button";
import { NewPostButton } from "./new-post-button";
import { NotificationButton } from "./notification-button";

export const CommonHeader = () => {
  return (
    <header className="sticky top-0 z-100 bg-white">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-10">
        <Link className="flex items-center justify-center gap-2" href="/">
          <Book />
          <span className="font-black text-2xl tracking-wider">ZZZ</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost">
            <Link href="/search">
              <SearchIcon className="size-6" />
            </Link>
          </Button>
          <NotificationButton />
          <UserButton />
          <NewPostButton />
        </div>
      </div>
    </header>
  );
};
