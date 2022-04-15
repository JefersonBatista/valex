import { NextFunction, Request, Response } from "express";

export default function errorHandling(
  error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { type, message } = error;
  if (type === "unauthorized") return res.status(401).send(message);
  if (type === "not_found") return res.status(404).send(message);
  if (type === "conflict") return res.status(409).send(message);

  console.error(error);
  res.sendStatus(500);
}
