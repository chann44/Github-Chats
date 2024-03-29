"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export function NavigationAction() {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionTooltip side="right" align="center" label="add a server">
        <button
          onClick={() => {
            onOpen("createServer");
          }}
          className="group flex items-center"
        >
          <div className="flex mx-3 h-12 w-12 rounded-lg hover:rounded-full justify-center items-center bg-background group-hover:bg-emerald-500">
            <Plus
              size={25}
              className="group-hover:text-white transition text-emerald-500"
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
}
