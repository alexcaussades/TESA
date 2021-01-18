const request = require("request");
const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = (client, message, args) => {
  if (args == false) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Voici l'utilisation de la commande ```autorole``` :")
      .setDescription(
        ":small_blue_diamond: Description : \n Permet d'activer ou désactiver l'autorole \n \n :small_blue_diamond:Utilisation :\n &autorole @mentiondurôle\n &autorole off "
      )
      .setTimestamp()
      .setFooter("T.E.S.A");

    message.channel.send(exampleEmbed);
  } else if (args != "off") {
    let id = message.guild.id;
    let name = message.guild.name;
    let members = message.guild.memberCount;
    let argss = args[0];
    let argsav = argss.substring(3);
    let argsfinality = argsav.substring(18, -1);
    let profil = {
      data: {
        id: id,
        name: name,
        autorole: argsfinality,
        autorolefull: args[0],
      },
    };

    let donner = JSON.stringify(profil, null, 2);
    fs.writeFile(
      __dirname + "/serveur/" + id + ".json",
      donner,
      function (error) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setColor("#13f00b")
          .setTitle("l'utilisation de la commande ```autorole``` :")
          .setDescription(
            "Le rôle " +
              args[0] +
              " seras donné automatiquement lorsque que quelqu'un rejoint le serveur ! "
          )
          .setTimestamp()
          .setFooter("T.E.S.A");

        message.channel.send(exampleEmbed);
      }
    );
  } else if (args == "off") {
    let id = message.guild.id;
    fs.unlinkSync(__dirname + "/serveur/" + id + ".json");
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#f02e0b")
      .setTitle("l'utilisation de la commande ```autorole``` :")
      .setDescription("La commande autorole est **OFF**")
      .setTimestamp()
      .setFooter("T.E.S.A");

    message.channel.send(exampleEmbed);
  }
};

module.exports.none = (client, message) => {
  const exampleEmbed = new Discord.MessageEmbed()
    .setColor("#f02e0b")
    .setTitle("l'utilisation de la commande ```autorole``` :")
    .setDescription(
      "La commande est interdite, car vous n'avez pas les droits nécessaires."
    )
    .setTimestamp()
    .setFooter("T.E.S.A");

  message.channel.send(exampleEmbed);
};
