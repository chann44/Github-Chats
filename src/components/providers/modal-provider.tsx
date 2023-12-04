"use client";

import { useEffect, useState } from "react";
import { ModalCreateServer } from "../modal/modal-create-server";

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
    </>
  );
}
