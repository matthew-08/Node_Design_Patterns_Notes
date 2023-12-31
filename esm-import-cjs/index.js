import { errorMonitor } from 'events'
import bar from './test/cjs-module.js'

console.log(bar)
process.on('uncaughtException', (err) => {
    try {
        
    } catch (error) {
        console.error(err)
    }
    process.exit(1)
})

const nestedFunc = () => {
    throw new Error('hello')
}

const func = () => {
    try {
        nestedFunc()
    } catch (error) {
        console.error(error)
    }
    console.log(poop.fakeprop)
}

func()

console.log('test')

