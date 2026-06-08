/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_trip_id_fkey";

-- DropTable
DROP TABLE "Event";

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "detail" TEXT NOT NULL,
    "local_currency" TEXT NOT NULL,
    "price_local_currency" TEXT NOT NULL,
    "priceYourCurrency" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "events_trip_id_idx" ON "events"("trip_id");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;
