import prisma from '@/libs/db';
import { NextResponse, NextRequest } from 'next/server'


interface Props {
  params: {
    id: string
  }
}

export async function PUT(request: Request, {params}: Props) { 
  try {
    const { id } = params;
    const body = await request.json();

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: body
    });

    return NextResponse.json({
      user: updatedUser,
      status: 200
    }, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Internal server error',
      status: 500
    }, {
      status: 500
    });
  }
}

// localhost:3000/api/users/admin/[id]
export async function DELETE(request: Request, {params}: Props) {
  try {
    const { id } = params;

    // Delete user
    await prisma.admin.delete({
      where: { id }
    });

    return NextResponse.json({
      message: 'User deleted',
      status: 200
    }, {
      status: 200
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: 'Internal server error',
      status: 500
    }, {
      status: 500
    });
  }
}