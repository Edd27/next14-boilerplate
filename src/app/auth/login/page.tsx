import LoginForm from "@/components/login/form";
import { Building2Icon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-sm flex-col items-center p-4 lg:justify-center">
      <article className="mb-10 flex w-full flex-col items-center justify-center space-y-2 text-center">
        <Link
          href="/"
          scroll={false}
          className="flex items-center gap-2 text-xl font-bold"
        >
          <Building2Icon />
          <span>ACME Inc</span>
        </Link>
        <h2 className="text-xl font-semibold">Login to your account</h2>
      </article>
      <LoginForm />
    </section>
  );
}
