import { Request, Response } from "express";

import * as cardService from "../services/cardService.js";

export async function create(req: Request, res: Response) {
  const { "x-api-key": apiKey } = req.headers;

  if (!apiKey) {
    res.status(401).send("Nenhuma chave de API informada");
  }

  const cardData = { ...req.body, apiKey };

  await cardService.create(cardData);

  res.sendStatus(201);
}
