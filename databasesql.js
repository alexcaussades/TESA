
const sq = require('sqlite3').verbose();


function creatdatabase()
{
    const db = new sq.Database(__dirname + "programme.db3", sq.OPEN_READWRITE, err => {
        if(err){
            console.log(err.message);
        }


    db.run('CREATE TABLE IF NOT EXISTS  lundi (id  INTEGER AUTO_INCREMENT PRIMARY KEY, time varchar(255) NOT NULL, game varchar(255) NOT NULL)');
    db.run('CREATE TABLE IF NOT EXISTS  mardi (id  INTEGER AUTO_INCREMENT PRIMARY KEY, time varchar(255) NOT NULL, game varchar(255) NOT NULL)');
    db.run('CREATE TABLE IF NOT EXISTS  mercredi (id  INTEGER AUTO_INCREMENT PRIMARY KEY, time varchar(255) NOT NULL, game varchar(255) NOT NULL)');
    db.run('CREATE TABLE IF NOT EXISTS jeudi (id  INTEGER AUTO_INCREMENT PRIMARY KEY, time varchar(255) NOT NULL, game varchar(255) NOT NULL)');
    db.run('CREATE TABLE IF NOT EXISTS vendredi (id  INTEGER AUTO_INCREMENT PRIMARY KEY, time varchar(255) NOT NULL, game varchar(255) NOT NULL)');
    db.run('CREATE TABLE IF NOT EXISTS samedi (id  INTEGER AUTO_INCREMENT PRIMARY KEY, time varchar(255) NOT NULL, game varchar(255) NOT NULL)');
    db.run('CREATE TABLE IF NOT EXISTS dimanche (id  INTEGER AUTO_INCREMENT PRIMARY KEY, time varchar(255) NOT NULL, game varchar(255) NOT NULL)');
    })
}

function opendatabase(){
        const db = new sq.Database(__dirname + "programme.db3", sq.OPEN_READWRITE, err => {
            if(err){
                console.log(err.message);
            }
    })
}

module.exports.creatdata = creatdatabase();
module.exports.opendata = opendatabase();