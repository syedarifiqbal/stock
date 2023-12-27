import express from 'express';
import homeRoutes from './routes/index';

const app = express();

const port = 3030;

app.use(express.json());

app.use('/', homeRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
