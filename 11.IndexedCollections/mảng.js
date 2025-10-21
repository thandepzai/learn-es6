const arr = Array.of(9.3, 9.4); // [9.3]
console.log("🚀 ~ arr:", arr);
console.log(`🚀 ~ arr["length"]:`, arr["length"]);

const arr2 = [];
arr2[3.4] = "Oranges";
arr2["hu"] = 1;
console.log("🚀 ~ arr2.length:", arr2.length);
console.log(Object.hasOwn(arr2, 3.4)); // true
// → Không tạo phần tử mảng mà là **thuộc tính object**.
console.log("🚀 ~ arr2[3.4]:", arr2[3.4]);
console.log(`🚀 ~ arr2["hu"]:`, arr2["hu"]);

const cats = ["Dusty", "Misty", "Twiggy"];
console.log("cats.length:", cats.length);
cats.length = 1;
console.log("🚀 ~ cats:", cats);
cats.length = 0;
console.log("🚀 ~ cats:", cats);

const arr5 = [1, 2, 3];
arr5.owner = "Cu Than";
console.log(arr5.owner); // "Cu Than"

