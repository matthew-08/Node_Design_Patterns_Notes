
const addCps = (numbers, callback) => {
    callback(numbers.reduce((a, b) => a + b, 0))
}

addCps([2, 5, 3, 20], (result) => console.log(`Result: ${result}`))