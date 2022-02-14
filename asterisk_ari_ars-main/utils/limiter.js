class MyQueueClass {
    constructor() {
        this.concurrentQueue = []; //무한대로 쌓이는 큐
        this.SCV = []; // 최대 동시 허용량
        for (let i = 0; i < 3; i++) {
            this.SCV[i] = true;
        }
    }

    async queue2SCV() {
        while (this.concurrentQueue.length != 0) {
            for (let i = 0; i < this.SCV.length; i++) {
                if (this.SCV[i] == true && this.concurrentQueue.length != 0) {
                    //사용
                    this.SCV[i] = false;
                    console.log(this.concurrentQueue.length);
                    let func = this.concurrentQueue.shift();
                    await func();
                    this.SCV[i] = true;
                }
            }
        }
    }
}
module.exports.MyQueueClass = MyQueueClass;
