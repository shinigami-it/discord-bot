// Guild.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const SteamChannel = require('./steamChannel');
const SteamGame = require('./steamGame');
const TwitchStreamer = require('./twitchStreamer');

const Guild = sequelize.define('Guild', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    prefix: {
        type: DataTypes.STRING,
        defaultValue: '!',
    },
    welcomeChannelId: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    welcomeRoleId: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    rulesId: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    memberCountChannelId: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    feedbackChannelId: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
}, {
    tableName: 'guild',
    timestamps: false,
});

Guild.hasMany(SteamChannel, { foreignKey: 'guildId' });
Guild.hasMany(SteamGame, { foreignKey: 'guildId' });
Guild.hasMany(TwitchStreamer, { foreignKey: 'guildId' });

module.exports = Guild;
