function makeRangeIterator(start, end, step) {
  let nextIndex = start;
  return {
    next() {
      if (nextIndex < end) {
        const result = { value: nextIndex, done: false };
        nextIndex += step;
        return result;
      }
      return { value: undefined, done: true };
    },
  };
}

const it = makeRangeIterator(1, 5, 1);
console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: 2, done: false }
console.log(it.next()); // { value: 3, done: false }
console.log(it.next()); // { value: undefined, done: true }

const myIterable = {
  *[Symbol.iterator]() {
    yield 10;
    yield 20;
    yield 30;
  },
};

for (const value of myIterable) {
  console.log(value); // 10, 20, 30
}


function* countUpTo3() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = countUpTo3();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
console.log(gen.next()); // { value: undefined, done: true }


function* example() {
  const name = yield "Nhập tên của bạn:";
  console.log("Xin chào", name);
}

const gen2 = example();
console.log(gen2.next().value);  // "Nhập tên của bạn:"
gen2.next("Thân");   // "Xin chào Thân"


function* genA() {
  yield 1;
  yield 2;
}

function* genB() {
  yield* genA();
  yield 3;
}

for (const val of genB()) {
  console.log(val); // 1, 2, 3
}