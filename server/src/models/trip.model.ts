import { prisma } from "../lib/prisma";
import { CreateTripBody, UpdateTripBody } from "../schemas/trip.schema";

const getAll = async (userId: number) => {
  const allTrips = await prisma.trip.findMany({
    where: { userId },
    orderBy: {
      startDay: "desc", // 新しい順に返す
    },
  });
  return allTrips;
};

const getUnique = async (userId: number, tripId: number) => {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId, userId },
  });
  if (!trip) {
    return null;
  }
  return trip;
};

const add = async (userId: number, data: CreateTripBody) => {
  const newTrip = await prisma.trip.create({
    data: {
      userId,
      ...data,
      startDay: new Date(data.startDay),
    },
  });
  return newTrip;
};

const remove = async (userId: number, tripId: number) => {
  const targetTrip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
  });
  if (!targetTrip) return null;
  const deletedTrip = await prisma.trip.delete({
    where: { id: tripId },
  });
  return deletedTrip;
};

const update = async (userId: number, tripId: number, data: UpdateTripBody) => {
  const targetTrip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
  });
  if (!targetTrip) return null;
  const updatedTrip = await prisma.trip.update({
    where: { id: tripId },
    data: {
      ...data,
      startDay: data.startDay ? new Date(data.startDay) : undefined, // undefinedの場合はDBを更新しない
    },
  });
  return updatedTrip;
};

export default {
  getAll,
  getUnique,
  add,
  remove,
  update,
};
