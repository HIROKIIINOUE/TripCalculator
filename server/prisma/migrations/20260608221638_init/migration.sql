/*
  Warnings:

  - Changed the type of `price_local_currency` on the `events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `priceYourCurrency` on the `events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "price_local_currency",
ADD COLUMN     "price_local_currency" INTEGER NOT NULL,
DROP COLUMN "priceYourCurrency",
ADD COLUMN     "priceYourCurrency" INTEGER NOT NULL;
