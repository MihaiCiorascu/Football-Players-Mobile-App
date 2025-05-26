import { User } from '../../../models/index.js';
import speakeasy from 'speakeasy';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { userId, token } = req.body;
  if (!userId || !token) {
    return res.status(400).json({ error: 'User ID and token required' });
  }
  try {
    const user = await User.findByPk(userId);
    if (!user || !user.twoFactorSecret) {
      return res.status(404).json({ error: '2FA not setup for user' });
    }
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 1,
    });
    if (!verified) {
      return res.status(401).json({ error: 'Invalid 2FA token' });
    }
    user.isTwoFactorEnabled = true;
    await user.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to verify 2FA', details: err.message });
  }
} 