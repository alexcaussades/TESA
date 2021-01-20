const Discord = require("discord.js")

module.exports.creat = (client, message) => {
  //guild.channels.create('new-general', {type: "category"}).then(console.log)
  //.catch(console.error);
  message.guild.channels.create("Support", { type: "category" })
  message.guild.channels
    .create("new-tiket", { type: "text" })
    .then((channel) => {
      let category = client.channels.cache.find(
        (c) => c.name == "Support" && c.type == "category"
      )
      if (!category) throw new Error("Category channel does not exist")
      channel.setParent(category.id)
    })
    .catch(console.error)
}

module.exports.creatRole = (client, message) => {
  const support = message.guild.roles.cache.find((c) => c.name === "support")
  if (support === false) {
    message.guild.roles
      .create({
        data: {
          name: "support",
          color: "grey",
        },
        reason: "we needed a role for Team Support",
      })
      .then(console.log)
      .catch(console.error)
  } else {
    message.channel.send("is created the Role support")
  }
}

// module.exports.addmembersupport = (client, message, member) => {
//      try {
//         let Role_support = member.guild.roles.cache.find(
//           (r) => r.id === "support")
//         member.roles.add(Role_support).catch(console.error)

//         }
//      catch (e) {
//       console.log(e)
//     }
// }
