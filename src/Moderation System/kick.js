const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a member')
    .addUserOption(option => option.setName('user').setDescription('The user to kick').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for kicking')),

    run: ({interaction}) => {
        
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(user.id);


        if (member) {
            if (member.kickable) {
                member.kick({reason: reason})
                .then(() => {
                    interaction.reply({content: `Successfully kicked ${user.tag} for ${reason}`, ephemeral: true});
                })
                .catch((error) => {
                    interaction.reply({content: `I was unable to kick ${user.tag} because of ${error}`, ephemeral: true});
                });
            } else {
                interaction.reply({content: `I was unable to kick ${user.tag} because they are not kickable`, ephemeral: true});
            }
        } else {
            interaction.reply({content: `I was unable to kick ${user.tag} because they are not in the server`, ephemeral: true});
        }
    }}