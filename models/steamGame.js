const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const Guild = require('./guild');

const SteamGame = sequelize.define('SteamGame', {
    appId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    guildId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gameNotificationEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    lastNewsId: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
}, {
    tableName: 'steam_games',
    timestamps: false,
});

module.exports = SteamGame;