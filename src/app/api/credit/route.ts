import prisma from '@/libs/db';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 
  try {
    const body = await request.json()
    const credit = await prisma.creditCard.create({
      data: {
        cardName: body.cardName,
        cardNumber: body.cardNumber,
        mount: body.mount,
        userId: body.userId
      }
    })
    return NextResponse.json(credit, { status: 200 })
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Error al obtener la informaciòn" }, { status: 500 })
  }
}