"use client";

import { FileTextIcon, Loader2, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

export const UserButton = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          {isPending ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            <Avatar>
              <AvatarImage src={data?.user?.image ?? undefined} />
              <AvatarFallback>{data?.user?.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-64">
        <DropdownMenuItem asChild>
          <Link className="flex flex-col items-start" href="/dashboard">
            <p className="font-bold">@{data?.user.name}</p>
            <p className="text-muted-foreground text-sm">{data?.user.email}</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link className="flex items-center gap-2" href="/dashboard">
            <FileTextIcon />
            <p className="font-semibold">記事の管理</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon className="size-4" />
          <p className="font-semibold">ログアウト</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
