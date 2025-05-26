import { User } from '../../../models/index.js';
import bcrypt from 'bcryptjs';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { username, password, role } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  try {
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    // Generate 2FA secret
    const secret = speakeasy.generateSecret({ name: `FootballPlayersApp (${username})` });
    // Create user with 2FA enabled
    const user = await User.create({
      username,
      passwordHash,
      role: role || 'user',
      twoFactorSecret: secret.base32,
      isTwoFactorEnabled: true,
    });
    // Generate QR code for authenticator app
    const otpauthUrl = secret.otpauth_url;
    const qrCodeDataURL = await QRCode.toDataURL(otpauthUrl);
    return res.status(201).json({
      id: user.id,
      username: user.username,
      role: user.role,
      twoFactorEnabled: true,
      twoFactorSecret: secret.base32,
      otpauthUrl,
      qrCodeDataURL,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Registration failed', details: err.message });
  }
} 