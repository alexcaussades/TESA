const request = require('request');
const Discord = require('discord.js');


module.exports.run = (client, message, sr) => {
    request(sr, function (error, response, body) {
        let test = new Discord.MessageEmbed()
            .setColor('#8a2be2')
            //.setTitle('metar')
            .setAuthor(body)
            .setTimestamp()
            .setFooter('T.E.S.A');
        message.channel.send(test);
    });
}