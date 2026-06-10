import { Request, Response } from "express";
import eventModel from "../models/event.model";
import { handlePrismaUserError } from "../lib/prisma.errors";
import { createEventSchema, updateEventSchema } from "../schemas/event.schema";
import {
  CONVERTED_PRICE_TOO_LARGE_MESSAGE,
  createEventWithConvertedPrice,
  getEventExchangeRatePreview,
  updateEventWithConvertedPrice,
} from "../services/event.service";

const getAllEvent = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { tripId } = req.params;

  if (!Number.isInteger(Number(tripId)) || Number(tripId) <= 0) {
    res.status(400).json({ message: "this trip ID is invalid" });
    return;
  }
  try {
    const events = await eventModel.getAll(Number(userId), Number(tripId));
    if (!events) {
      res.status(404).json({ message: "Failed to get all events" });
      return;
    }
    res.status(200).json(events);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === CONVERTED_PRICE_TOO_LARGE_MESSAGE
    ) {
      res.status(400).json({ message: CONVERTED_PRICE_TOO_LARGE_MESSAGE });
      return;
    }
    if (handlePrismaUserError(error, res)) {
      return;
    }
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

// 「ユーザID」「旅行ID」ユーザがイベントモーダルで入力した「現地通貨」を受け取り、プレビューUIに必要な「ローカル通貨」「ユーザ自国通貨」「換算に使う２通貨間の比率」を返す
const getExchangeRatePreview = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { tripId } = req.params;
  const localCurrency =
    typeof req.query.localCurrency === "string" ? req.query.localCurrency : "";

  if (!Number.isInteger(Number(tripId)) || Number(tripId) <= 0) {
    res.status(400).json({ message: "this trip ID is invalid" });
    return;
  }

  if (!localCurrency.trim()) {
    res.status(400).json({ message: "localCurrency is required" });
    return;
  }

  try {
    const preview = await getEventExchangeRatePreview(
      Number(userId),
      Number(tripId),
      localCurrency,
    );

    if (!preview) {
      res.status(404).json({ message: "Failed to get exchange rate preview" });
      return;
    }

    res.status(200).json(preview);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === CONVERTED_PRICE_TOO_LARGE_MESSAGE
    ) {
      res.status(400).json({ message: CONVERTED_PRICE_TOO_LARGE_MESSAGE });
      return;
    }
    if (handlePrismaUserError(error, res)) {
      return;
    }
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

const addEvent = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { tripId } = req.params;
  const parsed = createEventSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.issues });
    return;
  }
  if (!Number.isInteger(Number(tripId)) || Number(tripId) <= 0) {
    res.status(400).json({ message: "this trip ID is invalid" });
    return;
  }
  const { date, title, detail, localCurrency, priceLocalCurrency } =
    parsed.data;
  try {
    const newEvent = await createEventWithConvertedPrice(
      Number(userId),
      Number(tripId),
      {
        date,
        title,
        detail,
        localCurrency,
        priceLocalCurrency,
      },
    );
    if (!newEvent) {
      res.status(400).json({ message: "Failed to add event" });
      return;
    }
    res.status(201).json(newEvent);
  } catch (error) {
    if (handlePrismaUserError(error, res)) {
      return;
    }
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

const deleteEvent = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;

  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    res.status(400).json({ message: "this event ID is invalid" });
    return;
  }
  try {
    const deletedEvent = await eventModel.remove(Number(userId), Number(id));
    if (!deletedEvent) {
      res.status(404).json({ message: "Failed to delete the event" });
      return;
    }
    res.status(200).json(deletedEvent);
  } catch (error) {
    if (handlePrismaUserError(error, res)) {
      return;
    }
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

const updateEvent = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;
  const parsed = updateEventSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.issues });
    return;
  }
  const data = parsed.data;

  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    res.status(400).json({ message: "this event ID is invalid" });
    return;
  }
  try {
    const updatedEvent = await updateEventWithConvertedPrice(
      Number(userId),
      Number(id),
      data,
    );
    if (!updatedEvent) {
      res.status(404).json({ message: "Failed to update the event" });
      return;
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    if (handlePrismaUserError(error, res)) {
      return;
    }
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

export default {
  getAllEvent,
  getExchangeRatePreview,
  addEvent,
  deleteEvent,
  updateEvent,
};
