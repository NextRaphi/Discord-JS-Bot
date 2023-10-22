const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket-setup')
        .setDescription('Send Ticket Menu in this Channel')
        .setDMPermission (false),

        run: ({interaction}) => {
            const ticketembed = new EmbedBuilder()
            .setTitle('Ahla Ticket Menu')
            .setAuthor({name: `Ahla | System` })
            .setDescription(`Please select a category to open a ticket.`)
            .setImage('https://cdn.discordapp.com/attachments/1163086097790812182/1165310229920088214/code.gif?ex=654662b9&is=6533edb9&hm=15feb84d1d4f843bfe360488373a478ce27b8dd9f8f66143adad06e92ef105aa&')
            .setColor('#082ebd')
            .setTimestamp()
            .setFooter({text: `Ahla.system` });

            const select = new StringSelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Click Here!')
                .setMinValues(0)
                .setMaxValues(1)
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                    .setLabel('Support')
                    .setDescription('Open a ticket in the Support category.')
                    .setEmoji('🛠')
                    .setValue('support'),
                    new StringSelectMenuOptionBuilder()
                    .setLabel('Application')
                    .setDescription('Open a ticket in the Application category.')
                    .setEmoji('📜')
                    .setValue('application'),
                    new StringSelectMenuOptionBuilder()
                    .setLabel('Prduct Purchase')
                    .setDescription('Open a ticket in the Product Purchase category.')
                    .setEmoji('🛒') // you can add your own custom emoji by adding the id here | exmaple: .setEmoji('<:Ahla:1124343431548899379>') | to get this id write = \ + emoji you want to use
                    .setValue('productpurchase'),
                )

                const ticketrow = new ActionRowBuilder()
                .addComponents(select);

                const channel = interaction.channel;

            interaction.reply({content: 'Setting up the ticket system...', ephemeral: true});
        channel.send({embeds: [ticketembed], components: [ticketrow]});
        

                },
        }