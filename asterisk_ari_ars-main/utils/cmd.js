var exec = require("child_process").exec,
    child;

const logger = require("./../utils/logger");
var path = require("path");
var jsName = path.basename(__filename);

module.exports = function (data) {
    logger.info(jsName, "-----------------------------------------");
    logger.info(jsName, "cmd start");
    logger.info(jsName, "-----------------------------------------");
    logger.info(jsName, "");
    var child;

    try {
        child = exec(data, function (error, stdout, stderr) {
            logger.info(jsName, "-----------------------------------------");
            logger.info(jsName, "stdout : " + stdout);
            logger.info(jsName, "stderr : " + stderr);
            logger.info(jsName, "-----------------------------------------");
            logger.info(jsName, "");
            if (error !== null) {
                logger.error(jsName, "-----------------------------------------");
                logger.error(jsName, "exec error : " + error);
                logger.error(jsName, "-----------------------------------------");
                logger.error(jsName, "");
            }
        });
    } catch (err) {
        logger.error(jsName, "-----------------------------------------");
        logger.error(jsName, "try - catch error");
        logger.error(jsName, "-----------------------------------------");
        logger.error(jsName, "");
    }
};
