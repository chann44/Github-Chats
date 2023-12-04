"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface ActionTooltipProps {
  label: string;
  children: ReactNode;
  side: "top" | "bottom" | "left" | "right";
  align: "start" | "center" | "end";
}

export function ActionTooltip(props: ActionTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent align={"center"} side={props.side}>
          <p className="font-semibold text-sm capitalize">{props.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
