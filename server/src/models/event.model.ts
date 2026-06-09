import { prisma } from "../lib/prisma";
import { CreateEventBody, UpdateEventBody } from "../schemas/event.schema";

const getAll = async (userId: number, tripId: number) => {
  const targetTrip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
  });
  if (!targetTrip) return null;
  const allEvents = await prisma.event.findMany({
    where: { tripId },
    orderBy: {
      date: "desc",
    },
  });
  return allEvents;
};

// priceYourCurrencyとappliedExchangeRateはフロントから送られてくるデータではなくバックエンドで算出される値であるため型定義は以下のようにmodel内で拡張する形で定義している
type AddEventInput = CreateEventBody & {
  priceYourCurrency: number;
  appliedExchangeRate: number;
};

const add = async (userId: number, tripId: number, data: AddEventInput) => {
  const targetTrip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
  });
  if (!targetTrip) return null;
  const newEvent = await prisma.event.create({
    data: {
      tripId,
      ...data,
      date: new Date(data.date),
    },
  });
  return newEvent;
};

// tripsテーブルからテーブルからユーザの自国通貨データを取得
const getYourCurrency = async (userId: number, tripId: number) => {
  const targetTrip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
    select: {
      yourCurrency: true,
    },
  });

  return targetTrip;
};

const remove = async (userId: number, eventId: number) => {
  const targetEvent = await prisma.event.findFirst({
    where: {
      id: eventId,
      trip: {
        userId,
      },
    },
  });
  if (!targetEvent) return null;
  const deletedEvent = await prisma.event.delete({
    where: { id: eventId },
  });
  return deletedEvent;
};

const update = async (
  userId: number,
  eventId: number,
  data: UpdateEventBody,
) => {
  const targetEvent = await prisma.event.findFirst({
    where: {
      id: eventId,
      trip: {
        userId,
      },
    },
  });
  if (!targetEvent) return null;
  const updatedEvent = await prisma.event.update({
    where: { id: eventId },
    data: {
      ...data,
      date: data.date ? new Date(data.date) : undefined,
    },
  });
  return updatedEvent;
};

export default {
  getAll,
  add,
  getYourCurrency,
  remove,
  update,
};
