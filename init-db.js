import { Sequelize } from 'sequelize';
import path from 'path';
import { Player, Position, Rating } from './src/models/index.js';
import sequelize from './src/config/database.js';

async function initializeDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database tables created successfully.');

    const positions = await Position.bulkCreate([
      { name: 'GK', description: 'Goalkeeper' },
      { name: 'CB', description: 'Center Back' },
      { name: 'LB', description: 'Left Back' },
      { name: 'RB', description: 'Right Back' },
      { name: 'CDM', description: 'Central Defensive Midfielder' },
      { name: 'CM', description: 'Central Midfielder' },
      { name: 'CAM', description: 'Central Attacking Midfielder' },
      { name: 'LW', description: 'Left Winger' },
      { name: 'RW', description: 'Right Winger' },
      { name: 'ST', description: 'Striker' },
      { name: 'CF', description: 'Center Forward' }
    ]);
    console.log('Positions created successfully.');

    const players = await Player.bulkCreate([
      {
        name: 'Lionel Messi',
        position: 'CF',
        rating: 9.5,
        number: 10,
        age: 36,
        goals: 800,
        image: 'https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2Fdde248022a08ce177cea0ae2341e3eb74eb577bfa408c8d125ba1b93b21acd80',
        image1: '/messi1.png',
        image2: '/messi2.png'
      },
      {
        name: 'Cristiano Ronaldo',
        position: 'ST',
        rating: 9.3,
        number: 7,
        age: 38,
        goals: 850,
        image: 'https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2F2a5b6f4961a76265d01cc3235fd2eefce7ce23c60d7194c0e7f5de5afe4aff42',
        image1: '/cristiano1.png',
        image2: '/cristiano2.png'
      }
    ]);
    console.log('Players created successfully.');

    await Rating.bulkCreate([
      { playerId: 1, value: 9.5, date: new Date() },
      { playerId: 2, value: 9.3, date: new Date() }
    ]);
    console.log('Ratings created successfully.');

    const messi = players[0];
    const ronaldo = players[1];
    
    await messi.addPositions([positions[9], positions[10]]);
    await ronaldo.addPositions([positions[9], positions[10]]);
    
    console.log('Player-Position associations created successfully.');
    
    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await sequelize.close();
  }
}

initializeDatabase(); 