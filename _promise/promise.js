class HPromise {
    static PENDING = "pending";
    static FULFILLED = "fulfilled";
    static REJECTED = "rejected";

    // executor 执行者
    constructor(executor) {
        this.status = HPromise.PENDING;
        this.value = null;
        this.callbacks = [];
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (err) {
            this.reject(err);
        }
    }

    resolve(value) {
        if (this.status === HPromise.PENDING) {
            this.value = value;
            this.status = HPromise.FULFILLED;
            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onFulfilled(value);
                })
            })
        }
    }

    reject(reason) {
        if (this.status === HPromise.PENDING) {
            this.status = HPromise.REJECTED;
            this.value = reason;
            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onRejected(reason);
                })
            })
        }
    }

    then(onFulfilled = () => {}, onRejected = () => {}) {
        if (this.status === HPromise.PENDING) {
            this.callbacks.push({
                onFulfilled: value => {
                    onFulfilled(value)
                },
                onRejected: value => {
                    onRejected(value);
                }
            });
        }
        if (this.status === HPromise.FULFILLED) {
            setTimeout(() => {
                try {
                    onFulfilled(this.value);
                } catch (err) {
                    onRejected(err);
                }
            })
        }
        if (this.status === HPromise.REJECTED) {
            setTimeout(() => {
                try {
                    onRejected(this.value);
                } catch (err) {
                    onRejected(err);
                }
            })
        }
    }
}