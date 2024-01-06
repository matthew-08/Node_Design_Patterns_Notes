
const func1 = () => console.log(1)
const func2 = () => console.log(2)
const func3 = () => console.log(3)

const test = [func1, func2, func3]

test.reduce((p, f) => p.then(f), Promise.resolve())