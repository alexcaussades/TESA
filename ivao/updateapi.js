const Discord = require("discord.js");
const fetch = require("node-fetch");
const {data} = require('./api-ivao.json');




module.exports.updateApiIvao = () => {
    fetch(data.getdata, { method: "GET"}).then(function(reponse){
    if(reponse.status != "200")
    {

        
    }else{
        

    }})
} 
