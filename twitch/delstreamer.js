const Discord = require("discord.js")

module.exports.run = (client, message, args, pdo) => {
   const id = args
    if(args){
        pdo.get(`SELECT * FROM newlive WHERE id = ?`,[id], function (error, row) {
            if (row) {
              if (row.id == id) {
                const NameDelect = row.channels
                pdo.run(`DELETE FROM newlive WHERE id = ?`,[id], function (error, row) {
                  if(row){
                    message.channel.send("Le Streamer "+ NameDelect + " est supprimer du système")
                  }
                  })
                
              }
           }
        })
    }
}