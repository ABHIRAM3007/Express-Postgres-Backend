import express from 'express';
import productRoutes from './routes/product.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
export const app = express();
app.use(express.json());
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/products', productRoutes);
app.use(errorHandler);