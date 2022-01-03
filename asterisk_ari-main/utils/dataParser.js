const logger = require("./  
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
//
module.exports = function (data) {
    var obj;

    logger.info(jsName, "data string : " + JSON.stringify(data));
    try {
        logger.info(jsName, "-----------------------------------------");
        logger.info(jsName, "data Parser start");
        logger.info(jsName, "-----------------------------------------");
        logger.info(jsName, "");
    } catch (err) {
        logger.info(jsName, "-----------------------------------------");
        logger.info(jsName, "data json parse fail");
        logger.info(jsName, "-----------------------------------------");
        logger.info(jsName, "");
    }

    logger.info(jsName, "-----------------------------------------");
    logger.info(jsName, "ID : " + obj.ID);
    logger.info(jsName, "password : " + obj.password);
    logger.info(jsName, "context : " + obj.context);    
    logger.info(jsName, "extension : " + obj.extension);
    logger.info(jsName, "priority : " + obj.priority);
    logger.info(jsName, "calledId : " + obj.calledId);
    logger.info(jsName, "callerId : " + obj.callerId);
    logger.info(jsName, "----------------ee-------------------------");
    logger.info(jsName, "");

    return obj;
};
