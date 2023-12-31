function ConstructorFunc (instanceVal) {
    this.instanceVal = instanceVal
}

ConstructorFunc.prototype.method = function () {
    return this.instanceVal
}

const obj = new ConstructorFunc(2)

class ClassAlternative {
    constructor (instanceVal) {
        this.instanceVal = instanceVal
    }

    method() {
        return this.instanceVal
    }
}

const obj2 = new ClassAlternative(2)

console.log(obj.method(), obj2.method())