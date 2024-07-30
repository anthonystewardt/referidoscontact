import prisma from '@/libs/db'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcrypt'

interface Segments {
  params: {
    id: string
  }
}

// change password
export async function PUT(request: Request, {params}: Segments) { 
  try {
    const { id } = params
    const body = await request.json()
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        Referreal: true
      }
    })

    if(!user){
      return NextResponse.json({
        error: "User not found",
        status: 404
      }, {
        status: 404
      })
    }

    // encrypt password
    const password = await bcrypt.hash(body.password, 10)

    const userUpdated = await prisma.user.update({
      where: {
        id
      },
      data: {
        password
      }
    })

    return NextResponse.json({
      user: userUpdated,
      message: "Password updated",
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