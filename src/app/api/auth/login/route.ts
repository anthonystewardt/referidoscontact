import prisma from '@/libs/db';
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const userFound = await prisma.admin.findUnique({
      where: {
        email,
      },
    });
    console.log({userFound})
  
    if (!userFound) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }
  
    const matchPassword = await bcrypt.compare(password, userFound.password);
  
    if (!matchPassword) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          email,
          username: "fazt",
        },
        "secret"
      );
  
      const response = NextResponse.json({
        token,
      });
  
      response.cookies.set({
        name: "myTokenName",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: "/",
      });
  
      return response;
  } catch (error) {
    console.log({error})
    return NextResponse.json({ message: error }, { status: 500 });
  }
}