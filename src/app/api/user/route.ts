import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { User } from "@prisma/client";

export const GET = async () => {
  try {
    const users: User[] = await prisma.user.findMany();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    throw new Error(`Error Message: ${error}`, undefined);
  } finally {
    //delete this when not using postman
    await prisma.$disconnect();
  }
};
