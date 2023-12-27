import { Request, Response } from 'express';
import { calculateStock } from '../services/stock.services';

export const homeController = async (req: Request, res: Response) => {
  const { sku } = req.query;

  if (!sku)
    return res.status(404).json({
      error: true,
      message: 'No SKU provided! try like /?sku=abc',
      statusCode: 404
    });

  const result = await calculateStock(sku as string);

  res.json(result);
};
