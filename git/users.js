const fetch = require("node-fetch");
const git = require("./git.json");


module.exports.run = (client, args, pdo = null) => {

    //const args = "alexcaussades"

    fetch(git.data.url.users + args, {

    }).then((res) => res.json()).then((json) => {

        const public_repos = json.public_repos
        const public_gists = json.public_gists
        const name = json.name
        const avatar_url = json.avatar_url
    })

} 