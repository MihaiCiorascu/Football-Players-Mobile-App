const sequelize = require('../config/database.js');
const { faker } = require('@faker-js/faker');
const { Player, Position, Rating, User } = require('../models');

const PLAYERS_PER_USER = 50; // Number of players to create for each user
const RATINGS_PER_PLAYER = 5; // Each player will have 5 ratings
const BATCH_SIZE = 50; // Number of players to create per batch

// Constants
const POSITIONS = [
  'GK', 'CB', 'LB', 'RB', 'CM', 'LM', 'RM', 'LW', 'RW', 'CF', 'ST'
];

// Helper function to create positions
async function createPositions() {
  console.log('Creating positions...');
  for (const position of POSITIONS) {
    try {
      await Position.findOrCreate({
        where: { name: position }
      });
    } catch (error) {
      console.error(`Error creating position ${position}:`, error);
    }
  }
  console.log('Positions created successfully');
}

// Helper function to create a player
async function createPlayer(userId) {
  try {
    const position = faker.helpers.arrayElement(POSITIONS);
    const rating = faker.number.float({ min: 1, max: 10, precision: 0.000001 });
    const number = faker.number.int({ min: 1, max: 99 });
    const age = faker.number.int({ min: 16, max: 40 });
    const goals = faker.number.int({ min: 0, max: 500 });

    const player = await Player.create({
      userId,
      name: faker.person.fullName(),
      position,
      rating,
      number,
      age,
      goals,
      image: faker.image.url(),
      image1: faker.image.url(),
      image2: faker.image.url()
    });

    // Create initial rating
    await Rating.create({
      player_id: player.id,
      value: rating
    });

    return player;
  } catch (error) {
    console.error('Error creating player:', error);
    throw error;
  }
}

// Helper function to associate player with positions
async function associatePlayerWithPositions(player) {
  try {
    const positions = await Position.findAll({
      limit: faker.number.int({ min: 1, max: 3 })
    });
    await player.setPositions(positions);
  } catch (error) {
    console.error(`Error associating positions for player ${player.id}:`, error);
  }
}

async function populateDatabase() {
  try {
    console.log('Starting database population...');

    // Get all existing users
    const users = await User.findAll();
    if (users.length === 0) {
      console.error('No users found in the database. Please create users first.');
      return;
    }
    console.log(`Found ${users.length} users`);

    // Create positions if they don't exist
    await createPositions();

    // Create players for each user
    for (const user of users) {
      console.log(`Creating players for user: ${user.username}`);
      const players = [];
      
      for (let i = 0; i < BATCH_SIZE; i++) {
        try {
          const player = await createPlayer(user.id);
          players.push(player);
          console.log(`Created player ${i + 1}/${BATCH_SIZE} for user ${user.username}`);
        } catch (error) {
          console.error(`Failed to create player ${i + 1} for user ${user.username}:`, error);
        }
      }

      // Associate players with positions
      console.log(`Associating positions for ${players.length} players of user ${user.username}`);
      for (const player of players) {
        await associatePlayerWithPositions(player);
      }
    }

    console.log('Database population completed successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    sequelize.close();
  }
}

populateDatabase(); 