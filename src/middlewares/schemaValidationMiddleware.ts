import { NextFunction, Request, Response } from "express";
import joi from "joi";

export default function validateSchema(schema: joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body);

    if (validation.error) {
      return res
        .status(400)
        .send("Todos os campos devem ser corretamente preenchidos");
    }

    next();
  };
}
