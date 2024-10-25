"use client";

import { User } from "@/lib/definitions";
import { LogOut, UserRoundIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";
import { Separator } from "./separator";

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

export default function SidebarMenu({ links, currentUser }: Props) {
  const pathname = usePathname();

  return (
    <nav className="flex h-[calc(100vh-66px)] flex-col gap-3 p-4">
      <ScrollArea className="max-h-[calc(100vh-460px)]">
        {links?.map((link) => {
          const allowed = link.roles.includes(currentUser?.role);

          if (!allowed) {
            return null;
          }

          return (
            <Button
              key={link.id}
              asChild
              variant="ghost"
              className={`w-full justify-start ${pathname === link.href ? "bg-secondary" : "bg-inherit"}`}
            >
              <Link
                href={link.href}
                className="gap-2 font-semibold"
                scroll={false}
              >
                {link.icon}
                {link.label}
              </Link>
            </Button>
          );
        })}
      </ScrollArea>
      <Separator />
      <ul>
        <li>
          <Button
            asChild
            variant="ghost"
            className={`w-full justify-start ${pathname === "/dashboard/my-account" ? "bg-secondary" : "bg-inherit"}`}
          >
            <Link
              href="/dashboard/my-account"
              className="gap-2 font-semibold"
              scroll={false}
            >
              <UserRoundIcon />
              <span>My account</span>
            </Link>
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            className="w-full cursor-pointer justify-start gap-2 font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={async () => await signOut({ callbackUrl: "/" })}
          >
            <LogOut />
            <span>Log out</span>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
