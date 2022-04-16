import * as companyRepository from "../repositories/companyRepository.js";
import { invalidApiKeyError } from "../utils/errorUtils.js";

export async function getCompanyByApiKey(apiKey: string) {
  const company = await companyRepository.findByApiKey(apiKey);

  if (!company) {
    throw invalidApiKeyError();
  }

  return company;
}
