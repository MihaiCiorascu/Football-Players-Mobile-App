import { User } from '../../../models/index.js';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'User ID required' });
  }
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Generate a secret
    const secret = speakeasy.generateSecret({ name: `FootballPlayersApp (${user.username})` });
    // Save base32 secret to user
    user.twoFactorSecret = secret.base32;
    await user.save();
    // Generate QR code
    const otpauthUrl = secret.otpauth_url;
    const qrCodeDataURL = await QRCode.toDataURL(otpauthUrl);
    return res.status(200).json({ secret: secret.base32, otpauthUrl, qrCodeDataURL });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to enable 2FA', details: err.message });
  }
} 