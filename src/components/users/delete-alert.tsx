import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User } from "@/lib/definitions";
import { useSWRConfig } from "swr";
import Loader from "../ui/loader";
import { useToast } from "../ui/use-toast";

interface Props {
  user: User;
  isDeleting: boolean;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteAlert({
  user,
  setIsDeleting,
  isDeleting,
  open,
  setOpen,
}: Props) {
  const { mutate } = useSWRConfig();
  const { toast } = useToast();

  async function handleDelete() {
    setIsDeleting(true);
    const response = await fetch(`/api/users/${user.id}`, {
      method: "DELETE",
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
      title: "Operación exitosa",
      description: data.message,
    });

    mutate("/api/users");
    mutate(`/api/users/${user.id}`);
    setIsDeleting(false);
    setOpen(false);
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Want to delete this user?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Are you sure?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="min-w-[97.83px]"
          >
            {isDeleting ? (
              <Loader
                color="white"
                size="sm"
              />
            ) : (
              "Accept"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
