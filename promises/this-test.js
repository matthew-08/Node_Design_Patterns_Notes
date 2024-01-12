class AnotherClass {
  constructor(func) {
    this.func = func;
    this.val = 4;
  }
}

class ThisClass {
  constructor() {
    const func = () => console.log(this.val);
    this.val = 2;
    new AnotherClass(func).func();
  }
}

const test = new ThisClass();

function RegularFunction() {
  this.value = 42;
  this.method = function () {
    setTimeout(function () {
      // In a regular function, `this` refers to the global object or undefined in strict mode.
      console.log(this.value); // undefined (or the global object in non-strict mode)
    }, 1000);
  };
}

function ArrowFunction() {
  this.value = 42;
  this.method = function () {
    setTimeout(() => {
      // In an arrow function, `this` retains the value from the enclosing context.
      console.log(this.value); // 42
    }, 1000);
  };
}

const a = new RegularFunction();
a.method();
