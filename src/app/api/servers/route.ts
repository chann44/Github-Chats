import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRoel } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      {
        return new NextResponse("Unauthorized user", {
          status: 401,
        });
      }
    }
    const server = await db.server.create({
      data: {
        profileId: profile?.id,
        naem: name,
        imageUrl: imageUrl,
        inviteCode: uuid(),
        channels: {
          create: [{ naem: "general", profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRoel.ADMIN }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("SERVERS_POST", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
