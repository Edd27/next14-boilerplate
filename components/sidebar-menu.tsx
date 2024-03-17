"use client";

import { User } from "@/lib/definitions";
import { LogOut, UserRound } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface Props {
  links: {
    id: string;
    href: string;
    label: string;
    roles: string[];
    icon: ReactNode;
  }[];
  currentUser: User;
}

export default function SidebarMenu({ links }: Props) {
  const pathname = usePathname();

  return (
    <nav className="flex h-[calc(100vh-66px)] flex-col gap-3 p-4">
      <ScrollArea className="max-h-[calc(100vh-460px)]">
        {links?.map((link) => (
          <Button
            key={link.id}
            asChild
            variant="ghost"
            className={`w-full justify-start ${pathname === link.href ? "bg-secondary" : "bg-inherit"}`}
          >
            <Link
              href={link.href}
              className="gap-2 font-semibold"
            >
              {link.icon}
              {link.label}
            </Link>
          </Button>
        ))}
      </ScrollArea>
      <Separator />
      <ul>
        <li>
          <Button
            asChild
            variant="ghost"
            className={`w-full justify-start ${pathname === "/dashboard/profile" ? "bg-secondary" : "bg-inherit"}`}
          >
            <Link
              href="/dashboard/profile"
              className="gap-2 font-semibold"
            >
              <UserRound />
              <span>Profile</span>
            </Link>
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            className="w-full cursor-pointer justify-start gap-2 font-semibold"
            onClick={async () => await signOut({ callbackUrl: "/" })}
          >
            <LogOut />
            <span>Logout</span>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
