const Discord = require("discord.js");
const fetch = require("node-fetch");
const configtwitch = require("./twitch.json");

module.exports.run = (client, message, args = "alexcaussades") => {
  if (args == false) {
    let args = "alexcaussades";
    //console.log(args);
    fetch(configtwitch.data.url.channelsquery + args, {
      method: "GET",
      headers: {
        "client-id": configtwitch.data.auth.client_id,
        Authorization: configtwitch.data.auth.bearer,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const id = json.data[0].id;
        const live = json.data[0].is_live;
        const avatar = json.data[0].thumbnail_url;
        console.log(id);
        fetch(configtwitch.data.url.video_debut + id + "/videos", {
          method: "GET",
          headers: {
            Accept: configtwitch.data.url.apiv5,
            "client-id": configtwitch.data.auth.client_id,
            Authorization: configtwitch.data.auth.bearer,
          },
        })
          .then((res) => res.json())
          .then((jsonvideo) => {
            const game = jsonvideo.videos[0].game;
            const views = jsonvideo.videos[0].views;
            const url = jsonvideo.videos[0].url;

            if (live === false) {
              const exampleEmbed = new Discord.MessageEmbed()
                .setColor("#FF0000")
                .setTitle("Le live n'est pas actif actuellement.")
                .setAuthor(args)
                .setThumbnail(avatar)
                .setDescription(
                  "\n **Game:** " +
                    game +
                    "\n **Disponible: **" +
                    url +
                    "\n **Déjà vue:** " +
                    views
                )
                .setTimestamp()
                .setFooter("T.E.S.A");

              message.channel.send(exampleEmbed);
            } else if (live !== false) {
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
                  const exampleEmbed = new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle("Live ON")
                    .setURL("https://www.twitch.tv/" + args)
                    .setAuthor(args)
                    .setDescription(title_stream + " \n Game: " + game)
                    .setThumbnail(avatar)
                    .setImage(avatar)
                    .setTimestamp()
                    .setFooter("T.E.S.A");

                  message.channel.send(exampleEmbed);
                });
            }
          });
      });
  } else if (args) {
    fetch(configtwitch.data.url.channelsquery + args, {
      method: "GET",
      headers: {
        "client-id": configtwitch.data.auth.client_id,
        Authorization: configtwitch.data.auth.bearer,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const id = json.data[0].id;
        const live = json.data[0].is_live;
        const avatar = json.data[0].thumbnail_url;
        fetch(configtwitch.data.url.video_debut + id + "/videos", {
          method: "GET",
          headers: {
            Accept: configtwitch.data.url.apiv5,
            "client-id": configtwitch.data.auth.client_id,
            Authorization: configtwitch.data.auth.bearer,
          },
        })
          .then((res) => res.json())
          .then((jsonvideo) => {
            const game = jsonvideo.videos[0].game || null;
            const views = jsonvideo.videos[0].views || null;
            const url = jsonvideo.videos[0].url || null;

            if (live === false) {
              const exampleEmbed = new Discord.MessageEmbed()
                .setColor("#FF0000")
                .setTitle("Le Live n'est pas actif actuellement.")
                .setAuthor(args)
                .setThumbnail(avatar)
                .setDescription(
                  "\n **Game:** " +
                    game +
                    "\n **Disponible: **" +
                    url +
                    "\n **Déjà vue:** " +
                    views
                )
                .setTimestamp()
                .setFooter("T.E.S.A");

              message.channel.send(exampleEmbed);
            } else if (live !== false) {
              fetch(configtwitch.data.url.streams + id, {
                method: "GET",
                headers: {
                  Accept: configtwitch.data.url.apiv5,
                  "client-id": configtwitch.data.auth.client_id,
                  Authorization: configtwitch.data.auth.bearer,
                },
              })
                .then((res) => res.json())
                .then((json) => {
                  const game = json.stream.game;
                  const title_stream = json.stream.channel.status;
                  const viewer = json.stream.viewers;
                  const preview = json.stream.preview.medium;
                  const exampleEmbed = new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle("Live ON")
                    .setURL("https://www.twitch.tv/" + args)
                    .setAuthor(args)
                    .setDescription(
                      title_stream +
                        " \n **Game: " +
                        game +
                        "\n Viewer: " +
                        viewer +
                        "**"
                    )
                    .setThumbnail(avatar)
                    .setImage(preview)
                    .setTimestamp()
                    .setFooter("T.E.S.A");

                  message.channel.send(exampleEmbed);
                });
            }
          });
      });
  }
};
