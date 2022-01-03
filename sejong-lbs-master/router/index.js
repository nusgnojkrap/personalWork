const logger = require("../util/logger");
const path = require("path");
const LBSSEARCH = require("../config/const").LBSSEARCH;
const lbs = require("../util/searchLbs");
const myTimeout = require("../util/timeOut");
const kakao = require("../util/kakao");

let jsName = path.basename(__filename);

const handler = (context) => {
    context.onEvent("variables").then(async (result) => {
        const channel = result.agi_channel;
        const callerID = result.agi_callerid;
        const serviceCase = result.agi_arg_1;

        logger.info(jsName, channel, `[${callerID}] has logged in. `);

        switch (serviceCase) {
            case LBSSEARCH:
                myTimeout(12000, context);
                const data = await lbs(callerID, channel);
                clearTimeout(myTimeout);
                logger.info(jsName, channel, `[${callerID}] data result : ${JSON.stringify(data)}`);
                myTimeout(12000, context);
                const newdata = await kakao(data.b, data.a, callerID, channel);
                clearTimeout(myTimeout);
                logger.info(jsName, channel, `[${callerID}] newdata result : ${JSON.stringify(newdata)}`);
                break;

            default:
                break;
        }

        return context.end();
    });
};

module.exports = handler;
