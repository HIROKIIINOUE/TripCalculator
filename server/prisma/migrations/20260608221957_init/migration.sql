/*
  Warnings:

  - You are about to drop the column `priceYourCurrency` on the `events` table. All the data in the column will be lost.
  - Added the required column `price_your_currency` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "priceYourCurrency",
ADD COLUMN     "price_your_currency" INTEGER NOT NULL;
