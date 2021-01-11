const Discord = require('discord.js');
require('dotenv').config();
const prefix = process.env.prefix;
const client = new Discord.Client();
//const sq = require('sqlite3').verbose();
const fs = require("fs");
const request = require('request');
const tesa = require("./test");
const database = require("./databasesql");
const configtwitch = require('./twitch/twitch.json');
const fetch = require('node-fetch');
const apiivao = require('./ivao/api-ivao.json');
const reqtesa = "tesa"
//api.clientID = configtwitch.data.auth.client_id;
//const  myid = "102253806";
//const idtesa = "794282559290212352";
//const meteo = "http://api.openweathermap.org/data/2.5/weather?q=limoges&appid=6db93a028b58851dcd81193539d903de&units=metric";
const profil = require("./profil");
const favi = require("./ivao/addfive")


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("I am learning my functions",{type: "PLAYING"});

  });

client.on("guildMemberAdd", member =>{
    console.log('User' + member.user.tag + 'has joined the server!');
    let idserveur = member.guild.id;
    try {
        const autolrole = require("./autorole/"+idserveur+".json");
        if(autolrole.data.id === idserveur){
            let Role_Testrole = member.guild.roles.cache.find(r => r.id === autolrole.data.autorole);
            member.roles.add(Role_Testrole).catch(console.error);
        }
    }catch (e) {
        console.log(e)
    }

})

client.on("channelCreate", async channel =>{
    console.log(`Channel created: ${channel.name}`)
})

client.on("channelDelete", async channel =>{
    console.log(`Channel delecte: ${channel.name}`)
})

client.on('message', message =>{
    if(message.content === prefix+"creatMyProfil"){
        let id = message.author.id
        let name = message.author.username
        profil.run(id, name);
        //console.log(isok)
    }
})

client.on("message", message =>{
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    if(command === "add-vid") {
        let id = message.author.id
        let name = message.author.username
        let vidarray = args;
        console.log(id, name, vidarray)
        favi.run(id, name, vidarray)

    }
})

client.on("message", message =>{
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    if(command === "autorole"){
        message.delete();
        if(args == false){
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Voici l\'utilisation de la commande ```autorole``` :')
                .setDescription(":small_blue_diamond: Description : \n Permet d'activer ou désactiver l'autorole \n \n :small_blue_diamond:Utilisation :\n &autorole @mentiondurôle\n &autorole off ")
                .setTimestamp()
                .setFooter('T.E.S.A');

            message.channel.send(exampleEmbed);
        }else if (args != "off"){
            let id = message.guild.id
            let name = message.guild.name
            let members = message.guild.memberCount
            let argss = args[0]
            let argsav = argss.substring(3)
            let argsfinality = argsav.substring(18, -1)
            let profil = {
                "data":{
                    "id": id,
                    "name": name,
                    "autorole": argsfinality,
                    "autorolefull": args[0]
                }
            }
            let donner = JSON.stringify(profil, null,2)
            fs.writeFile("./autorole/"+id+".json", donner, function (error){
                if (error) {
                    console.log(error)
                }
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#13f00b')
                    .setTitle('l\'utilisation de la commande ```autorole``` :')
                    .setDescription("Le rôle "+args[0]+" seras donné automatiquement lorsque que quelqu'un rejoint le serveur ! ")
                    .setTimestamp()
                    .setFooter('T.E.S.A');

                message.channel.send(exampleEmbed);

            })}else if (args == 'off'){
            let id = message.guild.id
            fs.unlinkSync("./autorole/"+id+".json");
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#f02e0b')
                .setTitle('l\'utilisation de la commande ```autorole``` :')
                .setDescription("La commande autorole est **OFF**")
                .setTimestamp()
                .setFooter('T.E.S.A');

            message.channel.send(exampleEmbed);
        }
    }})

client.on("message", message =>{
    if (message.content === prefix + "devs"){
        message.delete();
        message.channel.send(`${client.user}`);

    }else if(message.content === prefix + "help"){
        message.delete();
        message.channel.send("Actuellement, mon module Help est absent.\n &feedback pour exécuter une demande");
    } else if(message.content === reqtesa + " hello"){
        message.delete();
       message.channel.send(`${message.author} Ta vue l'heure, je dors là ! Hey monsieur, je suis une ados qui a besoin de repos `);
    } else if(message.content === reqtesa){
        message.delete();
        message.channel.send(`${message.author} Qu'es que tu me veux ?`);
    }else if(message.content === reqtesa + " sois gentille"){
        message.delete();
        message.channel.send(`${message.author} Oh pardon ! Mais je peux me faire pardonner avec un spam cette nuit si tu le veux bien sure. :rage: `);
    }else if(message.content === reqtesa + " non merci"){
        message.delete();
        message.channel.send(`${message.author} Trop facile humain, j'ai gagné mec ! :middle_finger:  `);
    }else if(message.content === reqtesa + " je peux avoir un café stp"){
        message.delete();
        message.channel.send(`${message.author} avec 100€ et un mars aussi ?`);
    }else if(message.content === reqtesa + " bonjour"){
        message.delete();
        message.channel.send(`${message.author} Ta vue l'heure, je dors là ! Hey monsieur, je suis une ados qui a besoin de repos `);
    }
})

client.on("message",message => {
    if(message.content === prefix +"creat database"){
        message.delete();
        message.channel.send("creation de la base en cour");
        database.creatdata;
           message.channel.send("La création de la base de donées à bien étais éffectuer !");
           message.channel.send(tesa.i).then( message => {message.channel.send(tesa.rp1), 3000});
           message.channel.send("--------").then(message => {message.channel.send(tesa.rp2), 3000});
       }
   });

client.on("message", message => {
    if (message.content === prefix + 'user-info') {
        message.delete();
        message.channel.send('Your username: ' + message.author.username + '\nYour ID: ' + message.author.id);
    }
})

/**
 * search metard api ivao
 * */
client.on("message", message =>{
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    if(command === "metar") {
     message.delete();
       let sr =  apiivao.data.metar+args;
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
    })

/**
 * search fly api ivao
 * */

client.on("message", message =>{
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    if(command === "fly") {
        message.delete();
        const pilot = apiivao.data.datapilot+args;
        const fnivao = require("./ivao/function_ivao");
        let dataatcjson = require("./ivao/atc.json");
        request(pilot, function (error, response, body) {
            const objfly = JSON.parse(body);
            let test = new Discord.MessageEmbed()
                .setColor('#8a2be2')
                .setTitle(objfly.data[0].callsign)
                .setURL(dataatcjson.data.url+objfly.data[0].Vid)
                .setDescription( "DEP: **"+ objfly.data[0].FlightplanDepartureAerodrome+ "** ARR: **"+ objfly.data[0].FlightplanDestinationAerodrome+"**\n " +
                    "Route: "+ objfly.data[0].route + "\n" +
                    "Flight Rules: **"+ fnivao.rule(objfly.data[0].FlightplanFlightRules)+ "** status : **"+ fnivao.specification(objfly.data[0].onGround) +"**"
                + "Cruising Level required: **" + objfly.data[0].FlightplanCruisingLevel + "**")
             .addFields(
                 { name: 'remarks: ', value: objfly.data[0].remarks },
                 { name: 'Aircraft: ', value: objfly.data[0].fullAircraft },
                 { name: 'altitude: ', value: objfly.data[0].altitude+ "ft", inline: true },
                 { name: 'POB: ', value: objfly.data[0].pob, inline: true },
                 { name: 'Rating: ', value: fnivao.gradepilote(objfly.data[0].rating), inline: true },
                 { name: 'vid: ', value: objfly.data[0].Vid, inline: true },
                 { name: 'Departure Time: ', value: objfly.data[0].departureTime, inline: true },
             )
            .setTimestamp()
            .setFooter('T.E.S.A');
            message.channel.send(test);
        })
    }
    })
/**
 * search atc api ivao
 * */
client.on("message", message =>{
        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(' ');
        const command = args.shift().toLowerCase();
        if(command === "atc"){
            message.delete();
            let icao = args
            if(!icao){
                process.exit();
            }
            const sr = apiivao.data.dataatc+icao;
            const fnivao = require("./ivao/function_ivao");
            let dataatcjson = require("./ivao/atc.json");
            request(sr, function (error, response, body) {
                const obj = JSON.parse(body);

                // if(obj.nameAirport != undefined){
                //     message.channel.send("Information ATC on " +obj.nameAirport);
                // }else{
                //     message.channel.send("Plateforme non trouvée");
                // }

                const data = obj.data
                try {
                    if(data.app.Callsign != null){
                        //message.channel.send("Information ATC on " +obj.nameAirport);
                        //message.channel.send(obj.data.app.Callsign + " : " + obj.data.app.Frequency + " Mhz ");
                        //message.channel.send(" vid: " +obj.data.app.Vid);
                       // message.channel.send("Atis : " + obj.data.app.Atis);
                        let test = new Discord.MessageEmbed()
                            .setColor('#8a2be2')
                            .setTitle(obj.data.app.Callsign + " : " + obj.data.app.Frequency + " Mhz ")
                            .setURL(dataatcjson.data.url+obj.data.app.Vid)
                            .setDescription("Atis : " + obj.data.app.Atis)
                            .addFields(
                                { name: 'vid: ', value: obj.data.app.Vid, inline: true },
                                { name: 'Rating: ', value: fnivao.gradeatc(data.app.rating), inline: true }
                                )
                            .setTimestamp()
                            .setFooter('T.E.S.A');
                        message.channel.send(test);

                    }
                }catch (e) {
                    message.channel.send("is empty fot ICAO ex: &atc icao ");
                }
                try{
                    if(data.twr.Callsign != null){
                        let test = new Discord.MessageEmbed()
                            .setColor('#8a2be2')
                            .setTitle(obj.data.twr.Callsign + " : " + obj.data.twr.Frequency + " Mhz ")
                            .setURL(dataatcjson.data.url+obj.data.twr.Vid)
                            .setDescription("Atis : " + obj.data.twr.Atis)
                            .addFields(
                                { name: 'vid: ', value: obj.data.twr.Vid, inline: true },
                                { name: 'Rating: ', value: fnivao.gradeatc(obj.data.twr.rating), inline: true }
                            )
                            .setTimestamp()
                            .setFooter('T.E.S.A');
                        message.channel.send(test);
                    }
                }catch (e) {

                }
                try{
                    if(data.gnd.Callsign != null){
                        //message.channel.send("Information ATC on " +obj.nameAirport);
                        let test = new Discord.MessageEmbed()
                            .setColor('#8a2be2')
                            .setTitle(obj.data.gnd.Callsign + " : " + obj.data.gnd.Frequency + " Mhz ")
                            .setURL(dataatcjson.data.url+obj.data.gnd.Vid)
                            .setDescription("Atis : " + obj.data.gnd.Atis)
                            .addFields(
                                { name: 'vid: ', value: obj.data.gnd.Vid, inline: true },
                                { name: 'Rating: ', value: fnivao.gradeatc(obj.data.gnd.rating), inline: true }
                            )
                            .setTimestamp()
                            .setFooter('T.E.S.A');
                        message.channel.send(test);
                    }
                }catch (e) {

                }
                try{
                    if(data.del.Callsign != null){
                        let test = new Discord.MessageEmbed()
                            .setColor('#8a2be2')
                            .setTitle(obj.data.del.Callsign + " : " + obj.data.del.Frequency + " Mhz ")
                            .setURL(dataatcjson.data.url+obj.data.del.Vid)
                            .setDescription("Atis : " + obj.data.del.Atis)
                            .addFields(
                                { name: 'vid: ', value: obj.data.del.Vid, inline: true },
                                { name: 'Rating: ', value: fnivao.gradeatc(obj.data.del.rating), inline: true }
                            )
                            .setTimestamp()
                            .setFooter('T.E.S.A');
                        message.channel.send(test);
                    }
                }catch (e) {
                    console.log(e)
                }
                try {
                    if(data.other != null) {
                        let nb = data.other.data
                        for (let i=0; i < nb; i++)
                        {
                            let test = new Discord.MessageEmbed()
                                .setColor('#8a2be2')
                                .setTitle(obj.data.other[i].Callsign + " : " + obj.data.other[i].Frequency + " Mhz ")
                                .setURL(dataatcjson.data.url + obj.data.other[i].Vid)
                                .setDescription("Atis : " + obj.data.other[i].Atis)
                                .addFields(
                                    {name: 'vid: ', value: obj.data.other[i].Vid, inline: true},
                                    {name: 'Rating: ', value: fnivao.gradeatc(obj.data.other[i].rating), inline: true}
                                )
                                .setTimestamp()
                                .setFooter('T.E.S.A');
                            message.channel.send(test);
                        }

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

/**
 * search live on the twitch
 * */
client.on("message", message => {

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    if(command === "live"){
        message.delete();
        if(args == false){
           let args = "alexcaussades";
           //console.log(args);
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
                    const avatar = json.data[0].thumbnail_url;

                    if(live === false){
                        const exampleEmbed = new Discord.MessageEmbed()
                            .setColor('#FF0000')
                            .setTitle('Le Live n\'est pas actif actuellement.')
                            .setAuthor(args)
                            .setThumbnail(avatar)
                            .setTimestamp()
                            .setFooter('T.E.S.A');

                        message.channel.send(exampleEmbed);
                    }else if(live !== false){

                        fetch(configtwitch.data.url.broadcaster+id,{
                            method: "GET",
                            headers: {
                                "client-id": configtwitch.data.auth.client_id,
                                "Authorization": configtwitch.data.auth.bearer
                            }
                        }).then(res =>res.json()).then(json =>{
                            const game = json.data[0].game_name;
                            const title_stream = json.data[0].title;
                            const exampleEmbed = new Discord.MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle('Live ON')
                                .setURL('https://www.twitch.tv/'+args)
                                .setAuthor(args)
                                .setDescription(title_stream + " \n Game: "+ game)
                                .setThumbnail(avatar)
                                .setImage(avatar)
                                .setTimestamp()
                                .setFooter('T.E.S.A');

                            message.channel.send(exampleEmbed);
                        })
                    }
            });

        }else if(args) {

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
                const avatar = json.data[0].thumbnail_url;

                if(live === false){
                    const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('Le Live n\'est pas actif actuellement.')
                        .setAuthor(args)
                        .setThumbnail(avatar)
                        .setTimestamp()
                        .setFooter('T.E.S.A');

                    message.channel.send(exampleEmbed);
                }else if(live !== false){
                    fetch(configtwitch.data.url.streams+id,{
                        method: "GET",
                        headers: {
                            "Accept": configtwitch.data.url.apiv5,
                            "client-id": configtwitch.data.auth.client_id,
                            "Authorization": configtwitch.data.auth.bearer
                        }
                    }).then(res =>res.json()).then(json =>{
                        const game = json.stream.game;
                        const title_stream = json.stream.channel.status;
                        const viewer = json.stream.viewers;
                        const preview = json.stream.preview.medium;
                        const exampleEmbed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle('Live ON')
                            .setURL('https://www.twitch.tv/'+args)
                            .setAuthor(args)
                            .setDescription(title_stream + " \n **Game: "+ game+ "\n Viewer: " + viewer+"**")
                            .setThumbnail(avatar)
                            .setImage(preview)
                            .setTimestamp()
                            .setFooter('T.E.S.A');

                        message.channel.send(exampleEmbed);
                    });
                }
            });

        }

    }
})

/**
 * search vid api ivao
 * */
client.on("message", message =>{
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    if(command === "vid") {
        message.delete();
        const sr = apiivao.data.datavid+args
        const fnivao = require("./ivao/function_ivao");
        let dataatcjson = require("./ivao/atc.json");
        request(sr, function (error, response, body) {
            const objvid = JSON.parse(body);
            //console.log(objvid);
            if(objvid.data.atc.Callsign != null)
            {
                let test = new Discord.MessageEmbed()
                    .setColor('#8a2be2')
                    .setTitle(objvid.data.atc.Callsign + " : " + objvid.data.atc.Frequency + " Mhz ")
                    .setURL(dataatcjson.data.url+objvid.data.atc.Vid)
                    .setDescription("Atis : " + objvid.data.atc.Atis)
                    .addFields(
                        { name: 'vid: ', value: objvid.data.atc.Vid, inline: true },
                        { name: 'Rating: ', value: fnivao.gradeatc(objvid.data.atc.rating), inline: true }
                    )
                    .setTimestamp()
                    .setFooter('T.E.S.A');
                message.channel.send(test);

            }else if(objvid.data.pilot.callsign != null){
                let test = new Discord.MessageEmbed()
                    .setColor('#8a2be2')
                    .setTitle(objvid.data.pilot.callsign)
                    .setURL(dataatcjson.data.url+objvid.data.pilot.Vid)
                    .setDescription( "DEP: **"+ objvid.data.pilot.FlightplanDepartureAerodrome+ "** ARR: **"+ objvid.data.pilot.FlightplanDestinationAerodrome+"**\n " +
                        "Route: "+ objvid.data.pilot.route + "\n" +
                        "Flight Rules: **"+ fnivao.rule(objvid.data.pilot.FlightplanFlightRules)+ "** status : **"+ fnivao.specification(objvid.data.pilot.onGround) +"**"
                        + " Cruising Level required: **" + objvid.data.pilot.FlightplanCruisingLevel + "**")
                    .addFields(
                        { name: 'remarks: ', value: objvid.data.pilot.remarks },
                        { name: 'Aircraft: ', value: objvid.data.pilot.fullAircraft },
                        { name: 'altitude: ', value: objvid.data.pilot.altitude+ "ft", inline: true },
                        { name: 'POB: ', value: objvid.data.pilot.pob, inline: true },
                        { name: 'Rating: ', value: fnivao.gradepilote(objvid.data.pilot.rating), inline: true },
                        { name: 'vid: ', value: objvid.data.pilot.Vid, inline: true },
                        { name: 'Departure Time: ', value: objvid.data.pilot.departureTime, inline: true },
                    )
                    .setTimestamp()
                    .setFooter('T.E.S.A');
                message.channel.send(test);

            }else{
                message.channel.send("not on ligne for the VID: " + args);
            }

            })
    }})

/**
 * creation invite membre
 * */
client.on("message", message =>{
    const command = message.content;
    if(command === prefix+'inviteCreat')
    {
        message.delete();
        message.channel.createInvite().then(invite => message.channel.send(`Votre lien d'invitation : \n\nhttps://discord.gg/${invite.code}`))

    }
})

/**
 * creation invite bot
 * */
client.on('message', message => {
    if(message.content === prefix+"invitebot")
    {
        message.delete();
        let urlinvite = "https://discord.com/api/oauth2/authorize?client_id=794282559290212352&permissions=8&scope=bot";
        message.channel.send(urlinvite);
    }
})


client.login(process.env.token);