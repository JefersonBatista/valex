import joi from "joi";

const paymentSchema = joi.object({
  cardId: joi.number().integer().min(1).required(),
  password: joi.string().required(),
  businessId: joi.number().integer().min(1).required(),
  amount: joi.number().integer().min(1).required(),
});

export default paymentSchema;
