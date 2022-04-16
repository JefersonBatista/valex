import { NextFunction, Request, Response } from "express";
import * as companyService from "../services/companyService.js";

export default async function validateApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers["x-api-key"]?.toString();

  if (!apiKey) {
    return res.status(401).send("Nenhuma chave de API informada");
  }

  const company = await companyService.getCompanyByApiKey(apiKey);

  res.locals.company = company;

  next();
}
