import { connection } from "../database.js";
import { TransactionType } from "./cardRepository.js";

export interface Business {
  id: number;
  name: string;
  type: TransactionType;
}

export async function findById(id: number) {
  const result = await connection.query<Business, [number]>(
    "SELECT * FROM businesses WHERE id=$1",
    [id]
  );

  return result.rows[0];
}
