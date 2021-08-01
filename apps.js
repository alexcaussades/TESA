const Discord = require("discord.js")
require("dotenv").config()
const prefix = process.env.prefix
const client = new Discord.Client()
const sqlite3 = require("sqlite3").verbose()
const configtwitch = require("./twitch/twitch.json")
const apiivao = require("./ivao/api-ivao.json")
const reqtesa = "tesa"
const profil = require("./profil")
const favi = require("./ivao/addfive")

const pdo = new sqlite3.Database(
  "programme.db3",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message)
    }
    console.log("Connected to the database.")
  }
)

pdo.run(
  "CREATE TABLE IF NOT EXISTS newlive(id INTEGER PRIMARY KEY, id_stream TEXT VARCHAR(255) NOT NULL, channels TEXT VARCHAR(255) NOT NULL, status TEXT VARCHAR(255) NOT NULL)"
)

// pdo.run("DROP TABLE onlive", function (error) {
//   if (error) {
//     console.log(error.message)
//   }
// })

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
    }else{
       module_autorole.none(client, message)
    }
  }
})

client.on("message", (message) => {
  if (message.content === prefix + "tt") {
    const liveauto = require("./twitch/modo")
    liveauto.run(client, pdo)
  }
})

client.on("message", (message) => {
  if (message.content === prefix + "bug") {
    message.channel.send("https://github.com/alexcaussades/TESA/issues")
  }
})

client.on("message", (message) => {
  if (message.content === prefix + "repo") {
    message.channel.send("https://github.com/alexcaussades/TESA/")
  }
})

client.on("message", (message) => {
  if (message.content === prefix + "git") {
    message.channel.send("https://github.com/alexcaussades/")
  }
})

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
    let module_twitch = require("./twitch/twitch")
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
  if (command === "addstreamer") {
    if (args) {
      console.log(args)
      message.delete()
      const addstreamer = require("./twitch/addstreamer")
      addstreamer.run(args, pdo, message)
    }
  }
})

client.on("message", (message) => {
  const commandBody = message.content.slice(prefix.length)
  const args = commandBody.split(" ")
  const command = args.shift().toLowerCase()
  if (command === "tt") {
    const live = require("./twitch/delstreamer")
    live.run(client, message, args, pdo)
  }
})

client.on("message", (message) => {
  const commandBody = message.content.slice(prefix.length)
  const args = commandBody.split(" ")
  const command = args.shift().toLowerCase()
  if (command === "vac") {
    message.delete()
    const live = require("./ivao/vac")
    live.run(client, message, args, pdo)
  }
})

client.on("message", (message) => {
  const commandBody = message.content.slice(prefix.length)
  const args = commandBody.split(" ")
  const command = args.shift().toLowerCase()
  if (command === "gitusers") {
    const live = require("./git/users")
    live.run(client, args, pdo)
  }
})

client.on("message", (message) => {
  const commandBody = message.content.slice(prefix.length)
  const args = commandBody.split(" ")
  const command = args.shift().toLowerCase()
  if (command === "delstreamer") {
    if (args) {
      console.log(args)
      pdo.get(
        `SELECT * FROM onlive WHERE channels = ?`,
        [args],
        function (error, row) {
          if (row) {
            console.log(row)
            if (row.channels === args[0]) {
              pdo.run(
                `DELETE FROM onlive WHERE channels = ?`,
                [row.channels],
                function (error, row) {
                  message.channel.send(
                    "Le Streamer " + args + " a était suprimmer dans le système"
                  )
                }
              )
            } else {
              message.channel.send(
                "Le Streamer " + args + "ne se trouve  dans le système"
              )
            }
          }
          if (error) {
            const bug = require("./bug")
            bug.bug(
              message,
              "probleme sur la bdd module delstreamer",
              error,
              pdo
            )
          }
        }
      )
    }
  }
})

// client.on("message", (message) => {
//   if (message.content.toLowerCase().startsWith(prefix + "purge")) {
//     if (message.member.hasPermission("MANAGE_MESSAGES")) {
//       console.log(message)
//       message.channel.fetchMessages().then(
//         function (list) {
//           message.channel.bulkDelete(list)
//         },
//         function (err) {
//           message.channel.send("ERROR: ERROR CLEARING CHANNEL.")
//         }
//       )
//     }
//   }
// })

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
  if(message.content === prefix + "liststreamer")
  {
    const liststreamer = require("./twitch/liststreamer")
    liststreamer.run(client, message, pdo)
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
  if (message.content === prefix + "addRoleSupport") {
    let addsuport = require("./support/addsupport")
    addsuport.creatRole(client, message)
  }
})

// client.on('guildMemberUpdate', (oldMember, newMember) => {
//   console.log(oldMember.roles.guild.roles, newMember.roles.guild.roles);
// });

client.on("guildBanAdd", (guild, user) => {
  if (message.member.hasPermission("ADMINISTRATOR")) {
    console.log(guild, user)
  }
})

setInterval(() => {
  pdo.get(`SELECT count(*) FROM newlive`, function (error, row) {
    if (row["count(*)"]) {
      //console.log("check")
      const count = row["count(*)"]
      for (let i = 1; i <= count; i++) {
        pdo.get(
          `SELECT * FROM newlive WHERE id = ?`,
          [[i]],
          function (error, row) {
            if(row != undefined){
            const live = require("./twitch/liveAutov2.js")
            live.run(client, row.id_stream, pdo)
            }
          }
        )
      }
    }
  })
}, 60000)


setInterval(()=> {
       let module_vidsr = require("./ivao/updateapi")
      module_vidsr.updateApiIvao()
    }, 30000)


client.login(process.env.token)
