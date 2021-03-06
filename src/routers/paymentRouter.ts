import { Router } from "express";

import * as paymentController from "../controllers/paymentController.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import paymentSchema from "../schemas/paymentSchema.js";
import onlinePaymentSchema from "../schemas/onlinePaymentSchema.js";
import checkCardPassword from "../middlewares/checkCardPasswordMiddleware.js";

const paymentRouter = Router();

paymentRouter.post(
  "/payments",
  validateSchema(paymentSchema),
  checkCardPassword,
  paymentController.perform
);

paymentRouter.post(
  "/online-payments",
  validateSchema(onlinePaymentSchema),
  paymentController.onlinePerform
);

export default paymentRouter;
