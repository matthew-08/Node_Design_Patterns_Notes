class BasePet {
    constructor(name) {
        this.name = name
    }
}

class DogPet extends BasePet {
    constructor(name, collar) {
        super(name)
    }
}

console.log(Object.getPrototypeOf(new BasePet()) == BasePet.prototype)