import faker from "@faker-js/faker";
import dayjs from "dayjs";
import bcrypt from "bcrypt";

import * as employeeService from "../services/employeeService.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import {
  cardAlreadyActiveError,
  cardIsBlockedError,
  cardNotFoundError,
  cardNumberAlreadyExistsError,
  expiredCardError,
  inactiveCardError,
  incorrectCardPasswordError,
  incorrectSecurityCodeError,
  invalidCardPasswordError,
} from "../utils/errorUtils.js";

interface CardCreationData {
  employeeId: number;
  type: cardRepository.TransactionType;
  companyId: number;
}

interface CardActivationData {
  id: number;
  securityCode: string;
  password: string;
}

interface HasAmount {
  amount: number;
}

export async function create(data: CardCreationData) {
  const employee = await employeeService.getEmployeeOfCompany(
    data.employeeId,
    data.companyId
  );
  await employeeService.checkEmployeeAlreadyHasCardOfType(
    employee.id,
    data.type
  );

  const number = faker.finance.creditCardNumber("mastercard");
  await checkCardNumberAlreadyExists(number);

  const cardholderName = getCardholderName(employee.fullName);

  const expirationDate = dayjs().add(5, "year").format("MM/YY");

  const securityCode = faker.finance.creditCardCVV();
  const encryptedSecurityCode = bcrypt.hashSync(securityCode, 10);

  await cardRepository.insert({
    ...data,
    number,
    cardholderName,
    expirationDate,
    securityCode: encryptedSecurityCode,
    isVirtual: false,
    isBlocked: false,
  });

  return securityCode;
}

async function checkCardNumberAlreadyExists(number: string) {
  const existingCardWithNumber = await cardRepository.findByNumber(number);

  if (existingCardWithNumber) {
    throw cardNumberAlreadyExistsError();
  }
}

function getCardholderName(fullName: string) {
  const names = fullName.split(" ");
  const result = names
    .map((name, index) => {
      const lastIndex = names.length - 1;
      if (index === 0 || index === lastIndex) return name.toUpperCase();
      if (name.length > 2) return name[0].toUpperCase();
    })
    .filter(Boolean)
    .join(" ");

  return result;
}

export async function activate(data: CardActivationData) {
  const { id, securityCode, password } = data;

  const card = await getById(id);

  checkCardExpiration(card.expirationDate);

  if (card.password) throw cardAlreadyActiveError();

  checkSecurityCode(securityCode, card.securityCode);

  if (!/^[0-9]{4}$/.test(password)) {
    throw invalidCardPasswordError();
  }

  const encryptedPassword = bcrypt.hashSync(password, 12);
  await cardRepository.update(id, { password: encryptedPassword });
}

export async function getById(id: number) {
  const card = await cardRepository.findById(id);

  if (!card) {
    throw cardNotFoundError();
  }

  return card;
}

export function checkCardExpiration(expirationDate: string) {
  const month: number = dayjs().get("month") + 1;
  // Get current year in the format 'YY'
  const year: number = dayjs().get("year") % 100;
  const expirationDateData = expirationDate.split("/");
  const expirationMonth: number = +expirationDateData[0];
  const expirationYear: number = +expirationDateData[1];

  if (year > expirationYear) {
    throw expiredCardError();
  } else if (year === expirationYear) {
    if (month >= expirationMonth) {
      throw expiredCardError();
    }
  }
}

function checkSecurityCode(
  securityCode: string,
  encryptedSecurityCode: string
) {
  if (!bcrypt.compareSync(securityCode, encryptedSecurityCode)) {
    throw incorrectSecurityCodeError();
  }
}

export async function getBalanceAndTransactions(id: number) {
  await getById(id);

  const recharges = await rechargeRepository.findByCardId(id);
  const rechargesSum = getAmountSum(recharges);

  const payments = await paymentRepository.findByCardId(id);
  const paymentsSum = getAmountSum(payments);

  return {
    balance: rechargesSum - paymentsSum,
    transactions: payments,
    recharges,
  };
}

function getAmountSum(items: HasAmount[]) {
  const sum = items
    .map((item) => item.amount)
    .reduce((acc, cur) => acc + cur, 0);

  return sum;
}

export async function checkCardPassword(id: number, password: string) {
  if (!/^[0-9]{4}$/.test(password)) {
    throw invalidCardPasswordError();
  }

  const card = await getById(id);

  if (!card.password) {
    throw inactiveCardError();
  }

  if (!bcrypt.compareSync(password, card.password)) {
    throw incorrectCardPasswordError();
  }
}

export async function recharge(id: number, amount: number, companyId: number) {
  const card = await getById(id);

  // Check if the recharged card is of a employee of the company
  await employeeService.getEmployeeOfCompany(card.employeeId, companyId);

  checkCardExpiration(card.expirationDate);

  await rechargeRepository.insert({ cardId: id, amount });
}

export async function block(id: number) {
  const card = await getById(id);

  checkCardExpiration(card.expirationDate);

  if (card.isBlocked) {
    throw cardIsBlockedError();
  }

  await cardRepository.update(id, { isBlocked: true });
}
