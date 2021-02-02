const Discord = require("discord.js");
const fetch = require("node-fetch");
const configtwitch = require("./twitch.json");

module.exports.run = (client, message, args, pdo) => {
    args = "techniquesspatiales"
    pdo.run("CREATE TABLE IF NOT EXISTS  onlive(id INTEGER PRIMARY KEY, channels TEXT VARCHAR(255) NOT NULL, status TEXT VARCHAR(255) NOT NULL)");
    //pdo.run(`INSERT INTO onlive(channels, status) VALUES(?,?)`,["techniquesspatiales", 0])       
    // const hook = new Webhook(
    //       "https://discord.com/api/webhooks/804312053044871209/AflBOSo-h095rdrqfKTRfkJmnFzjBriNiF45UPCFWWL4BWoYOEhmBmBf7-LoXgQJEr3p"
    //     );
        
    const fetch = require("node-fetch");
        fetch(configtwitch.data.url.channelsquery + args, {
          method: "GET",
          headers: {
            "client-id": configtwitch.data.auth.client_id,
            Authorization: configtwitch.data.auth.bearer,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            for (let i = 0; i < json.data.length; i++) {
              const element = json.data[i];
              if (element.is_live === true) {
                if (element.display_name === args) {
                    console.log(element.is_live)
                    pdo.get(`SELECT * FROM onlive WHERE channels = ?`,[args], function (error, row) {
                      if (row) {
                        if (row.status != element.is_live) {
                            console.log(element.is_live)
                            pdo.run("UPDATE onlive SET status = ? WHERE channels = ?", [element.is_live,args]);
                          if (element.is_live === true) {
                            //TODO add webhook for discord
                            console.log("hello " + row.status + element.is_live);
                          }
                        }
                      }
                      if (error) {
                        console.log(error);
                        //bug.bug(channel, "db.get", error, db, client);
                      }
                    }
                  );
                }
              } else if (element.is_live === false) {
                if (element.display_name === args) {
                  const id = element.id;
                  pdo.get(
                    `SELECT * FROM onlive WHERE channels = ?`,
                    [args],
                    function (error, row) {
                      if (row) {
                        if (row.status != element.is_live) {
                            pdo.run("UPDATE onlive SET status = ? WHERE channels = ?", [element.is_live, args]);
                        }
                      }
                      if (error) {
                        console.log(error);
                        //bug.bug(channel, "pdo.get", error, db, client);
                      }
                    }
                  );
                }
              }
            }
          });
};
