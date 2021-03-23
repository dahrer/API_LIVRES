const fs = require('fs');
const moment = require('moment');




class LogUtilities {

    validatorErrorLog(message) {
        let affichage = "";
        for (let i = 0; i < message.errors.length; i++) {
            let content = message.errors[i];
            let value = JSON.stringify(content.value);
            let msg = JSON.stringify(content.msg);
            let param = JSON.stringify(content.param);
            let location = JSON.stringify(content.location);
            affichage += ("value: " + value + " is " + msg + " as " + param + " in " + location + " || ");
        };
        fs.appendFile('./logs/log.txt', "ERROR :: Validator " + " || " + moment().format('MMMM Do YYYY, h:mm:ss a') + " || " + affichage + "\n", function(err) {
            if (err) throw err;
        });
    }
    mysqlErrorLog(message) {
        const error = JSON.stringify(message.code);
        const info = JSON.stringify(message.sqlMessage);
        const code = JSON.stringify(message.errno);
        fs.appendFile('./logs/log.txt', "ERROR :: MySQL " + " || " + moment().format('MMMM Do YYYY, h:mm:ss a') + " || " + error + " - " + info + " - error code " + code + "\n", function(err) {
            if (err) throw err;
        });
    }
    userEntryLog(message) {
        const content = JSON.stringify(message);
        fs.appendFile('./logs/log.txt', moment().format('MMMM Do YYYY, h:mm:ss a') + " || " + content + "\n", function(err) {
            if (err) throw err;
        });
    }

};

module.exports = new LogUtilities();