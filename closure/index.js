function outer() {
  let counter = 0; // biến trong phạm vi outer

  function inner() {
    counter++; // inner vẫn có thể dùng biến counter của outer
    console.log(counter);
  }

  return inner;
}

let count = outer(); // outer chạy xong, trả về hàm inner

count(); // 👉 1
count(); // 👉 2
count(); // 👉 3

count = null; // xóa tham chiếu đến inner và counter khỏi bộ nhớ

var name = "Global";
// Nếu để hàm là outer nó sẽ đè lên hàm trên lúc render ra
function outer2() {
  var name = "Outer";

  function inner() {
    console.log(name);
  }

  return inner;
}
const fn = outer2();
fn(); // In ra "Outer", KHÔNG phải "Global"
console.log(name);


function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12