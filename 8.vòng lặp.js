// Vòng lặp for
for (let i = 0; i < 5; i++) {
  console.log(`Lần lặp thứ ${i}`);
}

let sum = 10;
for (; sum <= 100; ) {
  sum += sum; // Tương đương sum = sum + i
}
console.log(sum); // Kết quả: 160

let sum1 = 1;
for (;;) {
  sum1++;
  if (sum1 > 10) break; // Dừng vòng lặp khi sum1 > 10
}
console.log(sum1); // Kết quả: 11

// Vòng lặp do ... while
// Câu do...while lệnh lặp lại cho đến khi điều kiện được chỉ định đánh giá là sai.
let count = 0;
do {
  count++;
} while (count < 5);
console.log(count); // Kết quả: 5

// Vòng lặp while
// Câu lệnh while lặp lại cho đến khi điều kiện được chỉ định đánh giá là sai.
let total = 0;
while (total < 5) {
  total++;
}
console.log(total); // Kết quả: 5

// Câu lệnh có nhãn (Labeled Statement)
// Một nhãn (label) là tên định danh mà bạn gắn cho một câu lệnh, thường là vòng lặp.
// Sau đó, bạn có thể tham chiếu lại nhãn đó trong break hoặc continue.

// labelName:
//   statement;
// labelName: là tên nhãn (một định danh hợp lệ, không trùng với từ khóa).
// statement: là bất kỳ câu lệnh hợp lệ nào (thường là for, while, hoặc block {}).

// Khi nào cần nhãn?
// Nhãn thường dùng trong vòng lặp lồng nhau (nested loops),
// khi bạn muốn break hoặc continue một vòng lặp bên ngoài, chứ không phải vòng trong.

// Nhãn cho vòng lặp bên ngoài
outerLoop: for (let i = 0; i < 3; i++) {
  // Nhãn cho vòng lặp bên trong
  innerLoop: for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outerLoop; // Dừng vòng lặp bên ngoài khi i=1 và j=1
    }
    console.log(`i = ${i}, j = ${j}`);
  }
}
// Kết quả:
// i = 0, j = 0
// i = 0, j = 1
// i = 0, j = 2
// i = 1, j = 0

// Lưu ý:
// - Nhãn nên được sử dụng cẩn thận vì chúng có thể làm mã khó đọc hơn.
// - Không nên lạm dụng nhãn trong các tình huống đơn giản, chỉ dùng khi thực sự cần thiết.
// - Nhãn chỉ ảnh hưởng đến break và continue, không ảnh hưởng đến các câu lệnh khác trong vòng lặp.
// - Tên nhãn phải là định danh hợp lệ và không trùng với từ khóa (for, if, do,...) của JavaScript.
// - Nhãn có thể được đặt cho bất kỳ câu lệnh nào, không chỉ vòng lặp, nhưng thường dùng nhất là với vòng lặp.
// - Khi sử dụng nhãn, hãy đảm bảo rằng mã vẫn dễ đọc và bảo trì.





// Câu lệnh break
// Sử dụng breakcâu lệnh để kết thúc vòng lặp switchhoặc kết hợp với câu lệnh có nhãn.
// Khi bạn sử dụng breakmà không có nhãn, nó sẽ kết thúc phần bao quanh trong cùng while, do-while, for, hoặc switchngay lập tức và chuyển quyền điều khiển sang câu lệnh theo sau.
// Khi bạn sử dụng breakwith a label, nó sẽ chấm dứt câu lệnh có nhãn đã chỉ định.
//Cú pháp:
// break;
// break [labelName];
// labelName: là tên nhãn (một định danh hợp lệ, không trùng với từ khóa).

for (let i = 0; i < 5; i++) {
  if (i === 3) break;
}

let x = 0;
let z = 0;
labelCancelLoops: while (true) {
  console.log("Outer loops:", x);
  x += 1;
  z = 1;
  while (true) {
    console.log("Inner loops:", z);
    z += 1;
    if (z === 10 && x === 10) {
      break labelCancelLoops;
    } else if (z === 10) {
      break;
    }
  }
}



// Câu lệnh continue
// Câu lệnh này continue có thể được sử dụng để khởi động lại câu lệnh while, do-while, for, hoặc label .
// Khi bạn sử dụng continue mà không có nhãn, nó sẽ khởi động lại phần bao quanh trong cùng while, do-whilehoặc forngay lập tức và chuyển quyền điều khiển đến lần lặp tiếp theo của vòng lặp.
// Khi bạn sử dụng continue với a label, nó sẽ khởi động lại câu lệnh có nhãn đã chỉ định.
// Cú pháp:
// continue;
// continue [labelName];
// labelName: là tên nhãn (một định danh hợp lệ, không trùng với từ khóa).

for (let i = 0; i < 5; i++) {
  if (i === 3) continue;
  console.log(i); // Kết quả: 0, 1, 2, 4
}

let m = 0;
let n = 0;
outerLabel: while (m < 3) {
  console.log("Outer loop:", m);
  m++;
  n = 0;
  innerLabel: while (n < 3) {
    if (n === 1) {
      continue outerLabel; // Bỏ qua phần còn lại của vòng lặp bên ngoài khi n=1
    }
    console.log(" Inner loop:", n);
    n++;
  }
}
// Kết quả:
// Outer loop: 0
//  Inner loop: 0
// Outer loop: 1
//  Inner loop: 0
// Outer loop: 2
//  Inner loop: 0 


// For...in
// Câu lệnh for...in lặp lại qua các thuộc tính có thể liệt kê của một đối tượng.
// Cú pháp:
// for (variable in object) {
//   // code to be executed
// }
// variable: là tên biến sẽ nhận tên thuộc tính hiện tại trong mỗi lần lặp.
// object: là đối tượng mà bạn muốn lặp qua các thuộc tính của nó.

const person = { fname: "John", lname: "Doe", age: 25 };

for (let key in person) {
  console.log(key + ": " + person[key]);
}
// Kết quả:
// fname: John
// lname: Doe
// age: 25

const arr = [10, 20, 30];
for (let index in arr) {
  console.log(index + ": " + arr[index]);
}
// Kết quả:
// 0: 10
// 1: 20
// 2: 30

// Lưu ý:
// - for...in lặp qua tất cả các thuộc tính có thể liệt kê, bao gồm cả thuộc tính kế thừa.
// - Thứ tự lặp không được đảm bảo, vì vậy không nên dựa vào thứ tự này.
// - for...in thường được sử dụng để lặp qua các đối tượng, không nên dùng cho mảng nếu cần thứ tự cụ thể. Sử dụng for hoặc for...of thay thế trong trường hợp đó.

// For...of
// Câu lệnh for...of lặp lại qua các giá trị có thể lặp của một đối tượng.
// Cú pháp:
// for (variable of iterable) {
//   // code to be executed
// }
// variable: là tên biến sẽ nhận giá trị hiện tại trong mỗi lần lặp.
// iterable: là đối tượng có thể lặp như mảng, chuỗi, Map, Set, v.v.


for (let value of arr) {
  console.log(value);
}
// Kết quả:
// 10
// 20
// 30

// Lưu ý:
// - for...of chỉ lặp qua các giá trị của iterable, không bao gồm các thuộc tính kế thừa.
// - Thứ tự lặp được đảm bảo theo thứ tự của iterable.
// - for...of thường được sử dụng để lặp qua mảng và các cấu trúc dữ liệu khác có thể lặp được.




/*
 - For...in lặp qua các thuộc tính có thể liệt kê của một đối tượng (keys).
 - For...of lặp qua các giá trị có thể lặp của một đối tượng (values).
 - For...in không đảm bảo thứ tự, trong khi For...of đảm bảo thứ tự theo iterable.
        (const obj = { b: 1, a: 2, c: 3 };

        for (const key in obj) {
        console.log(key);
        }
        Kết quả có thể là: b, a, c (không theo thứ tự)
        const arr2 = [3, 1, 2];

        for (const value of arr2) {
        console.log(value);
        }
        Kết quả luôn là: 3, 1, 2 (theo thứ tự trong mảng)
        )


 - For...in có thể dùng cho đối tượng, For...of thường dùng cho mảng và iterable khác (mảng, chuỗi, Map, Set,...) và không sử dụng được cho object.
*/

//  - For...in có thể lặp qua thuộc tính kế thừa, For...of không lặp qua thuộc tính kế thừa.
const parent = { a: 1 };
const child = Object.create(parent);
child.b = 2;

for (const key in child) {
  console.log(key);
}
// Kết quả: b, a (lặp qua thuộc tính kế thừa)

for (const value of Object.values(child)) {
  console.log(value);
}
// Kết quả: 2 (không lặp qua thuộc tính kế thừa)