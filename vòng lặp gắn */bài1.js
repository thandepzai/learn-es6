// 1. Viết **iterator thủ công** duyệt qua mảng `["a", "b", "c"]`.

function readArray(arr) {
  let index = 0;
  return {
    next() {
      if (index < arr.length) {
        return { value: arr[index++], done: false };
      }
      return { value: undefined, done: true };
    },
  };
}

const arr = ["a", "b", "c"];
const read = readArray(arr);
console.log(read.next());
console.log(read.next());
console.log(read.next());
console.log(read.next());

function readArray(arr) {
  let index = 0;
  return {
    next() {
      if (index < arr.length) return { value: arr[index++], done: false };
      return { done: true };
    },
    [Symbol.iterator]() {
      // Để xác định rằng hàm này là iterator
      return this; // chính object này là iterator luôn
    },
  };
}
console.log(readArray(["a", "b", "c"]));
for (const item of readArray(["a", "b", "c"])) {
  console.log(item);
} // Không hiểu thì hỏi chat gpt

/* Có thể tưởng tượng như JS làm ngầm thế này:
const iterable = readArray(["a", "b", "c"]);
const iterator = iterable[Symbol.iterator]();

while (true) {
  const result = iterator.next();
  if (result.done) break;
  const item = result.value;
  console.log(item);
}
 */