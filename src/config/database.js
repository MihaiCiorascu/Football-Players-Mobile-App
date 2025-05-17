import { Sequelize } from 'sequelize';
import path from 'path';
import sqlite3 from 'sqlite3';

const dbPath = path.join(process.cwd(), 'database.sqlite');

// Configure Sequelize to use sqlite3
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  dialectModule: sqlite3,
  logging: console.log,
  define: {
    // Ensure consistent table naming
    freezeTableName: true,
    // Use snake_case for column names
    underscored: true
  }
});

// Utility to drop indices if they exist (for SQLite)
export async function dropDuplicateIndices() {
  if (sequelize.getDialect() === 'sqlite') {
    try {
      // Drop all potentially conflicting indices
      await sequelize.query('DROP INDEX IF EXISTS rating_player_value_idx;');
      await sequelize.query('DROP INDEX IF EXISTS rating_player_date_idx;');
      await sequelize.query('DROP INDEX IF EXISTS player_position_goals_idx;');
      await sequelize.query('DROP INDEX IF EXISTS player_age_rating_idx;');
    } catch (error) {
      console.warn('Warning: Could not drop indices:', error.message);
    }
  }
}

export default sequelize; 