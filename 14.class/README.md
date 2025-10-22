# 🎓 Học JavaScript Classes Từ Cơ Bản Đến Nâng Cao

## 🧩 1. Class là gì?
Trong JavaScript, **class** là cách hiện đại để tạo **đối tượng (object)** có **thuộc tính (property)** và **phương thức (method)**.
Nó giúp code dễ đọc hơn, gọn hơn, giống như Java, Python, C#...

👉 Thực chất class chỉ là “vỏ bọc” đẹp đẽ cho **cơ chế prototype** vốn có sẵn trong JS.

---

## 🚀 2. Cách khai báo một class
```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello, I'm ${this.name} and I'm ${this.age} years old.`);
  }
}

const p = new Person('Than', 25);
p.sayHello(); // Hello, I'm Than and I'm 25 years old.
```
📘 Giải thích:
constructor() là hàm chạy ngay khi bạn dùng new Person().
this chính là đối tượng được tạo.
sayHello() là method dùng chung cho tất cả các instance.
---

## 🧱 3. So sánh với function constructor cũ
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayHello = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const p = new Person('Than', 25);
p.sayHello();
```
🟢 Hai cách này cho kết quả giống nhau, nhưng class trông gọn, rõ ràng và an toàn hơn.

---

## 🔒 4. Private field — Biến riêng tư
Dùng dấu # để tạo thuộc tính chỉ dùng được bên trong class.
```js
class Account {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new Account();
acc.deposit(1000);
console.log(acc.getBalance()); // 1000
console.log(acc.#balance); // ❌ Error
```
💡 Tức là người khác không thể phá vỡ dữ liệu bên trong đối tượng của bạn.

---

## ⚙️ 5. Getter và Setter
Giúp truy cập thuộc tính như biến, nhưng thực ra là gọi hàm.
Vậy tại sao vẫn cần get/set?
Không phải vì nó “mạnh hơn”, mà vì nó giúp code tự nhiên hơn — đặc biệt trong các mô hình hướng đối tượng lớn.

```js
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }

  set width(value) {
    if (value <= 0) throw new Error('Width must be positive');
    this._width = value;
  }

  get width() {
    return this._width;
  }
}

const rect = new Rectangle(10, 5);
console.log(rect.area); // 50
```

---

## 🧬 6. Static — Thuộc tính/phương thức của class
Thuộc tính hoặc phương thức đó gắn với chính class, không thuộc về từng instance (đối tượng).
```js
class MathTool {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathTool.add(2, 3)); // ✅ 5
console.log(MathTool.multiply);  // ❌ undefined
const a = new MathTool();
a.add(2,3) // Lỗi
```

---

## 🧩 7. Kế thừa (Inheritance) với extends
Trong JavaScript, extends cho phép một class con (child) kế thừa thuộc tính và phương thức của class cha (parent).
🎯 Mục đích: Tái sử dụng logic, giảm lặp code, và cho phép mở rộng hành vi.

```js
class Animal {
  speak() {
    console.log('Some sound...');
  }
}

class Dog extends Animal {
  speak() {
    console.log('Woof!');
  }
}

const d = new Dog();
d.speak(); // Woof!
```

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    super.speak();
    console.log(`${this.name} barks.`);
  }
}

const d = new Dog('Buddy', 'Husky');
d.speak();
```
---

## 🧠 8. Tóm tắt nhanh
| Thành phần | Ý nghĩa | Ví dụ |
|-------------|----------|--------|
| `constructor()` | Hàm khởi tạo đối tượng | `constructor(name)` |
| Thuộc tính thường | Biến công khai | `this.name = name` |
| `#privateField` | Biến riêng tư | `#balance = 0` |
| `get/set` | Đọc/ghi giá trị như property | `get area()` |
| `static` | Hàm hoặc biến gắn với class | `static add()` |
| `extends` | Kế thừa class cha | `class Dog extends Animal` |
| `super()` | Gọi constructor/hàm của cha | `super(name)` |

---

## 🧪 9. Bài tập nhỏ
Tạo class `Circle` có:
- Thuộc tính `radius`
- Getter `area` (diện tích)
- Static method `compare(c1, c2)` trả về hình tròn nào to hơn.

```js
class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  get area() {
    return Math.PI * this.radius ** 2;
  }

  static compare(c1, c2) {
    return c1.area > c2.area ? c1 : c2;
  }
}

const c1 = new Circle(3);
const c2 = new Circle(5);
console.log(Circle.compare(c1, c2)); // Circle có radius = 5
```

---

📘 **Tác giả:** ChatGPT x Than  
📅 **Phiên bản:** 1.0  
📂 **Chủ đề:** Học Class trong JavaScript
