const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deadd')
        .setDescription('Removed a user from a ticket')
        .addUserOption(option => option.setName('user').setDescription('Choose a user').setRequired(false))
        .addRoleOption(option => option.setName('role').setDescription('Choose a role').setRequired(false)),

        run: ({interaction}) => {
            const user = interaction.options.getUser('user');
            const role = interaction.options.getRole('role');
            const channel = interaction.channel;
            

            if (user) {
                channel.permissionOverwrites.delete(user, {ViewChannel: true});            
                interaction.reply({content: `The user ${user} was successfully removed!`, ephemeral: true});
            }
            if (role) {
                channel.permissionOverwrites.delete(role, {ViewChannel: true});
                interaction.reply({content: `The role ${role} was successfully removed!`, ephemeral: true});
            }
        }
    };
