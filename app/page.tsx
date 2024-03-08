import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <section>
      <h1>Hello World!</h1>
      <ModeToggle
        type="button"
        icons={true}
      />
    </section>
  );
}
