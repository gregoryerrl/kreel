import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const user: User = await prisma.user.findUniqueOrThrow({
      where: { id },
    });
    user.password = "";

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    throw new Error(`Error Message: ${error}`, undefined);
  } finally {
    //delete this when not using postman
    await prisma.$disconnect();
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const body = await req.json();

    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      body.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: body,
    });

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    console.log("API Error:", error);
    throw new Error(`Error Message: ${error}`, undefined);
  } finally {
    //delete this when not using postman
    await prisma.$disconnect();
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const user: User = await prisma.user.delete({ where: { id } });

    return NextResponse.json(
      { message: "user is deleted", data: user },
      { status: 200 }
    );
  } catch (error) {
    throw new Error(`Error Message: ${error}`, undefined);
  } finally {
    //delete this when not using postman
    await prisma.$disconnect();
  }
};
