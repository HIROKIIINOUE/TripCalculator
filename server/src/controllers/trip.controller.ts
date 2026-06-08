import { Request, Response } from "express";
import tripModel from "../models/trip.model";
import { handlePrismaUserError } from "../lib/prisma.errors";
import { createTripSchema, updateTripSchema } from "../schemas/trip.schema";

const getAllTrip = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const trips = await tripModel.getAll(Number(userId));
    res.status(200).json(trips);
  } catch (error) {
    if (handlePrismaUserError(error, res)) {
      return;
    }
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

const getUniqueTrip = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;
  // Numberに変換したtripIdが自然数かどうかを確認する。
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    res.status(400).json({ message: "this trip ID is invalid" });
    return;
  }

  try {
    const trip = await tripModel.getUnique(Number(userId), Number(id));
    if (!trip) {
      res.status(404).json({ message: "The trip is not found" });
      return;
    }
    res.status(200).json(trip);
  } catch (error) {
    if (handlePrismaUserError(error, res)) {
      return;
    }
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

const addTrip = async (req: Request, res: Response) => {
  const userId = req.userId;
  const parsed = createTripSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.issues });
    return;
  }
  const { title, startDay, budget, yourCurrency } = parsed.data;
  try {
    const newTrip = await tripModel.add(Number(userId), {
      title,
      startDay,
      budget,
      yourCurrency,
    });
    if (!newTrip) {
      res.status(400).json({ message: "Failed to add trip" });
      return;
    }
    res.status(201).json(newTrip);
  } catch (error) {
    if (handlePrismaUserError(error, res)) {
      return;
    }
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

const deleteTrip = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;

  // Numberに変換したtripIdが自然数かどうかを確認する。
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    res.status(400).json({ message: "this trip ID is invalid" });
    return;
  }
  try {
    const deletedTrip = await tripModel.remove(Number(userId), Number(id));
    if (!deletedTrip) {
      res.status(404).json({ message: "Failed to delete the trip" });
      return;
    }
    res.status(200).json(deletedTrip);
  } catch (error) {
    if (handlePrismaUserError(error, res)) {
      return;
    }
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

const updateTrip = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;
  const parsed = updateTripSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.issues });
    return;
  }
  const data = parsed.data;

  // Numberに変換したtripIdが自然数かどうかを確認する。
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    res.status(400).json({ message: "this trip ID is invalid" });
    return;
  }
  try {
    const updatedTrip = await tripModel.update(
      Number(userId),
      Number(id),
      data,
    );
    if (!updatedTrip) {
      res.status(404).json({ message: "Failed to update the trip" });
      return;
    }
    res.status(200).json(updatedTrip);
  } catch (error) {
    if (handlePrismaUserError(error, res)) {
      return;
    }
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

export default {
  getAllTrip,
  getUniqueTrip,
  addTrip,
  deleteTrip,
  updateTrip,
};
