class Example {
  private _internalState: string[] = [];
  constructor() {
    this._internalState = ['string-one', 'string-two'];
  }

  getInternalState() {
    return this._internalState;
  }
}

const ex = new Example();

const a = ex.getInternalState();

console.log(a); // get private state
a[0] = 'this state is not so private lol'; // change it

console.log(ex.getInternalState());
