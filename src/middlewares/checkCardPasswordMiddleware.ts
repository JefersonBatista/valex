import { NextFunction, Request, Response } from "express";

import * as cardService from "../services/cardService.js";

export default async function checkCardPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cardId: number = +req.body.cardId;
  const password: string = req.body.password;

  if (!cardId || !password) {
    return res
      .status(400)
      .send("Todos os campos devem ser corretamente preenchidos");
  }

  await cardService.checkCardPassword(cardId, password);

  next();
}
