-- AlterTable
ALTER TABLE "Referreal" ADD COLUMN     "mountPaid" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "typePaid" TEXT NOT NULL DEFAULT 'credit';
