const { SlashCommandBuilder } = require('discord.js');
const config = require('../../config/config.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mutes a member for every channel | example 1000 = 1 second')
    .addUserOption(option => option.setName('user').setDescription('The user to mute').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for muting').setRequired(true))
    .addStringOption(option => option.setName('time').setDescription('The time for muting or write perm for a permanent mute').setRequired(true))
    .setDMPermission(false),

    run: ({interaction}) => {
        if (!interaction.member.roles.cache.has(config.Permissions.staffid)) return interaction.reply({content: 'You don`t have the permissions for this command', ephemeral: true});
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const time = interaction.options.getString('time') || 'No time provided';
        const member = interaction.guild.members.cache.get(user.id);
        const mutetrole = config.Moderation.muteroleid;
        const mutetime = time / 1000 + ' seconds';
        if (mutetime > 60) {
            mutetime = mutetime / 60;
            mutetime = mutetime + ' minutes';
        }


        if (member) {
            
            if (member.roles.cache.has(mutetrole)) {
                interaction.reply({content: `I was unable to mute ${user.tag} because they are already muted`, ephemeral: true});
            } else if (time === 'perm') {
                    member.roles.add(mutetrole);
                    interaction.reply({content: `Successfully muted ${user.tag} for ${reason}, Time: Permanent`, ephemeral: true});
                } else {

                member.roles.add(mutetrole);
                interaction.reply({content: `Successfully muted ${user.tag} for ${reason}, Time: ${mutetime}`, ephemeral: true});
                setTimeout(() => {
                    member.roles.remove(mutetrole);
                }, time);
            }
        } else {
            interaction.reply({content: `I was unable to mute ${user.tag} because they are not in the server`, ephemeral: true});
        }
    }}