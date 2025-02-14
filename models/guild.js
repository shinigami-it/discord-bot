const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Guild = sequelize.define('Guild', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
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
}, {
    tableName: 'fts-bot',
    timestamps: false,
});

module.exports = Guild;


// Automatically sync the schema with the database
async function syncDatabase() {
    try {
        await Guild.sync({ alter: true }); // Use { force: true } to drop and recreate the table
        console.log('Guild table synchronized');
    } catch (error) {
        console.error('Error syncing Guild table:', error.message);
    }
}

syncDatabase();

module.exports = Guild;
