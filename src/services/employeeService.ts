import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import {
  employeeAlreadyHasCardOfTypeError,
  employeeNotFoundError,
} from "../utils/errorUtils.js";

export async function getEmployeeOfCompany(
  employeeId: number,
  companyId: number
) {
  const employee = await employeeRepository.findById(employeeId);

  if (!employee || employee.companyId !== companyId) {
    throw employeeNotFoundError();
  }

  return employee;
}

export async function checkEmployeeAlreadyHasCardOfType(
  employeeId: number,
  type: cardRepository.TransactionType
) {
  const existingCardOfEmployee = await cardRepository.findByTypeAndEmployeeId(
    type,
    employeeId
  );

  if (existingCardOfEmployee) {
    throw employeeAlreadyHasCardOfTypeError();
  }
}
