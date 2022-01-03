var ari = require("ari-client");
wvar dataParser = require("./../utils/dataParser");
var dataCommand = require("./../utils/dataCommand");

const logger = require("./../utils/logger");
var path = require("path");
const cmd = require("../utils/cmd");
var jsName = path.basename(__filename);

//curl -v- u asterisk:asterisk -X POST "http://localhost:8088/ari/channels?endpoint=PJSIP/수신자번호@sst&extension=07079999790&context=from-internal&priority=1&callerId=발신자번호"

//parameter
//ID
//password
//context
//extension
//priority
//수신자번호    calledId
//발신자번호    callerIde

// ari.connect("localhost", "asterisk", "asterisk", function (err, ari) {});

module.exports = function (data) {
    logger.info(jsName, "-----------------------------------------");
    logger.info(jsName, "start ari Service");
    logger.info(jsName, "-----------------------------------------");
    logger.info(jsName, "");

    let result;
    try {
        if (data == null) {
            logger.error(jsName, "data null errror");
            result.title = "fail";
            result.info = "data null errer";
            return result;
        } else {
            //script command 실행
            //url 에 각 파라미터 로 바꾼다음에 스크립트창에 입력

            var afterDataObj = dataParser(data);
            var Datacommand = dataCommand(afterDataObj);
            cmd(Datacommand);
        }
    } catch (err) {
        logger.error(jsName, "-----------------------------------------");
        logger.error(jsName, "try -catch error");
        logger.error(jsName, "-----------------------------------------");
        logger.error(jsName, "");
        return;
    }
};
