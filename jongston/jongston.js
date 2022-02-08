let fs = require("fs");
let date = new Date();

function jongston(filepath, filename, log) {
    return new Promise((resolve, reject) => {
        if (filepath == undefined || filename == undefined) {
            console.log("error");
        }

        if (filepath[filepath.length - 1] == "/") {
            filepath = filepath.substring(0, filepath.length - 1);
        }

        if (filename[filename.length - 1] == "/") {
            filename = filename.substring(0, filename.length - 1);
        }
        filename = filename + "." + date.toISOString().substring(0, 10);

        if (log[log.length - 1] == "\n") {
            log = log.substring(0, log.length - 1);
        } else {
            log = log + "\n";
        }
        let hours = date.getHours();
        if (date.getHours().length == 1) {
            hours = "0" + hours;
        }
        let minute = date.getMinutes();
        if (date.getMinutes() < 10) {
            minute = "0" + minute.toString();
        }
        let second = date.getSeconds();
        if (date.getSeconds() < 10) {
            second = "0" + second.toString();
        }
        let month = date.getMonth() + 1;
        if (date.getMonth() <= 10) {
            month = "0" + month.toString();
        }
        let nowdate = date.getDate();
        if (date.getDate() <= 9) {
            nowdate = "0" + (date.getDate() + 1).toString();
        } else {
            nowdate = nowdate + 1;
        }
        log = "[" + date.getFullYear() + "-" + month + "-" + nowdate + " " + hours + ":" + minute + ":" + second + "]" + "\t" + log;

        if (fs.existsSync(filepath) == false) {
            fs.mkdirSync(filepath);
        }

        if (fs.existsSync(filepath + "/" + filename) == false) {
            fs.writeFile(filepath + "/" + filename, log, function (err) {
                resolve();
            });
        } else {
            fs.appendFile(filepath + "/" + filename, log, function (err) {
                resolve();
            });
        }
    });
}

module.exports.jongston = jongston;
