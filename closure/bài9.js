for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}

// In ra gì vì sao
// In ra: 3,3,3
// Vì var là biến function scope, nên là tất cả các console.log sau 1s sẽ log ra i ở lúc cuối cùng là 3

// var i là function-scoped, nghĩa là toàn bộ vòng lặp dùng cùng một biến i.
// setTimeout là bất đồng bộ, nên callback chạy sau 1 giây, khi vòng lặp đã kết thúc.
// Khi đó i đã tăng lên 3 (kết thúc vòng lặp).
// Vì tất cả callback đều truy cập cùng biến i, nên in ra 3, 3, 3.