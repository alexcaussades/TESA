const request = require("request");
const Discord = require("discord.js");
const bug = require("../bug")

module.exports.run = (client, message, apiivao, args) => {
  const sr = apiivao.data.datavid + args;
  const fnivao = require("./function_ivao");
  let dataatcjson = require("./atc.json");
  request(sr, function (error, response, body) {
    if (body){
    const objvid = JSON.parse(body);
    if (objvid.data.atc.Callsign != null) {
      let test = new Discord.MessageEmbed()
        .setColor("#8a2be2")
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
        .setTimestamp()
        .setFooter("T.E.S.A");
      message.channel.send(test);
    } else if (objvid.data.pilot.callsign != null) {
      let test = new Discord.MessageEmbed()
        .setColor("#8a2be2")
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
      message.channel.send(test);
    } else {
      message.channel.send("not on ligne for the VID: " + args);
    }
  } else{
    bug.bug(message, "301", "erreure de recherche sur le vid", pdo);
  }
  }
  
  )
  ;
};
