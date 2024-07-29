import prisma from '@/libs/db';
import { NextResponse, NextRequest } from 'next/server'


interface Segments {
  params: {
    id: string;
  }
}

export async function GET(request: Request, { params }: Segments) { 
  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: {
        dni: id
      }
    });

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: 'User not found'
      })
    }

    return NextResponse.json({
      status: 200,
      data: [user]
    })
    
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error'
    })
  }
}