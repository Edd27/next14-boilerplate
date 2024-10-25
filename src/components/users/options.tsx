"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/lib/definitions";
import {
  Clipboard,
  ClipboardCheck,
  MoreHorizontal,
  Pencil,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import DeleteAlert from "./delete-alert";

interface Props {
  user: User;
}

export default function UsersOptions({ user }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const { toast } = useToast();

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(user.id);
    toast({
      title: (
        <div className="flex items-center gap-2">
          <ClipboardCheck />
          <span>ID copiado!</span>
        </div>
      ),
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            disabled={isDeleting}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={handleCopyToClipboard}
            className="flex cursor-pointer items-center gap-2"
          >
            <Clipboard className="h-4 w-4" />
            <span>Copy ID</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={`/dashboard/users/${user.id}`}
              scroll={false}
              className="flex cursor-pointer items-center gap-2"
            >
              <Pencil className="h-4 w-4" />
              <span>Edit</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
            onClick={() => setOpenDeleteAlert(true)}
          >
            <TrashIcon className="h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlert
        open={openDeleteAlert}
        setOpen={setOpenDeleteAlert}
        user={user}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
    </>
  );
}
