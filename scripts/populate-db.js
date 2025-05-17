import { faker } from '@faker-js/faker';
import { Player, Position, Rating } from '../src/models/index.js';
import sequelize from '../src/config/database.js';

const POSITIONS = ['ST', 'CF', 'LW', 'RW', 'LM', 'RM', 'CAM', 'CM', 'CDM', 'LB', 'RB', 'CB', 'GK'];
const BATCH_SIZE = 1000; // Process in batches to avoid memory issues

async function createPositions() {
  console.log('Creating positions...');
  const positions = POSITIONS.map(name => ({
    name,
    description: faker.lorem.sentence()
  }));
  
  await Position.bulkCreate(positions);
  console.log('Positions created successfully');
}

async function createPlayers(count) {
  console.log(`Creating ${count} players...`);
  const players = [];
  
  for (let i = 0; i < count; i++) {
    const player = {
      name: faker.person.fullName(),
      position: faker.helpers.arrayElement(POSITIONS),
      rating: faker.number.float({ min: 5.0, max: 10.0, precision: 0.1 }),
      number: faker.number.int({ min: 1, max: 99 }),
      age: faker.number.int({ min: 16, max: 40 }),
      goals: faker.number.int({ min: 0, max: 500 }),
      image: faker.image.url(),
      image1: faker.image.url(),
      image2: faker.image.url()
    };
    players.push(player);
    
    if (players.length >= BATCH_SIZE) {
      await Player.bulkCreate(players);
      console.log(`Created ${i + 1} players`);
      players.length = 0;
    }
  }
  
  if (players.length > 0) {
    await Player.bulkCreate(players);
    console.log(`Created ${count} players`);
  }
}

async function createRatings() {
  console.log('Creating ratings...');
  const players = await Player.findAll();
  const ratings = [];
  
  for (const player of players) {
    // Create 5-10 ratings per player
    const ratingCount = faker.number.int({ min: 5, max: 10 });
    for (let i = 0; i < ratingCount; i++) {
      const rating = {
        playerId: player.id,
        value: faker.number.float({ min: 5.0, max: 10.0, precision: 0.1 }),
        date: faker.date.past({ years: 2 })
      };
      ratings.push(rating);
      
      if (ratings.length >= BATCH_SIZE) {
        await Rating.bulkCreate(ratings);
        console.log(`Created ${ratings.length} ratings`);
        ratings.length = 0;
      }
    }
  }
  
  if (ratings.length > 0) {
    await Rating.bulkCreate(ratings);
    console.log(`Created ${ratings.length} ratings`);
  }
}

async function associatePlayersWithPositions() {
  console.log('Associating players with positions...');
  const players = await Player.findAll();
  const positions = await Position.findAll();
  
  for (const player of players) {
    // Each player gets 1-3 positions
    const positionCount = faker.number.int({ min: 1, max: 3 });
    const playerPositions = faker.helpers.arrayElements(positions, positionCount);
    await player.setPositions(playerPositions);
  }
  
  console.log('Player-Position associations created');
}

async function populateDatabase() {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced');
    
    // Create initial data
    await createPositions();
    await createPlayers(100000); // Create 100,000 players
    await createRatings();
    await associatePlayersWithPositions();
    
    console.log('Database populated successfully');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    await sequelize.close();
  }
}

populateDatabase(); 