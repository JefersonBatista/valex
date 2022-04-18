import { Request, Response } from "express";

import * as paymentService from "../services/paymentService.js";

export async function perform(req: Request, res: Response) {
  const { cardId, businessId, amount } = req.body;

  await paymentService.perform({ cardId, businessId, amount });

  res.sendStatus(201);
}

export async function onlinePerform(req: Request, res: Response) {
  const securityCode = req.headers["security-code"]?.toString();

  if (!securityCode) {
    return res.status(401).send("Nenhum código de segurança informado");
  }

  const { number, name, expirationDate, businessId, amount } = req.body;

  await paymentService.onlinePerform({
    number,
    name,
    expirationDate,
    securityCode,
    businessId,
    amount,
  });

  res.sendStatus(201);
}
