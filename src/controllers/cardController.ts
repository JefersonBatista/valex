import { Request, Response } from "express";

import * as cardService from "../services/cardService.js";

export async function create(req: Request, res: Response) {
  const apiKey = req.headers["x-api-key"]?.toString();

  if (!apiKey) {
    return res.status(401).send("Nenhuma chave de API informada");
  }

  const { employeeId, type } = req.body;

  const securityCode = await cardService.create({ employeeId, type, apiKey });

  res.status(201).send({ securityCode });
}

export async function activate(req: Request, res: Response) {
  const securityCode = req.headers["security-code"]?.toString();

  if (!securityCode) {
    return res.status(401).send("Nenhum código de segurança informado");
  }

  const id: number = +req.params.id;

  const password: string = req.body.password;

  if (!password) {
    return res.status(422).send("Nenhuma senha fornecida para o cartão");
  }

  await cardService.activate({ id, securityCode, password });
  res.sendStatus(200);
}
