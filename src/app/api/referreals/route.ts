import prisma from '@/libs/db';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 
  try {
    const referreal = await prisma.referreal.findMany({
      include: {
        User: true
      }
    })
    return NextResponse.json({ referreal, status: 200 }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
  
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const userFound = await prisma.user.findUnique({
      where: {
        id: data.userId
      }
    })

    // return NextResponse.json({ data }, { status: 200 })

    if(!userFound) {
      return NextResponse.json({ message: 'Usuario no encontrado', status: 404 }, { status: 404 })
    }

    const referObject = await prisma.referreal.create({
      data: {
        nameReferreal: data.names,
        lastnameReferreal: data.lastnames,
        emailReferreal: data.email,
        phoneReferreal: data.phone,
        dniReferreal: data.dni,
        positionReferreal: data.job,
        userId: data.userId,
        active: false,
        code: data.userId
      }
    })

    return NextResponse.json({ message: "se guardo el referido", status: 201, refer: referObject }, { status: 200 })
  } catch (error) {
    console.log({error})
    return NextResponse.json({ message: error }, { status: 500 })
  }
}