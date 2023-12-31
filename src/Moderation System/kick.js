const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config/config.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a member')
    .addUserOption(option => option.setName('user').setDescription('The user to kick').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for kicking'))
    .setDMPermission(false),

    run: ({interaction}) => {
        if (config.SecuritySystem.Features.mod.kick === 'off') return interaction.reply({content: 'This feature is currently disabled at the config', ephemeral: true});
        if (!interaction.member.roles.cache.has(config.Permissions.adminid)) return interaction.reply({content: 'You don`t have the permissions for this command', ephemeral: true});
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


//====================================================================================================================================================================================================================================\\
//========================================================================================================= Secuity System ===========================================================================================================\\
//====================================================================================================================================================================================================================================\\

const channel = interaction.guild.channels.cache.get(config.SecuritySystem.securitylogs);
const embed = new EmbedBuilder()
.setAuthor({name: `Ahla System`})
.setTitle('/Kick Command')
.setDescription('A user has been kicked')
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


    }}