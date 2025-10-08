// JavaScript phân biệt chữ hoa chữ thường và sử dụng bộ ký tự Unicode . Ví dụ, từ Früh (có nghĩa là "sớm" trong tiếng Đức) có thể được sử dụng làm tên biến.
const Früh = "foobar";
console.log(Früh); // "foobar"

//Trong JavaScript, các lệnh được gọi là câu lệnh và được phân tách bằng dấu chấm phẩy (;).

// Văn bản gốc của tập lệnh JavaScript được quét từ trái sang phải và được chuyển đổi thành một chuỗi
// các phần tử đầu vào là các mã thông báo , ký tự điều khiển , ký tự kết thúc dòng , chú thích hoặc Khoảng trắng

/*----- Các loại khai báo biến -------*/
// var Khai báo một biến, tùy chọn khởi tạo nó thành một giá trị.
var a = 1;

// let Khai báo một biến cục bộ trong phạm vi khối, tùy chọn khởi tạo nó thành một giá trị.
let b = 2;

// const Khai báo một hằng số chỉ đọc.
const c = 3;

/*-----Biến số-------*/
// Bạn sử dụng biến làm tên tượng trưng cho các giá trị trong ứng dụng. Tên của biến, được gọi là định danh , tuân theo một số quy tắc nhất định.
// Một định danh JavaScript thường bắt đầu bằng một chữ cái, dấu gạch dưới ( _) hoặc dấu đô la ( $).
// Các ký tự tiếp theo cũng có thể là chữ số ( 0– 9). Vì JavaScript phân biệt chữ hoa chữ thường, các
// chữ cái bao gồm cả các ký tự Atừ Zchữ hoa đến achữ zthường.

//Bạn có thể sử dụng hầu hết các chữ cái Unicode như åvà ütrong mã định danh. (Để biết thêm chi tiết, hãy xem tài liệu tham khảo ngữ pháp từ vựng .) Bạn cũng có thể sử dụng chuỗi thoát Unicode để biểu diễn các ký tự trong mã định danh.

/*-----Khai báo biến-------*/

var x = 42; // Cú pháp var có thể được sử dụng để khai báo biến toàn cục hoặc cục bộ trong một hàm bất kể phạm vi khối.

let y = 43; // Cú pháp let được sử dụng để khai báo biến cục bộ trong phạm vi khối, phạm vi khối này có thể là một khối mã hoặc một biểu thức.

const z = 44; // Cú pháp const được sử dụng để khai báo hằng số chỉ đọc. Một hằng số chỉ đọc không thể được gán lại sau khi nó đã được khởi tạo. Cũng giống như let, phạm vi của hằng số chỉ đọc là phạm vi khối.


/*-------- Phạm vi biến đổi ---------*/
// 1. Phạm vi toàn cục - Global: Phạm vi mặc định cho tất cả mã chạy ở chế độ tập lệnh. Biến khai báo ở đây có thể truy cập ở mọi nơi trong file.

let name = "Cu Than"; // 🌍 biến toàn cục

function sayName() {
  console.log(name); // dùng được
}

sayName();
console.log(name); // cũng dùng được

// 2. Phạm vi hàm - Function: Biến được khai báo bên trong một hàm có phạm vi cục bộ đối với hàm đó và không thể truy cập từ bên ngoài hàm.

function greet() {
  let message = "Hello!";
  console.log(message); // ✅ ok
}

greet();
console.log(message); // ❌ Lỗi - ngoài phạm vi hàm
 
// 3. Phạm vi khối - Block: Được tạo bởi cặp ngoặc nhọn {}, ví dụ trong if, for, {}. Chỉ áp dụng cho let và const, không áp dụng cho var.
{
  let x = 10;
  const y = 20;
  var zz = 30; // ⚠️ var không bị giới hạn trong block
}

console.log(zz); // ✅ 30
console.log(x); // ❌ Lỗi - x chỉ sống trong {}

// 4. Phạm vi mô-đun (Module scope) Khi bạn viết code trong file .js kiểu ES Module (dùng import / export), mỗi file sẽ có phạm vi riêng biệt.

// file a.js
export const name2 = "A";

// file b.js
import { name3 } from "./a.js";
console.log(name3); // ✅ "A"
