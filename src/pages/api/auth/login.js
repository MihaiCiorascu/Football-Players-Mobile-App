import { User } from '../../../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { username, password, twoFactorToken } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (user.isTwoFactorEnabled) {
      console.log('2FA required for user:', user.username, 'userId:', user.id);
      if (!twoFactorToken) {
        return res.status(206).json({ twoFactorRequired: true, userId: user.id });
      }
      const speakeasy = await import('speakeasy');
      const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token: twoFactorToken,
        window: 1,
      });
      if (!verified) {
        return res.status(401).json({ error: 'Invalid 2FA token' });
      }
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: '30d' }
    );
    return res.status(200).json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    return res.status(500).json({ error: 'Login failed', details: err.message });
  }
} 