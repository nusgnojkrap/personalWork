let fs = require("fs");
let dateformat = require("dateformat");
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

        log = "[" + date.toISOString().substring(0, 10) + " " + date.toISOString().substring(12, 19) + "]" + log;

        console.log(dateformat(new Date(), "yyyy-mm-dd"));

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
