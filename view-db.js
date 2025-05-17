import sequelize from './src/config/database.js';

async function viewDatabase() {
  try {
    console.log('Database content:\n');

    // View Players
    console.log('Players:');
    const [players] = await sequelize.query('SELECT * FROM Players');
    console.log(JSON.stringify(players, null, 2));

    // View Positions
    console.log('\nPositions:');
    const [positions] = await sequelize.query('SELECT * FROM Positions');
    console.log(JSON.stringify(positions, null, 2));

    // View Ratings
    console.log('\nRatings:');
    const [ratings] = await sequelize.query('SELECT * FROM Ratings');
    console.log(JSON.stringify(ratings, null, 2));

    // View Player_Positions
    console.log('\nPlayer_Positions:');
    const [playerPositions] = await sequelize.query('SELECT * FROM Player_Positions');
    console.log(JSON.stringify(playerPositions, null, 2));

  } catch (error) {
    console.error('Error viewing database:', error);
  } finally {
    await sequelize.close();
  }
}

viewDatabase(); 