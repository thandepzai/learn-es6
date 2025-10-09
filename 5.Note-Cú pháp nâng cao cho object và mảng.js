/*---- 1.__proto__--------*/
// trong object literal dùng để chỉ định prototype (nguyên mẫu) của object đó ngay khi khởi tạo, nghĩa là:
// Object mới kế thừa (inherit) toàn bộ thuộc tính và phương thức từ prototype mà bạn gán.

// Ví dụ:
// Bình thường khi mà muốn kế thừa từ một object khác, ta sẽ làm như sau:
const parent = {
  sayHello() {
    console.log("Hello from parent");
  }
};

const child = Object.create(parent); // Tạo object mới kế thừa từ parent
child.sayHello(); // "Hello from parent"

// Với __proto__, ta có thể viết gọn hơn:
const child2 = {
  __proto__: parent, // Kế thừa từ parent
  sayHi() {
    console.log("Hi from child2");
  }
};

child2.sayHello(); // "Hello from parent"
child2.sayHi(); // "Hi from child2"

// __proto__ trong object literal = cú pháp rút gọn để đặt prototype và kế thừa ngay khi tạo object.
// Không thêm thuộc tính mới từ proto, chỉ kế thừa qua prototype chain thôi.

/*---- 2. Method shorthand--------*/
// Cú pháp rút gọn để định nghĩa phương thức (method) trong object literal.
// Thay vì viết full function như sau:
const obj1 = {
  greet: function(name) {
    console.log(`Hello, ${name}`);
  }
};

// Ta có thể viết gọn hơn:
const obj2 = {
  greet(name) { // rút gọn function
    console.log(`Hello, ${name}`);
  }
};

obj2.greet("Alice"); // "Hello, Alice"

/*---- 3. Computed property names--------*/
// Cho phép sử dụng biểu thức (expression) làm tên thuộc tính (property name) trong object literal.
// Biểu thức được đặt trong dấu ngoặc vuông [] và sẽ được tính toán để tạo tên thuộc tính.

const propName = "age";
const obj3 = {
  name: "Bob",
  [propName]: 30, // Tên thuộc tính là giá trị của propName
  ["isAdult"]: true // Tên thuộc tính là "isAdult"
};

console.log(obj3.age); // 30
console.log(obj3.isAdult); // true

// Computed property names rất hữu ích khi bạn muốn tạo tên thuộc tính động dựa trên biến hoặc biểu thức.

/*---- Kết luận --------*/
// Các cú pháp nâng cao này giúp mã nguồn JavaScript trở nên ngắn gọn, dễ đọc và dễ bảo trì hơn, đặc biệt khi làm việc với object và mảng. 
// Chúng tận dụng các tính năng hiện đại của ngôn ngữ để viết code hiệu quả hơn.