import { Router } from "express";

import * as cardController from "../controllers/cardController.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import cardSchema from "../schemas/cardSchema.js";
import validateApiKey from "../middlewares/apiKeyValidationMiddleware.js";

const cardRouter = Router();

cardRouter.post(
  "/cards",
  validateSchema(cardSchema),
  validateApiKey,
  cardController.create
);

cardRouter.patch("/cards/:id/activate", cardController.activate);

cardRouter.get("/cards/:id", cardController.getBalanceAndTransactions);

export default cardRouter;
