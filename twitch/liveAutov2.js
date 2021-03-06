const Discord = require("discord.js");
const fetch = require("node-fetch");
const configtwitch = require("./twitch.json");
const bug = require("../bug")
const { Webhook, MessageBuilder } = require("discord-webhook-node");

module.exports.run = (client, args, pdo) => {
    fetch(configtwitch.data.url.getstream + args, {
        method: "GET",
          headers: {
            "client-id": configtwitch.data.auth.client_id,
            Authorization: configtwitch.data.auth.bearer,
          },
    }).then((res) => res.json())
    .then((json) => {
      
      if(json.data != ""){
      pdo.get(`SELECT * FROM newlive WHERE id_stream = ?`,[args], function (error, row) {
        if (row) {
          if (row.status != json.data[0].type) {
            pdo.run("UPDATE newlive SET status = ? WHERE id_stream = ?", [json.data[0].type,args]);  
              try {
                const user_name = json.data[0].user_name
                const game_name = json.data[0].game_name
                const title = json.data[0].title
                const viewer = json.data[0].viewer_count
                const user_login = json.data[0].user_login
                const date = json.data[0].started_at
                const YM = date.split('-')
                const day = YM[2].split('T')
                const heure = day[1].split(":")
                const heureparis = heure[0] + 1
                const start = "**Started at: **"+ day[0]+ "/"+YM[1]+"/"+YM[0]+" - " + heureparis + "H" + heure[1]
                const img = configtwitch.data.img.debutimg + user_login + configtwitch.data.img.fin

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
              } catch (error) {
                
              }
            }
        }if (error) {
          console.log(error);
          bug.bug(message, "db.get", error, pdo);
        }  
    })
  }else{
    pdo.run("UPDATE newlive SET status = ? WHERE id_stream = ?", [0,args]);
    //console.log(args)
  }

})
}