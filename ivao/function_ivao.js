const data = require('./pilot.json');
const data1 = require('./atc.json');


module.exports.rule = (value) => {
   switch (value) {

        case "I": return "IFR";
        break;

        case "V": return "VFR";
            break;

        case "Y": return "IFR / VFR (Y) ";
            break;

        case "Z": return "VFR / IFR (Z) ";
            break;
    }
}

module.exports.gradepilote = (value) => {
    switch (value) {
        case "p1": return "Observer";
            break;
        case "p2": return "Basic Flight Student (FS1)";
            break;
        case "p3": return "Flight Student (FS2)";
            break;
        case "p4": return "Advanced Flight Student (FS3)";
            break;
        case "p5": return "Private Pilot (PP)";
            break;
        case "p6": return "Senior Private Pilot (SPP)";
            break;
        case "p7": return "Commercial Pilot (CP)";
            break;
        case "p8": return "Airline Transport Pilot (ATP)";
            break;
        case "p9": return "Senior Flight Instructor (SFI)";
            break;
        case "p10": return "Chief Flight Instructor (CFI)";
            break;
    }
}

module.exports.specification = (value) => {
    switch (value) {

        case "0": return "Flying";
            break;

        case "1": return "Ground";
            break;
    }
}

module.exports.gradeatc = (value) => {
    switch (value) {
        case "a1": return "Observer";
            break;
        case "a2": return "ATC Applicant (AS1)";
            break;
        case "a3": return "ATC Trainee (AS2)";
            break;
        case "a4": return "Advanced ATC Trainee (AS3)";
            break;
        case "a5": return "Aerodrome Controller (ADC)";
            break;
        case "a6": return "Approach Controller (APC)";
            break;
        case "a7": return "Center Controller (ACC)";
            break;
        case "a8": return "Senior Controller (SEC)";
            break;
        case "a9": return "Senior ATC Instructor (SAI)";
            break;
        case "a10": return "Chief ATC Instructor (CAI)";
            break;
    }
}