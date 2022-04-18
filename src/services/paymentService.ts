import * as cardService from "../services/cardService.js";
import * as businessService from "../services/businessService.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import {
  cardAndBusinessTypesDoNotMatchError,
  insufficientFundsError,
  cardIsBlockedError,
  cardIsAlreadyUnlockedError,
} from "../utils/errorUtils.js";

interface PaymentData {
  cardId: number;
  businessId: number;
  amount: number;
}

interface OnlinePaymentData {
  number: string;
  name: string;
  expirationDate: string;
  securityCode: string;
  businessId: number;
  amount: number;
}

export async function perform(data: PaymentData) {
  const { cardId, businessId, amount } = data;

  const card = await cardService.getById(cardId);

  if (card.isBlocked) {
    throw cardIsBlockedError();
  }

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

export async function onlinePerform(data: OnlinePaymentData) {
  const { number, name, expirationDate, securityCode, businessId, amount } =
    data;

  const card = await cardService.getByDetails(number, name, expirationDate);

  if (card.isBlocked) {
    throw cardIsBlockedError();
  }

  cardService.checkSecurityCode(securityCode, card.securityCode);

  cardService.checkCardExpiration(card.expirationDate);

  const business = await businessService.getById(businessId);

  if (card.type !== business.type) {
    throw cardAndBusinessTypesDoNotMatchError();
  }

  const { balance } = await cardService.getBalanceAndTransactions(card.id);

  if (balance < amount) {
    throw insufficientFundsError();
  }

  await paymentRepository.insert({ cardId: card.id, businessId, amount });
}
