const request = require("request");
const Discord = require("discord.js");
const bug = require("../bug")


module.exports.run = (client, message, apiivao, icao) => {
  const sr = apiivao.data.dataatc + icao;
  const fnivao = require("./function_ivao");
  let dataatcjson = require("./atc.json");
  request(sr, function (error, response, body) {
    if (body)
  {
    const obj = JSON.parse(body);

    // if(obj.nameAirport != undefined){
    //     message.channel.send("Information ATC on " +obj.nameAirport);
    // }else{
    //     message.channel.send("Plateforme non trouvée");
    // }

    const data = obj.data;
    try {
      if (data.app.Callsign != null) {
        let test = new Discord.MessageEmbed()
          .setColor("#8a2be2")
          .setTitle(
            obj.data.app.Callsign + " : " + obj.data.app.Frequency + " Mhz "
          )
          .setURL(dataatcjson.data.url + obj.data.app.Vid)
          .setDescription("Atis : " + obj.data.app.Atis)
          .addFields(
            { name: "vid: ", value: obj.data.app.Vid, inline: true },
            {
              name: "Rating: ",
              value: fnivao.gradeatc(data.app.rating),
              inline: true,
            }
          )
          .setTimestamp()
          .setFooter("T.E.S.A");
        message.channel.send(test);
      }
    } catch (e) {
      message.channel.send("is empty fot ICAO ex: &atc icao ");
    }
    try {
      if (data.twr.Callsign != null) {
        let test = new Discord.MessageEmbed()
          .setColor("#8a2be2")
          .setTitle(
            obj.data.twr.Callsign + " : " + obj.data.twr.Frequency + " Mhz "
          )
          .setURL(dataatcjson.data.url + obj.data.twr.Vid)
          .setDescription("Atis : " + obj.data.twr.Atis)
          .addFields(
            { name: "vid: ", value: obj.data.twr.Vid, inline: true },
            {
              name: "Rating: ",
              value: fnivao.gradeatc(obj.data.twr.rating),
              inline: true,
            }
          )
          .setTimestamp()
          .setFooter("T.E.S.A");
        message.channel.send(test);
      }
    } catch (e) {}
    try {
      if (data.gnd.Callsign != null) {
        //message.channel.send("Information ATC on " +obj.nameAirport);
        let test = new Discord.MessageEmbed()
          .setColor("#8a2be2")
          .setTitle(
            obj.data.gnd.Callsign + " : " + obj.data.gnd.Frequency + " Mhz "
          )
          .setURL(dataatcjson.data.url + obj.data.gnd.Vid)
          .setDescription("Atis : " + obj.data.gnd.Atis)
          .addFields(
            { name: "vid: ", value: obj.data.gnd.Vid, inline: true },
            {
              name: "Rating: ",
              value: fnivao.gradeatc(obj.data.gnd.rating),
              inline: true,
            }
          )
          .setTimestamp()
          .setFooter("T.E.S.A");
        message.channel.send(test);
      }
    } catch (e) {}
    try {
      if (data.del.Callsign != null) {
        let test = new Discord.MessageEmbed()
          .setColor("#8a2be2")
          .setTitle(
            obj.data.del.Callsign + " : " + obj.data.del.Frequency + " Mhz "
          )
          .setURL(dataatcjson.data.url + obj.data.del.Vid)
          .setDescription("Atis : " + obj.data.del.Atis)
          .addFields(
            { name: "vid: ", value: obj.data.del.Vid, inline: true },
            {
              name: "Rating: ",
              value: fnivao.gradeatc(obj.data.del.rating),
              inline: true,
            }
          )
          .setTimestamp()
          .setFooter("T.E.S.A");
        message.channel.send(test);
      }
    } catch (e) {
      console.log(e);
    }
    try {
      if (data.other != null) {
        let nb = data.other.data;
        for (let i = 0; i < nb; i++) {
          let test = new Discord.MessageEmbed()
            .setColor("#8a2be2")
            .setTitle(
              obj.data.other[i].Callsign +
                " : " +
                obj.data.other[i].Frequency +
                " Mhz "
            )
            .setURL(dataatcjson.data.url + obj.data.other[i].Vid)
            .setDescription("Atis : " + obj.data.other[i].Atis)
            .addFields(
              { name: "vid: ", value: obj.data.other[i].Vid, inline: true },
              {
                name: "Rating: ",
                value: fnivao.gradeatc(obj.data.other[i].rating),
                inline: true,
              }
            )
            .setTimestamp()
            .setFooter("T.E.S.A");
          message.channel.send(test);
        }
      }
    } catch (e) {
      console.log(e);
    }
    try {
      if (
        data.app.Callsign === null &&
        obj.data.twr.Callsign === null &&
        obj.data.gnd.Callsign === null &&
        obj.data.del.Callsign === null
      ) {
        message.channel.send("No service contrôleur for the plateforme");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    bug.bug(message, "301", "erreure de recherche sur la function ATC", pdo);
  }
});
};
