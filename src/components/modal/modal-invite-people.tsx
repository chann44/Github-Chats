"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";

export function ModalInvitePeople() {
  const { isOpen, type, onClose, data } = useModal();
  const origin = useOrigin();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const isModalOpen = isOpen && type == "invite";

  const InviteUrl = `${origin}/invite/${data.server?.inviteCode}`;
  const onCopy = () => {
    navigator.clipboard.writeText(InviteUrl);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  return (
    <Dialog onOpenChange={onClose} open={isModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center">Invite Friends</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500">
            Server Invite Link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              value={InviteUrl}
              className="bg-zinc-300/50 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button onClick={onCopy} size={"icon"}>
              {isCopied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button className="text-xs" variant={"link"}>
            Generate a New link
            <RefreshCcw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
