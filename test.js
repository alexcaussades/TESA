const Discord = require('discord.js');
//require('dotenv').config();
//const prefix = process.env.prefix;
const client = new Discord.Client();
//const sq = require('sqlite3').verbose();
//const fetch = require('node-fetch');


function function2() {
    client.on("message",message => {
        message.channel.send("Je me présente TESA, je suis une intelligence artificielle !");
        setTimeout(reveilpahse1, 3000);


        function reveilpahse1() {

            message.channel.send("Mes données sont pour l'instant limitées !");
            setTimeout(reveilpahser2, 3000);
        }


        function reveilpahser2() {
            message.channel.send("Bientôt, je serais en mesure de vous indiquer beaucoup de choses.");
        }
    })
}

    module.exports.function = function2();