const { SlashCommandBuilder } = require('discord.js');
const config = require('../../config/config.js');

module.exports = {

    data:new SlashCommandBuilder()
    .setName('role-remove')
    .setDescription('Remove a role from a user')
    .addUserOption(option => option.setName('user').setDescription('Choose a user').setRequired(true))
    .addRoleOption(option => option.setName('role').setDescription('Choose a role').setRequired(true))
    .setDMPermission(false),

    run: ({interaction}) => {
        if (!interaction.member.roles.cache.has(config.Permissions.adminid)) return interaction.reply({content: 'You don`t have the permissions for this command', ephemeral: true});
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');
        const guild = interaction.guild;

        if (user) {
            guild.members.cache.get(user.id).roles.remove(role);
            interaction.reply({content: `The role ${role} was successfully removed from ${user}!`, ephemeral: true});
        }

                //if the command dont work, try to give the bot a higher role with more permissions.

    }
};