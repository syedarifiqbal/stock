import { calculateStock } from '../src/services/stock.services';

jest.mock('../src/utils/fileUtils', () => ({
  getStock: jest.fn(),
  getTransactions: jest.fn()
}));

describe('calculateStock', () => {
  const { getStock, getTransactions } = jest.requireMock(
    '../src/utils/fileUtils'
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should calculate stock with valid SKU and transactions', async () => {
    getStock.mockResolvedValueOnce({ sku: 'testSKU', stock: 10 }); // Mock stockData
    getTransactions.mockResolvedValueOnce([
      { sku: 'testSKU', type: 'order', qty: 5 },
      { sku: 'testSKU', type: 'refund', qty: 2 }
    ]); // Mock transactionsData

    const result = await calculateStock('testSKU');
    expect(result).toEqual({ sku: 'testSKU', qty: 7 });
  });

  test('should calculate stock with valid SKU and no transactions', async () => {
    getStock.mockResolvedValueOnce({ sku: 'testSKU', stock: 10 }); // Mock intial stock
    getTransactions.mockResolvedValueOnce([]); // Mock transactionsData

    const result = await calculateStock('testSKU');
    expect(result).toEqual({ sku: 'testSKU', qty: 10 });
  });

  test('should calculate stock with valid SKU and negative transactions', async () => {
    getStock.mockResolvedValueOnce({ sku: 'testSKU', stock: 10 }); // Mock intial stock
    getTransactions.mockResolvedValueOnce([
      { sku: 'testSKU', type: 'order', qty: 15 }
    ]); // Mock transactionsData

    const result = await calculateStock('testSKU');
    expect(result).toEqual({ sku: 'testSKU', qty: -5 });
  });

  test('should handle SKU not found in stock but has transactions', async () => {
    getStock.mockResolvedValueOnce(); // Mock intial stock
    getTransactions.mockResolvedValueOnce([
      { sku: 'testSKU', type: 'order', qty: 5 }
    ]); // Mock transactionsData

    const result = await calculateStock('testSKU');
    expect(result).toEqual({ sku: 'testSKU', qty: -5 });
  });

  test('should handle empty stock and transactions data', async () => {
    getStock.mockResolvedValueOnce(); // Mock intial stock
    getTransactions.mockResolvedValueOnce([]); // Mock transactionsData

    await expect(calculateStock('testSKU')).rejects.toThrowError(
      /SKU testSKU not found in stock and transactions./
    );
  });

  test('should handle SKU not found in transactions but has stock', async () => {
    getStock.mockResolvedValueOnce({ sku: 'testSKU', stock: 10 }); // Mock intial stock
    getTransactions.mockResolvedValueOnce([]); // Mock transactionsData

    const result = await calculateStock('testSKU');
    expect(result).toEqual({ sku: 'testSKU', qty: 10 });
  });

  test('should calculate stock with multiple transactions', async () => {
    getStock.mockResolvedValueOnce({ sku: 'testSKU', stock: 10 }); // Mock intial stock
    getTransactions.mockResolvedValueOnce([
      { sku: 'testSKU', type: 'order', qty: 5 },
      { sku: 'testSKU', type: 'order', qty: 3 },
      { sku: 'testSKU', type: 'refund', qty: 2 }
    ]); // Mock transactionsData

    const result = await calculateStock('testSKU');
    expect(result).toEqual({ sku: 'testSKU', qty: 4 });
  });

  test('should handle SKU not found in stock with multiple transactions', async () => {
    getStock.mockResolvedValueOnce(); // Mock intial stock
    getTransactions.mockResolvedValueOnce([
      { sku: 'testSKU', type: 'order', qty: 5 },
      { sku: 'testSKU', type: 'refund', qty: 2 }
    ]); // Mock transactionsData

    const result = await calculateStock('testSKU');
    expect(result).toEqual({ sku: 'testSKU', qty: -3 });
  });

  test('should handle negative starting stock with multiple transactions', async () => {
    getStock.mockResolvedValueOnce({ sku: 'testSKU', stock: -5 }); // Mock intial stock
    getTransactions.mockResolvedValueOnce([
      { sku: 'testSKU', type: 'order', qty: 3 },
      { sku: 'testSKU', type: 'refund', qty: 2 }
    ]); // Mock transactionsData

    const result = await calculateStock('testSKU');
    expect(result).toEqual({ sku: 'testSKU', qty: -6 });
  });

  test('should handle zero starting stock with multiple transactions', async () => {
    getStock.mockResolvedValueOnce({ sku: 'testSKU', stock: 0 }); // Mock intial stock
    getTransactions.mockResolvedValueOnce([
      { sku: 'testSKU', type: 'order', qty: 3 },
      { sku: 'testSKU', type: 'refund', qty: 2 }
    ]); // Mock transactionsData

    const result = await calculateStock('testSKU');
    expect(result).toEqual({ sku: 'testSKU', qty: -1 });
  });
});
