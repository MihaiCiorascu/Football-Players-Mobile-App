import Player from './Player.js';
import Position from './Position.js';
import Rating from './Rating.js';
import User from './User.js';
import Log from './Log.js';
import MonitoredUser from './MonitoredUser.js';

// Player-Position (Many-to-Many)
Player.belongsToMany(Position, { through: 'PlayerPositions', as: 'positions', foreignKey: 'player_id', otherKey: 'position_id' });
Position.belongsToMany(Player, { through: 'PlayerPositions', as: 'players', foreignKey: 'position_id', otherKey: 'player_id' });

// Player-Rating (One-to-Many)
Player.hasMany(Rating, { as: 'ratings', foreignKey: 'playerId' });
Rating.belongsTo(Player, { foreignKey: 'playerId' });

// User-Player (One-to-Many)
User.hasMany(Player, { as: 'players', foreignKey: 'userId' });
Player.belongsTo(User, { foreignKey: 'userId' });

export { Player, Position, Rating, User, Log, MonitoredUser }; 