/*
Tiêu chuẩn ECMAScript mới nhất định nghĩa tám kiểu dữ liệu:
Bảy kiểu dữ liệu nguyên thủy :
Boolean . true và false.
null . Một từ khóa đặc biệt biểu thị giá trị null. (Vì JavaScript phân biệt chữ hoa chữ thường, nullkhông giống với Null, NULL, hoặc bất kỳ biến thể nào khác.)
undefined . Thuộc tính cấp cao nhất có giá trị chưa được xác định.
Số . Một số nguyên hoặc số dấu phẩy động. Ví dụ: 42hoặc 3.14159.
BigInt . Một số nguyên có độ chính xác tùy ý. Ví dụ: 9007199254740992n.
Chuỗi . Một chuỗi ký tự biểu diễn giá trị văn bản. Ví dụ: "Howdy".
Biểu tượng . Một kiểu dữ liệu có các thể hiện duy nhất và không thể thay đổi.
và Đối tượng
*/


/*
Chuyển đổi kiểu dữ liệu
    JavaScript là ngôn ngữ được định kiểu động . 
    Điều này có nghĩa là bạn không cần phải chỉ định kiểu dữ liệu của biến khi khai báo. 
    Nó cũng có nghĩa là các kiểu dữ liệu được tự động chuyển đổi khi cần thiết trong quá trình thực thi tập lệnh.
*/

let answer = 42; // Kiểu số
answer = "Thật tuyệt vời!"; // Bây giờ bị đổi thành kiểu chuỗi


// Số và toán tử
x = "The answer is " + 42; // x bây giờ là chuỗi "The answer is 42"
y = 42 + " is the answer"; // y bây giờ là chuỗi "42 is the answer"
z = "37" + 5; // z bây giờ là chuỗi "375"
a = "37" - 5; // a bây giờ là số 32
b = "37" * 2; // b bây giờ là số 74
c = "37" / 2; // c bây giờ là số 18.5


// Trong trường hợp giá trị biểu diễn số nằm trong bộ nhớ dưới dạng chuỗi, sẽ có các phương pháp để chuyển đổi.

console.log(parseInt("3.14")); // 3
console.log(parseFloat("3.14")); // 3.14
console.log(Number("3.14")); // 3.14

// Một phương pháp thay thế để lấy số từ chuỗi là sử dụng +toán tử (cộng một ngôi). Toán tử này ngầm thực hiện chuyển đổi số , tương tự như quy trình của Number()hàm.
console.log("Quả này ảo mà nè",(+"3.14") + ("3.14")); // 6.28