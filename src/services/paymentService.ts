import * as cardService from "../services/cardService.js";
import * as businessService from "../services/businessService.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import {
  cardAndBusinessTypesDoNotMatchError,
  insufficientFundsError,
} from "../utils/errorUtils.js";

interface PaymentData {
  cardId: number;
  businessId: number;
  amount: number;
}

export async function perform(data: PaymentData) {
  const { cardId, businessId, amount } = data;

  const card = await cardService.getById(cardId);

  cardService.checkCardExpiration(card.expirationDate);

  const business = await businessService.getById(businessId);

  if (card.type !== business.type) {
    throw cardAndBusinessTypesDoNotMatchError();
  }

  const { balance } = await cardService.getBalanceAndTransactions(cardId);

  if (balance < amount) {
    throw insufficientFundsError();
  }

  await paymentRepository.insert(data);
}
