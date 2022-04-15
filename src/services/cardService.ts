import faker from "@faker-js/faker";
import dayjs from "dayjs";
import bcrypt from "bcrypt";

import * as cardRepository from "../repositories/cardRepository.js";
import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import {
  cardNumberAlreadyExistsError,
  employeeAlreadyHasCardError,
  employeeNotFoundError,
  invalidApiKeyError,
} from "../utils/errorUtils.js";

export interface CardCreationData {
  employeeId: number;
  originalCardId?: number;
  type: cardRepository.TransactionType;
  apiKey: string;
}

export async function create(data: CardCreationData) {
  const company = await companyRepository.findByApiKey(data.apiKey);

  if (!company) {
    throw invalidApiKeyError();
  }
  const employee = await employeeRepository.findById(data.employeeId);

  if (!employee || employee.companyId !== company.id) {
    throw employeeNotFoundError();
  }

  const existingCardOfEmployee = await cardRepository.findByTypeAndEmployeeId(
    data.type,
    employee.id
  );

  if (existingCardOfEmployee) {
    throw employeeAlreadyHasCardError();
  }

  const number = faker.finance.creditCardNumber("mastercard");
  const existingCardWithNumber = await cardRepository.findByNumber(number);

  if (existingCardWithNumber) {
    throw cardNumberAlreadyExistsError();
  }

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
