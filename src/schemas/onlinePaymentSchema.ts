import joi from "joi";

const onlinePaymentSchema = joi.object({
  number: joi.string().required(),
  name: joi.string().required(),
  expirationDate: joi.string().required(),
  businessId: joi.number().integer().min(1).required(),
  amount: joi.number().integer().min(1).required(),
});

export default onlinePaymentSchema;
