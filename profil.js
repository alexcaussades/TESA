

module.exports.run = async (client, message, id, name) => {
    let membre_id = id;
    let membre_name = name;
    message.delete();

    //let donner = JSON.stringify(profil, null,2)
    message.author.send("oki cool")
    // await fs.writeFile("./profilmembre/"+membre_id+".json", donner, function (error){
    //
    //     if (error) {
    //         console.log(error)
    //     }
    // })
}