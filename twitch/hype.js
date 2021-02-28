const Discord = require("discord.js");
const fetch = require("node-fetch");
const configtwitch = require("./twitch.json");
const bug = require("../bug")
const { Webhook, MessageBuilder } = require("discord-webhook-node");

module.exports.run = (client, arg8s = null, pdo) => {
    const args = "98902092"
    fetch(configtwitch.data.url.GetHype + args, {
        method: "GET",
          headers: {
            "client-id": configtwitch.data.auth.client_id,
            Authorization: configtwitch.data.auth.bearer,
          },
    }).then((res) => res.json())
    .then((json) => {
        // data de 20 json
        //console.log(json.data.length)
        console.log(json)
    })
}