const { ActivityType } = require('discord.js');
const Guild = require('../models/guild');
const chalk = require('chalk');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        await console.log(chalk.magenta.bold.underline(`Logged in as ${client.user.tag} ✅`));

        client.user.setActivity('discord.gg/ZyRe42SR4C', {
            type: ActivityType.Streaming,
            url: 'https://twitch.tv/dashund007'
        });

        const specificServerId = '1306704630171963422';
        const roleCountChannelId = '1311744998798262344';
        const roleId = '1307756165849153688';
        let roleCountOld = 0;
        let memberCountsOld = {};

        client.on('guildMemberAdd', async (member) => {
            await updateMemberCount(member.guild);
            if (member.guild.id === specificServerId) {
                await updateRoleCount(member.guild);
            }
        });

        client.on('guildMemberRemove', async (member) => {
            await updateMemberCount(member.guild);
            if (member.guild.id === specificServerId) {
                await updateRoleCount(member.guild);
            }
        });

        client.on('guildMemberUpdate', async (oldMember, newMember) => {
            if (newMember.guild.id === specificServerId) {
                const hadRole = oldMember.roles.cache.has(roleId);
                const hasRole = newMember.roles.cache.has(roleId);
                if (hadRole !== hasRole) {
                    await updateRoleCount(newMember.guild);
                }
            }
        });

        for (const guild of client.guilds.cache.values()) {
            await updateMemberCount(guild);
            if (guild.id === specificServerId) {
                await updateRoleCount(guild);
            }
        }

        async function updateMemberCount(guild) {
            try {
                await guild.members.fetch();
                const totalMembers = guild.members.cache.size;

                if (memberCountsOld[guild.id] !== totalMembers) {
                    memberCountsOld[guild.id] = totalMembers;

                    const guildData = await Guild.findOne({ where: { id: guild.id } });
                    if (guildData && guildData.memberCountChannelId) {
                        const memberCountChannel = await guild.channels.fetch(guildData.memberCountChannelId);
                        if (memberCountChannel) {
                            await memberCountChannel.setName(`Members: ${totalMembers}`);
                            console.log(chalk.green(`Updated member count channel for guild `) + chalk.red.bold.underline(`${guild.name} to: ${totalMembers}\n`));
                        } else {
                            console.error(chalk.red(`Member count channel with ID `) + chalk.red.bold.underline(`${guildData.memberCountChannelId} not found.\n`));
                        }
                    }
                }
            } catch (error) {
                console.error(chalk.red(`Error updating member count for guild ${guild.name}:`, error));
            }
        }

        async function updateRoleCount(guild) {
            try {
                await guild.members.fetch();
                await guild.channels.fetch();

                const roleCount = guild.members.cache.filter(member =>
                    member.roles.cache.has(roleId)
                ).size;

                if (roleCount !== roleCountOld) {
                    roleCountOld = roleCount;

                    await client.user.setPresence({
                        activities: [{ name: `Customers: ${roleCount}`, type: ActivityType.Watching }],
                        status: 'dnd',
                    });

                    const roleCountChannel = await guild.channels.fetch(roleCountChannelId);
                    if (roleCountChannel) {
                        await roleCountChannel.setName(`Customers: ${roleCount}`);
                        console.log(chalk.yellow(`Updated role count channel in JF to: `) + chalk.white.bold.underline(`Customers: ${roleCount}\n`));
                    } else {
                        console.error(chalk.red(`Role count channel with ID ${roleCountChannelId} not found in specific guild.\n`));
                    }
                }
            } catch (error) {
                console.error(chalk.red(`Error updating role count for JF:`, error));
            }
        }
    }
};
