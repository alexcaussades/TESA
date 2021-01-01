const Discord = require('discord.js');
require('dotenv').config();
const prefix = process.env.prefix;
const client = new Discord.Client();
const sq = require('sqlite3').verbose();
const fetch = require('node-fetch');
const test = require("./test");
const fs = require('fs');
const http2 = require("http2");
const express = require('express')
const tools = express();
const request = require('request');


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("I am learning my functions",{type: "PLAYING"});

  });

client.on("message", message =>{
    if (message.content === prefix + "devs"){

        message.channel.send("je suis éduqué par AlexCaussades");

    }else if(message.content === prefix + "help"){
        message.channel.send("Actuellement, mon module Help est absent.\n &feedback pour exécuter une demande");
    }
})

client.on("message", message => {
    if (message.content === prefix + "hello"){
        message.channel.send(`bonjour, ${message.author.username}`);
    }
})

client.on("message",message => {
     function function2() {
        message.channel.send("Je me présente TESA, je suis une intelligence artificielle !");
         setTimeout(reveilpahse1, 3000);

         function reveilpahse1() {
             message.channel.send("Mes données sont pour l'instant limitées !");
             setTimeout(reveilpahse2, 3000);
         }

         function reveilpahse2() {
             message.channel.send("Bientôt, je serais en mesure de vous indiquer beaucoup de choses.");
        }


     }

//client.on("message",message => {
    if(message.content === prefix +"creat database"){
       const db = new sq.Database(__dirname + "programme.db3", sq.OPEN_READWRITE, err => {
           if(err){
              console.log(err.message);
           }
           message.channel.send("creation de la base en cour");
           //Smessage.channel.send(__dirname + "programme.db3");
           db.run('CREATE TABLE IF NOT EXISTS  lundi (id  INTEGER AUTO_INCREMENT PRIMARY KEY, titre varchar(255) NOT NULL, game varchar(255) NOT NULL)');
           db.run('CREATE TABLE IF NOT EXISTS  mardi (id  INTEGER AUTO_INCREMENT PRIMARY KEY, titre varchar(255) NOT NULL, game varchar(255) NOT NULL)');
           db.run('CREATE TABLE IF NOT EXISTS  mercredi (id  INTEGER AUTO_INCREMENT PRIMARY KEY, titre varchar(255) NOT NULL, game varchar(255) NOT NULL)');
           db.run('CREATE TABLE IF NOT EXISTS jeudi (id  INTEGER AUTO_INCREMENT PRIMARY KEY, titre varchar(255) NOT NULL, game varchar(255) NOT NULL)');
           db.run('CREATE TABLE IF NOT EXISTS vendredi (id  INTEGER AUTO_INCREMENT PRIMARY KEY, titre varchar(255) NOT NULL, game varchar(255) NOT NULL)');
           db.run('CREATE TABLE IF NOT EXISTS samedi (id  INTEGER AUTO_INCREMENT PRIMARY KEY, titre varchar(255) NOT NULL, game varchar(255) NOT NULL)');
           db.run('CREATE TABLE IF NOT EXISTS dimanche (id  INTEGER AUTO_INCREMENT PRIMARY KEY, titre varchar(255) NOT NULL, game varchar(255) NOT NULL)');
           message.channel.send("La création de la base de donées à bien étais éffectuer !");
           function2();
       })

   }
});


client.on("message", message => {
    if (message.content === prefix + 'user-info') {
        message.channel.send('Your username: ' + message.author.username + '\nYour ID: ' + message.author.id);
    }
})




client.on("message", message =>{
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    async function getUrlMetar(icao) {
       let sr =  'http://wx.ivao.aero/metar.php?id='+icao;
        request(sr, function (error, response, body) {
            //console.error('error:', error); // Print the error if one occurred
            //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
           // console.log('body:', body); // Print the HTML for the Google homepage.
            message.channel.send(body);
        });
    }

    if(command === "metar") {
        (async () => {
            let search = await getUrlMetar(args);
            message.channel.send(search);
        })()
    }})

client.on("message", message =>{
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split('-');
    const command = args.shift().toLowerCase();

    if(command === "info"){
        console.log(args)
    }
})

client.on("message", message =>{
        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(' ');
        const command = args.shift().toLowerCase();
        if(command === "atc"){
            let icao = args
            if(!icao){
                process.exit();
            }
            let sr = "https://alexcaussades.com/api-ivao/atc.php?icao="+icao;
            request(sr, function (error, response, body) {
                const obj = JSON.parse(body);

                if(obj.nameAirport != undefined){
                    message.channel.send("Information ATC on " +obj.nameAirport);
                }

                const data = obj.data
                try {
                    if(data.app.Callsign != null){
                        //message.channel.send("Information ATC on " +obj.nameAirport);
                        message.channel.send(obj.data.app.Callsign + " is open " + obj.data.app.Frequency + " Mhz ");
                        message.channel.send("Atis : " + obj.data.app.Atis);
                    }
                }catch (e) {
                    message.channel.send("is empty fot ICAO ex: &atc icao ");
                }
                try{
                    if(data.twr.Callsign != null){
                        //message.channel.send("Information ATC on " +obj.nameAirport);
                        message.channel.send(obj.data.twr.Callsign + " is open " + obj.data.twr.Frequency + " Mhz ");
                        message.channel.send("Atis : " + obj.data.twr.Atis);
                    }
                }catch (e) {

                }
                try{
                    if(data.gnd.Callsign != null){
                        //message.channel.send("Information ATC on " +obj.nameAirport);
                        message.channel.send(obj.data.gnd.Callsign + " is open " + obj.data.gnd.Frequency + " Mhz ");
                        message.channel.send("Atis : " + obj.data.gnd.Atis);
                    }
                }catch (e) {

                }
                try{
                    if(data.del.Callsign != null){
                        //message.channel.send("Information ATC on " +obj.nameAirport);
                        message.channel.send(obj.data.del.Callsign + " is open " + obj.data.del.Frequency + " Mhz ");
                        message.channel.send("Atis : " + obj.data.del.Atis);
                    }
                }catch (e) {
                    console.log(e)
                }
                try {
                    if (data.app.Callsign === null && obj.data.twr.Callsign === null && obj.data.gnd.Callsign === null && obj.data.del.Callsign === null){
                        message.channel.send("No service contrôleur for the plateforme");
                    }
                }catch (error) {
                    console.log(error)
                }

            })
        }
})


client.login(process.env.token);