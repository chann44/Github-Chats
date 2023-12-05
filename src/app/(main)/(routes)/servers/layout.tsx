import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

import { ReactNode } from "react";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-full w-full flex">
      <aside className="z-30 h-full w-20 hidden md:flex flex-col inset-y-0">
        <NavigationSidebar />
      </aside>
      <main className="h-full">{children}</main>
    </div>
  );
}
