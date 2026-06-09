// Necessary to setup /prisma.config.ts AND /prisma/tsconfig.ts
import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Language } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const seedUser = {
  displayName: "UserA",
  email: "usera@example.com",
  password: "Password123!",
  language: Language.ja,
  defaultYourCurrency: "JPY",
};

const tripSeeds = [
  {
    title: "Tokyo Summer Trip",
    startDay: new Date("2026-07-10T09:00:00.000Z"),
    budget: 180000,
    yourCurrency: "JPY",
    defaultLocalCurrency: "JPY",
  },
  {
    title: "Seoul Food Weekend",
    startDay: new Date("2026-08-14T09:00:00.000Z"),
    budget: 900000,
    yourCurrency: "JPY",
    defaultLocalCurrency: "KRW",
  },
  {
    title: "Taipei Workation",
    startDay: new Date("2026-09-03T09:00:00.000Z"),
    budget: 120000,
    yourCurrency: "JPY",
    defaultLocalCurrency: "TWD",
  },
  {
    title: "Bangkok Short Stay",
    startDay: new Date("2026-10-01T09:00:00.000Z"),
    budget: 140000,
    yourCurrency: "JPY",
    defaultLocalCurrency: "THB",
  },
  {
    title: "Paris Museums",
    startDay: new Date("2026-11-05T09:00:00.000Z"),
    budget: 320000,
    yourCurrency: "JPY",
    defaultLocalCurrency: "EUR",
  },
  {
    title: "New York City Break",
    startDay: new Date("2026-12-02T09:00:00.000Z"),
    budget: 350000,
    yourCurrency: "JPY",
    defaultLocalCurrency: "USD",
  },
  {
    title: "Sydney New Year",
    startDay: new Date("2026-12-29T09:00:00.000Z"),
    budget: 410000,
    yourCurrency: "JPY",
    defaultLocalCurrency: "AUD",
  },
  {
    title: "Vancouver Spring Visit",
    startDay: new Date("2027-03-18T09:00:00.000Z"),
    budget: 270000,
    yourCurrency: "JPY",
    defaultLocalCurrency: "CAD",
  },
];

const firstTripEvents = [
  {
    date: new Date("2026-07-10T12:00:00.000Z"),
    title: "Narita Express",
    detail: "Airport transfer to central Tokyo",
    localCurrency: "JPY",
    priceLocalCurrency: 3070,
    priceYourCurrency: 3070,
  },
  {
    date: new Date("2026-07-10T19:00:00.000Z"),
    title: "Shinjuku Hotel Check-in",
    detail: "Three nights at a business hotel",
    localCurrency: "JPY",
    priceLocalCurrency: 36000,
    priceYourCurrency: 36000,
  },
  {
    date: new Date("2026-07-11T01:00:00.000Z"),
    title: "Sushi Breakfast",
    detail: "Breakfast near Tsukiji",
    localCurrency: "JPY",
    priceLocalCurrency: 2800,
    priceYourCurrency: 2800,
  },
  {
    date: new Date("2026-07-11T05:00:00.000Z"),
    title: "Tokyo Metro Pass",
    detail: "72-hour subway pass",
    localCurrency: "JPY",
    priceLocalCurrency: 1500,
    priceYourCurrency: 1500,
  },
  {
    date: new Date("2026-07-11T09:00:00.000Z"),
    title: "teamLab Planets",
    detail: "Museum ticket reservation",
    localCurrency: "JPY",
    priceLocalCurrency: 4200,
    priceYourCurrency: 4200,
  },
  {
    date: new Date("2026-07-12T03:00:00.000Z"),
    title: "Asakusa Lunch",
    detail: "Tempura lunch in Asakusa",
    localCurrency: "JPY",
    priceLocalCurrency: 2400,
    priceYourCurrency: 2400,
  },
  {
    date: new Date("2026-07-12T11:00:00.000Z"),
    title: "Skytree Ticket",
    detail: "Observation deck entry",
    localCurrency: "JPY",
    priceLocalCurrency: 3100,
    priceYourCurrency: 3100,
  },
  {
    date: new Date("2026-07-13T01:00:00.000Z"),
    title: "Airport Limousine Bus",
    detail: "Return trip to the airport",
    localCurrency: "JPY",
    priceLocalCurrency: 3600,
    priceYourCurrency: 3600,
  },
];

async function main() {
  const hashedPassword = await bcrypt.hash(seedUser.password, 12);

  // $transaction -> 複数のDB処理を1つの処理として行う。全て成功or全て失敗のどちらかに倒れる。
  // txはtransactionの意味。バックエンドで使っているprisma.use.findMany()などの「prisma」部分と同じ役割
  const createdUser = await prisma.$transaction(async (tx) => {
    await tx.user.deleteMany({
      where: {
        email: seedUser.email,
      },
    });

    return tx.user.create({
      data: {
        displayName: seedUser.displayName,
        email: seedUser.email,
        language: seedUser.language,
        password: hashedPassword,
        defaultYourCurrency: seedUser.defaultYourCurrency,
        trips: {
          create: tripSeeds.map((trip, index) => ({
            ...trip,
            events: index === 0 ? { create: firstTripEvents } : undefined,
          })),
        },
      },
      include: {
        trips: {
          include: {
            events: true,
          },
        },
      },
    });
  });

  const eventCount = createdUser.trips.reduce(
    (count, trip) => count + trip.events.length,
    0,
  );

  console.log(
    `Seeded ${createdUser.displayName}: ${createdUser.trips.length} trips, ${eventCount} events`,
  );
}

main()
  .catch((error) => {
    console.error("Seeding failed");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
