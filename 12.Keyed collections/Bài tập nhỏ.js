function addScore(map, studentObj, score) {
  map.set(studentObj, score);
}

function getScore(map, studentObj) {
  return map.get(studentObj);
}

const map = new Map();
const object1 = { id: 1, name: "Thân" };
addScore(map, object1, 12);
console.log("🚀 ~ getScore(map, object1):", getScore(map, object1));

function uniquePreserveOrder(arr) {
  const arrSet = new Set(arr);
  let string = "";
  for (const key of arrSet.keys()) {
    string += key;
  }
  return string;
}

const arr = "1112223334445555";
console.log(uniquePreserveOrder(arr));

function uniquePreserveOrder2(arr) {
  return Array.from(new Set(arr)).join("");
}
const arr2 = "1112223334445555";
console.log(uniquePreserveOrder2(arr2));


// const seen = new WeakSet();

// function process(node) {
//   if (seen.has(node)) {
//     console.log("⏩ Node này đã xử lý rồi:", node);
//     return;
//   }

//   console.log("✅ Xử lý node:", node);
//   seen.add(node);

//   // ... thực hiện logic xử lý node, ví dụ:
//   node.classList.add("processed");
// }
// const div1 = document.createElement("div");
// const div2 = document.createElement("div");

// process(div1); // ✅ Xử lý lần đầu
// process(div2); // ✅ Xử lý lần đầu
// process(div1); // ⏩ Node này đã xử lý rồi