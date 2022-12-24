require('dotenv').config();
const fs = require('fs');
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
	],
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});

client.slashCommands = new Collection();

module.exports = client;


fs.readdirSync('./Handlers').forEach((handler) => {
	require(`./Handlers/${handler}`)(client)
});


client.login(process.env.TOKEN);


const Discord = require("discord.js")
const websiteUrl = `https://bit.ly/BartBot`;
const supportUrl = `https://discord.gg/7zVRHxCzJM`;
const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=1054638607383670864&permissions=8&scope=bot%20applications.commands`;
client.on("messageCreate", message => {

  let digas = new Discord.EmbedBuilder()
    .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`})
    .setColor("Black")
    .setTitle(`👋 Olá ${message.author.username},`)
    .setDescription(`<:XmasSantaHat:1054736186247237663> **How how how!** Eu me chamo ${client.user.username} e sou um bot de moderação para ajudar em seu servidor tendo varios comandos de moderação diversao e utilidades e ainda vou ser passado por mais atualizações! para exibir meu painel de ajudas use o comando \`/help\` e para ver minhas atualizações e novidades use \`/novidades\`!
\n**Meus Links!👇**

> <:8512blurplelink:1050518618204540949> ┃ [Convite](${inviteUrl})\n> <:staff:1048689586454405130> ┃ [Suporte](${supportUrl})`)
    .setTimestamp()

  if (message.author.bot) return
  if (message.content == `<@${client.user.id}>`)
    message.channel.send({ content: `${message.author}`, embeds: [digas] });
})


const discord = require('discord.js');
const { durationTime } = require('util-stunks') 
        
        client.on("interactionCreate", async (interaction) => {
            if (interaction.isSelectMenu()) {
              let choice = interaction.values[0]
              const member = interaction.member
              const server = interaction.guild.members.cache.get(client.user.id)
          
              //Username
              if (interaction.isSelectMenu()) {
                if (choice === "cargos") {
              let embedCargos = new discord.EmbedBuilder()
               .setColor('Black')
               .setTitle(`⚡ Os cargos que eu estou no momento são: `)
               .setDescription(`- ${server.roles.cache.sort
                ((a, b) => b.position - a.position)
                .filter((role) => role != interaction.guild.roles.client.user)
                .map((role) => role).join("\n -") || `Nenhum`}`)
               .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})

               interaction.reply({ embeds: [embedCargos],
              ephemeral: true
            })
        }  else if(choice === "config") {
            {
              
                let embedinvite = new discord.EmbedBuilder()
                .setTitle(`📌 - Invite`)
                 .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                 .setDescription(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scop=ebot`)
                

                 
                 interaction.reply({ embeds: [embedinvite], ephemeral: true })

            };
         };

    }


}
})

const chalk = require("chalk");


client.on("messageCreate", (message) => {

  if (message.channel.id === "1048913661374234665") {

    let emoji1 = "<:970470636495454279:1048629197100306473>"
    let emoji2 = "<:970470610486587392:1048629234882580510> "

    message.react(emoji1).catch(e => {

      console.log(chalk.redBright(` ❌  => Erro ao adicionar a reação 1`));

    })

    message.react(emoji2).catch(e => {

      console.log(chalk.redBright(` ❌  => Erro ao adicionar a reação 2`));

    })


  } else { }
  
})

const { QuickDB } = require('quick.db')
const db = new QuickDB()

client.on('messageCreate', async (message) => {

  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;

  let verificando = await db.get(`antilink_${message.guild.id}`);
  if (!verificando || verificando === "off" || verificando === null || verificando === false) return;

  if (verificando === "on") {

    if (!message.channel.permissionsFor(message.author).has(Discord.PermissionFlagsBits.ManageGuild))
      if (!message.channel.permissionsFor(message.author).has(Discord.PermissionFlagsBits.Administrator))

        if (message.content.includes("https".toLowerCase() || "http".toLowerCase() || "www".toLowerCase() || ".com".toLowerCase() || ".br".toLowerCase())) {

          message.delete();
          message.channel.send({
            embeds: [
              new Discord.EmbedBuilder()
                .setTitle(`Link bloqueado!`)
                .setDescription(`**<:moderador:1041692455038365696> | Opa ${message.author},o sistema de antilink esta ativado nesse servidor, impossibilitando o envio de qualquer tipo de link!**`)
                .setColor("#5765F2")
                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dinamyc: true }) })
            ]
          })
        }
  }
})

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception: " + err);
});
  
process.on("unhandledRejection", (reason, promise) => {
    console.log("[GRAVE] Rejeição possivelmente não tratada em: Promise ", promise, " motivo: ", reason.message);
});  
