import fs from "fs";
import reader from "xlsx";

let obj = {};

function readFile() {
    let buffer = fs.readFileSync("C:/Users/admin/Desktop/autoExcel/data/mytext.txt").toString("utf-8");
    let splitArr = buffer.split("\r\n");

    splitArr.map((val) => {
        let phoneNumber = val
            .match(/[+[\d]+]+/g)[1]
            .replace("[", "")
            .replace("]", "");
        obj[phoneNumber] == undefined ? (obj[phoneNumber] = []) : null;

        if (val.includes("Request") || (val.includes("Receive") && val.includes("lbs.js"))) {
            obj[phoneNumber].push(val);
        }
    });
}

function obj2Excel() {
    let result = {
        requestTime: "",
        responseTime: "",
        telecom: "",
        latitude: "",
        hardness: "",
        timestamp: "",
        position: "",
        cell: "",
    };
    let idx = 1;

    let sendArr = [];

    Object.keys(obj).map((key) => {
        let arr = obj[key];

        arr.map(async (value) => {
            if (value.includes("Request")) {
                // 초기화
                result = objectReset(result);
                result.requestTime = value
                    .match(/[+[\d\-\ \:]+]+/g)[0]
                    .replace("[", "")
                    .replace("]", "");
            } else if (value.includes("Receive")) {
                result.responseTime = value
                    .match(/[+[\d\-\ \:]+]+/g)[0]
                    .replace("[", "")
                    .replace("]", "");
                let data = value.match(/:+[\ ]+[\d\w\ \#\가-힣]+/g)[0].split("#");
                result.telecom = data[1];
                result.latitude = data[2];
                result.hardness = data[3];
                result.timestamp = data[4];
                result.position = data[6];
                result.cell = data[7];

                if (result.cell != "" && result.cell != undefined) {
                    sendArr.push(createSendObj(result, idx++));
                }
            }
        });
    });

    goSave(sendArr);

    function objectReset(obj) {
        obj.requestTime = "";
        obj.responseTime = "";
        obj.telecom = "";
        obj.latitude = "";
        obj.hardness = "";
        obj.position = "";
        obj.timestamp = "";
        obj.cell = "";

        return obj;
    }

    function createSendObj(result, idx) {
        let requestTime = result.requestTime.split(" ")[1];
        let responseTime = result.responseTime.split(" ")[1];

        let changeTimeRequest = requestTime.split(":")[0];
        let changeTimeResponse = responseTime.split(":")[0];

        Number(changeTimeRequest) >= 12 ? (requestTime = requestTime.replace(changeTimeRequest, Number(changeTimeRequest - 12)) + " PM") : (requestTime = requestTime + " AM");
        Number(changeTimeResponse) >= 12 ? (responseTime = responseTime.replace(changeTimeResponse, Number(changeTimeResponse - 12)) + " PM") : (responseTime = responseTime + " AM");

        let sendResult = {
            NO: idx,
            통신사: result.telecom,
            요청시간: requestTime,
            응답시간: responseTime,
            소요시간: `=D${idx + 1} - C${idx + 1}`,
            위도: result.latitude,
            경도: result.hardness,
            타임스탬프: result.timestamp,
            주소: result.position,
            측위방식: result.cell,
            실제주소: "",
        };

        return sendResult;
    }

    function goSave(sendData) {
        const file = reader.readFile("C:/Users/admin/Desktop/autoExcel/data/sample.xlsx");
        const ws = reader.utils.json_to_sheet(sendData);
        reader.utils.book_append_sheet(file, ws, "Sheet2");
        reader.writeFile(file, "C:/Users/admin/Desktop/autoExcel/data/sample.xlsx");
    }
}

readFile();
obj2Excel();
