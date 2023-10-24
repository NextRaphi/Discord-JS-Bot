const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config/config.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a member')
    .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for banning'))
    .setDMPermission(false),

    run: ({interaction}) => {
        if (config.SecuritySystem.Features.mod.ban === 'off') return interaction.reply({content: 'This feature is currently disabled at the config', ephemeral: true});
        if (!interaction.member.roles.cache.has(config.Permissions.adminid)) return interaction.reply({content: 'You don`t have the permissions for this command', ephemeral: true});
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



//====================================================================================================================================================================================================================================\\
//========================================================================================================= Secuity System ===========================================================================================================\\
//====================================================================================================================================================================================================================================\\

const channel = interaction.guild.channels.cache.get(config.SecuritySystem.securitylogs);
const embed = new EmbedBuilder()
.setAuthor({name: `Ahla System`})
.setTitle('/Ban Command')
.setDescription('A user has been banned')
.setColor('#082ebd')
.setThumbnail(user.displayAvatarURL())
.addFields(
    {name: 'User', value: `${user}`, inline: true},
    {name: 'Staff Member', value: `${interaction.user}`, inline: true},
    {name: 'Reason', value: `${reason}`, inline: true},
)
.setTimestamp()
.setFooter({text: `ahla.system`});
channel.send({files: [`./config/rojo.gif`]});
setTimeout(() => {
channel.send({embeds: [embed]});
}, 1000);
setTimeout(() => {
channel.send({files: [`./config/rojo.gif`]});
}, 1500);

//====================================================================================================================================================================================================================================\\
//====================================================================================================================================================================================================================================\\
//====================================================================================================================================================================================================================================\\



    }
}