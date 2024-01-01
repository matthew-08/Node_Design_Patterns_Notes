
const mockAsyncFunc = (cb) => {
    setTimeout(() => cb(), 1000)
}


function taskOne (cb) {
    mockAsyncFunc(() => {
        console.log('completed async operation 1')
        taskTwo(cb)
    })
}

function taskTwo (cb) {
    mockAsyncFunc(() => {
        console.log('completed async operation 2')
        taskThree(cb)
    })
}

function taskThree (cb) {
    mockAsyncFunc(() => {
        console.log('completed async operation 3')
        cb()
    })
}

taskOne(() => {
    console.log('All callbacks executed')
})