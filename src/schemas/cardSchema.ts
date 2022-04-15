import joi from "joi";

const cardSchema = joi.object({
  employeeId: joi.number().integer().min(1).required(),
  originalCardId: joi.number().integer().min(1),
  type: joi
    .string()
    .valid("groceries", "restaurant", "transport", "education", "health")
    .required(),
});

export default cardSchema;
