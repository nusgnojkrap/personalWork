/* changed */
class Concurrentqueue {
    constructor(SCVlength) {
        this.queue = [];
        this.SCV = [];
        for (let i = 0; i < SCVlength; i++) {
            this.SCV[i] = true;
        }
    }

    qpush(active) {
        this.queue.push(active);
        this.queue2SCV();
    }

    queue2SCV() {
        let active = this.queue.shift();
        for (let i = 0; i < this.SCV.length; i++) {
            if (this.SCV[i] == true) {
                this.SCV[i] = false;
                return this.SCVprocess(i);
            }
        }
    }

    async SCVprocess(idx) {
        while (true) {
            if (this.queue.length > 0) {
                let func = this.queue.shift();
                await func();
            } else {
                this.SCV[idx] = true;
                return;
            }
        }
    }
}

module.exports.Concurrentqueue = Concurrentqueue;
