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

// method PUT
export async function PUT(request: Request, {params}: Segments) {
  try {
    const {id} = params
    const referreal = await prisma.referreal.findUnique({
      where: {
        id: id
      }
    })
    if(!referreal) {
      return NextResponse.json({
        message: 'Referreal not found',
        status: 404
      }, {
        status: 404
      })
    }

    referreal.active = !referreal.active
    await prisma.referreal.update({
      where: {
        id: id
      },
      data: referreal
    })

    return NextResponse.json({
      message: 'Referreal updated',
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


// method DELETE
export async function DELETE(request: Request, {params}: Segments) {
  try {
    const {id} = params
    const referreal = await prisma.referreal.findUnique({
      where: {
        id: id
      }
    })
    if(!referreal) {
      return NextResponse.json({
        message: 'Referreal not found',
        status: 404
      }, {
        status: 404
      })
    }

    await prisma.referreal.delete({
      where: {
        id: id
      }
    })

    return NextResponse.json({
      message: 'Referreal deleted',
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







