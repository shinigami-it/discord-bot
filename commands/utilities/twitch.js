const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('twitch')
        .setDescription('All active guilds'),
    
    async execute(interaction) {
        const rolePing = "<@&1172604014622429206>"
        const twitchTitle = "🔥 Discord.js bot | Twitch events 🔥 [DE|ENG] 🔥";
        const twitchCategory = "Software and Game Development";
        const twitchUsername = "DasHund007";
        const twitchToken = "45aba2f3-334b-4cd4-965d-35bec7c39a10";
        const twitchIcon = `https://static-cdn.jtvnw.net/jtv_user_pictures/${twitchToken}-profile_image-70x70.jpeg`;
        const twitchNotify = "is now live on Twitch!";


        const embed = new EmbedBuilder()
            .setTitle(twitchTitle)
            .setURL(`https://twitch.tv/${twitchUsername}`)
            .setDescription(`**Game**\n${twitchCategory}`)
            .setColor('#6400ff')
            .setAuthor({ name: `${twitchUsername} ${twitchNotify}`, iconURL: twitchIcon, url: `https://twitch.tv/${twitchUsername}` })
            .setURL(`https://twitch.tv/${twitchUsername}`)
            .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${twitchUsername.toLowerCase()}-400x225.jpg?timestamp=${Date.now()}`)
	        .setTimestamp()
            .setFooter({ text: 'FTS - Est. 2023', iconURL: 'https://i.imgur.com/le0aT56.png' });

            const button = new ButtonBuilder()
            .setLabel('Watch Stream')
            .setURL(`https://twitch.tv/${twitchUsername}`)
            .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder().addComponents(button);

        await interaction.reply({
            content: rolePing,
            embeds: [embed],
            components: [row]
        });
    }
};
