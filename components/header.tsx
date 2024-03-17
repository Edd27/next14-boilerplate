"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/lib/definitions";
import { LayoutGrid, LogOut, UserRound } from "lucide-react";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

function Menu() {
  const { data: session } = useSession();
  const currentUser = session?.user as User;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={`https://ui-avatars.com/api/?name=${currentUser?.name}+${currentUser?.surname}`}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="hidden text-sm font-bold lg:block">
          {`${currentUser?.name} ${currentUser?.surname}`.trim()}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-semibold">
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/profile"
            className="flex cursor-pointer items-center gap-2"
          >
            <UserRound className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <ModeToggle type="submenu" />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => await signOut({ callbackUrl: "/" })}
          className="flex cursor-pointer items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header() {
  return (
    <SessionProvider>
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between bg-background p-4 shadow backdrop-blur lg:left-64 lg:justify-end">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold uppercase lg:hidden"
        >
          <LayoutGrid />
          <span className="hidden sm:block">Next App</span>
        </Link>
        <section className="flex items-center gap-4">
          <Menu />
        </section>
      </header>
    </SessionProvider>
  );
}
