/* Các câu lệnh xử lý ngoại lệ */

// Bạn có thể đưa ra ngoại lệ bằng cách sử dụng throw
// câu lệnh và xử lý chúng bằng cách sử dụng try...catch câu lệnh.

// Câu lệnh throw
// Sử dụng throwcâu lệnh để ném ngoại lệ. Một throw câu lệnh chỉ định giá trị cần ném:
// throw expression;
// Bạn có thể ném bất kỳ biểu thức nào, không chỉ các biểu thức có kiểu dữ liệu cụ thể. Đoạn mã sau ném một số ngoại lệ với nhiều kiểu dữ liệu khác nhau:

// throw "Error2"; // String type

// throw 42; // Number type

// throw true; // Boolean type

// throw {
//   toString() {
//     return "I'm an object!";
//   },
//   code: 500
// };




// Câu lệnh try...catch
// Câu lệnh này try...catch đánh dấu một khối câu lệnh cần thử và chỉ định một hoặc nhiều phản hồi nếu có ngoại lệ được ném ra. 
// Nếu có ngoại lệ, try...catch câu lệnh sẽ bắt giữ ngoại lệ đó.

// Câu try...catch lệnh bao gồm một try khối chứa một hoặc nhiều câu lệnh 
// và một catch khối chứa các câu lệnh chỉ định phải làm gì nếu có ngoại lệ xảy ra trong try khối.


// Nói cách khác, bạn muốn try khối lệnh thành công—nhưng nếu không, bạn muốn quyền điều khiển được chuyển sang catch khối lệnh. 
// Nếu bất kỳ câu lệnh nào trong try khối lệnh (hoặc trong một hàm được gọi từ bên trong try khối lệnh) ném ra một ngoại lệ, quyền điều khiển sẽ ngay lập tức chuyển sang catch khối lệnh. 
// Nếu không có ngoại lệ nào được ném ra trong try khối lệnh, catch khối lệnh sẽ bị bỏ qua. 
// finally Khối lệnh được thực thi sau khi khối lệnh try và catch thực thi và chạy trước bất kỳ code nào nằm sau toàn bộ khối try...catch...finally.

// Ví dụ:
function mayThrow() {
  if (Math.random() < 0.5) {
    throw new Error("Lỗi ngẫu nhiên xảy ra!");
  }
  return "Thành công!";
}

try {
  let result = mayThrow();
  console.log(result);
} catch (e) {
  console.log("Đã bắt được lỗi:", e.message);
} finally {
  console.log("Khối finally luôn được thực thi.");
}

// Trong ví dụ trên, hàm mayThrow có thể ném ra một ngoại lệ ngẫu nhiên. 
// Câu lệnh try gọi hàm này và nếu nó ném ra lỗi, câu lệnh catch sẽ bắt lỗi và in thông báo lỗi ra console. 
// Khối finally sẽ luôn được thực thi bất kể có lỗi hay không.



// Finally
// finally Khối lệnh được sử dụng để thực thi code sau khi try và catch khối lệnh đã hoàn thành. 
// Nó thường được sử dụng để dọn dẹp tài nguyên hoặc thực hiện các hành động cuối cùng bất kể có lỗi hay không.

// Ví dụ:
function testFinally() {
  try {
    console.log("Trong khối try");
    throw new Error("Lỗi trong try");
  } catch (e) {
    console.log("Trong khối catch:", e.message);
  } finally {
    console.log("Trong khối finally");
  }
}

testFinally();

// Kết quả:
// Trong khối try
// Trong khối catch: Lỗi trong try
// Trong khối finally

//  finally vẫn chạy ngay cả khi KHÔNG có catch
function testFinallyNoCatch() {
  try {
    console.log("Trong khối try");
    return; // Thoát khỏi hàm
  } finally {
    console.log("Trong khối finally");
  }
  console.log("Dòng này sẽ không bao giờ được in ra");
}

testFinallyNoCatch();

// Kết quả:
// Trong khối try
// Trong khối finally

// Lưu ý: Nếu có return trong try hoặc catch, finally vẫn sẽ chạy trước khi hàm thực sự trả về giá trị.
function testFinallyWithReturn() {
  try {
    console.log("Trong khối try");
    return "Giá trị trả về từ try";
  } catch (e) {
    console.log("Trong khối catch:", e.message);
  } finally {
    console.log("Trong khối finally");
  }
}

let returnValue = testFinallyWithReturn();
console.log("Giá trị trả về:", returnValue);

// Kết quả:
// Trong khối try
// Trong khối finally
// Giá trị trả về: Giá trị trả về từ try

// Kết luận: 
// Câu lệnh try...catch...finally rất hữu ích để xử lý lỗi và đảm bảo rằng các hành động dọn dẹp hoặc cuối cùng luôn được thực hiện, bất kể có lỗi hay không.


/* Kết luận */
// Sử dụng throw để ném ngoại lệ khi cần thiết trong code của bạn.
// Sử dụng try...catch để bắt và xử lý các ngoại lệ, giúp chương trình không bị dừng đột ngột.
// Sử dụng finally để thực thi code dọn dẹp hoặc các hành động cuối cùng, bất kể có lỗi hay không.
// Việc sử dụng đúng các câu lệnh này giúp làm cho code của bạn an toàn hơn và dễ bảo trì hơn.
// Hãy luôn cân nhắc việc xử lý lỗi trong các phần code có thể phát sinh lỗi, đặc biệt khi làm việc với các thao tác không đồng bộ hoặc tương tác với hệ thống bên ngoài.


function test2Return () {
    try {
        console.log("Trong khối try");
        return "Giá trị trả về từ try";
        throw new Error("Lỗi trong try");
    } catch (e) {
        console.log("Trong khối catch:", e.message);
    } finally {
        console.log("Trong khối finally");
        return "Giá trị trả về từ finally"; 
    }
}
let returnValue2 = test2Return();
console.log("Giá trị trả về:", returnValue2);
// Kết quả:
// Trong khối try
// Trong khối finally
// Giá trị trả về: Giá trị trả về từ finally

// Lưu ý: Khi cả try, catch và finally đều có return, giá trị trả về cuối cùng sẽ là từ finally, vì nó được thực thi sau cùng.


function f() {
  try {
    throw "bogus";
  } catch (e) {
    console.log('caught inner "bogus"');
    // This throw statement is suspended until
    // finally block has completed
    throw e;
  } finally {
    return false; // overwrites the previous "throw"
    // `f` exits here
  }
}

console.log(f()); // logs "false"
// Kết quả:
// caught inner "bogus"
// false
// Lưu ý: Trong ví dụ trên, mặc dù có một throw trong catch, nhưng return trong finally đã ghi đè nó, 
// vì vậy hàm f trả về false thay vì ném ra ngoại lệ "bogus". 
// Điều này minh họa rằng return trong finally sẽ luôn được ưu tiên thực thi cuối cùng.