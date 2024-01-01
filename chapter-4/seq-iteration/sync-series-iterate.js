// synchronous
function iterateSeries (collection, iteratorCallback, finalCallback) {
    
    let index = 0

    const results = []
    const iterate = () => {
        const item = collection[index]
        const result = iteratorCallback(item)
        results.push(result)
        index++
        if (index === collection.length) {
            finalCallback()
            return results
        }
        iterate()
    } 
    iterate()
    return results
}


const numbers = [1,2,3,4,5]

function asyncAddition (n) {
   return [n, n + 1, n + 2]
}
console.log(iterateSeries(numbers, asyncAddition, () => console.log('Iteration complete')))