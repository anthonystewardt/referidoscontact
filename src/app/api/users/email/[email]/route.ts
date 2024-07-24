import prisma from '@/libs/db';
import { NextResponse, NextRequest } from 'next/server'

interface Segments {
  params: {
    email: string
  }
}

export async function GET(request: Request, {params}: Segments) { 

  try {
    const {email} = params
    const users = await prisma.user.findUnique({
      where: {
        email
      },
      include: {
        Referreal: true
      }
    })
    return NextResponse.json({
      users,
      status: 200
    }, {
      status: 200
    })
  } catch (error) {
    return NextResponse.json({
      error,
      status: 500
    }, {
      status: 500
    })
  }

}