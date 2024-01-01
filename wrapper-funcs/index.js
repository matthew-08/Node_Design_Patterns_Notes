const sleep = require('./sleepify')
const fs = require('fs')

const ajaxCall = async (cb) => {
    let asyncData = null
    await sleep(1000)
    asyncData = { data: { wow: 1 } }
    cb(asyncData)
}

const logFile = (err, data) => console.log(data.toString())
fs.readFile('./test.txt', (err, data) => {

})
// ignorant
ajaxCall((data) => console.log(data))



// enlightened
function filter  (userCallback, array ) {
  for ( let i = 0; i <= array.length; i++ ) {
    userCallback(array[i])
  }

}