# Calculate Stock Task

This project is aimed at creating a function to calculate current stock levels for a given SKU based on data from two JSON files: `stock.json` and `transactions.json`.

## Project Structure

The project is organized into the following files:

1. **app.ts**: Contains the main function to calculate stock levels.
2. **test/stockService.spec.ts**: Includes test cases for the `calculateStock` function.
3. **controllers/*.ts**: Contains Controllers for the api routes.
4. **routes/index.ts**: Contains api routes.
4. **services/stock.service.ts**: Contains actual method for calculation.
5. **utils/fileUtils.ts**: Utility functions used in the main calculation.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/syedarifiqbal/stock.git
```

### Install dependencies:
```bash
npm install
```

### Run Server
```bash
npm run start
```

### Visit url with sku to see the output
```bash
http://localhost:3030?sku=abc
```

### Usage through code
```bash
import { calculateStock } from './index';

// Example usage:
calculateStock('ProductSKU')
    .then(result => console.log(result))
    .catch(error => console.error(error));
```

## Function Signature
The function signature is as follows:
```bash
(sku: string) => Promise<{ sku: string, qty: number }>
```

# Tests

```bash
npm test
```
