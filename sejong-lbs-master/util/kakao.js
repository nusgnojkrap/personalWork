const axios = require("axios");
const logger = require("./logger");
const path = require("path");

let jsName = path.basename(__filename);

axios.defaults.timeout = 3000;
const REST_API_KEY = "6ec42a5672076bab2b0f25ad524dd04c";
const urldata = "https://dapi.kakao.com/v2/local/geo/coord2address.json";

function fetchkakao(lo01, la01, telnum, channel) {
    return new Promise(function (resolve, reject) {
        const urldata01 = urldata + "?x=" + lo01 + "&y=" + la01;
        logger.info(jsName, channel, `[${telnum}] kakao query value : ${urldata01}`);
        try {
            axios({
                method: "get",
                url: urldata01,
                headers: {
                    Authorization: "KakaoAK " + REST_API_KEY,
                },
                timeout: 3000,
            }).then(function (response) {
                if (response) {
                    logger.info(jsName, channel, `[${telnum}] Received  Data : ${JSON.stringify(response.data)}`);
                    resolve(response.data);
                } else if (!response) {
                    logger.info(jsName, channel, `[${telnum}] no data received !!!!!!!!`);
                    resolve("noReceiveKakaoData");
                }
            });
        } catch (err) {
            logger.info(jsName, channel, `[${telnum}] ${JSON.stringify(err)}`);
            return false;
        }
    });
}
module.exports = fetchkakao;
