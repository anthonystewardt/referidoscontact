import prisma from '@/libs/db';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request, {params}: Segments) { 

  try {
    const {id} = params;
  const creditCard = await prisma.creditCard.findFirst({
    where: {
      userId: id
    }
  })
  if(!creditCard) {
    return NextResponse.json({
      message: 'Credit Card not found',
      status: 404
    }, {
      status: 404
    })}

  return NextResponse.json({
    creditCard,
    status: 200
  }, {
    status: 200
  })


  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error,
      message: "Internal Server Error",
      status: 500
    }, {
      status: 500
    })
  }
}

interface Segments {
  params: {
    id: string
  }
}

export async function POST(request: Request, {params}: Segments) { 
  try {
    const {id} = params;
    const body = await request.json();

  
    const existCreditCardByUserId = await prisma.creditCard.findFirst({
      where: {
        id: id
      }
    })

    if(existCreditCardByUserId) {
      return NextResponse.json({
        message: 'Credit Card already exists',
        status: 400
      }, {
        status: 400
      })
    }

    const creditCard = await prisma.creditCard.create({
      data: {
        userId: id,
        ...body
      }
    })

    return NextResponse.json({
      creditCard,
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


// method PUT
export async function PUT(request: Request, {params}: Segments) { 
  try {
    const {id} = params;
    const body = await request.json();

    const creditCard = await prisma.creditCard.update({
      where: {
        id
      },
      data: {
        ...body
      }
    })

    return NextResponse.json({
      creditCard,
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