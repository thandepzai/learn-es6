// 1.Số
// Trong JavaScript, các số được triển khai theo định dạng nhị phân 64 bit độ chính xác kép IEEE 754
// (tức là một số nằm trong khoảng từ ±2^−1022 đến ±2^+1023, hoặc khoảng từ ±10^−308 đến ±10^+308, với độ chính xác số là 53 bit).
// Các giá trị số nguyên lên đến ±2^53 − 1 có thể được biểu diễn chính xác.
// Ngoài khả năng biểu diễn số dấu phẩy động, kiểu số còn có ba giá trị ký hiệu: Infinity, -Infinity, và NaN(không phải số).

// Số thập phân: 1234567890, 12, 21, 11,...
// Số thập phân có thể bắt đầu bằng số không ( 0) theo sau là một chữ số thập phân khác,
// nhưng nếu tất cả các chữ số sau dấu phẩy đầu tiên 0 nhỏ hơn 8, số đó sẽ được hiểu là số bát phân.
// Đây được coi là cú pháp cũ, và các số có tiền tố 0, dù được hiểu là bát phân hay thập phân,
// đều gây ra lỗi cú pháp ở chế độ nghiêm ngặt — vì vậy, hãy sử dụng 0otiền tố thay thế.
// Ví dụ:
var x = 012;
console.log("1,", x); // 10, vì 012 (octal) = 1*8 + 2 = 10

// Chế độ nghiêm ngặt ("use strict";) cấm sử dụng số bát phân có tiền tố 0:
// Giải pháp: ES6 giới thiệu tiền tố 0o cho số bát phân:
var z = 0o12; // 0o = "octal" Chữ số sau 0o phải là 0–7.
console.log("2, ", z); // 10

// Số nhị phân:
// Cú pháp số nhị phân sử dụng số 0 đứng đầu theo sau là chữ cái Latinh "B"
// viết thường hoặc viết hoa ( 0b hoặc 0B). Nếu các chữ số sau 0b không phải là 0 hoặc 1, lỗi sau SyntaxErrorsẽ xuất hiện: "Thiếu chữ số nhị phân sau 0b".
var y = 0b010101;
console.log("3, ", y);

// Số thập lục phân:
// Cú pháp số thập lục phân sử dụng số 0 đứng đầu theo sau là chữ cái Latinh thường hoặc hoa "X" ( 0xhoặc 0X).
// Nếu các chữ số sau 0x nằm ngoài phạm vi (0123456789ABCDEF),
// lỗi sau SyntaxErrorsẽ xảy ra: "Mã định danh bắt đầu ngay sau ký tự số".
var z = 0xfffffffffffff;
console.log("4, ", z);

// Lũy thừa:
var a = 0e-5;
console.log("5, ", a);
