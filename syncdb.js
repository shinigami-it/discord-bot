const Guild = require('./models/guild');

(async () => {
    await Guild.sync({ alter: true }); // Synchronize schema changes
    console.log('Database synced');
})();
