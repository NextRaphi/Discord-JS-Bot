const { Client, GatewayIntentBits, EmbedBuilder,  ActivityType, REST, Routes, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, PermissionsBitField, TextChannel, ActionRowBuilder, ButtonBuilder, ButtonStyle, Team, TextInputStyle, Embed } = require('discord.js');
const { CommandHandler } = require('djs-commander');
const config = require('./config/config.js');
const path = require('path');


 const fs = require('fs');


 const client = new Client({
  autoReconnect: true,
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
    ]
})

new CommandHandler({
  client,
  commandsPath: path.join(__dirname, 'src')
  
});




const slashcommands = [];
fs.readdirSync('./src/').forEach((dir) => {
  const slashcommandFiles = fs.readdirSync('./src/' + dir)
  .filter((file) => file.endsWith('.js'))



for (const file of slashcommandFiles) {
  const command = require('./src/' + dir + '/' + file);
  slashcommands.push(command.data.toJSON());
}
});


const rest = new REST({
    version: '10'
  }).setToken(config.bot_start.token);
  
  rest.put(Routes.applicationCommands( config.bot_start.client_Id), {
    body: slashcommands
  })

  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);


client.on('ready', () => {

    client.user.setActivity('Source by AhlaVintage#1111', { type: ActivityType.Playing });
    client.user.setStatus('dnd');
    console.log(`Logged in as ${client.user.tag}!`);
});















client.on('interactionCreate', async interaction => {


    if (interaction.isStringSelectMenu()) {

        if (interaction.customId === 'select') {
      
            //====================================================================================================
            // ==================================== Ticket: Support ==============================================
            //====================================================================================================
      
            if (interaction.values[0] === 'support') {
              if (interaction.guild.channels.cache.find(channel => channel.name === `ticket-${interaction.user.username}`)) {
                interaction.reply({ content: 'You can`t open a second ticket', ephemeral: true });
            } else {
                await interaction.guild.channels.create({
                    name: `ticket-${interaction.user.username}`,
                    type: TextChannel,
                    parent: config.TicketSystem.TicketCategory.support,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: config.Permissions.staffid,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                    ],
                    
      
                    
                }).then(channel => {
                    const ticket1 = new EmbedBuilder()
                    .setTitle('Welcome to your ticket')
                    .setAuthor({ name: 'Ahla | System' })
                    .setDescription(`You have opened a ticket in the **Support** category, we will take care of you as soon as possible!\n\nWe ask for your understanding if there are long waiting times.`)
                    .addFields()
                    .setColor('#082ebd')
                    .setTimestamp()
                    .setFooter({text: 'Ahla.system'})
      
                    const close1 = new ButtonBuilder()
                    .setCustomId('close1')
                    .setLabel('Ticket Close')
                    .setStyle(ButtonStyle.Danger)
      
                    const ticket1row = new ActionRowBuilder()
                    .addComponents(close1)
      
      
                    channel.send({ embeds: [ticket1], components: [ticket1row] });
                    interaction.reply({ content: `Ticket was created! <#${channel.id}>`, ephemeral: true });
      
      
            }
            )
        }
      
      }
      
      //=============================================================================================================
      /// ======================================= Ticket: Application ===============================================
      //=============================================================================================================
      
      if (interaction.values[0] === 'application') {
        if (interaction.guild.channels.cache.find(channel => channel.name === `ticket-${interaction.user.username}`)) {
          interaction.reply({ content: 'You can`t open a second ticket!', ephemeral: true });
      } else {
          await interaction.guild.channels.create({
              name: `ticket-${interaction.user.username}`,
              type: TextChannel,
              parent: config.TicketSystem.TicketCategory.application,
              permissionOverwrites: [
                  {
                      id: interaction.guild.roles.everyone.id,
                      deny: [PermissionsBitField.Flags.ViewChannel],
                  },
                  {
                      id: interaction.user.id,
                      allow: [PermissionsBitField.Flags.ViewChannel],
                  },
                  {
                      id: config.Permissions.staffid,
                      allow: [PermissionsBitField.Flags.ViewChannel],
                  },
              ],
              
      
              
          }).then(channel => {
              const ticket2 = new EmbedBuilder()
              .setTitle('Welcome in your Ticket')
              .setAuthor({ name: 'Ahla | System' })
              .setDescription(`You have opened a ticket in the **Application** category, we will take care of you as soon as possible!\n\nWe ask for your understanding if there are long waiting times.`)
              .addFields()
              .setColor('#082ebd')
              .setTimestamp()
              .setFooter({text: 'ahla.system'})
      
              const close1 = new ButtonBuilder()
              .setCustomId('close1')
              .setLabel('Ticket close')
              .setStyle(ButtonStyle.Danger)
              
              const ticket2row = new ActionRowBuilder()
              .addComponents(close1)
      
      
              channel.send({ embeds: [ticket2], components: [ticket2row] });
              interaction.reply({ content: `Ticket was created! <#${channel.id}>`, ephemeral: true });
      
      
      }
      )
      }
      
      }
      
      //=============================================================================================================
      /// =======================================Ticket: Product Purchase ===========================================
      //=============================================================================================================
      
      if (interaction.values[0] === 'productpurchase') {
        if (interaction.guild.channels.cache.find(channel => channel.name === `ticket-${interaction.user.username}`)) {
          interaction.reply({ content: 'You can`t open a second ticket!', ephemeral: true });
      } else {
          await interaction.guild.channels.create({
              name: `ticket-${interaction.user.username}`,
              type: TextChannel,
              parent: config.TicketSystem.TicketCategory.productpurchase,
              permissionOverwrites: [
                  {
                      id: interaction.guild.roles.everyone.id,
                      deny: [PermissionsBitField.Flags.ViewChannel],
                  },
                  {
                      id: interaction.user.id,
                      allow: [PermissionsBitField.Flags.ViewChannel],
                  },
                  {
                      id: config.Permissions.staffid,
                      allow: [PermissionsBitField.Flags.ViewChannel],
                  },
              ],
              
      
              
          }).then(channel => {
              const ticket3 = new EmbedBuilder()
              .setTitle('Welcome in your Ticket')
              .setAuthor({ name: 'Ahla | System' })
              .setDescription(`You have opened a ticket in the **Product Purchase** category, we will take care of you as soon as possible!\n\nWe ask for your understanding if there are long waiting times.`)
              .addFields()
              .setColor('#082ebd')
              .setTimestamp()
              .setFooter({text: 'ahla.system'})
      
              const close1 = new ButtonBuilder()
              .setCustomId('close1')
              .setLabel('Ticket Close')
              .setStyle(ButtonStyle.Danger)

              const discount = new ButtonBuilder()
                .setCustomId('discount')
                .setLabel('Discount Code')
                .setStyle(ButtonStyle.Primary)
      
              const ticket3row = new ActionRowBuilder()
              .addComponents(close1, discount)
      
              channel.send({ embeds: [ticket3], components: [ticket3row] });
              interaction.reply({ content: `Ticket was created! <#${channel.id}>`, ephemeral: true });
      
      
      }
      )
      }
      
      }
        }}
      
        if (interaction.isButton()) {
          if (interaction.customId === 'close1') {
            const sureembed = new EmbedBuilder()
            .setTitle('Ticket Close')
            .setAuthor({ name: 'Ahla | System' })
            .setDescription(`Are you sure you want to close this ticket?`)
            .setColor('#082ebd')
            .setTimestamp()
            .setFooter({text: 'ahla.system'})
      
            const yes = new ButtonBuilder()
            .setCustomId('confirm')
            .setLabel('Confirm')
            .setStyle(ButtonStyle.Success)
      
            const no = new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Danger)
      
            const buttons = new ActionRowBuilder()
            .addComponents(yes, no)
      
            interaction.reply({ embeds: [sureembed], components: [buttons], ephemeral: false });
          }
      
      
          if (interaction.isButton()) {
            if (interaction.customId === 'confirm') {
              const channel = interaction.channel;
              const messages = await channel.messages.fetch({ limit: 100 });
              const content = messages.reduce((a, m) => `${a}${m.author.tag}: ${m.content}\n`, '');
              const log = interaction.guild.channels.cache.get(config.TicketSystem.ticketlogs);
                                const TicketLog = new EmbedBuilder()
                                .setTitle(`Ticket from  ${interaction.user.username} | CLOSED `)
                                .setAuthor({ name: 'Ahla | System' })
                                .addFields(
                                  { name: 'Ticket closed by:', value: `<@${interaction.user.id}>`, inline: true },
                                  { name: 'Ticket name:', value: `#${channel.name}`, inline: true },
                                  { name: 'Ticket user list:', value: `${interaction.channel.members.map(m => (`<@${m.user.id}>`)).join('\n')}`, inline: true }
                                )
                                .setColor('#082ebd')
                                .setTimestamp()
                                .setFooter({text: 'Ahla Tickets | LOGS'})
              fs.writeFileSync(`./ticketlogs/${channel.name}.txt`, content);
              interaction.reply({ content: `Ticket closing!`, ephemeral: false });
              setTimeout(() => {
                channel.delete()
              }, 2500);
              await interaction.user.send({ files: [`./ticketlogs/${channel.name}.txt`] });
              await log.send({embeds: [TicketLog], files: [`./ticketlogs/${channel.name}.txt`] });
              fs.unlinkSync(`./ticketlogs/${channel.name}.txt`);
            }}
            
            if (interaction.isButton()) {
              if (interaction.customId === 'cancel') {
                interaction.reply({ content: `The closing of this ticket was canceled by ${interaction.user}!`, ephemeral: false});
                setTimeout(() => {
          
                  interaction.channel.messages.fetch({ limit: 2 }).then(messages => {
                    interaction.channel.bulkDelete(messages)
                  }
                  )
                }, 1500);
              }
            }
      


        }



//==========================================================================================================
/// ======================================= Discount Code ==================================================
//==========================================================================================================

if (interaction.isButton()) {
    if (interaction.customId === 'discount') {
      const { TextInputBuilder, ModalBuilder } = require('discord.js');
      const discountcodemodal = new ModalBuilder()
      .setCustomId('discountcodemodal')
      .setTitle('Discount Code');
  
      const discountcode = new TextInputBuilder()
      .setCustomId('discountcode')
      .setLabel('Code Here')
      .setStyle(TextInputStyle.Short)
      .setMinLength(1)
      .setMaxLength(100)
  
      const discountrow1 = new ActionRowBuilder()
      .addComponents(discountcode);
  
      discountcodemodal.addComponents(discountrow1);
  
      await interaction.showModal(discountcodemodal);
    }
  }


  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'discountcodemodal') {
      const discountcode = interaction.fields.getTextInputValue('discountcode');
      const discountcode1 = config.DiscountCodes.codes[0][0];
  
      if (discountcode === discountcode1) {
        interaction.reply({ content: `You have successfully redeemed the discount code: [${rabattcode}]`, ephemeral: true });
        const discountembed = new EmbedBuilder()
        .setTitle('Discount Code redeemed!')
        .setDescription(`The Discount Code **[${discountcode}]** was successfully redeemed by: <@${interaction.user.id}>!`)
        .setColor('#082ebd')
        .setTimestamp()
        .setFooter({text: 'Ahla.system'});
  
        const channel = interaction.channel;
        channel.send({ embeds: [discountembed] });
      } else {
        interaction.reply({ content: `The discount code is invalid.`, ephemeral: true });
      }
    }
  }


});




  client.login(config.bot_start.token);