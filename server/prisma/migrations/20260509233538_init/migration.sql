/*
  Warnings:

  - The values [En,Ja,Fr] on the enum `Language` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Language_new" AS ENUM ('en', 'ja', 'fr');
ALTER TABLE "public"."User" ALTER COLUMN "language" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "language" TYPE "Language_new" USING ("language"::text::"Language_new");
ALTER TYPE "Language" RENAME TO "Language_old";
ALTER TYPE "Language_new" RENAME TO "Language";
DROP TYPE "public"."Language_old";
ALTER TABLE "User" ALTER COLUMN "language" SET DEFAULT 'en';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "language" SET DEFAULT 'en';
