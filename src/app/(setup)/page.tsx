import { ModalInitial } from "@/components/modal/modal-intial";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/intial-profile";
import { redirect } from "next/navigation";

export default async function Setup() {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}}`);
  }
  return <ModalInitial />;
}
