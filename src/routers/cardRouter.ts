import { Router } from "express";

import * as cardController from "../controllers/cardController.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import cardSchema from "../schemas/cardSchema.js";
import validateApiKey from "../middlewares/apiKeyValidationMiddleware.js";
import checkCardPassword from "../middlewares/checkCardPasswordMiddleware.js";

const cardRouter = Router();

cardRouter.post(
  "/cards",
  validateSchema(cardSchema),
  validateApiKey,
  cardController.create
);

cardRouter.patch("/cards/:id/activate", cardController.activate);

cardRouter.get("/cards/:id/balance", cardController.getBalanceAndTransactions);

cardRouter.post("/cards/:id/recharge", validateApiKey, cardController.recharge);

cardRouter.patch("/cards/block", checkCardPassword, cardController.block);

cardRouter.patch("/cards/unlock", checkCardPassword, cardController.unlock);

export default cardRouter;
