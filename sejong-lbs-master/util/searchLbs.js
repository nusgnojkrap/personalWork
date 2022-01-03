const net = require("net");
const iconv = require("iconv-lite");
const logger = require("./logger");
const path = require("path");
const LBSCONNECT = require("../config/const").LBSCONNECT;

let jsName = path.basename(__filename);

function fetchLBS(ani_num, channel) {
    return new Promise(function (resolve, reject) {
        const Id = "sejongdr2";
        const pwd = "sejongdr2";
        const telnum = ani_num;

        let reQuireAddress = Id + "#" + pwd + "#" + telnum;
        logger.info(jsName, channel, `[${telnum}] Request Body : ${reQuireAddress}`);

        let client;
        try {
            client = net.connect(LBSCONNECT, () => client.write(reQuireAddress));
            logger.info(jsName, channel, `[${telnum}] LBS Socket Connected`);

            client.on("data", function (data) {
                const strContents = new Buffer.from(data);
                logger.info(jsName, channel, `[${telnum}] Receive Data : ${iconv.decode(strContents, "EUC-KR").toString()}`);
                const lbsData = iconv.decode(strContents, "EUC-KR").toString().split("#");
                const lData = {
                    a: lbsData[2].substr(0, 2) + "." + lbsData[2].substr(2, 6),
                    b: lbsData[3].substr(0, 3) + "." + lbsData[3].substr(3, 6),
                };
                if (lData.a && lData.b) {
                    logger.info(jsName, channel, `[${telnum}] Return Data : ${lData.a} ,${lData.b}`);
                    resolve(lData);
                } else if (!lData) {
                    logger.info(jsName, channel, `[${telnum}] Return Data : ${lData} - noLbs`);
                    resolve("noLbsData");
                }
            });
            client.on("end", function () {
                logger.info(jsName, channel, `[${telnum}] 클라이언트가 서버에서 연결 해제되었습니다.`);
            });
            client.on("error", function (err) {
                logger.info(jsName, channel, `[${telnum}] Error ouccured : ${JSON.stringify(err)}`);
            });
            client.on("timeout", function () {
                logger.info(jsName, channel, `[${telnum}] 소켓 타임아웃`);
            });
            client.on("close", function () {
                logger.info(jsName, channel, `[${telnum}] 소켓 닫힘`);
            });
            client.setTimeout(9000, function () {
                client.end(`[lbs.js][${telnum}]idle time, disconnecting..`);
            });
        } catch (err) {
            logger.error(jsName, channel, `[${telnum}] LBS Querry Error`);
            client.end(`[lbs.js][${telnum}]idle time, disconnecting..`);
            process.exit(0);
            return;
        }
    });
}

module.exports = fetchLBS;
