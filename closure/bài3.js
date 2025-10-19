function makeCounter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const counterA = makeCounter();
counterA(); //1
counterA(); //2
// ➡️ Giải thích vì sao count vẫn tồn tại sau khi makeCounter() đã return.


// count vẫn tồn tại sau khi makeCounter() đã return bởi vì counterA là 1 function mà có liên kết với giá trị count trong makeCounter
// Mà giá trị trong hàm chỉ biết mất khi không có 1 liên kết nào cả
// Vì vậy nó k biến mất


// Lời giải:
// Vì biến count vẫn đang được tham chiếu bởi closure counterA.
// Bộ dọn rác (garbage collector) của JS chỉ xóa vùng nhớ khi không còn tham chiếu nào trỏ đến vùng nhớ đó.
//→ count “sống dai” nhờ closure.

// Nếu tạo thêm 1 counter khác:
const counterB = makeCounter();
counterB(); //1
counterB(); //2

//→ Vì counterB có một closure riêng biệt, với biến count khác hoàn toàn (được tạo mới khi gọi makeCounter() lần thứ 2).
