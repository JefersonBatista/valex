import { Router } from "express";

import * as cardController from "../controllers/cardController.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import cardSchema from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post("/cards", validateSchema(cardSchema), cardController.create);

export default cardRouter;
