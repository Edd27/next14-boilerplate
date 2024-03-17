import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <section className="bg-background">
      <Sidebar />
      <section className="relative min-h-screen lg:pl-64">
        <Header />
        <section className="flex min-h-screen flex-col items-center justify-center px-4 pb-4 pt-[82px]">
          {children}
        </section>
      </section>
    </section>
  );
}
