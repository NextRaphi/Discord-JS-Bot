const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('role-add')
    .setDescription('Add a role to a user')
    .addUserOption(option => option.setName('user').setDescription('Choose a user').setRequired(true))
    .addRoleOption(option => option.setName('role').setDescription('Choose a role').setRequired(true)),

    run: ({interaction}) => {
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');
        const guild = interaction.guild;

        if (user) {
            guild.members.cache.get(user.id).roles.add(role);
            interaction.reply({content: `The role ${role} was successfully added to ${user}!`, ephemeral: true});
        }
    }
};
