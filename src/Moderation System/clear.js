const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const config = require('../../config/config.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear messages in a channel')
    .addStringOption(option => option.setName('amount').setDescription('The amount of messages to clear').setRequired(true)),

    run: async ({interaction, error}) => {

        if (config.SecuritySystem.Features.modsystem.clear === 'off') return interaction.reply({content: 'This feature is currently disabled at the config', ephemeral: true});
        if (!interaction.member.roles.cache.has(config.Permissions.staffid)) return interaction.reply({content: 'You don`t have the permissions for this command', ephemeral: true});
        const amount = interaction.options.getString('amount');
        const channel = interaction.channel;

        if (amount > 100) return interaction.reply({content: 'You can`t clear more than 100 messages', ephemeral: true});

        await channel.bulkDelete(amount);

        if (error) {
            interaction.reply({content: 'I can`t clear messages that are older than 14 days', ephemeral: true});
        } else {
            interaction.reply({content: `Successfully cleared ${amount} messages`, ephemeral: true});
        }



//====================================================================================================================================================================================================================================\\
//========================================================================================================= Secuity System ===========================================================================================================\\
//====================================================================================================================================================================================================================================\\

        const logchannel = interaction.guild.channels.cache.get(config.SecuritySystem.securitylogs);
        const embed = new EmbedBuilder()
        .setTitle('/Clear Command')
        .setAuthor({name: `Ahla System`})
        .setDescription('Messages have been cleared')
        .setColor('#082ebd')
        .addFields(
            {name: 'Staff Member', value: `${interaction.user.tag}`, inline: true},
            {name: 'Channel', value: `${channel}`, inline: true},
            {name: 'Amount', value: `${amount}`, inline: true},
        )
        .setTimestamp()
        .setFooter({text: `ahla.system`});

        const messages = await channel.messages.fetch({ limit: amount });
        const charset = '0123456789';
        const id = `${charset.charAt(Math.floor(Math.random() * charset.length))}${charset.charAt(Math.floor(Math.random() * charset.length))}${charset.charAt(Math.floor(Math.random() * charset.length))}`;
        const contentstring = messages.reduce((a, m) => `${a}${m.author.tag}: ${m.content}\n`, '');
        const fs = require('fs');
        fs.writeFileSync(`./logs/${id}.txt`, contentstring);
        if (contentstring === '') { 
            fs.unlinkSync(`./logs/${id}.txt`);
            const channel = interaction.channel;
            channel.send({content: 'No messages were deleted', ephemeral: true});
    } else {


        logchannel.send({files: [`./config/rojo.gif`]});
        setTimeout(() => {
        logchannel.send({ embeds: [embed], files:[`./logs/${id}.txt`]});
        }, 1000);
        setTimeout(() => {
            logchannel.send({files: [`./config/rojo.gif`]});
        }, 2000);

        setTimeout(() => {
        fs.unlinkSync(`./logs/${id}.txt`);
        }, 10000);
    }

//====================================================================================================================================================================================================================================\\
//====================================================================================================================================================================================================================================\\
//====================================================================================================================================================================================================================================\\


    }
}