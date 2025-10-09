/*
Literals (hay “giá trị viết trực tiếp”) trong JavaScript là những giá trị bạn gõ thẳng vào mã nguồn, không cần biến trung gian hay hàm tạo. Chúng biểu diễn giá trị cố định.
*/

// number & bigint
const n = 1_000_000;
const big = 12345678901234567890n;

// strings
const s1 = 'abc';
const s2 = "xyz";
const s3 = `Tổng: ${a + b} đồng`;

// object & array
const user = { id: 1, name: 'K' };
const xs = [1, 2, 3];

// regex
const dateRE = /^\d{4}-\d{2}-\d{2}$/;

