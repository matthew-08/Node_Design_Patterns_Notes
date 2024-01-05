
class Wrapper {
    constructor(value) {
        this.value = value
    }
    map(f) {
        return new Wrapper(f(this.value))
    }
}

const wrapper = new Wrapper(2)

const newWrapper = wrapper.map((e) => e + 5)
console.log(newWrapper)