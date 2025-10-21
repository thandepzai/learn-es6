// **Bài 1:** Tạo một mảng gồm 10 số ngẫu nhiên (1–100)
// → Lọc ra các số chẵn, rồi tính tổng của chúng.

const arr = [];
for (let i = 0; i < 10; i++) {
  arr.push(Math.floor(Math.random() * 100) + 1);
}

const sum = arr.reduce((prev, curr) => {
  if (curr % 2 === 0) return prev + curr;
  return prev;
}, 0);

console.log("Mảng:", arr);
console.log("Tổng các số chẵn:", sum);
