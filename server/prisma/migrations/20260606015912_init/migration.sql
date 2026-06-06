/*
  Warnings:

  - You are about to drop the column `createdAt` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `defaultLocalCurrency` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `startDay` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `yourCurrency` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `start_day` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `your_currency` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trips" DROP COLUMN "createdAt",
DROP COLUMN "defaultLocalCurrency",
DROP COLUMN "startDay",
DROP COLUMN "updatedAt",
DROP COLUMN "yourCurrency",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "default_local_currency" TEXT,
ADD COLUMN     "start_day" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "your_currency" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "display_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT 'en',
    "password" TEXT NOT NULL,
    "hashed_refresh_token" TEXT,
    "default_your_currency" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "trips_user_id_idx" ON "trips"("user_id");

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
