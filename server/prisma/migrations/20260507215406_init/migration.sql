-- CreateEnum
CREATE TYPE "Language" AS ENUM ('En', 'Ja', 'Fr');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'En';
