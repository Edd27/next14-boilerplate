import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Forbidden from "@/components/ui/forbidden";
import Section from "@/components/ui/section";
import EditUserForm from "@/components/users/edit-form";
import { User } from "@/lib/definitions";
import { getServerSession } from "next-auth";

export default async function EditServicePage({
  params,
}: {
  params: { userId: string };
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  if (user.role !== "ADMIN") {
    return <Forbidden />;
  }

  return (
    <Section
      title="Edit user"
      className="mx-auto w-full lg:w-1/2 2xl:w-1/3"
    >
      <EditUserForm userId={params.userId} />
    </Section>
  );
}
