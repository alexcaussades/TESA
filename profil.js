

module.exports.run = async (id, name) => {
    let membre_id = id;
    let membre_name = name;

    let profil = {
        "data":{
            "id": membre_id,
            "name": membre_name
        },

    }
    let donner = JSON.stringify(profil, null,2)
    await fs.writeFile("./profilmembre/"+membre_id+".json", donner, function (error){

        if (error) {
            console.log(error)
        }
    })
}