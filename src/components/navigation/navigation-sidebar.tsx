import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavigationAction } from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "../theme-toggle";
import { UserButton } from "@clerk/nextjs";

export async function NavigationSidebar() {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-accent pt-5">
      <NavigationAction />
      <Separator className="h-0.5 bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map(({ id, naem, imageUrl }) => {
          return (
            <div key={id} className="mb-4">
              <NavigationItem name={naem} imageUrl={imageUrl} id={id} />
            </div>
          );
        })}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4 ">
        <ModeToggle />
        {/* 
          make clerk button to appera diffret on dark mode like the box color should be dark and so on and so forth
        */}
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-12 w-12",
            },
          }}
        />
      </div>
    </div>
  );
}
