const express = require("express");
const bodyParser = require("body-parser");

var logger = require("./utils/logger");
var path = require("path");
var jsName = path.basename(__filename);

const ariService = require("./services/ariService");
const { stringify } = require("querystring");
const { concurrentQueue, MyQueueClass } = require("./utils/limiter");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//parameter
//ID
//password
//context
//extension
//priority
//수신자번호    calledId
//발신자번호    callerId

app.post("/", function (req, res) {
    let myQueue = new MyQueueClass();
    //동기로 자신의 active 실행 -> 끝날 떄 까지 기다려짐 왜냐면 동기닌깐
    //기다리다가 끝나면 return 해당 유저에게

    async function myFunc(callback) {
        await mySetTimeout();
        callback();
        return "end";
    }

    function mySetTimeout() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 10000);
        });
    }

    let a = myFunc.bind(null, function () {
        console.log("end");
    });

    myQueue.concurrentQueue.push(a);
    myQueue.queue2SCV();
});

app.listen(3000);
