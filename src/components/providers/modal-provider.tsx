"use client";

import { useEffect, useState } from "react";
import { ModalCreateServer } from "../modal/modal-create-server";
import { ModalInvitePeople } from "../modal/modal-invite-people";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ModalCreateServer />
      <ModalInvitePeople />
    </>
  );
}
