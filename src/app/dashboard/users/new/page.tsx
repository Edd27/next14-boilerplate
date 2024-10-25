import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Forbidden from "@/components/ui/forbidden";
import Section from "@/components/ui/section";
import UsersForm from "@/components/users/form";
import { User } from "@/lib/definitions";
import { getServerSession } from "next-auth";

export default async function NewUserPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  if (user.role !== "ADMIN") {
    return <Forbidden />;
  }

  return (
    <Section
      title="Add user"
      className="mx-auto w-full lg:w-1/2 2xl:w-1/3"
    >
      <UsersForm />
    </Section>
  );
}
