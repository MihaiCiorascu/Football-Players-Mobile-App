import '@/models/index.js';  // Import models index to set up associations
import Player from '@/models/Player.js';
import Position from '@/models/Position.js';
import Rating from '@/models/Rating.js';
import Log from '@/models/Log.js';
import sequelize, { dropDuplicateIndices } from '@/config/database.js';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';

let dbInitialized = false;

async function initializeDatabase() {
  if (!dbInitialized) {
    try {
      await sequelize.authenticate();
      await dropDuplicateIndices();
      await sequelize.sync();
      dbInitialized = true;
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  }
}

const playerSchema = {
  name: { type: 'string', minLength: 2, maxLength: 50 },
  number: { type: 'integer', minimum: 1, maximum: 99 },
  age: { type: 'integer', minimum: 1, maximum: 99 },
  position: { type: 'string' }
};

function validateData(data, schema) {
  const errors = [];
  for (const [key, rules] of Object.entries(schema)) {
    if (data[key] !== undefined) {
      let value = data[key];
      if (rules.type === 'integer') {
        value = parseInt(value);
        if (isNaN(value)) {
          errors.push(`${key} must be a valid number`);
          continue;
        }
      }
      if (rules.type === 'integer' && !Number.isInteger(value)) {
        errors.push(`${key} must be a integer`);
      }
      if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
        errors.push(`${key} must be at least ${rules.minLength} characters`);
      }
      if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
        errors.push(`${key} must be at most ${rules.maxLength} characters`);
      }
      if (rules.minimum && value < rules.minimum) {
        errors.push(`${key} must be at least ${rules.minimum}`);
      }
      if (rules.maximum && value > rules.maximum) {
        errors.push(`${key} must be at most ${rules.maximum}`);
      }
      if (rules.pattern && typeof value === 'string' && !new RegExp(rules.pattern).test(value)) {
        errors.push(`${key} has invalid format`);
      }
    }
  }
  return errors;
}

export default async function handler(req, res) {
    await initializeDatabase();
  if (req.method === 'GET') {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
        }
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
      const { search = '', position = '', minRating = '0', maxRating = '10', page = '1', limit = '10' } = req.query;
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const offset = (pageNum - 1) * limitNum;
      const where = {
        userId: decoded.id,
        ...(search && { name: { [Op.iLike]: `%${search}%` } }),
        ...(position && { position }),
        rating: { [Op.between]: [parseFloat(minRating), parseFloat(maxRating)] }
      };
      console.log('Decoded JWT:', decoded);
      console.log('Player query where:', where);
      const total = await Player.count({ where });
      const players = await Player.findAll({
        where,
            include: [
          { model: Position, as: 'positions', through: { attributes: [] } },
          { model: Rating, as: 'ratings', attributes: ['value', 'date'], order: [['date', 'DESC']], limit: 1 }
        ],
        order: [['createdAt', 'DESC']],
        limit: limitNum,
        offset
      });
      await Log.create({
        userId: decoded.id,
        action: 'read',
        entity: 'Player',
        entityId: null,
        timestamp: new Date()
      });
      return res.status(200).json({
        players,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum)
        }
      });
    } catch (error) {
      console.error('Error in GET /api/players:', error);
      return res.status(500).json({ error: 'Internal server error' });
        }
  } else if (req.method === 'POST') {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
      const data = req.body;
      const errors = validateData(data, playerSchema);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      const player = await Player.create({
        ...data,
        userId: decoded.id
      });
      await Log.create({
        userId: decoded.id,
        action: 'create',
        entity: 'Player',
        entityId: player.id,
        timestamp: new Date()
      });
      return res.status(201).json({ player });
    } catch (error) {
      console.error('Error in POST /api/players:', error);
      return res.status(500).json({ error: 'Internal server error' });
          }
  } else if (req.method === 'PATCH') {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
        }
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');

      const { id } = req.query;
      if (!id) {
          return res.status(400).json({ error: 'Player ID is required' });
        }

      const data = req.body;
      const errors = validateData(data, playerSchema);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
        }

      // Only allow updating players belonging to the current user
      const player = await Player.findOne({ where: { id, userId: decoded.id } });
      if (!player) {
          return res.status(404).json({ error: 'Player not found' });
        }

      await player.update(data);
      await Log.create({
        userId: decoded.id,
        action: 'update',
        entity: 'Player',
        entityId: player.id,
        timestamp: new Date()
      });
      return res.status(200).json(player);
    } catch (error) {
      console.error('Error in PATCH /api/players:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // ... your delete logic ...
      await Log.create({
        userId: decoded.id,
        action: 'delete',
        entity: 'Player',
        entityId: player.id,
        timestamp: new Date()
      });
      // ... existing code ...
  } catch (error) {
      // ... existing code ...
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 