// We want to have a total variable that is subscribed to quantity / price

// Quantity needs to have a dependency class which is responsible for storing
// its subscribers and notifying it of changes.

// Price needs to have one as well.

let target: ((...args: unknown[]) => unknown) | null = null;

class Dep {
  private subscribers: ((...args: unknown[]) => unknown)[];

  subscribe(cb: (...args: unknown[]) => unknown) {
    if (target && !this.subscribers.includes(target))
      this.subscribers.push(target);
  }
  notify<T>(...args: T[]) {
    this.subscribers.forEach((s) => s(...args));
  }
}

const reactiveObject = {
  price: 2,
  quantity: 5,
};

Object.keys(reactiveObject).forEach((key) => {
  const internalValue = reactiveObject[key];

  const dep = new Dep();

  Object.defineProperty(reactiveObject, key, {
    get() {
      dep.subscribe();
    },
  });
});
