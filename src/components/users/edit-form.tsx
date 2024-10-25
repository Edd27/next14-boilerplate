"use client";

import { User } from "@/lib/definitions";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import Loader from "../ui/loader";
import UsersForm from "./form";

interface Props {
  userId: string;
}

export default function EditUserForm({ userId }: Props) {
  const { data, isLoading } = useSWR<{
    error: boolean;
    message: string;
    data: User;
  }>(`/api/users/${userId}`, fetcher);

  const user = data?.data || null;

  if (isLoading) {
    return <Loader title="Loading..." />;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return <UsersForm user={user} />;
}
