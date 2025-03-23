const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const Guild = require('./guild');

const twitchStreamer = sequelize.define('twitchStreamer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    guildId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    channelId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    streamerName: {
        type: DataTypes.STRING,
        defaultValue: true,
    },
}, {
    tableName: 'twitch_streamer',
    timestamps: false,
});


module.exports = twitchStreamer;