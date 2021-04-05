const Discord = require("discord.js")

module.exports.run = (client, message, pdo) => {
  pdo.all("SELECT * FROM newlive", function (error, rows) {
    if (rows) {
      for (let i = 0; i < rows.length; i++) {
        const element_id = rows[i].id
        const element_channels = rows[i].channels
        message.channel.send("ID: " + element_id + " Name: " + element_channels + "")
      }
      message.channel.send("Use the commands ``` &delstreamer [id] ``` for suppression the list")
    }
  })
}
