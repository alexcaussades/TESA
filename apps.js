const Discord = require("discord.js")
require("dotenv").config()
const prefix = process.env.prefix
const client = new Discord.Client()
const tesa = require("./test")
const sqlite3 = require("sqlite3").verbose();
const configtwitch = require("./twitch/twitch.json")
const apiivao = require("./ivao/api-ivao.json")
const reqtesa = "tesa"
const profil = require("./profil")
const favi = require("./ivao/addfive")

const pdo = new sqlite3.Database("programme.db3", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
   console.error(err.message);
  }
  console.log("Connected to the database.");
 });

pdo.run("CREATE TABLE IF NOT EXISTS  onlive(id INTEGER PRIMARY KEY, channels TEXT VARCHAR(255) NOT NULL, status TEXT VARCHAR(255) NOT NULL)");


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity("I am learning my functions", { type: "PLAYING" })
})

// client.on("message", message =>{
//     const target = message.mentions.users.first() || message.author;
//     return message.channel.send(`${target.tag}`);
// })

client.on("guildMemberAdd", (member) => {
  console.log("User" + member.user.tag + "has joined the server!")
  let idserveur = member.guild.id
  try {
    const autolrole = require("./autorole/serveur/" + idserveur + ".json")
    if (autolrole.data.id === idserveur) {
      let Role_Testrole = member.guild.roles.cache.find(
        (r) => r.id === autolrole.data.autorole
      )
      member.roles.add(Role_Testrole).catch(console.error)
    }
  } catch (e) {
    console.log(e)
  }
})

// client.on("channelCreate", async channel =>{
//     console.log(`Channel created: ${channel.name}`)
// })
//
// client.on("channelDelete", async channel =>{
//     console.log(`Channel delecte: ${channel.name}`)
// })

client.on("message", (message) => {
  if (message.content === prefix + "creatMyProfil") {
    let id = message.author.id
    let name = message.author.username
    profil.run(client, message, id, name)
  }
})
/**
 * todo function a refaire en urgence
 * */
client.on("message", (message) => {
  const commandBody = message.content.slice(prefix.length)
  const args = commandBody.split(" ")
  const command = args.shift().toLowerCase()
  if (command === "add-vid") {
    let id = message.author.id
    let name = message.author.username
    let vidarray = args
    console.log(id, name, vidarray)
    favi.run(id, name, vidarray)
  }
})

client.on("message", (message) => {
  const commandBody = message.content.slice(prefix.length)
  const args = commandBody.split(" ")
  const command = args.shift().toLowerCase()
  if (command === "autorole") {
    message.delete()
    let module_autorole = require("./autorole/autorole")
    if (message.member.hasPermission("BAN_MEMBERS")) {
      module_autorole.run(client, message, args)
    }
    module_autorole.none(client, message)
  }
})

client.on("message", (message) => {
  if (message.content === prefix + "devs") {
    message.delete()
    message.channel.send(`${client.user}`)
  } else if (message.content === prefix + "help") {
    message.delete()
    message.channel.send(
      "Actuellement, mon module Help est absent.\n &feedback pour exécuter une demande"
    )
  // } else if (message.content === reqtesa + " hello") {
  //   message.delete()
  //   message.channel.send(
  //     `${message.author} Ta vue l'heure, je dors là ! Hey monsieur, je suis une ados qui a besoin de repos `
  //   )
  // } else if (message.content === reqtesa) {
  //   message.delete()
  //   message.channel.send(`${message.author} Qu'es que tu me veux ?`)
  // } else if (message.content === reqtesa + " sois gentille") {
  //   message.delete()
  //   message.channel.send(
  //     `${message.author} Oh pardon ! Mais je peux me faire pardonner avec un spam cette nuit si tu le veux bien sure. :rage: `
  //   )
  // } else if (message.content === reqtesa + " non merci") {
  //   message.delete()
  //   message.channel.send(
  //     `${message.author} Trop facile humain, j'ai gagné mec ! :middle_finger:  `
  //   )
  // } else if (message.content === reqtesa + " je peux avoir un café stp") {
  //   message.delete()
  //   message.channel.send(`${message.author} avec 100€ et un mars aussi ?`)
  // } else if (message.content === reqtesa + " bonjour") {
  //   message.delete()
  //   message.channel.send(
  //     `${message.author} Ta vue l'heure, je dors là ! Hey monsieur, je suis une ados qui a besoin de repos `
  //   )
  }
})

client.on("message", (message) => {
  if( message.content === prefix + "tt")
  {
    const liveauto = require("./twitch/liveAuto")
    liveauto.run(client, message, args = null, pdo)
  }
})

// client.on("message", (message) => {
//   if (message.content === prefix + "creat database") {
//     message.delete()
//     message.channel.send("creation de la base en cour")
//     database.creatdata
//     message.channel.send(
//       "La création de la base de donées à bien étais éffectuer !"
//     )
//     message.channel.send(tesa.i).then((message) => {
//       message.channel.send(tesa.rp1), 3000
//     })
//     message.channel.send("--------").then((message) => {
//       message.channel.send(tesa.rp2), 3000
//     })
//   }
// })

client.on("message", (message) => {
  if (message.content === prefix + "user-info") {
    message.delete()
    message.channel.send(
      "Your username: " +
        message.author.username +
        "\nYour ID: " +
        message.author.id
    )
  }
})

/**
 * search metard api ivao
 * */
client.on("message", (message) => {
  const commandBody = message.content.slice(prefix.length)
  const args = commandBody.split(" ")
  const command = args.shift().toLowerCase()
  if (command === "metar") {
    message.delete()
    let sr = apiivao.data.metar + args
    let metar = require("./ivao/metar")
    metar.run(client, message, sr)
  }
})

/**
 * search fly api ivao
 * */

client.on("message", (message) => {
  const commandBody = message.content.slice(prefix.length)
  const args = commandBody.split(" ")
  const command = args.shift().toLowerCase()
  if (command === "fly") {
    message.delete()
    const pilot = apiivao.data.datapilot + args
    const fnivao = require("./ivao/function_ivao")
    let dataatcjson = require("./ivao/atc.json")
    const module_fly = require("./ivao/fly")
    module_fly.run(client, message, pilot, fnivao, dataatcjson)
  }
})
/**
 * search atc api ivao
 * */
client.on("message", (message) => {
  const commandBody = message.content.slice(prefix.length)
  const args = commandBody.split(" ")
  const command = args.shift().toLowerCase()
  if (command === "atc") {
    message.delete()
    let icao = args
    if (!icao) {
      process.exit()
    }
    let module_atc = require("./ivao/atc")
    module_atc.run(client, message, apiivao, icao)
  }
})

/**
 * search live on the twitch
 * */
client.on("message", (message) => {
  const commandBody = message.content.slice(prefix.length)
  const args = commandBody.split(" ")
  const command = args.shift().toLowerCase()
  if (command === "live") {
    message.delete()
    let module_twitch = require("./twitch/twitch.js")
    module_twitch.run(client, message, args)
  }
})

/**
 * search vid api ivao
 * */
client.on("message", (message) => {
  const commandBody = message.content.slice(prefix.length)
  const args = commandBody.split(" ")
  const command = args.shift().toLowerCase()
  if (command === "vid") {
    message.delete()
    let module_vidsr = require("./ivao/vid")
    module_vidsr.run(client, message, apiivao, args)
  }
})

client.on("message", (message) => {
  const commandBody = message.content.slice(prefix.length)
  const args = commandBody.split(" ")
  const command = args.shift().toLowerCase()
  if (command === "addStreamer") {
    message.delete()
    pdo.run(`INSERT INTO onlive(channels, status) VALUES(?,?)`,[args, 0])
    message.channel.send("Le Streamer " + args + "est enregister dans le système")
  }

  
})

/**
 * creation invite membre
 * */
client.on("message", (message) => {
  const command = message.content
  if (command === prefix + "inviteCreat") {
    message.delete()
    message.channel
      .createInvite()
      .then((invite) =>
        message.author.send(
          `Votre lien d'invitation : \n\nhttps://discord.gg/${invite.code}`
        )
      )
  }
})

/**
 * creation invite bot
 * */
client.on("message", (message) => {
  if (message.content === prefix + "invitebot") {
    message.delete()
    let urlinvite =
      "https://discord.com/api/oauth2/authorize?client_id=794282559290212352&permissions=8&scope=bot"
    message.author.send(urlinvite)
  }
})

client.on("message", (message) => {
  if (message.content === prefix + "addsupport") {
    let addsuport = require("./support/addsupport")
    addsuport.creat(client, message)
    message.channel.send("the support is operational")
  }
})

client.on("message", (message) => {
  if (message.content === prefix + "addRoleSupport"){
    let addsuport = require("./support/addsupport")
    addsuport.creatRole(client, message)
  }
})

// client.on('guildMemberUpdate', (oldMember, newMember) => {
//   console.log(oldMember.roles.guild.roles, newMember.roles.guild.roles);
// });

client.on('guildBanAdd', (guild, user) => {
  if (message.member.hasPermission("ADMINISTRATOR")) {
  console.log(guild, user);
  }
});

client.login(process.env.token)
