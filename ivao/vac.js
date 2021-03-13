const { datedata } = require("./airac.json");
const Discord = require("discord.js");



module.exports.run = (client, message, args, pdo) => {
const date = new Date();
const getDateMonth = date.getMonth();
const getDateDay = date.getDate();
const VerifyDate = datedata.number.data[2];
const url = "https://www.sia.aviation-civile.gouv.fr/dvd/eAIP_";
const url2 = "/Atlas-VAC/PDF_AIPparSSection/VAC/AD/AD-2.";
const pdf = ".pdf";
const tiret = "_";
const UpercaseArgs = args.toString().toUpperCase();
console.log(getDateDay);
if (VerifyDate === datedata.number.data[getDateMonth]) {
    if (getDateDay < datedata.number.data[getDateMonth].day) {
        const day = datedata.number.data[getDateMonth].day;
        const month = datedata.number.data[getDateMonth].month;
        const year = datedata.number.data[getDateMonth].year;
        const airac = datedata.number.data[getDateMonth].airac;
        const file =
            url + day + tiret + month + tiret + year + url2 + UpercaseArgs + pdf;
            message.author.send(file);
    } else if (getDateDay > datedata.number.data[getDateMonth].day) {
        const NewMonth = datedata.number.data[getDateMonth];
        const DataPlus = +NewMonth.id + 1;
        if (DataPlus) {
            const day = datedata.number.data[DataPlus].day;
            const month = datedata.number.data[DataPlus].month;
            const year = datedata.number.data[DataPlus].year;
            const airac = datedata.number.data[DataPlus].airac;
            const file =
                url + day + tiret + month + tiret + year + url2 + UpercaseArgs + pdf;
                message.author.send(file);
        }
    }
}

}