import { Router } from "express";

import cardRouter from "./cardRouter.js";
import paymentRouter from "./paymentRouter.js";

const routes = Router();

routes.use(cardRouter);
routes.use(paymentRouter);

export default routes;
