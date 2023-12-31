const { EventEmitter } = require('events')


const checkTimestamp = () => {
    const test = Date.now()
    if (test % 5 === 0) {
        throw new Error('Timestamp was divisible by 5')
    }
}

const ticker = (ms, callback) => {
    let remaining = ms
    let tickCounter = 1
    const emitter = new EventEmitter()
    process.nextTick(() => {
        try {
            emitter.emit('tick', 'first tick')
        } catch (error) {
            emitter.emit('err', error)
            callback(error)
        }
    })
    
    const tick = () => {
        setTimeout(() => {
            checkTimestamp()
            emitter.emit('tick', `Tick # ${tickCounter} \n ${remaining}ms remaining`)            
            remaining -= 50
            if (remaining >= 0) {
                tickCounter += 1
                tick()
            }
            else {
                callback(tickCounter)
            }
        }, 50)
    }
    try {
        tick()
    } catch (error) {
        emitter.emit('err', error)
        callback(error)
    }
    return emitter
}

const tickTest = ticker(3000, (count) => console.log(`Ticked ${count} times `))

tickTest.on('tick', (tick) => console.log(tick))