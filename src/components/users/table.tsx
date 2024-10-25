"use client";

import { User } from "@/lib/definitions";
import { fetcher } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import useSWR from "swr";
import { DataTable } from "../ui/data-table";
import Loader from "../ui/loader";
import { columns } from "./columns";

export default function UsersTable() {
  const { data, isLoading } = useSWR<{
    error: boolean;
    message: string;
    data: User[];
  }>("/api/users", fetcher);

  const users = data?.data || [];

  return (
    <SessionProvider>
      <section className="overflow-hidden rounded-lg border">
        {isLoading ? (
          <div className="flex w-full items-center justify-center p-4 text-center">
            <Loader title="Loading..." />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={users}
          />
        )}
      </section>
    </SessionProvider>
  );
}
