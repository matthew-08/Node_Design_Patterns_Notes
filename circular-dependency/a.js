const { incrementValueInB, value } = require('./b')
console.log('loaded in a ->', value)
console.log('increment in A', incrementValueInB())
console.log('increment in A', incrementValueInB())
console.log('increment in A', incrementValueInB())
console.log('Finished in a ->', value)
