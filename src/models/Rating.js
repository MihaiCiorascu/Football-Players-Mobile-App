import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Rating = sequelize.define('Rating', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  value: {
    type: DataTypes.DECIMAL(3, 1),
    allowNull: false,
    validate: {
      min: 0,
      max: 10
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  player_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Player',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  underscored: true,
  indexes: [
    {
      name: 'rating_player_value_idx',
      using: 'BTREE',
      fields: ['player_id', 'value']
    },
    {
      name: 'rating_player_date_idx',
      using: 'BTREE',
      fields: ['player_id', 'date']
    }
  ]
});

export default Rating; 