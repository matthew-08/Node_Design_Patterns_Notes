require('./a.js')

const { incrementValueInB, value } = require('./b.js')

console.log('value in index', value)
console.log('increment in index', incrementValueInB())
console.log('finished in index ->', value)

