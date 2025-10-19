// for (var i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 1000);
// }

// Sửa lại đúng
// Yêu cầu viết 3 phiên bản:
// Dùng IIFE
// Dùng Function Factory
// Dùng let

// Dùng IIFE
for (var i = 0; i < 3; i++) {
  (function () {
    var j = i;
    setTimeout(() => console.log(j), 1000);
  })();
}

// Dùng Function Factory
function logI(i) {
  return function () {
    setTimeout(() => console.log(i), 1000);
  };
}
// logI(i) tạo closure vì hàm trả về nhớ scope nơi nó được tạo ra, bao gồm tham số i. Mỗi lần gọi logI(i) là một closure riêng, giữ giá trị i tại thời điểm đó.


for (var i = 0; i < 3; i++) {
  logI(i)();
}

// Dùng let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}