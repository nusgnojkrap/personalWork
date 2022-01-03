import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

let alignColorsAndTime = winston.format.combine(
    winston.format.colorize({
        all: true,
    }),
    winston.format.label({
        label: "[LOGGER]",
    }),
    winston.format.timestamp({
        format: "YYYY-MM-DD HH:MM:SS",
    }),
    // winston.format.printf((info) => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`)
    winston.format.printf((info) => `[${info.timestamp}] | [${info.level}] | ${info.message}`)
);

let notalignColorsAndTime = winston.format.combine(
    winston.format.label({
        label: "[LOGGER]",
    }),
    winston.format.timestamp({
        format: "YYYY-MM-DD HH:MM:SS",
    }),
    winston.format.printf((info) => `[${info.timestamp}] | [${info.level}] | ${info.message}`)
);

const logger = winston.createLogger({
    level: "debug",
    transports: [
        new winstonDaily({
            filename: "logs/nosterisk",
            zippedArchive: true,
            format: winston.format.combine(notalignColorsAndTime),
        }),

        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), alignColorsAndTime),
        }),
    ],
});

export default logger;
