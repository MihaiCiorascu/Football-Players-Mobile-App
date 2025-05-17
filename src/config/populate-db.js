import { faker } from '@faker-js/faker';
import sequelize from './database.js';
import { Player, Position, Rating } from '../models/index.js';

const TOTAL_PLAYERS = 100000;
const RATINGS_PER_PLAYER = 5;
const BATCH_SIZE = 1000;

async function populateDatabase() {
  try {
    console.log('Starting database population...');

    await sequelize.sync({ force: true });
    console.log('Database synchronized');

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
    console.log('Positions created');

    for (let i = 0; i < TOTAL_PLAYERS; i += BATCH_SIZE) {
      const batchSize = Math.min(BATCH_SIZE, TOTAL_PLAYERS - i);
      const players = Array(batchSize).fill().map(() => ({
        name: faker.person.fullName(),
        position: faker.helpers.arrayElement(['ST', 'CF', 'LW', 'RW', 'LM', 'RM', 'CAM', 'CM', 'CDM', 'LB', 'RB', 'CB', 'GK']),
        rating: faker.number.float({ min: 5.0, max: 10.0, precision: 0.1 }),
        number: faker.number.int({ min: 1, max: 99 }),
        age: faker.number.int({ min: 16, max: 50 }),
        goals: faker.number.int({ min: 0, max: 1000 }),
        image: faker.image.url(),
        image1: faker.image.url(),
        image2: faker.image.url(),
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      const createdPlayers = await Player.bulkCreate(players);
      console.log(`Created batch of ${createdPlayers.length} players (${i + createdPlayers.length}/${TOTAL_PLAYERS})`);

      const ratings = [];
      for (const player of createdPlayers) {
        for (let j = 0; j < RATINGS_PER_PLAYER; j++) {
          ratings.push({
            playerId: player.id,
            value: faker.number.float({ min: 5.0, max: 10.0, precision: 0.1 }),
            date: faker.date.past(),
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      }
      await Rating.bulkCreate(ratings);
      console.log(`Created ${ratings.length} ratings for this batch`);

      for (const player of createdPlayers) {
        const randomPositions = faker.helpers.arrayElements(positions, { min: 1, max: 3 });
        await player.addPositions(randomPositions);
      }
      console.log(`Associated positions for this batch`);
    }

    console.log('Database population completed successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    await sequelize.close();
  }
}

populateDatabase(); 