import { Log, MonitoredUser } from '../../../models/index.js';
import { Op } from 'sequelize';
import sequelize from '../../../config/database.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const timeWindow = 5 * 60 * 1000; // 5 minutes in milliseconds
  const threshold = 50; // number of actions to trigger monitoring
  const now = new Date();
  const startTime = new Date(now - timeWindow);
  const logs = await Log.findAll({
    where: {
      timestamp: {
        [Op.gte]: startTime,
      },
    },
    attributes: ['userId', [sequelize.fn('COUNT', sequelize.col('id')), 'actionCount']],
    group: ['userId'],
    having: sequelize.literal(`COUNT(id) > ${threshold}`),
  });
  const results = [];
  for (const log of logs) {
    const userId = log.userId;
    const existing = await MonitoredUser.findOne({ where: { userId } });
    if (!existing) {
      const monitored = await MonitoredUser.create({
        userId,
        reason: `High CRUD activity: ${log.getDataValue('actionCount')} actions in ${timeWindow / 60000} minutes`,
      });
      results.push(monitored);
    }
  }
  return res.status(200).json({ success: true, monitored: results });
} 