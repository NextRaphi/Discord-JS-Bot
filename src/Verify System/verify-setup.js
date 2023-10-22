const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../config/config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-verify')
        .setDescription('Setup Verify Command')
        .addRoleOption(option => option.setName('role').setDescription('The role to give to the user').setRequired(true))
        .setDMPermission(false),

    run: async ({interaction, client}) => {
        const role = interaction.options.getRole('role');
        const channel = interaction.channel;

        await interaction.reply({content: 'Setting up the verify system...', ephemeral: true});


        const verifyembed = new EmbedBuilder()
        .setTitle('Ahla Verify System')
        .setDescription('Click the button below to verify yourself!')
        .setImage('https://media.discordapp.net/attachments/1163086097790812182/1165310229920088214/code.gif?width=719&height=539')
        .setColor('#092b41')
        .setTimestamp()
        .setFooter({text: `Ahla.system`, iconURL: client.user.avatarURL() });

        const verifybutton = new ButtonBuilder()
        .setCustomId('verify')
        .setLabel('Verify')
        .setStyle(ButtonStyle.Success);

        const verifyrow = new ActionRowBuilder()
        .addComponents(verifybutton);

        channel.send({embeds: [verifyembed], components: [verifyrow]});

        const fs = require('fs');
        fs.readFile('./config/config.js', 'utf8', function (err,data) {
            if (err) {
                return console.log(err);
            }
            const result = data.replace(/verifyrole: '(.*)'/g, `verifyrole: '${role.id}'`);

            fs.writeFile('./config/config.js', result, 'utf8', function (err) {
                if (err) return console.log(err);
            });
        });



        interaction.editReply({content: 'Setup complete!', ephemeral: true});
        setTimeout(() => {
            interaction.deleteReply();
        }, 2000);
    }
}
