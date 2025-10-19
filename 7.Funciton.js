// Hàm là một trong những khối xây dựng cơ bản trong JavaScript.
// Hàm trong JavaScript tương tự như một thủ tục—một tập hợp các câu lệnh thực hiện một tác vụ hoặc tính toán một giá trị,
// nhưng để một thủ tục đủ điều kiện là một hàm, nó phải nhận một số dữ liệu đầu vào và trả về một kết quả đầu ra có mối quan hệ rõ ràng giữa đầu vào và đầu ra.
// Để sử dụng một hàm, bạn phải định nghĩa nó ở đâu đó trong phạm vi mà bạn muốn gọi nó.

// Khai báo hàm
// Định nghĩa một hàm với từ khóa function, theo sau là tên hàm, danh sách tham số trong dấu ngoặc đơn và khối lệnh trong dấu ngoặc nhọn.
function square(number) {
  return number * number;
}

// Về cơ bản, các tham số được truyền cho hàm theo giá trị — do đó,
// nếu mã trong thân hàm gán một giá trị hoàn toàn mới cho tham số đã được truyền cho hàm,
// thì sự thay đổi đó sẽ không được phản ánh trên toàn cục hoặc trong mã gọi hàm đó .

function myFunc(theObject) {
  theObject.make = "Toyota";
}

const myCar = {
  make: "Honda",
  model: "Accord",
  year: 1998,
};

console.log(myCar.make); // "Honda"
myFunc(myCar);
console.log(myCar.make); // "Toyota"
// Trong ví dụ trên, hàm myFunc thay đổi thuộc tính make của đối tượng được truyền vào.
// Vì đối tượng được truyền theo tham chiếu, sự thay đổi này được phản ánh bên ngoài hàm.

function myFunc(theArr) {
  theArr[0] = 30;
}

const arr = [45];

console.log(arr[0]); // 45
myFunc(arr);
console.log(arr[0]); // 30
// Tương tự, trong ví dụ trên, hàm myFunc thay đổi phần tử đầu tiên của mảng được truyền vào.
// Vì mảng cũng được truyền theo tham chiếu, sự thay đổi này cũng được phản ánh bên ngoài hàm.

// Các khai báo hàm và biểu thức có thể được lồng nhau, tạo thành một chuỗi phạm vi . Ví dụ:
function addSquares(a, b) {
  function square(x) {
    return x * x;
  }
  return square(a) + square(b);
}

// Hàm với map
function map(f, a) {
  const result = new Array(a.length);
  for (let i = 0; i < a.length; i++) {
    result[i] = f(a[i]);
  }
  return result;
}

const numbers = [0, 1, 2, 5, 10];
const cubedNumbers = map(function (x) {
  return x * x * x;
}, numbers);
console.log(cubedNumbers); // [0, 1, 8, 125, 1000]

let myFunc2;
if (true) {
  myFunc2 = function (theObject) {
    theObject.make = "Toyota";
  };
}

// Đệ quy
// Hàm có thể gọi chính nó. Ví dụ:
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log(factorial(5)); // Kết quả: 120

// Trên thực tế, bản thân đệ quy sử dụng một ngăn xếp: hàm stack. Hành vi giống như ngăn xếp có thể được thấy trong ví dụ sau:
function foo(i) {
  if (i < 0) {
    return;
  }
  console.log(`begin: ${i}`);
  foo(i - 1);
  console.log(`end: ${i}`);
}
foo(3);

// Logs:
// begin: 3
// begin: 2
// begin: 1
// begin: 0
// end: 0
// end: 1
// end: 2
// end: 3

// Trình thông dịch JavaScript đưa toàn bộ khai báo hàm lên đầu phạm vi hiện tại
console.log(square(5)); // 25

function square(n) {
  return n * n;
}

// Việc nâng hàm chỉ hoạt động với khai báo hàm — không hoạt động với biểu thức hàm . Đoạn mã sau sẽ không hoạt động:
// console.log(square(5)); // ReferenceError: Cannot access 'square' before initialization
// const square = function (n) {
//   return n * n;
// };

// Biểu thức hàm được gọi ngay lập tức (IIFE)
(function () {
  // Do something
})();

/*
1. Phạm vi hàm (Function Scope)

Mỗi khi bạn tạo một hàm, JavaScript tạo ra một phạm vi riêng biệt cho hàm đó.
Các biến được khai báo bên trong hàm chỉ có thể được truy cập bên trong hàm đó — không thể thấy từ bên ngoài.
    function outer() {
    let x = 10; // biến x thuộc phạm vi của outer
    console.log(x); // ✅ truy cập được
    }

    outer();
    console.log(x); // ❌ Lỗi: x is not defined
*/

/*
2. Phạm vi lồng nhau (Nested Scope)

Một hàm có thể được định nghĩa bên trong một hàm khác.
Hàm con kế thừa phạm vi của cha – tức là nó có thể truy cập vào các biến của hàm cha.
*/

/*
3. Closure (Đóng)

Khi bạn trả về một hàm con từ bên trong một hàm cha, hàm con vẫn giữ quyền truy cập vào các biến của hàm cha ngay cả khi hàm cha đã kết thúc.

*/

function outer() {
  let count = 0;

  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer(); // outer() chạy xong, nhưng inner() vẫn nhớ "count"
counter(); // 1
counter(); // 2
counter(); // 3

// Học closure giúp bạn viết mã an toàn hơn và tránh xung đột tên biến trong phạm vi toàn cục.

//Xung đột tên
// Khi hai đối số hoặc biến trong phạm vi của một closure có cùng tên, sẽ xảy ra xung đột tên .
// Càng nhiều phạm vi lồng nhau thì càng có thứ tự ưu tiên cao hơn.
// Vì vậy, phạm vi trong cùng có thứ tự ưu tiên cao nhất, trong khi phạm vi ngoài cùng có thứ tự ưu tiên thấp nhất.
// Đây là chuỗi phạm vi. Phạm vi đầu tiên trong chuỗi là phạm vi trong cùng, và phạm vi cuối cùng là phạm vi ngoài cùng. Hãy xem xét ví dụ sau:

function outside() {
  const x = 5;
  function inside(x) {
    return x * 2;
  }
  return inside;
}

console.log(outside()(10)); // 20 (instead of 10)


// Sử dụng đối tượng arguments
/*
    arguments là đối tượng đặc biệt có sẵn bên trong mọi hàm thường (non-arrow).
    Nó chứa tất cả các đối số được truyền khi gọi hàm, dù hàm có khai báo hay không các tham số tương ứng.
    arguments[i] → truy cập đối số thứ i (bắt đầu từ 0).
    arguments.length → số lượng đối số thực tế được truyền vào.
*/

function joinStrings(separator) {
  let result = "";
  for (let i = 1; i < arguments.length; i++) {
    result += arguments[i];
    if (i < arguments.length - 1) result += separator;
  }
  return result;
}

console.log(joinStrings(", ", "HTML", "CSS", "JS")); 
// 👉 "HTML, CSS, JS"



// tham số mặc định (default parameters)
// Trong JavaScript, nếu bạn không truyền giá trị cho một tham số, mặc định nó sẽ là undefined.
// Tham số mặc định cho phép bạn gán sẵn giá trị cho tham số ngay trong phần khai báo hàm — giúp tránh lỗi undefined hoặc NaN.
function multiply(a, b = 1) {
  return a * b;
}
console.log(multiply(5)); // 5

// Chỉ áp dụng khi giá trị truyền vào là undefined, không phải null hay giá trị falsy khác:
// multiply(5, null); // Kết quả: 0 (vì null * 5 = 0)


// tham số còn lại (rest parameters)
// Tham số còn lại (...rest) cho phép một hàm nhận số lượng đối số không xác định.
// Các đối số “dư” được gom lại thành một mảng.
// Giúp xử lý các hàm có số lượng đối số linh hoạt (variadic functions).
function func(a, ...rest) {
  console.log(a);     // đối số đầu tiên
  console.log(rest);  // mảng chứa phần còn lại
}

func(1, 2, 3, 4);
// a = 1
// rest = [2, 3, 4]


/*
Hàm mũi tên (arrow function) là cú pháp ngắn gọn hơn của hàm thông thường (function),
được giới thiệu từ ES6 (ECMAScript 2015).
Dạng cú pháp:
(tham_số) => biểu_thức
Chúng luôn ẩn danh (không có tên hàm) và không có this, arguments, super, new.target riêng.
*/

const a2 = a.map(function (s) {
  return s.length;
});

// Hàm mũi tên
const a3 = a.map((s) => s.length);

// this trong arrow function
/*
Đặc điểm quan trọng nhất của arrow function là:
❗ Arrow function không có this riêng, mà kế thừa this từ phạm vi bao quanh nó (lexical this).
*/

function Person() {
  this.age = 0;
  setInterval(function growUp() {
    this.age++; // ❌ 'this' không trỏ tới Person
  }, 1000);
}
const p = new Person();


function Person() {
  this.age = 0;

  setInterval(() => {
    this.age++; // ✅ 'this' trỏ đúng đến đối tượng Person
  }, 1000);
}
const p2 = new Person();