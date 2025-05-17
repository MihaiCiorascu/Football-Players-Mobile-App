import sequelize from './src/config/database.js';
import './src/models/index.js';
import Player from './src/models/Player.js';
import Position from './src/models/Position.js';
import { dropDuplicateIndices } from './src/config/database.js';

async function testDatabase() {
  try {
    console.log('\n--- Initializing Database ---\n');
    
    await sequelize.authenticate();
    console.log('Database connection established.');
    
    await dropDuplicateIndices();
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully.');

    console.log('\n--- Testing CRUD Operations ---\n');

    console.log('Creating new player...');
    const newPlayer = await Player.create({
      name: 'Erling Haaland',
      position: 'ST',
      rating: 9.1,
      number: 9,
      age: 23,
      goals: 300,
      image: 'https://example.com/haaland.jpg',
      image1: '/haaland1.png',
      image2: '/haaland2.png'
    });
    console.log('Created player:', newPlayer.name);

    console.log('\nReading all players...');
    const allPlayers = await Player.findAll();
    console.log('All players:', allPlayers.map(p => ({
      name: p.name,
      position: p.position,
      goals: p.goals
    })));

    console.log('\nFiltering players by position (ST)...');
    const strikers = await Player.findAll({
      where: { position: 'ST' }
    });
    console.log('Strikers:', strikers.map(p => p.name));

    // SORT: Get players sorted by goals (descending)
    console.log('\nSorting players by goals...');
    const playersByGoals = await Player.findAll({
      order: [['goals', 'DESC']]
    });
    console.log('Players by goals:', playersByGoals.map(p => `${p.name} (${p.goals} goals)`));

    // UPDATE: Update Haaland's goals
    console.log('\nUpdating player...');
    await Player.update(
      { goals: 310 },
      { where: { name: 'Erling Haaland' } }
    );
    const updatedPlayer = await Player.findOne({
      where: { name: 'Erling Haaland' }
    });
    console.log(`Updated ${updatedPlayer.name}'s goals to ${updatedPlayer.goals}`);

    console.log('\nDeleting player...');
    await Player.destroy({
      where: { name: 'Erling Haaland' }
    });
    console.log('Deleted Erling Haaland');

    // Verify deletion
    const remainingPlayers = await Player.findAll();
    console.log('\nRemaining players:', remainingPlayers.map(p => p.name));

  } catch (error) {
    console.error('Error testing database:', error);
  } finally {
    await sequelize.close();
  }
}

testDatabase(); 