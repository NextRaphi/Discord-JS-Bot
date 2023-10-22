const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data:new SlashCommandBuilder()
    .setName('role-remove')
    .setDescription('Remove a role from a user')
    .addUserOption(option => option.setName('user').setDescription('Choose a user').setRequired(true))
    .addRoleOption(option => option.setName('role').setDescription('Choose a role').setRequired(true)),

    run: ({interaction}) => {
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');
        const guild = interaction.guild;

        if (user) {
            guild.members.cache.get(user.id).roles.remove(role);
            interaction.reply({content: `The role ${role} was successfully removed from ${user}!`, ephemeral: true});
        }
    }
};