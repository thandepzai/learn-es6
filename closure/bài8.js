function a(x) {
  function b(y) {
    function c(z) {
      console.log(x + y + z);
    }
    c(3);
  }
  b(2);
}
a(1);

// Giải thích: hàm c truy cập được x và y bằng cơ chế nào?
// Cơ chế con có thể truy cập giá trị của cha
// hàm c truy cập được x và y nhờ cơ chế closure, tức là lexical scoping của JavaScript.