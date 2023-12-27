import { CalculateStock } from '../interfaces/calculate-stock.interface';
import { Transaction } from '../interfaces/transaction.interface';
import { getStock, getTransactions } from '../utils/fileUtils';

/**
 * Calculate stock quantity based on stock items and transactions for a given SKU.
 * @param sku - The SKU for which to calculate stock.
 * @returns A Promise which will be resolving to a CalculateStock object.
 */
export const calculateStock = async (sku: string): Promise<CalculateStock> => {
  try {
    // Find the stock item for the given SKU
    const stockItem = await getStock(sku);

    // Find the transactions for stock item for the given SKU
    const transactions = await getTransactions(sku);

    // Check if stock and transactions both exists and throw exception if both not available.
    if (!stockItem && transactions.length === 0) {
      throw new Error(`SKU ${sku} not found in stock and transactions.`);
    }

    // Canculate the total Stocks
    const totalTransactions = calculateTotalQuantityChange(
      transactions,
      stockItem ? stockItem.stock : 0
    );

    // return the Calculate Stock
    return { sku, qty: totalTransactions };
  } catch (error: any) {
    throw new Error(`Error calculating stock for SKU ${sku}: ${error.message}`);
  }
};

/**
 * Calculate the total quantity change based on order and receipt transactions.
 * @param transactions - An array of transactions.
 * @returns The total quantity change.
 */
const calculateTotalQuantityChange = (
  transactions: Transaction[],
  startingStock: number = 0
): number => {
  return transactions.reduce((acc, transaction) => {
    return transaction.type === 'order'
      ? acc - Math.abs(transaction.qty)
      : acc + Math.abs(transaction.qty);
  }, startingStock);
};
