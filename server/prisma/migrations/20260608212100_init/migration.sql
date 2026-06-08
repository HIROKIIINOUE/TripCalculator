-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "detail" TEXT NOT NULL,
    "local_currency" TEXT NOT NULL,
    "price_local_currency" TEXT NOT NULL,
    "priceYourCurrency" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Event_trip_id_idx" ON "Event"("trip_id");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;
