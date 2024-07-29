import { NextResponse, NextRequest } from 'next/server'
import { cookies } from "next/headers";

export async function GET(request: Request) { 
  const cookieStore = cookies();
  const token = cookieStore.get("myTokenName");
  console.log(token);
  if (!token) {
    return NextResponse.json({
      message: "Not logged in",
    }, {
      status: 401,
    })
  }

  try {
    cookieStore.delete("myTokenName");
    // cookieStore.delete("userRole");

    const response = NextResponse.json(
      {
        message: "Logged out",
        status: 200
      },
      {
        status: 200,
      }
    );

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error.message, {
      status: 500,
    });
  }


}