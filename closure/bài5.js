function makeGreeter(name) {
  // code ở đây
  return function () {
    console.log(name);
  };
}

const hiTuan = makeGreeter("Tuấn");
hiTuan(); // "Xin chào Tuấn!"

// ➡️ Yêu cầu: hàm makeGreeter trả về một hàm khác, dùng closure để ghi nhớ tên.
