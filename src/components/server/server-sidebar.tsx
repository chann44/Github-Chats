import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";

/*
    this is for the mobile as of now i thing i might remove it 
*/

interface ServerSidebarProps {
  serverId: string;
}

export async function ServerSidebar(props: ServerSidebarProps) {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: props.serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const textChannels = server?.channels.filter((channel) => {
    return channel.type === ChannelType.TEXT;
  });
  const audioChannels = server?.channels.filter((channel) => {
    return channel.type === ChannelType.AUDIO;
  });
  const videoChannels = server?.channels.filter((channel) => {
    return channel.type === ChannelType.VIDEO;
  });

  const members = server?.members;
  const myRole = members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="h-full w-full text-primary flex flex-col bg-accent border-l border-l-background">
      <ServerHeader server={server} role={myRole} />
    </div>
  );
}
