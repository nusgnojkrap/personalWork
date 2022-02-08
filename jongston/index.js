const { LoggerQueue } = require("./queue");
let logger = new LoggerQueue("./log/", "test");

logger.insert("안녕하세요 박종선입니다");
