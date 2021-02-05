const request = require("request");
const Discord = require("discord.js");
const bug = require("../bug")

module.exports.run = (client, message, pilot, fnivao, dataatcjson) => {
  request(pilot, function (error, response, body) {
    if (body){

    
    const objfly = JSON.parse(body);
    let test = new Discord.MessageEmbed()
      .setColor("#8a2be2")
      .setTitle(objfly.data[0].callsign)
      .setURL(dataatcjson.data.url + objfly.data[0].Vid)
      .setDescription(
        "DEP: **" +
          objfly.data[0].FlightplanDepartureAerodrome +
          "** ARR: **" +
          objfly.data[0].FlightplanDestinationAerodrome +
          "**\n " +
          "Route: " +
          objfly.data[0].route +
          "\n" +
          "Flight Rules: **" +
          fnivao.rule(objfly.data[0].FlightplanFlightRules) +
          "** status : **" +
          fnivao.specification(objfly.data[0].onGround) +
          "**" +
          "Cruising Level required: **" +
          objfly.data[0].FlightplanCruisingLevel +
          "**"
      )
      .addFields(
        { name: "remarks: ", value: objfly.data[0].remarks },
        { name: "Aircraft: ", value: objfly.data[0].fullAircraft },
        {
          name: "altitude: ",
          value: objfly.data[0].altitude + "ft",
          inline: true,
        },
        { name: "POB: ", value: objfly.data[0].pob, inline: true },
        {
          name: "Rating: ",
          value: fnivao.gradepilote(objfly.data[0].rating),
          inline: true,
        },
        { name: "vid: ", value: objfly.data[0].Vid, inline: true },
        {
          name: "Departure Time: ",
          value: objfly.data[0].departureTime,
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter("T.E.S.A");
    message.channel.send(test);
  }else {
    bug.bug(message, "301", "erreure de recherche sur les informations de vols", pdo);
  }
}
);
};
