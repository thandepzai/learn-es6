const sayings = new Map();
sayings.set("dog", "woof");
sayings.set("cat", "meow");
sayings.set("elephant", "toot");

console.log("sayings.size: ", sayings.size);
console.log("sayings.get: ", sayings.get("dog"));
console.log("sayings.has: ", sayings.has("dog"));
sayings.delete("dog");
console.log("sayings.delete-dog: ", sayings);
console.log("sayings.keys: ", sayings.keys());
for (const key of sayings.keys()) {
  console.log(key);
}
console.log("sayings.values: ", sayings.values());
for (const value of sayings.values()) {
  console.log(value);
}
console.log("sayings.entries: ", sayings.entries());
for (const entrie of sayings.entries()) {
  console.log(entrie);
}
sayings.forEach((value, key) => {
  console.log("value:", value);
  console.log("key:", key);
});

console.log("=====Key không phải string=====");
const objKey = { id: 1 };
const fKey = () => {};
const map = new Map();
map.set(objKey, "object value");
map.set(fKey, "function value");
console.log(map.get(objKey));

console.log("====Set====");
const s = new Set();
const s2 = new Set([4, 5, 6]);

s.add(4);
console.log("🚀 ~ s.add(4):", s.size);
console.log("🚀 ~ s.has(value):", s.has(4));
console.log("🚀 ~ s.delete(value):", s.delete(4));
console.log("🚀 ~ s.size:", s.size);

const s3 = new Set(["a", "b", "c"]);

for (const key of s3.keys()) {
  console.log("key:", key);
}

for (const value of s3.values()) {
  console.log("value:", value);
}

console.log("Key và value luôn giống nhau");
const uniqueArr = Array.from(s3);
console.log("🚀 ~ uniqueArr:", uniqueArr);

console.log("===== WeakMap =====");
console.log(
  "WeakMap là một “Map đặc biệt” chỉ cho phép object làm key, và key trong đó được giữ một cách yếu (weak reference)."
);
let obj = { name: "Alice" };
const weakMap = new WeakMap();

weakMap.set(obj, "some private data");
console.log(weakMap.get(obj));
obj = null;
console.log(weakMap.get(obj));


console.log("===== WeakSet =====");
console.log("Nếu element el bị xóa khỏi DOM, GC sẽ dọn nó → WeakSet tự bỏ luôn → không tốn RAM.")
let user = { name: "Alice" };
const seen = new WeakSet();

seen.add(user);
console.log(seen.has(user));
user = null; // GC có thể dọn object Alice
console.log(seen.has(user));
