import { MonitoredUser } from '../../../models/index.js';
import { requireAuth, adminOnly } from '../../../utils/middleware.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  await requireAuth(req, res, async () => {
    await adminOnly(req, res, async () => {
      const monitoredUsers = await MonitoredUser.findAll();
      return res.status(200).json(monitoredUsers);
    });
  });
} 