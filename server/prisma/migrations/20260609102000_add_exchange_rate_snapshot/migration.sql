/*
  Warnings:

  - Added the required column `applied_exchange_rate` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN "applied_exchange_rate" DECIMAL(18,8) NOT NULL;

-- CreateTable
CREATE TABLE "exchange_rate_snapshots" (
    "id" SERIAL NOT NULL,
    "base_currency" TEXT NOT NULL,
    "rates_json" JSONB NOT NULL,
    "fetched_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exchange_rate_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exchange_rate_snapshots_base_currency_key" ON "exchange_rate_snapshots"("base_currency");
