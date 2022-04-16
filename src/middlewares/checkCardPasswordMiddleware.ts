import { NextFunction, Request, Response } from "express";

import * as cardService from "../services/cardService.js";

export async function checkCardPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cardId: number = +req.body.cardId;
  const password: string = req.body.password;

  await cardService.checkCardPassword(cardId, password);
}
