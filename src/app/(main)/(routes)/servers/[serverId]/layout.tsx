import { ReactNode } from "react";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ServerSidebar } from "@/components/server/server-sidebar";

export default async function SErverLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: {
    serverId: string;
  };
}) {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div>
      <div className="h-full border fixed inset-y-0 hidden md:flex flex-col z-20 w-60">
        <ServerSidebar serverId={server.id} />
      </div>
      <div className="h-full pl-60">{children}</div>
    </div>
  );
}
