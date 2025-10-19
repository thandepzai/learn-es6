function outer() {
  const a = 10;
  function inner() {
    const b = 5;
    console.log(a + b);
  }
  inner();
}
outer();
// ➡️ Hỏi: tại sao inner() truy cập được a, nhưng outer() không truy cập được b?

// Đự đoán kết quả: 15
// Giải thích: Hàm inner có thể truy cập biến a từ hàm outer do tính chất hàm con có thể truy cập được biến của hàm cha.
// Còn k được vì hàm cha không thể truy cập biến b của hàm con.

// Đáp án: 15
// Hàm con (inner) có thể truy cập biến của hàm cha (outer).
// Hàm cha không thể truy cập biến của hàm con.