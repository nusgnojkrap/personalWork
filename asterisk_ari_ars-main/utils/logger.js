const winston = require("winston");
require("winston-daily-rotate-file");
require("date-utils");

const logger = winston.createLogger({
    level: "debug",
    transports: [
        new winston.transports.DailyRotateFile({
            filename: "logs/ari_log",
            zippedArchive: true,
            format: winston.format.printf((info) => `${new Date().toFormat("YYYY-MM-DD HH24:MI:SS")}\t|\t${info.message}`),
        }),
        new winston.transports.Console({
            format: winston.format.printf((info) => `${new Date().toFormat("YYYY-MM-DD HH24:MI:SS")}\t|\t${info.message}`),
        }),
    ],
});

module.exports.info = function (jsName, msg) {
    logger.info(`${jsName}\t|\t${msg}`);
};

module.exports.error = function (jsName, msg) {
    logger.error(`${jsName}\t|\t${msg}`);
};
