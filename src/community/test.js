const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test'),

    run: ({ interaction }) => {
        const test = new EmbedBuilder()
            .setTitle('Test')
            .setDescription('Test')
            .setColor('#119007')
            .setTimestamp();

            const row = new ButtonBuilder()
            .setCustomId('test')
            .setLabel('Test')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('⏱️')

            const row1 = new ActionRowBuilder()
            .addComponents(row)

        interaction.reply({ embeds: [test], components: [row1] });
    }
}