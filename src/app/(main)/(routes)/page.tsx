import { ModeToggle } from "@/components/theme-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="h-full">
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
      <p>Protected route</p>
    </main>
  );
}
