const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config/config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('claim')
        .setDescription('Du übernimmst das Ticket'),

        run: ({ interaction }) => {
            if (!interaction.member.roles.cache.has(config.Permissions.staffid)) return interaction.reply({content: 'You don`t have the permissions for this command', ephemeral: true});
                const claimed = new EmbedBuilder()
                    .setTitle('Ticket was claimed')
                    .setDescription(`**Ticket was claimed.**\n${interaction.user} has claimed this ticket and will help you as soon as possible.`)
                    .setColor('#082ebd')
                    .setTimestamp()
                interaction.reply({ embeds: [claimed], ephemeral: false });
            }}