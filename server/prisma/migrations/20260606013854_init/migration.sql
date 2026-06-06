/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "trips" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "startDay" TIMESTAMP(3) NOT NULL,
    "budget" INTEGER NOT NULL,
    "yourCurrency" TEXT NOT NULL,
    "defaultLocalCurrency" TEXT,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);
