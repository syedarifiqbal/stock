import { promises as fsPromises } from 'fs';
import { StockItem } from '../interfaces/stock-item.interface';
import path from 'path';
import { Transaction } from '../interfaces/transaction.interface';

export const readJsonFile = async (filename: string): Promise<any> => {
  try {
    const content = await fsPromises.readFile(filename, 'utf-8');
    return JSON.parse(content);
  } catch (error: any) {
    console.error(`Error reading JSON file ${filename}: ${error.message}`);
    throw error;
  }
};

/**
 * Fetch stock data for a given SKU.
 * @param sku - The SKU for which to fetch stock data.
 * @returns A Promise resolving to StockItem or undefined if not found.
 */
export const getStock = async (
  sku?: string
): Promise<StockItem | undefined> => {
  const stocks: StockItem[] = await readJsonFile(
    path.join(__dirname, '..', 'data', 'stock.json')
  );

  if (!sku) return undefined;

  return stocks.find((item) => item.sku === sku);
};

/**
 * Fetch transactions data for a given SKU.
 * @param sku - The SKU for which to fetch Transactions data.
 * @returns A Promise resolving to Array of Transactions empty array is possible as well.
 */
export const getTransactions = async (sku: string): Promise<Transaction[]> => {
  const transactions: Transaction[] = await readJsonFile(
    path.join(__dirname, '..', 'data', 'transactions.json')
  );

  return transactions.filter((transaction) => transaction.sku === sku);
};
