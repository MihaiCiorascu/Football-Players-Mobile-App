import { Player, Position } from '../models/index.js';
import sequelize from '../config/database.js';

const defaultPlayers = [
  {
    name: "Lionel Messi",
    position: "CF",
    rating: 8.7,
    number: 10,
    age: 37,
    goals: 851,
    image: "https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2Fdde248022a08ce177cea0ae2341e3eb74eb577bfa408c8d125ba1b93b21acd80",
    image1: "/messi1.png",
    image2: "/messi2.png"
  },
  {
    name: "Paulo Dybala",
    position: "CAM",
    rating: 8.1,
    number: 21,
    age: 31,
    goals: 200,
    image: "https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2F3466aecfdafcf7165fa5d1540bb46d20dffad75fafa265495ded188b0d7299a3",
    image1: "/dybala1.png",
    image2: "/dybala2.png"
  },
  {
    name: "Cristiano Ronaldo",
    position: "ST",
    rating: 7.9,
    number: 7,
    age: 40,
    goals: 925,
    image: "https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2F2a5b6f4961a76265d01cc3235fd2eefce7ce23c60d7194c0e7f5de5afe4aff42",
    image1: "/cristiano1.png",
    image2: "/cristiano2.png"
  }
];

async function seedDatabase() {
  try {
    // Check if we already have players
    const existingPlayers = await Player.findAll();
    if (existingPlayers.length > 0) {
      console.log('Players already exist in the database. Skipping seed.');
      return;
    }

    // Create players
    const players = await Player.bulkCreate(defaultPlayers);
    console.log('Players created successfully!');

    // Associate players with positions
    for (const player of players) {
      const position = await Position.findOne({ where: { name: player.position } });
      if (position) {
        await player.addPosition(position);
      }
    }
    console.log('Player-Position associations created successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase(); 