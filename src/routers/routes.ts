import { Router } from "express";

import cardRouter from "./cardRouter.js";

const routes = Router();

routes.use(cardRouter);

export default routes;
