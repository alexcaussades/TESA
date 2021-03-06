const fetch = require("node-fetch")
const git = require("./git.json")
const { Webhook, MessageBuilder } = require("discord-webhook-node")

module.exports.run = (client, args, pdo = null) => {
  //const args = "alexcaussades"

  fetch(git.data.url.users + args, {})
    .then((res) => res.json())
    .then((json) => {
      const public_repos = json.public_repos
      const public_gists = json.public_gists
      const name = json.name
      const avatar_url = json.avatar_url ? json.avatar_url : " "
      const followers = json.followers ? json.followers : " "
      const following = json.following ? json.following : " "
      const created_at = json.created_at
      const updated_at = json.updated_at
      const blog = json.blog ? json.blog : " "
      const twitter = json.twitter_username ? json.twitter_username : " "
    
      // explose date creat 
      const YM_created = created_at.split('-')
      const day_created = YM_created[2].split('T')
      const date_created = day_created[0] + "/" + YM_created[1] + "/" + YM_created[0]
      
     // explose date update 
      const YM_updated = updated_at.split('-')
      const day_updated = YM_updated[2].split('T')
      const date_updated = day_updated[0] + "/" + YM_updated[1] + "/" + YM_updated[0]
      
      const webhook =
        "https://discord.com/api/webhooks/806254216368488478/eyEWmAQWUHXSphO9Dz-EJMfkUvQUxi4SR0Gx92RejPO4dll11lBrbVCYAyCukxip5dOf"
      const hook = new Webhook(webhook)
      const embed = new MessageBuilder()
        .setColor("#0F8207")
        .setTitle("GitHub " + name)
        .setURL("https://github.com/" + name)
        //.setAuthor(name)
        .setDescription( "Public Repros: " + public_repos + " \n Public Gist: " + public_gists + " \n Followers: " + followers + " \n Following: " + following + " \n Blog: " + blog + " \n Twitter: " + twitter )
        .addField('Created', date_created, true)
        .addField('Update', date_updated, true)
        .setThumbnail(avatar_url)
        .setTimestamp()
        .setFooter("T.E.S.A")

      hook.send(embed)
    })
}
