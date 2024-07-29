import prisma from '@/libs/db';
import { NextResponse, NextRequest } from 'next/server'


interface Segments {
  params: {
    id: string
  }
}


export async function PUT(request: Request, {params}: Segments) { 
  try {
    const {id} = params
    // body
    const body = await request.json()

    const referreals = await prisma.referreal.findUnique({
      where: {
        id: id
      }
    })

    if(!referreals) {
      return NextResponse.json({
        message: 'Referreal not found',
        status: 404
      }, {
        status: 404
      })
    }

    const referrealUpdate = await prisma.referreal.update({
      where: {
        id: id
      },
      data: body
    })

    return NextResponse.json({
      referrealUpdate,
      status: 200
    }, {
      status: 200
    })

  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error,
      status: 500
    }, {
      status: 500
    })
  }
  
}