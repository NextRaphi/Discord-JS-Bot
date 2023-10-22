const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('claim')
        .setDescription('Du übernimmst das Ticket'),

        run: ({ interaction }) => {
            const channel = interaction.channel;
            if (channel.name.startsWith('ticket')) {
                const claimed = new EmbedBuilder()
                    .setTitle('Ticket was claimed')
                    .setDescription(`**Ticket was claimed.**\n${interaction.user} has claimed this ticket and will help you as soon as possible.`)
                    .setColor('#082ebd')
                    .setTimestamp()
                interaction.reply({ embeds: [claimed], ephemeral: false });
            }}}