import { Player, Rating, Position } from '@/models/index.js';
import sequelize from '@/config/database.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Debug log for database connection
    await sequelize.authenticate();
    console.log('Database connection established');

    // Debug log for models
    console.log('Models:', {
      Player: !!Player,
      Rating: !!Rating,
      Position: !!Position
    });

    // Debug log for associations
    console.log('Player associations:', Player.associations);

    // Fetch players with ratings and positions
    const players = await Player.findAll({
      include: [
        {
          model: Rating,
          as: 'ratings',
          attributes: ['value', 'date'],
          order: [['date', 'DESC']],
          limit: 1
        },
        {
          model: Position,
          as: 'positions',
          through: { attributes: [] }
        }
      ],
      limit: 10 // Limit for testing
    });

    console.log('Players fetched:', players.length);
    res.status(200).json({ players });
  } catch (error) {
    console.error('Error in players-stats endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to fetch statistics',
      details: error.message
    });
  }
} 