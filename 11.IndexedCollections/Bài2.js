// **Bài 2:** Tạo mảng 2 chiều 3x3, trong đó phần tử = tổng của `i + j`.

const arr = [[], [], []];

for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    arr[i - 1][j - 1] = i + j;
  }
}
console.log("🚀 ~ arr:", arr);

const arr2 = Array.from({ length: 3 }, (_, i) =>
  Array.from({ length: 3 }, (_, j) => i + j + 2)
);
console.log("🚀 ~ arr2:", arr2);
