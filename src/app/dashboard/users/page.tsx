import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Forbidden from "@/components/ui/forbidden";
import Section from "@/components/ui/section";
import UsersTable from "@/components/users/table";
import { User } from "@/lib/definitions";
import { getServerSession } from "next-auth";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  if (user.role !== "ADMIN") {
    return <Forbidden />;
  }

  return (
    <Section
      title="Users"
      href="/dashboard/users/new"
      hrefText="Add"
    >
      <UsersTable />
    </Section>
  );
}
