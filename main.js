const { Client, GatewayIntentBits, EmbedBuilder,  ActivityType, REST, Routes, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, PermissionsBitField, TextChannel, ActionRowBuilder, ButtonBuilder, ButtonStyle, Team, TextInputStyle, Embed } = require('discord.js');
const { CommandHandler } = require('djs-commander');
const config = require('./config/config.js');
const path = require('path');
 const WEBHOOK_URL_Error = 'https://discord.com/api/webhooks/1163086196050776064/wNqwvNFQDY5WgrdGqH1uCHnGQO0oxU6q1zobL7xxiW-4YGGV2Coy6wtmvx6hnTI3K5es';


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

    client.user.setActivity('!help', { type: 'PLAYING' });
    console.log(`Logged in as ${client.user.tag}!`);
});





  client.login(config.bot_start.token);