const Discord = require("discord.js");
const fetch = require("node-fetch");
const configtwitch = require("./twitch.json");
const bug = require("../bug")
const { Webhook, MessageBuilder } = require("discord-webhook-node");

module.exports.run = (client, arg8s, pdo) => {
    const args = 485824438;
    fetch(configtwitch.data.url.getstream + args, {
        method: "GET",
          headers: {
            "client-id": configtwitch.data.auth.client_id,
            Authorization: configtwitch.data.auth.bearer,
          },
    }).then((res) => res.json())
    .then((json) => { 
       const user_name = json.data[0].user_name
       const game_name = json.data[0].game_name
       const title = json.data[0].title
       const viewer = json.data[0].viewer_count
       const date = json.data[0].started_at
       const YM = date.split('-')
       const day = YM[2].split('T')
       const heure = day[1].split(":")
       const start = "**Started at: **"+ day[0]+ "/"+YM[1]+"/"+YM[0]+" - " + heure[0] + "H" + heure[1]
       const img = configtwitch.data.img.debutimg + user_name + configtwitch.data.img.fin
       const webhook = "https://discord.com/api/webhooks/806254216368488478/eyEWmAQWUHXSphO9Dz-EJMfkUvQUxi4SR0Gx92RejPO4dll11lBrbVCYAyCukxip5dOf"
       const hook = new Webhook(webhook);
       const embed = new MessageBuilder()
       .setColor("#0099ff")
       .setTitle("Live ON ")
       .setURL("https://www.twitch.tv/" + user_name)
       .setAuthor(user_name)
       .setDescription(start + " \n " + title + " \n **Game: " + game_name + " \n viewer: " + viewer + "**")
       .setImage(img)
       .setTimestamp()
       .setFooter("T.E.S.A");
       
       hook.send(embed);


    })

}