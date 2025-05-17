import sequelize from './database.js';
import Player from '../models/Player.js';
import Position from '../models/Position.js';
import Rating from '../models/Rating.js';
import User from '../models/User.js';
import Log from '../models/Log.js';
import MonitoredUser from '../models/MonitoredUser.js';
import bcrypt from 'bcryptjs';

// Define relationships
Player.belongsToMany(Position, { through: 'PlayerPositions' });
Position.belongsToMany(Player, { through: 'PlayerPositions' });

Player.hasMany(Rating);
Rating.belongsTo(Player);

// User-Player relationship
User.hasMany(Player, { as: 'players', foreignKey: 'userId' });
Player.belongsTo(User, { foreignKey: 'userId' });

// Sync database and create tables
async function initDatabase() {
  try {
    await sequelize.sync({ force: true }); // Set force: false in production
    console.log('Database synchronized successfully');

    // Create initial admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      username: 'admin',
      passwordHash: adminPassword,
      role: 'admin'
    });
    console.log('Admin user created:', admin.username);

    // Create initial positions
    const positions = await Position.bulkCreate([
      { name: 'ST', description: 'Striker' },
      { name: 'CF', description: 'Center Forward' },
      { name: 'LW', description: 'Left Winger' },
      { name: 'RW', description: 'Right Winger' },
      { name: 'CAM', description: 'Central Attacking Midfielder' },
      { name: 'CM', description: 'Central Midfielder' },
      { name: 'CDM', description: 'Central Defensive Midfielder' },
      { name: 'CB', description: 'Center Back' },
      { name: 'LB', description: 'Left Back' },
      { name: 'RB', description: 'Right Back' },
      { name: 'GK', description: 'Goalkeeper' }
    ]);
    console.log('Initial positions created');

    // Create initial players for admin
    const players = await Player.bulkCreate([
      {
        name: 'Lionel Messi',
        position: 'CF',
        number: 10,
        age: 37,
        goals: 851,
        image: 'https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2Fdde248022a08ce177cea0ae2341e3eb74eb577bfa408c8d125ba1b93b21acd80',
        image1: '/messi1.png',
        image2: '/messi2.png',
        userId: admin.id
      },
      {
        name: 'Cristiano Ronaldo',
        position: 'ST',
        number: 7,
        age: 40,
        goals: 925,
        image: 'https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2F2a5b6f4961a76265d01cc3235fd2eefce7ce23c60d7194c0e7f5de5afe4aff42',
        image1: '/cristiano1.png',
        image2: '/cristiano2.png',
        userId: admin.id
      }
    ]);

    console.log('Initial players created');

    // Log the player creation
    await Log.create({
      userId: admin.id,
      action: 'create',
      entity: 'Player',
      entityId: players[0].id
    });
    await Log.create({
      userId: admin.id,
      action: 'create',
      entity: 'Player',
      entityId: players[1].id
    });

    // Assign positions to players
    const messi = await Player.findOne({ where: { name: 'Lionel Messi' } });
    const ronaldo = await Player.findOne({ where: { name: 'Cristiano Ronaldo' } });

    const cf = await Position.findOne({ where: { name: 'CF' } });
    const rw = await Position.findOne({ where: { name: 'RW' } });
    const st = await Position.findOne({ where: { name: 'ST' } });

    await messi.addPositions([cf, rw]);
    await ronaldo.addPositions([st]);
    console.log('Positions assigned to players');

    // Create ratings for players
    await Rating.bulkCreate([
      {
        value: 8.7,
        playerId: messi.id
      },
      {
        value: 9.0,
        playerId: messi.id
      },
      {
        value: 7.9,
        playerId: ronaldo.id
      },
      {
        value: 8.2,
        playerId: ronaldo.id
      }
    ]);
    console.log('Initial ratings created');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

export default initDatabase; 

// Execute the initialization
initDatabase().catch(console.error); 