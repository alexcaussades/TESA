const Discord = require("discord.js");
const fetch = require("node-fetch");
const configtwitch = require("./twitch.json");
const bug = require("../bug")


module.exports.run = async (args, pdo, message) => { 
    fetch(configtwitch.data.url.channelsquery + args, {
        method: "GET",
        headers: {
          "client-id": configtwitch.data.auth.client_id,
          Authorization: configtwitch.data.auth.bearer,
        },
      })
      .then((res) => res.json())
      .then((json) => {
          console.log(json.data)
        for (let i = 0; i < json.data.length; i++) {
          const element = json.data[i];
            if (element.broadcaster_login == args) {
                const id_stream = element.id;
                const namestream = element.broadcaster_login;
                const status = 0;
                console.log(id_stream)
                pdo.get(`SELECT * FROM newlive WHERE id_stream = ?`,[id_stream], function (error, row) {
                if (row) {
                  if (row.id_stream === id_stream) {
                    message.channel.send("Le Streamer " + args + " est déjà enregister dans le système")
                  }
               } else {
                pdo.run(`INSERT INTO newlive(id_stream, channels, status) VALUES(?,?,?)`,[id_stream, namestream, status]);
                message.channel.send("Le Streamer " + args + " est enregister dans le système")
               }
               if (error){
                const bug = require("./bug")
                bug.bug(message, "probleme sur la bdd module addstreamer", error, pdo)
              }
            })
      }
    }
 })
}
