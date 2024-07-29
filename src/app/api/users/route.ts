import prisma from '@/libs/db';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

  try {
    const users = await prisma.user.findMany()
    return NextResponse.json({ users, status: 200 }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}