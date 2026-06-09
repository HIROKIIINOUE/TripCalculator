import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import eventController from "../controllers/event.controller";

const eventRouter = Router();

eventRouter.get(
  "/preview/:tripId",
  authMiddleware,
  eventController.getExchangeRatePreview,
);
eventRouter.get("/:tripId", authMiddleware, eventController.getAllEvent);
eventRouter.post("/:tripId", authMiddleware, eventController.addEvent);
eventRouter.patch("/:id", authMiddleware, eventController.updateEvent);
eventRouter.delete("/:id", authMiddleware, eventController.deleteEvent);

export default eventRouter;
