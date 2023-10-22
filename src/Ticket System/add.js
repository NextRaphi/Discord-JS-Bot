const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Add a user or role to a ticket')
        .addUserOption(option => option.setName('user').setDescription('Choose the user').setRequired(false))
        .addRoleOption(option => option.setName('role').setDescription('Choose the role').setRequired(false)),

        run: ({interaction}) => {
            const user = interaction.options.getUser('user');
            const role = interaction.options.getRole('role');
            const channel = interaction.channel;
            

            if (user) {
                channel.permissionOverwrites.edit(user, {ViewChannel: true});            
                interaction.reply({content: `The user ${user} was added successfully!`, ephemeral: true});
            }
            if (role) {
                channel.permissionOverwrites.create(role, {ViewChannel: true});
                interaction.reply({content: `The role ${role} was added successfully!`, ephemeral: true});
            }
        },
};
