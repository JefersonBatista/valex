import * as businessRepository from "../repositories/businessRepository.js";
import { businessNotFoundError } from "../utils/errorUtils.js";

export async function getById(id: number) {
  const business = await businessRepository.findById(id);

  if (!business) {
    throw businessNotFoundError();
  }

  return business;
}
