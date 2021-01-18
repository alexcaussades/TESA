const Discord = require("discord.js");
//require('dotenv').config();
//const prefix = process.env.prefix;
const client = new Discord.Client();
//const sq = require('sqlite3').verbose();
//const fetch = require('node-fetch');

function hello() {
  return "Je me présente TESA, je suis une intelligence artificielle !";
}

function reveilpahse1() {
  return "Mes données sont pour l'instant limitées !";
}

function reveilpahser2() {
  return "Bientôt, je serais en mesure de vous indiquer beaucoup de choses.";
}

module.exports.i = hello();
module.exports.rp1 = reveilpahse1();
module.exports.rp2 = reveilpahser2();
