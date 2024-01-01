const sleep = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, timeout ?? 0)
    })
}

module.exports = sleep