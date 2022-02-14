const { LoggerStack } = require("./stack");
let logger = new LoggerStack("./log/", "test");

logger.insert("안녕하세요 박종선입니다");
