import sequelize from './database.js';

async function cleanupDatabase() {
  try {
    console.log('Starting database cleanup...');

    // Drop backup tables
    await sequelize.query('DROP TABLE IF EXISTS Players_backup;');
    await sequelize.query('DROP TABLE IF EXISTS Positions_backup;');
    await sequelize.query('DROP TABLE IF EXISTS Ratings;');
    
    // Drop any other backup tables that might exist
    await sequelize.query('DROP TABLE IF EXISTS Player_Positions_backup;');
    
    console.log('Database cleanup completed successfully!');
  } catch (error) {
    console.error('Error cleaning up database:', error);
  } finally {
    await sequelize.close();
  }
}

cleanupDatabase(); 