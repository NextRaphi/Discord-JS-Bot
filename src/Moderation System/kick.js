const { SlashCommandBuilder } = require('discord.js');
const config = require('../../config/config.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a member')
    .addUserOption(option => option.setName('user').setDescription('The user to kick').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for kicking'))
    .setDMPermission(false),

    run: ({interaction}) => {
        if (!interaction.member.roles.cache.has(config.Permissions.adminid)) return interaction.reply({content: 'You don`t have the permissions for this command', ephemeral: true});
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(user.id);


        if (member) {
            if (member.kickable) {
                member.kick({reason: reason})
                .then(() => {
                    interaction.reply({content: `Successfully kicked ${user.tag} for ${reason}`, ephemeral: true});
                })
                .catch((error) => {
                    interaction.reply({content: `I was unable to kick ${user.tag} because of ${error}`, ephemeral: true});
                });
            } else {
                interaction.reply({content: `I was unable to kick ${user.tag} because they are not kickable`, ephemeral: true});
            }
        } else {
            interaction.reply({content: `I was unable to kick ${user.tag} because they are not in the server`, ephemeral: true});
        }
    }}