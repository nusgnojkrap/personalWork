const { jongston } = require("./jongston");

class LoggerQueue {
    constructor(filepath, filename) {
        this.logger = [];
        this.start = false;
        this.currentLogger = null;

        this.filepath = filepath;
        this.filename = filename;
    }

    pop() {
        this.currentLogger = this.logger.pop();
    }

    process() {
        return new Promise(async (resolve) => {
            while (true) {
                if (this.logger.length === 0) {
                    this.start = false;
                    return resolve();
                } else {
                    this.pop();
                    await jongston(this.filepath, this.filename, this.currentLogger);
                }
            }
        });
    }

    insert(logger) {
        this.logger.push(logger);

        if (this.start) {
        } else {
            this.start = true;
            this.process();
        }
    }
}

module.exports.LoggerQueue = LoggerQueue;
