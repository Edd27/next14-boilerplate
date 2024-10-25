import DashboardCounters from "@/components/dashboard/counters";
import DashboardReports from "@/components/dashboard/reports";
import Section from "@/components/ui/section";
import UpdatePasswordDialog from "@/components/users/update-password-dialog";
import { User } from "@/lib/definitions";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const user = session?.user as User;
  return (
    <Section title="Dashboard">
      <div className="space-y-4">
        <DashboardCounters />
        <DashboardReports />
      </div>
      {!user?.passwordUpdated && <UpdatePasswordDialog user={user} />}
    </Section>
  );
}
