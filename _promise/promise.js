class HPromise {
    static PENDING = "pending";
    static FULFILLED = "fulfilled";
    static REJECTED = "rejected";

    // executor 执行者
    constructor(executor) {
        this.status = HPromise.PENDING;
        this.value = null;
        executor(this.resolve.bind(this), this.reject.bind(this));
    }

    resolve(value) {
        // 直接调用executor 这里的this并非当前对象，而是window
        this.value = value;
        this.status = HPromise.FULFILLED;
    }

    reject(reason) {
        this.status = HPromise.REJECTED;
        this.value = reason;
    }
}