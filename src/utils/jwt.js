import jwt from 'jsonwebtoken';
export const createToken = user => jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
export const decodeToken = token => jwt.verify(token, process.env.JWT_SECRET);