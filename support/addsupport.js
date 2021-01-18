const Discord = require("discord.js");

module.exports.creat = (client, message) => {
  //guild.channels.create('new-general', {type: "category"}).then(console.log)
  //.catch(console.error);
  message.guild.channels.create("Support", { type: "category" });
  message.guild.channels
    .create("new-tiket", { type: "text" })
    .then((channel) => {
      let category = client.channels.cache.find(
        (c) => c.name == "Support" && c.type == "category"
      );
      if (!category) throw new Error("Category channel does not exist");
      channel.setParent(category.id);
    })
    .catch(console.error);
};
