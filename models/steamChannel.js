const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const Guild = require('./guild');

const SteamChannel = sequelize.define('SteamChannel', {
    channelId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    guildId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    steamNotificationEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'steam_channels',
    timestamps: false,
});

module.exports = SteamChannel;
