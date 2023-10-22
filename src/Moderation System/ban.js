const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a member')
    .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for banning')),

    run: ({interaction}) => {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(user.id);

        if (member) {
            if (member.bannable) {
                member.ban({reason: reason})
                .then(() => {
                    interaction.reply({content: `Successfully banned ${user.tag} for ${reason}`, ephemeral: true});
                })
                .catch((error) => {
                    interaction.reply({content: `I was unable to ban ${user.tag} because of ${error}`, ephemeral: true});
                });
            } else {
                interaction.reply({content: `I was unable to ban ${user.tag} because they are not bannable`, ephemeral: true});
            }
        } else {
            interaction.reply({content: `I was unable to ban ${user.tag} because they are not in the server`, ephemeral: true});
        }
    }
}