import { User } from "@/lib/definitions";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { Badge } from "../ui/badge";
import Loader from "../ui/loader";
import { Switch } from "../ui/switch";
import { useToast } from "../ui/use-toast";

interface Props {
  user: User;
}

export default function ToggleStatus({ user }: Props) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { mutate } = useSWRConfig();
  const { toast } = useToast();
  const { data: session } = useSession();
  const currentUser = session?.user as User;

  async function handleToggle() {
    setIsUpdating(true);
    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isActivated: !user.isActivated,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsUpdating(false);

      return toast({
        title: "Error",
        description: data.message,
        variant: "destructive",
      });
    }

    toast({
      title: "Operación exitosa",
      description: data.message,
    });

    setIsUpdating(false);

    mutate("/api/users");
    mutate(`/api/users/${user.id}`);
  }

  if (isUpdating) {
    return <Loader />;
  }

  if (currentUser?.id === user.id) {
    return (
      <Badge variant={`${user.isActivated ? "default" : "outline"}`}>
        {user.isActivated ? "Active" : "Inactive"}
      </Badge>
    );
  }

  return (
    <Switch
      disabled={isUpdating}
      checked={user.isActivated}
      onCheckedChange={handleToggle}
    />
  );
}
