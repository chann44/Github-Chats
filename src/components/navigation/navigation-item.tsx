"use client";

import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "../action-tooltip";
import Image from "next/image";

interface NavigationItem {
  id: string;
  imageUrl: string;
  name: string;
}

export function NavigationItem(props: NavigationItem) {
  const { serverId } = useParams();
  const router = useRouter();
  return (
    <ActionTooltip label={props.name} side="right" align="center">
      <button
        className="group relative flex items-center"
        onClick={() => {
          router.push(`/servers/${props.id}`);
        }}
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-1",
            serverId !== props.id && "group-hover:h-5",
            serverId === props.id ? "h-9" : "h-2"
          )}
        />
        <div
          className={cn(
            "flex mx-3 h-12 w-12 rounded-[24px] group-hover:rounded-[15px] justify-center items-center relative",
            serverId === props.id && "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image
            className="group-hover:rounded-[16px]"
            src={props.imageUrl}
            alt="Channel Image"
            fill
          />
        </div>
      </button>
    </ActionTooltip>
  );
}
