import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Player = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    },
    indexes: [
      {
        name: 'player_user_idx',
        using: 'BTREE',
        fields: ['userId']
      }
    ]
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 50]
    },
    indexes: [
      {
        name: 'player_name_idx',
        using: 'BTREE',
        fields: ['name']
      }
    ]
  },
  position: {
    type: DataTypes.ENUM('ST', 'CF', 'LW', 'RW', 'LM', 'RM', 'CAM', 'CM', 'CDM', 'LB', 'RB', 'CB', 'GK'),
    allowNull: false,
    indexes: [
      {
        name: 'player_position_idx',
        using: 'BTREE',
        fields: ['position']
      }
    ]
  },
  rating: {
    type: DataTypes.DECIMAL(3, 1),
    allowNull: false,
    defaultValue: 5.0,
    validate: {
      min: 0,
      max: 10
    },
    indexes: [
      {
        name: 'player_rating_idx',
        using: 'BTREE',
        fields: ['rating']
      }
    ]
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 99
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 99
    },
    indexes: [
      {
        name: 'player_age_idx',
        using: 'BTREE',
        fields: ['age']
      }
    ]
  },
  goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    },
    indexes: [
      {
        name: 'player_goals_idx',
        using: 'BTREE',
        fields: ['goals']
      }
    ]
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2Fb17a7bfed461553f6be1a921288e1c35c2749b1db9c45baf0fb5107350e5fee1"

  },
  image1: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "/newPlayer1.png"
  },
  image2: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "/newPlayer2.png"
  }
}, {
  timestamps: true,
  indexes: [
    {
      name: 'player_position_goals_idx',
      using: 'BTREE',
      fields: ['position', 'goals']
    },
    {
      name: 'player_age_rating_idx',
      using: 'BTREE',
      fields: ['age', 'rating']
    }
  ]
});

// Add virtual field for current rating
Player.prototype.getCurrentRating = async function() {
  const rating = await this.getRatings({
    order: [['date', 'DESC']],
    limit: 1
  });
  return rating[0]?.value || null;
};

export default Player; 