import prisma from "@/libs/db";
import { NextResponse, NextRequest } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

export async function GET(request: Request) {
  try {
    const referreal = await prisma.referreal.findMany({
      include: {
        User: true,
      },
    });
    return NextResponse.json({ referreal, status: 200 }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { message: "No se ha encontrado el archivo", status: 404 },
        { status: 404 }
      );
    }

    const buffer = Buffer.from(await (file as Blob).arrayBuffer());
    const filename = (file as File).name.replaceAll(" ", "_");
    const directoryPath = path.join(process.cwd(), "public/assets/");

    try {
      await mkdir(directoryPath, { recursive: true });
    } catch (dirError) {
      console.error("Error creating directory:", dirError);
      return NextResponse.json(
        { message: "Error creating directory", error: dirError },
        { status: 500 }
      );
    }

    const filePath = path.join(directoryPath, filename);

    try {
      await writeFile(filePath, buffer);
    } catch (fileError) {
      console.error("Error writing file:", fileError);
      return NextResponse.json(
        { message: "Error writing file", error: fileError },
        { status: 500 }
      );
    }

    const data = JSON.parse(formData.get("data") as string);

    const userFound = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });

    if (!userFound) {
      return NextResponse.json(
        { message: "Usuario no encontrado", status: 404 },
        { status: 404 }
      );
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
        code: data.userId,
        cvPath: path.join("public/assets/", filename), // Assuming cvPath is a string field in your prisma schema
      },
    });

    return NextResponse.json(
      { message: "Se guardó el referido", status: 201, refer: referObject },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}
