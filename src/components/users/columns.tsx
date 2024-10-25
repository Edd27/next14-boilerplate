"use client";

import { User } from "@/lib/definitions";
import { FIELDS } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../ui/column-header";
import UsersOptions from "./options";
import ToggleStatus from "./toggle-status";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={FIELDS.name}
      />
    ),
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10 bg-secondary p-0.5">
            <AvatarImage
              className="rounded-full"
              src={
                user?.avatar ||
                `https://ui-avatars.com/api/?name=${`${user?.name} ${user?.surname}`.trim().replaceAll(" ", "+")}`
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold">
              {`${user?.name} ${user?.surname}`.trim()}
            </span>
            <span className="text-xs font-semibold opacity-75">
              {user.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={FIELDS.username}
      />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={FIELDS.phone}
      />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={FIELDS.role}
      />
    ),
  },
  {
    accessorKey: "isActivated",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={FIELDS.isActivated}
      />
    ),
    cell: ({ row }) => {
      const user = row.original;
      return <ToggleStatus user={user} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="text-right">
          <UsersOptions user={user} />
        </div>
      );
    },
  },
];
