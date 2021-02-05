const Discord = require("discord.js");
const fetch = require("node-fetch");
const configtwitch = require("./twitch.json");
const bug = require("../bug")
const { Webhook, MessageBuilder } = require("discord-webhook-node");

module.exports.run = (client, message, args, pdo) => {     
    const fetch = require("node-fetch");
        fetch(configtwitch.data.url.channelsquery + args, {
          method: "GET",
          headers: {
            "client-id": configtwitch.data.auth.client_id,
            Authorization: configtwitch.data.auth.bearer,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            for (let i = 0; i < json.data.length; i++) {
              const element = json.data[i];
              if (element.is_live === true) {
                if (element.display_name === args) {
                    const avatar = element.thumbnail_url;
                    const id = element.id;
                    //console.log(json)
                    const gg = pdo.get(`SELECT * FROM onlive WHERE channels = ?`,[args], function (error, row) {
                      if (row) {
                        if (row.status != element.is_live) {
                            pdo.run("UPDATE onlive SET status = ? WHERE channels = ?", [element.is_live,args]);
                          if (element.is_live === true) {
                            fetch(configtwitch.data.url.broadcaster + id, {
                                method: "GET",
                                headers: {
                                  "client-id": configtwitch.data.auth.client_id,
                                  Authorization: configtwitch.data.auth.bearer,
                                },
                              })
                                .then((res) => res.json())
                                .then((json) => {
                                    const game = json.data[0].game_name;
                                    const title_stream = json.data[0].title;
                                    const webhook = "https://discord.com/api/webhooks/806254216368488478/eyEWmAQWUHXSphO9Dz-EJMfkUvQUxi4SR0Gx92RejPO4dll11lBrbVCYAyCukxip5dOf"
                                    const hook = new Webhook(webhook);
                                    const embed = new MessageBuilder()
                                    .setColor("#0099ff")
                                    .setTitle("Live ON")
                                    .setURL("https://www.twitch.tv/" + args)
                                    .setAuthor(args)
                                    .setDescription(title_stream + " \n Game: " + game)
                                    .setThumbnail(avatar)
                                    //.setImage(avatar)
                                    .setTimestamp()
                                    .setFooter("T.E.S.A");
                                    
                                    hook.send(embed);
                                })
                          }
                        }
                      }
                      if (error) {
                        console.log(error);
                        bug.bug(message, "db.get", error, pdo);
                      }
                    }
                  );
                }
              } else if (element.is_live === false) {
                if (element.display_name === args) {
                  const id = element.id;
                  pdo.get(
                    `SELECT * FROM onlive WHERE channels = ?`,
                    [args],
                    function (error, row) {
                      if (row) {
                        if (row.status != element.is_live) {
                            pdo.run("UPDATE onlive SET status = ? WHERE channels = ?", [element.is_live, args]);
                        }
                      }
                      if (error) {
                        console.log(error);
                        bug.bug(message, "db.get", error, pdo);
                      }
                    }
                  );
                }
              }
            }
          });
};
