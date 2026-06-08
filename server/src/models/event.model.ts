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

const add = async (userId: number, tripId: number, data: CreateEventBody) => {
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

const update = async (userId: number, eventId: number, data: UpdateEventBody) => {
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
  remove,
  update,
};
