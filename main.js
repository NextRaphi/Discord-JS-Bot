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

  .then(() => console.log('Commands successfully registered and loaded!'))
  .catch(console.error);


client.on('ready', () => {

    client.user.setActivity('Source Code by AhlaVintage#1111', { type: ActivityType.Playing });
    client.user.setStatus('dnd');
   // client.user.setAvatar('./config/AhlaLogo.jpeg');
   // client.user.setUsername('AhlaVintage.system');
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
              if (config.TicketSystem.logstatus.status === 'on') {
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
              fs.writeFileSync(`./logs/${channel.name}.txt`, content);
              interaction.reply({ content: `Ticket closing!`, ephemeral: false });
              setTimeout(() => {
                channel.delete()
              }, 2500);
              await interaction.user.send({ files: [`./logs/${channel.name}.txt`] });
              await log.send({embeds: [TicketLog], files: [`./logs/${channel.name}.txt`] });
              fs.unlinkSync(`./logs/${channel.name}.txt`);
            } else {
              interaction.reply({ content: `Ticket closing, without Logging, because it is off at the config!`, ephemeral: false });
              setTimeout(() => {
                interaction.channel.delete()
              }, 3500);
            }
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





  //==========================================================================================================
/// ======================================= Verify =========================================================
//==========================================================================================================

if (interaction.isButton()) {
  if (interaction.customId === 'verify') {
    if (interaction.member.roles.cache.has(config.VerifySystem.verifyrole)) {
      interaction.reply({ content: `You already verified.`, ephemeral: true });
    } else {
      interaction.member.roles.add(config.VerifySystem.verifyrole);

      interaction.reply({ content: `You are verified now.`, ephemeral: true });
    }
  }
}


});




//====================================================================================================================================================================================================================================\\
//========================================================================================================= Secuity System ===========================================================================================================\\
//====================================================================================================================================================================================================================================\\



client.on('guildMemberAdd', async member => {
  if (config.SecuritySystem.Features.welcomemessage.join === 'off') return console.log('INFO: Welcome Message is off, no Welcome Message Log was send!');
  const channel = member.guild.channels.cache.get(config.SecuritySystem.securitylogs);
  const embed = new EmbedBuilder()
  .setTitle('Member Joined')
  .setAuthor({ name: 'Ahla | System' })
  .setDescription(`A new member has joined the server!`)
  .addFields(
    { name: 'Member:', value: `<@${member.user.id}>`, inline: true },
    { name: 'Member ID:', value: `${member.user.id}`, inline: true },
    { name: 'Member Tag:', value: `${member.user.tag}`, inline: true },
    { name: 'Member Created:', value: `${member.user.createdAt}`, inline: true },
    { name: 'Member Joined:', value: `${member.joinedAt}`, inline: true },

  )
  .setColor('#082ebd')
  .setTimestamp()
  .setFooter({text: 'Ahla.system'})

  channel.send({files: [`./config/rojo.gif`]});
  setTimeout(() => {
  channel.send({embeds: [embed]});
  }, 1000);
  setTimeout(() => {
    channel.send({files: [`./config/rojo.gif`]});
  }, 1500);
});


client.on('guildMemberRemove', async member => {
  if (config.SecuritySystem.Features.welcomemessage.leave === 'off') return console.log('INFO: Left Message is off, no Left Message Log was send!');
  const channel = member.guild.channels.cache.get(config.SecuritySystem.securitylogs);
  const embed = new EmbedBuilder()
  .setTitle('Member Left')
  .setAuthor({ name: 'Ahla | System' })
  .setDescription(`A member has left the server!`)
  .addFields(
    { name: 'Member:', value: `<@${member.user.id}>`, inline: true },
    { name: 'Member ID:', value: `${member.user.id}`, inline: true },
    { name: 'Member Tag:', value: `${member.user.tag}`, inline: true },
    { name: 'Member Created:', value: `${member.user.createdAt}`, inline: true },
    { name: 'Member Joined:', value: `${member.joinedAt}`, inline: true },

  )
  .setColor('#082ebd')
  .setTimestamp()
  .setFooter({text: 'Ahla.system'})
  channel.send({files: [`./config/rojo.gif`]});
  setTimeout(() => {
  channel.send({embeds: [embed]});
  }, 1000);
  setTimeout(() => {
    channel.send({files: [`./config/rojo.gif`]});
  }, 1500);
});


client.on('messageUpdate', async (oldMessage, newMessage) => {
  if (config.SecuritySystem.Logs.messageUpdate === 'off') return console.log('INFO: Message Update is off, no Message Update Log was send!');
  const channel = oldMessage.guild.channels.cache.get(config.SecuritySystem.securitylogs);
  const embed = new EmbedBuilder()
  .setTitle('Message Update')
  .setAuthor({ name: 'Ahla | System' })
  .setDescription(`A message was edited!`)
  .addFields(
    { name: 'Message Author:', value: `<@${oldMessage.author.id}>`, inline: true },
    { name: 'Message Author ID:', value: `${oldMessage.author.id}`, inline: true },
    { name: 'Message Author Tag:', value: `${oldMessage.author.tag}`, inline: true },
    { name: 'Message Author Created:', value: `${oldMessage.author.createdAt}`, inline: true },
    { name: 'Message Author Joined:', value: `${oldMessage.member.joinedAt}`, inline: true },
    { name: 'Old Message:', value: `${oldMessage.content}`, inline: true },
    { name: 'New Message:', value: `${newMessage.content}`, inline: true },

  )
  .setColor('#082ebd')
  .setTimestamp()
  .setFooter({text: 'Ahla.system'})
  channel.send({files: [`./config/rojo.gif`]});
  setTimeout(() => {
  channel.send({embeds: [embed]});
  }, 1000);
  setTimeout(() => {
    channel.send({files: [`./config/rojo.gif`]});
  }, 1500);
});


client.on(`messageDelete`, async message => {
  if (config.SecuritySystem.Logs.messageDelete === 'off') return console.log('INFO: Message Delete is off, no Message Delete Log was send!');
  const channel = message.guild.channels.cache.get(config.SecuritySystem.securitylogs);
  const embed = new EmbedBuilder()
  .setTitle('Message Delete')
  .setAuthor({ name: 'Ahla | System' })
  .setDescription(`A message was deleted!`)
  .addFields(
    { name: 'Message Author:', value: `<@${message.author.id}>`, inline: true },
    { name: 'Message Author ID:', value: `${message.author.id}`, inline: true },
    { name: 'Message Author Tag:', value: `${message.author.tag}`, inline: true },
    { name: 'Message:', value: `${message.content}`, inline: true },

  )
  .setColor('#082ebd')
  .setTimestamp()
  .setFooter({text: 'Ahla.system'})
  channel.send({files: [`./config/rojo.gif`]});
  setTimeout(() => {
  channel.send({embeds: [embed]});
  }, 1000);
  setTimeout(() => {
    channel.send({files: [`./config/rojo.gif`]});
  }, 1500);
});


client.on('roleCreate', async role => {
  if (config.SecuritySystem.Logs.roleCreate === 'off') return console.log('INFO: Role Create is off, no Role Create Log was send!');
  const channel = role.guild.channels.cache.get(config.SecuritySystem.securitylogs);
  const embed = new EmbedBuilder()
  .setTitle('New Role Created')
  .setAuthor({ name: 'Ahla | System' })
  .setDescription(`A new role was created!`)
  .addFields(
    { name: 'Role:', value: `<@&${role.id}>`, inline: true },
    { name: 'Role ID:', value: `${role.id}`, inline: true },
    { name: 'Role Created:', value: `${role.createdAt}`, inline: true },
    
  )
  .setColor('#082ebd')
  .setTimestamp()
  .setFooter({text: 'Ahla.system'})
  channel.send({files: [`./config/rojo.gif`]});
  setTimeout(() => {
  channel.send({embeds: [embed]});
  }, 1000);
  setTimeout(() => {
    channel.send({files: [`./config/rojo.gif`]});
  }, 1500);
});


client.on('roleDelete', async role => {
  if (config.SecuritySystem.Logs.roleDelete === 'off') return console.log('INFO: Role Delete is off, no Role Delete Log was send!');
  const channel = role.guild.channels.cache.get(config.SecuritySystem.securitylogs);
  const embed = new EmbedBuilder()
  .setTitle('Role Deleted')
  .setAuthor({ name: 'Ahla | System' })
  .setDescription(`A role was deleted!`)
  .addFields(
    { name: 'Role:', value: `@${role.name}`, inline: true },
    { name: 'Role ID:', value: `${role.id}`, inline: true },
    { name: 'Role Created:', value: `${role.createdAt}`, inline: true },
    
  )
  .setColor('#082ebd')
  .setTimestamp()
  .setFooter({text: 'Ahla.system'})
  channel.send({files: [`./config/rojo.gif`]});
  setTimeout(() => {
  channel.send({embeds: [embed]});
  }, 1000);
  setTimeout(() => {
    channel.send({files: [`./config/rojo.gif`]});
  }, 1500);
});


client.on(`roleUpdate`, async (oldRole, newRole) => {
  if (config.SecuritySystem.Logs.roleUpdated === 'off') return console.log('INFO: Role Update is off, no Role Update Log was send!');
  const channel = oldRole.guild.channels.cache.get(config.SecuritySystem.securitylogs);
  const embed = new EmbedBuilder()
  .setTitle('Role Updated')
  .setAuthor({ name: 'Ahla | System' })
  .setDescription(`A role was updated!`)
  .addFields(
    { name: 'Role:', value: `<@&${oldRole.id}>`, inline: true },
    { name: 'Role ID:', value: `${oldRole.id}`, inline: true },
    { name: 'Old Role Name:', value: `${oldRole.name}`, inline: true },
    { name: 'New Role Name:', value: `${newRole.name}`, inline: true },
    
  )
  .setColor('#082ebd')
  .setTimestamp()
  .setFooter({text: 'Ahla.system'})
  channel.send({files: [`./config/rojo.gif`]});
  setTimeout(() => {
  channel.send({embeds: [embed]});
  }, 1000);
  setTimeout(() => {
    channel.send({files: [`./config/rojo.gif`]});
  }, 1500);
});


client.on('channelCreate', async channel => {

  if (config.SecuritySystem.Logs.channelCreate === 'off') return console.log('INFO: Channel Create is off, no Channel Create Log was send!');
  const channel1 = channel.guild.channels.cache.get(config.SecuritySystem.securitylogs);
  const embed = new EmbedBuilder()
  .setTitle('Channel Created')
  .setAuthor({ name: 'Ahla | System' })
  .setDescription(`A new channel was created!`)
  .addFields(
    { name: 'Channel:', value: `<#${channel.id}>`, inline: true },
    { name: 'Channel ID:', value: `${channel.id}`, inline: true },
    { name: 'Channel Created:', value: `${channel.createdAt}`, inline: true },
    
  )
  .setColor('#082ebd')
  .setTimestamp()
  .setFooter({text: 'Ahla.system'})
  channel1.send({files: [`./config/rojo.gif`]});
  setTimeout(() => {
  channel1.send({embeds: [embed]});
  }, 1000);
  setTimeout(() => {
    channel1.send({files: [`./config/rojo.gif`]});
  }, 1500);
});

client.on('channelDelete', async channel => {
  if (config.SecuritySystem.Logs.channelDelete === 'off') return console.log('INFO: Channel Delete is off, no Channel Delete Log was send!');
  const channel1 = channel.guild.channels.cache.get(config.SecuritySystem.securitylogs);
  const embed = new EmbedBuilder()
  .setTitle('Channel Deleted')
  .setAuthor({ name: 'Ahla | System' })
  .setDescription(`A channel was deleted!`)
  .addFields(
    { name: 'Channel:', value: `#${channel.name}`, inline: true },
    { name: 'Channel ID:', value: `${channel.id}`, inline: true },
    { name: 'Channel Created:', value: `${channel.createdAt}`, inline: true },
    
  )
  .setColor('#082ebd')
  .setTimestamp()
  .setFooter({text: 'Ahla.system'})
  channel1.send({files: [`./config/rojo.gif`]});
  setTimeout(() => {
  channel1.send({embeds: [embed]});
  }, 1000);
  setTimeout(() => {
    channel1.send({files: [`./config/rojo.gif`]});
  }, 1500);
});

client.on(`channelUpdate`, async (oldChannel, newChannel) => {
  if (config.SecuritySystem.Logs.channelUpdate === 'off') return console.log('INFO: Channel Update is off, no Channel Update Log was send!');
  const channel = oldChannel.guild.channels.cache.get(config.SecuritySystem.securitylogs);
  const embed = new EmbedBuilder()
  .setTitle('Channel Updated')
  .setAuthor({ name: 'Ahla | System' })
  .setDescription(`A channel was updated!`)
  .addFields(
    { name: 'Channel:', value: `<#${oldChannel.id}>`, inline: true },
    { name: 'Channel ID:', value: `${oldChannel.id}`, inline: true },
    { name: 'Old Channel Name:', value: `${oldChannel.name}`, inline: true },
    { name: 'New Channel Name:', value: `${newChannel.name}`, inline: true },
    
  )
  .setColor('#082ebd')
  .setTimestamp()
  .setFooter({text: 'Ahla.system'})
  channel.send({files: [`./config/rojo.gif`]});
  setTimeout(() => {
  channel.send({embeds: [embed]});
  }, 1000);
  setTimeout(() => {
    channel.send({files: [`./config/rojo.gif`]});
  }, 1500);
});

// --------------- spam protection --------------- \\

const spamlimit = 10;
const spamtime = 10000; // you can change the time to whatever you want in milliseconds, now it is 10 seconds
const spamusers = new Map();

client.on('messageCreate', async message => {
  if (spamusers.has(message.author.id)) {
    const userdata = spamusers.get(message.author.id);
    const user = message.author.id;
    const messages = await message.channel.messages.fetch({ limit: 100 });
    const { lastMessage, timer } = userdata;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userdata.msgCount;
    if (difference > spamtime) {
      clearTimeout(timer);
      userdata.msgCount = 1;
      userdata.lastMessage = message;
      userdata.timer = setTimeout(() => {
        spamusers.delete(message.author.id);
      }, spamtime);
      spamusers.set(message.author.id, userdata);
    } else {
      ++msgCount;
      if (parseInt(msgCount) === spamlimit) {
        const role = message.guild.roles.cache.get(config.Moderation.muteroleid);
        message.member.roles.add(role);
        message.channel.send({ content: `You have been muted for spamming! **Time: 10 Seconds**`, ephemeral: true  });
        message.channel.bulkDelete(spamlimit * 2);
        setTimeout(() => {
          message.member.roles.remove(role);
        }, spamtime);
      } else {
        userdata.msgCount = msgCount;
        spamusers.set(message.author.id, userdata);
      }
    }
  } else {
    let fn = setTimeout(() => {
      spamusers.delete(message.author.id);
    }, spamtime);
    spamusers.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: fn,
    });
  }
});





//====================================================================================================================================================================================================================================\\
//====================================================================================================================================================================================================================================\\
//====================================================================================================================================================================================================================================\\









//==========================================================================================================
/// ======================================= Error Message to Ahla Staff ====================================
//==========================================================================================================

// Do not change anything here if you don`t know what you are doing!
// This message is only for the staff to get infos about errors in your bot!
// Spam is useless ;)

client.on('error', async (error) => {
  console.error('The WebSocket encountered an error:', error);
  const embed = new EmbedBuilder()
  .setTitle('Error from AhlaVintage.system')
  .setAuthor({ name: 'Ahla | System' })
  .setDescription(`The WebSocket encountered an error: ${error}`)
  .setThumbnail(`${client.user.displayAvatarURL()}`)
  .setImage('https://cdn.discordapp.com/attachments/1163086097790812182/1165310229920088214/code.gif?ex=654662b9&is=6533edb9&hm=15feb84d1d4f843bfe360488373a478ce27b8dd9f8f66143adad06e92ef105aa&')
  .setColor('#082ebd')
  .setTimestamp()
  .setFooter({text: 'AhlaVintage.system'})
sendEmbedToWebhook(embed);
});

function sendEmbedToWebhook(embed) {
  fetch(WEBHOOK_URL_Error, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      embeds: [embed],
    }),
  })
  .then(() => {
    console.log('Error sent successfully');
  })
  .catch((error) => {
    console.error('Error sending embed:', error);
  });
}




  client.login(config.bot_start.token);