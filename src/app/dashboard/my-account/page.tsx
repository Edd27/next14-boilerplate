import Section from "@/components/ui/section";
import Image from "next/image";

export default function MyAccountPage() {
  return (
    <Section title="My account">
      <div className="flex h-[calc(100vh-9rem)] flex-col items-center justify-center gap-10">
        <Image
          src="/wip.svg"
          alt="Work in progress"
          width={300}
          height={300}
        />
        <h1 className="text-4xl font-bold text-primary">Work in progress</h1>
      </div>
    </Section>
  );
}
