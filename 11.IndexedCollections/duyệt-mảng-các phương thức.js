const colors = ["red", "green", "blue"];
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}

colors.forEach((color) => console.log(color));

const arr = [1, 2, 3, 4, 5, 6];
arr.push(6);
console.log("🚀 ~ arr-push:", arr);
arr.pop();
console.log("🚀 ~ arr-pop:", arr);
arr.shift();
console.log("🚀 ~ arr-shift:", arr);
arr.unshift(2, 3, 4);
console.log("🚀 ~ arr-unshift:", arr);
arr.splice(0, 2, "A", "B");
console.log("🚀 ~ arr-splice:", arr);

const arr2 = arr.slice(1, 4);
console.log("🚀 ~ arr.slice:", arr2);
const arr3 = arr2.concat([9, 9, 9, 9]);
console.log("🚀 ~ arr3-concat:", arr3);
console.log("🚀 ~ arr3-at(-1):", arr3.at(-1));

console.log("🚀 ~ arr.indexOf(2):", arr.indexOf(2));
console.log("🚀 ~ arr.lastIndexOf(2):", arr.lastIndexOf(2));
console.log(
  "🚀 ~ Find:",
  arr.find((index) => index === 2)
);

const reduce = arr.reduce((prev, curr, index) => prev + curr);
console.log("🚀 ~ reduce:", reduce);

const reduceRight = arr.reduceRight((prev, curr) => prev + curr);
console.log("🚀 ~ reduceRight:", reduceRight);

arr.reverse();
console.log("🚀 ~ arr.reverse():", arr);
console.log("arr.join()", arr.join())
