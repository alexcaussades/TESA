"use strict";
const Discord = require('discord.js');
const configtwitch = require('./twitch.json');
const fetch = require('node-fetch');



 module.exports.run = (client, message, args= "alexcaussades") => {
        fetch(configtwitch.data.url.channelsquery+args, {
        method: "GET",
        headers: {
            "client-id": configtwitch.data.auth.client_id,
            "Authorization": configtwitch.data.auth.bearer
        }
    })
        .then(res => res.json()).then(json =>{
        const id = json.data[0].id;
        const live = json.data[0].is_live;
        const avatar =  json.data[0].thumbnail_url;

        if(live === false){
            let test = new Discord.MessageEmbed()
              .setColor('#FF0000')
              .setTitle('Le Live n\'est pas actif actuellement.')
              .setAuthor(args)
              .setThumbnail(avatar)
              .setTimestamp()
              .setFooter('T.E.S.A');
            return test;
        }
    });
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['h', 'halp'],
    permLevel: 0
};

exports.help = {
    name: 'help',
    description: 'Displays all the available commands for your permission level.',
    usage: 'help [command]'
};

