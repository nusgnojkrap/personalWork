let fs = require("fs");

function jongston(filepath, filename, log) {
    if (filepath == undefined || filename == undefined) {
        console.log("error");
    }

    if (filepath[filepath.length - 1] == "/") {
        filepath = filepath.substring(0, filepath.length - 1);
    }

    if (filename[filename.length - 1] == "/") {
        filename = filename.substring(0, filename.length - 1);
    }

    if (log[log.length - 1] == "\n") {
        log = log.substring(0, log.length - 1);
    } else {
        log = log + "\n";
    }

    console.log("filepath : " + filepath);
    console.log("filename : " + filename);

    if (fs.existsSync(filepath) == false) {
        fs.mkdirSync(filepath);
    }

    if (fs.existsSync(filepath + "/" + filename) == false) {
        fs.writeFile(filepath + "/" + filename, log, function (err) {
            if (err === null) {
                console.log("success");
            } else {
                console.log("fail");
            }
        });
    } else {
        fs.appendFile(filepath + "/" + filename, log, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("File Appended");
        });
    }
}

jongston("./log/", "test/", "하하호호박종선");
