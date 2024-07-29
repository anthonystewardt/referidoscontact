import prisma from '@/libs/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

// Method: POST
async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.email || !body.password) {
      return NextResponse.json({
        message: 'Email and password are required',
        status: 400
      }, {
        status: 400
      });
    }

    // Check if admin already exists
    const adminFound = await prisma.admin.findUnique({
      where: {
        email: body.email
      }
    });

    if (adminFound) {
      return NextResponse.json({
        message: 'Admin already exists',
        status: 400
      }, {
        status: 400
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // Create new admin
    const newAdmin = await prisma.admin.create({
      data: {
        ...body,
        username: body.email,
        role: body.role || 'admin',
        password: hashedPassword
      }
    });

    return NextResponse.json({
      admin: newAdmin,
      status: 200
    }, {
      status: 200
    });

  } catch (error) {
    // Handle errors
    console.error('Error creating admin:', error);
    return NextResponse.json({
      message: 'Internal server error',
      status: 500
    }, {
      status: 500
    });
  }
}


async function GET(request: Request) {
  try {
    const admins = await prisma.admin.findMany();
    return NextResponse.json({
      admins,
      status: 200
    }, {
      status: 200
    });

  } catch (error) {
    // Handle errors
    console.error('Error fetching admins:', error);
    return NextResponse.json({
      message: 'Internal server error',
      status: 500
    }, {
      status: 500
    });
  }
}


export { POST, GET };
