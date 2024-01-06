const PENDING = 0
const FULFILLED = 1
const REJECTED = 2


function CustomPromise(exectuor) {
    let state = PENDING
    let value = null
    let handlers = []
    let catchers = []

    function resolve (result) {
        if (state !== PENDING) {
            return
        }

        state = FULFILLED
        value = result

        handlers.forEach((h) => h(value))
    }

    function reject (err) {
        if (state !== PENDING) {
            return
        }

        state = REJECTED
        value = err

        catchers.forEach((c) => c(err))
    }

    this.then = function (callback) {
        if (state === FULFILLED) {
            callback(value)
        } else {
            handlers.push(callback)
        }
    }


    exectuor(resolve, reject)

}

const doWork = (res, rej) => {
    setTimeout(() => {
        res("HELLO")
    }, 1000)
}

const someText = new CustomPromise(doWork)
const realPromise = new Promise(doWork)
someText
    .then((r) => console.log(r))

realPromise
    .then((r) => console.log('real promise', r))
    .then((w) => new CustomPromise(doWork))
    .then((w) => console.log('amazing'))




