import { Router } from 'express';
import { pool } from '../config/db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();
router.get('/', async (req, res, next) => {
  try {
    const { q, category, page = 1, limit = 10 } = req.query;
    const values = [];
    const where = [];
    if (q) { values.push(`%${q}%`); where.push(`name ILIKE $${values.length}`); }
    if (category) { values.push(category); where.push(`category = $${values.length}`); }
    const safeLimit = Math.min(100, Math.max(1, Number(limit)));
    const offset = (Math.max(1, Number(page)) - 1) * safeLimit;
    values.push(safeLimit, offset);
    const condition = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const { rows } = await pool.query(`SELECT * FROM products ${condition} ORDER BY created_at DESC LIMIT $${values.length-1} OFFSET $${values.length}`, values);
    res.json({ page: Number(page), limit: safeLimit, products: rows });
  } catch (err) { next(err); }
});

router.post('/', authenticate, async (req, res, next) => {
  try {
    const { name, description = null, category, price, stock = 0 } = req.body;
    if (!name || !category || price === undefined) return res.status(400).json({ error: 'name, category and price are required' });
    const { rows } = await pool.query('INSERT INTO products(name,description,category,price,stock) VALUES($1,$2,$3,$4,$5) RETURNING *', [name.trim(), description, category, price, stock]);
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
});

router.patch('/:id', authenticate, async (req, res, next) => {
  try {
    const { name, description, category, price, stock } = req.body;
    const { rows } = await pool.query('UPDATE products SET name=COALESCE($1,name), description=COALESCE($2,description), category=COALESCE($3,category), price=COALESCE($4,price), stock=COALESCE($5,stock), updated_at=NOW() WHERE id=$6 RETURNING *', [name, description, category, price, stock, req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'Product not found' });
    res.json(rows[0]);
  } catch (err) { next(err); }
});

router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const result = await pool.query('DELETE FROM products WHERE id=$1', [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ error: 'Product not found' });
    res.status(204).end();
  } catch (err) { next(err); }
});
export default router;