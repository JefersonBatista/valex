import { Request, Response } from "express";

import * as paymentService from "../services/paymentService.js";

export async function perform(req: Request, res: Response) {
  const { cardId, businessId, amount } = req.body;

  await paymentService.perform({ cardId, businessId, amount });

  res.sendStatus(201);
}
