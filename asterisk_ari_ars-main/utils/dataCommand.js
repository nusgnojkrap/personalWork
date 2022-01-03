const logger = require("./../utils/logger");
var path = require("path");
var jsName = path.basename(__filename);

//parameter
//ID
//password
//context
//extension
//priority
//수신자번호    calledId
//발신자번호    callerId

//curl -v -u asterisk:asterisk -X POST "http://localhost:8088/ari/channels?endpoint=PJSIP/수신자번호@sst&extension=07079999790&context=from-internal&priority=1&callerId=발신자번호"
module.exports = function (data) {
    logger.info(jsName, "-----------------------------------------");
    logger.info(jsName, "dataCommand Start");
    logger.info(jsName, "-----------------------------------------");
    logger.info(jsName, "");
    var command;
    try {
        command = `curl -v -u asterisk:${data.ID} -X POST "http://localhost:8088/ari/channels?endpoint=PJSIP/${data.calledId}@sst&extension=${data.extension}&context=${data.context}&priority=${data.priority}&callerId=${data.callerId}"`;
    } catch (err) {
        logger.error(jsName, "-----------------------------------------");
        logger.error(jsName, "try - catch error");
        logger.error(jsName, "-----------------------------------------");
        logger.error(jsName, "");
    }

    logger.info(jsName, "-----------------------------------------");
    logger.info(jsName, command);
    logger.info(jsName, "-----------------------------------------");
    logger.info(jsName, "");

    return command;
};
