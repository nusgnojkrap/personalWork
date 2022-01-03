const express = require("express");
const bodyParser = require("body-parser");

var logger = require("./utils/logger");
var path = require("path");
var jsName = path.basename(__filename);

const ariService = require("./services/ariService");
const { stringify } = require("querystring");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//parameter
//ID
//password
//context
//extension
//priority
//수신자번호    calledId
//발신자번호    callerId

app.post("/", function (req, res) {
    logger.info(jsName, "start index.js");
    logger.info(jsName, "req.body : " + JSON.stringify(req.body));

    if (ariService(req.body) == "success") {
        res.send("success");
    } else {
        res.send("fail");
    }
});

app.listen(3000);
