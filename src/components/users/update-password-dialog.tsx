"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

interface Props {
  user: User | null;
}

const schema = z.object({
  currentPassword: z
    .string({ required_error: "Required field" })
    .min(8, "Required field"),
  newPassword: z
    .string({ required_error: "Required field" })
    .min(8, "Required field"),
  confirmNewPassword: z
    .string({ required_error: "Required field" })
    .min(8, "Required field"),
});

const defaultValues = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export default function UpdatePasswordDialog({ user = null }: Props) {
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] =
    useState(false);
  const { toast } = useToast();
  const { mutate } = useSWRConfig();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    const method = "PATCH";
    const url = "/api/users/change-password";

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

    toast({
      title: "Password updated",
      description:
        "Your password has been successfully updated. Please log in again.",
    });

    mutate("/api/users");
    await signOut({ callbackUrl: "/auth/login" });
  }

  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            ¡Welcome back to <span className="text-primary">ACME Inc</span>{" "}
            {user?.name}!
          </DialogTitle>
          <DialogDescription>
            For your security, please update your password before continuing to
            use the app.
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-6 flex w-full flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="********"
                            type={currentPasswordVisible ? "text" : "password"}
                            {...field}
                          />
                          <button
                            tabIndex={-1}
                            type="button"
                            onClick={() =>
                              setCurrentPasswordVisible((prev) => !prev)
                            }
                            className="absolute right-2 top-1/2 -translate-y-1/2 transform"
                          >
                            {currentPasswordVisible ? (
                              <EyeOffIcon />
                            ) : (
                              <EyeIcon />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="********"
                            type={newPasswordVisible ? "text" : "password"}
                            {...field}
                          />
                          <button
                            tabIndex={-1}
                            type="button"
                            onClick={() =>
                              setNewPasswordVisible((prev) => !prev)
                            }
                            className="absolute right-2 top-1/2 -translate-y-1/2 transform"
                          >
                            {newPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmNewPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm new password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="********"
                            type={
                              confirmNewPasswordVisible ? "text" : "password"
                            }
                            {...field}
                          />
                          <button
                            tabIndex={-1}
                            type="button"
                            onClick={() =>
                              setConfirmNewPasswordVisible((prev) => !prev)
                            }
                            className="absolute right-2 top-1/2 -translate-y-1/2 transform"
                          >
                            {confirmNewPasswordVisible ? (
                              <EyeOffIcon />
                            ) : (
                              <EyeIcon />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <footer className="grid gap-4">
                  <Button
                    className="w-full"
                    disabled={
                      form.formState.isSubmitting || form.formState.isLoading
                    }
                  >
                    {form.formState.isSubmitting || form.formState.isLoading
                      ? "Updating..."
                      : "Update password"}
                  </Button>
                </footer>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
