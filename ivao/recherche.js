const request = require("request");
const Discord = require("discord.js");
const { Webhook, MessageBuilder } = require("discord-webhook-node");
const bug = require("../bug")
const messageweb = "https://discord.com/api/webhooks/828687240150515722/8ZwlzxpuHZFGCF86tRA-JmKHA4zlp638BQoENcYuFkoRZn3ycKGJsnzSY_IgiqHDDfCW"

module.exports.run = (client, message, apiivao, args) => {
  const sr = apiivao.data.datavid + args;
  const fnivao = require("./function_ivao");
  let dataatcjson = require("./atc.json");
  request(sr, function (error, response, body) {
    if (body){
    const objvid = JSON.parse(body);
    if (objvid.data.atc.Callsign != null) {
      let embed = new MessageBuilder()
        .setColor("#FF1414")
        .setTitle(
          objvid.data.atc.Callsign + " : " + objvid.data.atc.Frequency + " Mhz "
        )
        .setURL(dataatcjson.data.url + objvid.data.atc.Vid)
        .setDescription("Atis : " + objvid.data.atc.Atis)
        .addFields(
          { name: "vid: ", value: objvid.data.atc.Vid, inline: true },
          {
            name: "Rating: ",
            value: fnivao.gradeatc(objvid.data.atc.rating),
            inline: true,
          }
        )
        const hook = new Webhook(messageweb);
        hook.send(embed);

    } else if (objvid.data.pilot.callsign != null) {
      let test = new MessageBuilder()
        .setColor("#FF1414")
        .setTitle(objvid.data.pilot.callsign)
        .setURL(dataatcjson.data.url + objvid.data.pilot.Vid)
        .setDescription(
          "DEP: **" +
            objvid.data.pilot.FlightplanDepartureAerodrome +
            "** ARR: **" +
            objvid.data.pilot.FlightplanDestinationAerodrome +
            "**\n " +
            "Route: " +
            objvid.data.pilot.route +
            "\n" +
            "Flight Rules: **" +
            fnivao.rule(objvid.data.pilot.FlightplanFlightRules) +
            "** status : **" +
            fnivao.specification(objvid.data.pilot.onGround) +
            "**" +
            " Cruising Level required: **" +
            objvid.data.pilot.FlightplanCruisingLevel +
            "**"
        )
        .addFields(
          { name: "remarks: ", value: objvid.data.pilot.remarks },
          { name: "Aircraft: ", value: objvid.data.pilot.fullAircraft },
          {
            name: "altitude: ",
            value: objvid.data.pilot.altitude + "ft",
            inline: true,
          },
          { name: "POB: ", value: objvid.data.pilot.pob, inline: true },
          {
            name: "Rating: ",
            value: fnivao.gradepilote(objvid.data.pilot.rating),
            inline: true,
          },
          { name: "vid: ", value: objvid.data.pilot.Vid, inline: true },
          {
            name: "Departure Time: ",
            value: objvid.data.pilot.departureTime,
            inline: true,
          }
        )
        .setTimestamp()
        .setFooter("T.E.S.A");
        const hook = new Webhook(messageweb);
        hook.send(embed);
    } else {
      
    }
  } else{
    bug.bug(message, "301", "erreure de recherche sur le vid", pdo);
  }
  }
  
  )
  ;
};