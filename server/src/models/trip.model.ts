import { prisma } from "../lib/prisma";
import { CreateTripBody, UpdateTripBody } from "../schemas/trip.schema";

const getAll = async (userId: number) => {
  const allTrips = await prisma.trip.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc", // 新しい順に返す
    },
  });
  return allTrips;
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
    data: data,
  });
  return updatedTrip;
};

export default {
  getAll,
  add,
  remove,
  update,
};
