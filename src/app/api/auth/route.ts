import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcrypt';
import prisma from '@/libs/db';


export async function GET(request: Request) { 

  return new Response(JSON.stringify({
    message: 'Hello World'
  }), { status: 200 } );
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    // return NextResponse.json({ data }, { status: 200 })
    const userFound = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    })

    // check if the dni is already registered
    const userFoundDni = await prisma.user.findUnique({
      where: {
        dni: data.dni
      }
    })

    if(userFoundDni) {
      return NextResponse.json({ message: 'DNI ya està registrado', status: 400 }, { status: 400 })
    }

    if(userFound) {
      return NextResponse.json({ message: 'Usuario ya existe', status: 400 }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)
    const newUser = await prisma.user.create({
      data: {
        dni: data.dni,
        name: data.names,
        lastname: data.lastnames,
        email: data.email,
        password: hashedPassword,
        country: data.country,
        phone: data.cellphone,
        isEmployee: data.isEmployee,
        role: 'user',
        username: data.email,
        codePhone: data.code
      }
    })

    const { password, ...user } = newUser

    return NextResponse.json({ user, message: "Usuario creado", status:201 }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}