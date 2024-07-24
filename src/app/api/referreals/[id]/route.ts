import prisma from '@/libs/db';
import { NextResponse, NextRequest } from 'next/server'

interface Segments {
  params: {
    id: string
  }
}

export async function GET(request: Request, {params}: Segments) { 
  try {
    const {id} = params
    const referreals = await prisma.referreal.findMany({
      where: {
        userId: id
      }
    })
    return NextResponse.json({
      referreals,
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