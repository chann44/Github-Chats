"use client";

import { ServerWithMembersWithProfiles } from "@/lib/types";
import { MemberRoel } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { LucideChevronDown } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRoel;
}

export function ServerHeader(props: ServerHeaderProps) {
  const { onOpen } = useModal();
  const isAdmin = props.role == "ADMIN";
  const isModarator = props.role == "MODRATOR" || isAdmin;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className="focus:outline-none hover:bg-primary-foreground w-full justify-between"
          >
            {props.server.naem}
            <LucideChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-2 bg-black text-sm font-medium space-y-2">
          {isModarator && (
            <DropdownMenuItem
              onClick={() => onOpen("invite", { server: props.server })}
            >
              Invite People
            </DropdownMenuItem>
          )}
          {isAdmin && <DropdownMenuItem>Server Settings</DropdownMenuItem>}
          {isAdmin && <DropdownMenuItem>Manage Members</DropdownMenuItem>}
          {isModarator && <DropdownMenuItem>Create Channels</DropdownMenuItem>}
          {isModarator && <DropdownMenuSeparator />}
          {isAdmin && <DropdownMenuItem>Delete Server</DropdownMenuItem>}
          {!isAdmin && <DropdownMenuItem>Leave Server</DropdownMenuItem>}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
