const { SlashCommandBuilder } = require("discord.js");
const config = require('../../config/config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rename')
        .setDescription('Change the name of a channel')
        .addStringOption(option => option.setName('name').setDescription('Name').setRequired(true)),

        run: ({interaction}) => {
            if (!interaction.member.roles.cache.has(config.Permissions.staffid)) return interaction.reply({content: 'You don`t have the permissions for this command', ephemeral: true});
            const name = interaction.options.getString('name');
            const channel = interaction.channel;

            channel.setName(name);
            interaction.reply({content: `Der Name des Channels wurde zu ${name} geändert!`, ephemeral: true});

            
        }
    }