"use client";

import { User } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardCheckIcon, ClipboardIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { useToast } from "../ui/use-toast";
import { schema } from "./schema";

interface Props {
  user?: User | null;
}

export default function UsersForm({ user = null }: Props) {
  const [openTempPass, setOpenTempPass] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tempPass, setTempPass] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const { mutate } = useSWRConfig();
  const defaultValues = {
    name: user?.name || "",
    surname: user?.surname || "",
    email: user?.email || "",
    username: user?.username || "",
    phone: user?.phone || "",
    role: user?.role || "USER",
    isActivated: user?.isActivated ?? true,
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    const method = user ? "PATCH" : "POST";
    const url = user ? `/api/users/${user.id}` : "/api/users";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
      return toast({
        title: "Error",
        description: data.message,
        variant: "destructive",
      });
    }

    if (user) {
      toast({
        title: "Successfully",
        description: data.message,
      });

      mutate(`/api/users/${user.id}`);
      mutate("/api/users");
      return router.push("/dashboard/users");
    }

    setTempPass(data.data.temporalPassword);
    setOpenTempPass(true);
  }

  function handleAccept() {
    setOpenTempPass(false);
    mutate("/api/users");
    router.push("/dashboard/users");
  }

  function handleCopy() {
    setCopied(true);
    navigator.clipboard.writeText(tempPass);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <div className="grid gap-4 xl:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Edgar"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Benavides"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="edgar@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="edgarbenavides"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+524451234567"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value="USER"
                        className="cursor-pointer"
                      >
                        User
                      </SelectItem>
                      <SelectItem
                        value="ADMIN"
                        className="cursor-pointer"
                      >
                        Administrator
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="isActivated"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Active account</FormLabel>
                  <FormDescription>
                    Allow user to access the platform?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <footer className="grid gap-4">
            <Button className="w-full">{user ? "Save" : "Create"}</Button>
            <Button
              onClick={() => router.back()}
              type="button"
              variant="outline"
              className="w-full"
            >
              Cancel
            </Button>
          </footer>
        </form>
      </Form>
      <AlertDialog open={openTempPass}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>User created</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col gap-2">
              <p>
                The user was created successfully. The temporary password is:
              </p>
              <div className="relative">
                <Input
                  value={tempPass}
                  contentEditable={false}
                  className="rounded-lg py-6"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={handleCopy}
                >
                  <ClipboardCheckIcon
                    className={cn(
                      "h-[1.2rem] w-[1.2rem] scale-0 transition-all",
                      { "scale-100": copied },
                    )}
                  />
                  <ClipboardIcon
                    className={cn(
                      "absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all",
                      { "scale-100": !copied },
                    )}
                  />
                  <span className="sr-only">Copy to clipboard</span>
                </Button>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={handleAccept}
              className="min-w-[97.83px]"
            >
              Accept
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
