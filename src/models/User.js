import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
    allowNull: false,
  },
  twoFactorSecret: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isTwoFactorEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
}, {
  timestamps: true,
  freezeTableName: true,
});

export default User; 