const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config/config.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unbans a member')
    .addUserOption(option => option.setName('user').setDescription('The user to unban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for unbanning'))
    .setDMPermission(false),

    run: ({interaction}) => {
        if (config.SecuritySystem.Features.mod.unban === 'off') return interaction.reply({content: 'This feature is currently disabled at the config', ephemeral: true});
        if (!interaction.member.roles.cache.has(config.Permissions.adminid)) return interaction.reply({content: 'You don`t have the permissions for this command', ephemeral: true});
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(user.id);

        if (member) {
            if (member.bannable) {
                member.ban({reason: reason})
                .then(() => {
                    interaction.reply({content: `Successfully Unbanned ${user.tag} for ${reason}`, ephemeral: true});
                })
                .catch((error) => {
                    interaction.reply({content: `I was unable to unban ${user.tag} because of ${error}`, ephemeral: true});
                });
            } else {
                interaction.reply({content: `I was unable to unban ${user.tag} because they are not unbanable`, ephemeral: true});
            }
        }



//====================================================================================================================================================================================================================================\\
//========================================================================================================= Secuity System ===========================================================================================================\\
//====================================================================================================================================================================================================================================\\

const channel = interaction.guild.channels.cache.get(config.SecuritySystem.securitylogs);
const embed = new EmbedBuilder()
.setAuthor({name: `Ahla System`})
.setTitle('/Unban Command')
.setDescription('A user has been unbanned')
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