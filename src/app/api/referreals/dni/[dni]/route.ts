import prisma from '@/libs/db';
import { NextResponse, NextRequest } from 'next/server'

interface Segments {
  params: {
    dni: string
  }
}

export async function GET(request: Request, { params }: Segments) { 
  try {
    const {dni} = params

    const referals = await prisma.referreal.findMany({
      where: {
        dniReferreal: dni
      }
    })

    return NextResponse.json({
      status: 'success',
      data: referals,
      dni
    })

  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Error al obtener los referidos', 
    })
  }
}