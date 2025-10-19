/*
    Câu lênh khối (Block statement) trong JavaScript được sử dụng để nhóm nhiều câu lệnh lại với nhau.
    Câu lệnh khối được đặt trong cặp dấu ngoặc nhọn { }.
    Câu lệnh khối thường được sử dụng trong các cấu trúc điều khiển như if, for, while để xác định phạm vi của các câu lệnh con.
*/

{
    s1;
    s2;
    s3;
    // ...
}

// Ví dụ sử dụng câu lệnh khối trong cấu trúc điều khiển if
let age = 20;

if (age >= 18) {
    // Bắt đầu câu lệnh khối
    console.log("Bạn đã đủ tuổi trưởng thành.");
    console.log("Chúc mừng!");
    // Kết thúc câu lệnh khối
} else {
    console.log("Bạn chưa đủ tuổi trưởng thành.");
}

// Ví dụ sử dụng câu lệnh khối trong vòng lặp for
for (let i = 0; i < 5; i++) {
    // Bắt đầu câu lệnh khối
    console.log(`Lần lặp thứ ${i}`);
    // Kết thúc câu lệnh khối
}

/*
    Lưu ý: var được khai ngoài khối nhưng có thể truy cập bên trong khối, vì var không có phạm vi khối.
*/

var x = 10; // Khai báo biến toàn cục

{
    console.log(x); // Có thể truy cập biến x bên trong khối
    x = 20; // Thay đổi giá trị biến x
}
console.log(x); // Kết quả: 20, vì x đã bị thay đổi trong khối

/*
    Tuy nhiên, let và const có phạm vi khối, nên nếu khai báo bên trong khối thì không thể truy cập từ bên ngoài.
*/


/* Giá trị sai: Các giá trị sau đây được đánh là là false */
/*
- false
- undefined
- null
- 0
- NaN
- "" (chuỗi rỗng)
Bất kỳ giá trị nào không nằm trong danh sách trên đều được đánh giá là true.
*/

/* Lưu ý khi viết: const b = new Boolean(false);
    JavaScript sẽ tạo một đối tượng (object) bao bọc giá trị false.
    Nhưng bản thân b vẫn là một object, không phải false nguyên thủy.
    => if (b) sẽ luôn đúng vì b là object.
    Nhưng if (b==true) sẽ sai vì b không bằng true nguyên thủy.
*/
// Ví dụ minh họa
const b = new Boolean(false);

if (b) {
    console.log("b được đánh giá là true trong if");
} else {
    console.log("b được đánh giá là false trong if");
}

if (b == true) {
    console.log("b bằng true nguyên thủy");
} else {
    console.log("b không bằng true nguyên thủy");
}

// Kết quả:
// b được đánh giá là true trong if
// b không bằng true nguyên thủy

/* Kết luận:
    Câu lệnh khối giúp nhóm các câu lệnh lại với nhau để kiểm soát luồng thực thi trong các cấu trúc điều khiển.
    var không có phạm vi khối, trong khi let và const có phạm vi khối.
    Hiểu rõ về giá trị đúng/sai và cách JavaScript đánh giá chúng là rất quan trọng để tránh lỗi logic trong mã nguồn.
*/