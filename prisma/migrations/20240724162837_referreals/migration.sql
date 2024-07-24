-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "credit" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Referreal" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "nameReferreal" TEXT NOT NULL,
    "lastnameReferreal" TEXT NOT NULL,
    "emailReferreal" TEXT NOT NULL,
    "phoneReferreal" TEXT NOT NULL,
    "dniReferreal" TEXT NOT NULL,
    "positionReferreal" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Referreal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Referreal_code_key" ON "Referreal"("code");

-- AddForeignKey
ALTER TABLE "Referreal" ADD CONSTRAINT "Referreal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
