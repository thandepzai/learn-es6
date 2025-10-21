# 🧩 Giáo Trình Toàn Diện: Đối Tượng (Objects) Trong JavaScript

---

## 📚 1. Giới thiệu về Object

**Object (đối tượng)** là nền tảng quan trọng trong JavaScript.
Mọi thứ trong JavaScript — từ mảng, hàm, đến lớp (class) — đều là object hoặc có liên quan đến object.

Object là **tập hợp các cặp khóa–giá trị (key–value pairs)**.
Mỗi “khóa” là một chuỗi (hoặc Symbol), và giá trị có thể là **bất kỳ kiểu dữ liệu nào** (số, chuỗi, hàm, mảng, hoặc object khác).

**Ví dụ:**

```js
const person = {
  name: "Alice",
  age: 25,
  job: "Engineer"
};
```

---

## ⚙️ 2. Cách tạo đối tượng

### 2.1 Dùng Object Literal (Cách phổ biến nhất)

```js
const car = {
  make: "Toyota",
  model: "Corolla",
  year: 2020
};
```

### 2.2 Dùng Constructor Function

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

const myCar = new Car("Honda", "Civic", 2022);
```

* `this` đại diện cho đối tượng được tạo.
* Từ khóa `new` giúp tạo ra một bản sao mới của object.

### 2.3 Dùng Class Syntax (ES6)

```js
class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
}

const car1 = new Car("Mazda", "CX-5", 2021);
```

### 2.4 Dùng Object.create()

```js
const Animal = {
  type: "Invertebrate",
  displayType() {
    console.log(this.type);
  }
};

const fish = Object.create(Animal);
fish.type = "Fish";
fish.displayType(); // Fish
```

---

## 🧦 3. Truy cập và thao tác thuộc tính

### 3.1 Truy cập thuộc tính

```js
const car = { make: "Toyota", model: "Camry", year: 2019 };

// Cách 1: Dot notation
console.log(car.make);

// Cách 2: Bracket notation
console.log(car["model"]);
```

### 3.2 Thêm, xóa, cập nhật thuộc tính

```js
car.color = "red"; // Thêm
car.year = 2020; // Cập nhật
delete car.model; // Xóa
```

### 3.3 Liệt kê thuộc tính

```js
for (const key in car) {
  console.log(key, car[key]);
}

Object.keys(car); // Trả về mảng các key
Object.values(car); // Trả về mảng các value
Object.entries(car); // Trả về cặp [key, value]
```

---

## 🧬 4. Kế thừa & Prototype

Tất cả object trong JS đều **kế thừa từ prototype**.

```js
function Car(make, model) {
  this.make = make;
  this.model = model;
}

Car.prototype.describe = function() {
  console.log(`This car is a ${this.make} ${this.model}`);
};

const car1 = new Car("Honda", "Civic");
car1.describe();
```

Prototype là một object được sử dụng để chia sẻ thuộc tính & phương thức giữa các đối tượng cùng kiểu.

---

## 🔧 5. Phương thức (Methods)

Phương thức là **hàm (function)** được gán như thuộc tính của object.

```js
const user = {
  name: "Tom",
  sayHi() {
    console.log(`Xin chào, tôi là ${this.name}`);
  }
};

user.sayHi(); // Xin chào, tôi là Tom
```

### Từ khóa `this`

`this` đại diện cho đối tượng gọi hàm.

```js
function greet() {
  console.log(`Tôi tên là ${this.name}`);
}

const manager = { name: "Karina", greet };
const intern = { name: "Tyrone", greet };

manager.greet(); // Karina
intern.greet(); // Tyrone
```

---

## 🧠 6. Getter & Setter

Dùng để lấy (get) hoặc gán (set) giá trị gián tiếp.

```js
const person = {
  firstName: "John",
  lastName: "Doe",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  }
};

console.log(person.fullName); // John Doe
person.fullName = "Jane Smith";
console.log(person.firstName); // Jane
```

---

## ⚖️ 7. So sánh Objects

Hai object **chỉ bằng nhau khi chúng cùng tham chiếu đến một vùng nhớ**.

```js
const a = { name: "apple" };
const b = { name: "apple" };
console.log(a === b); // false

const c = a;
console.log(a === c); // true
```

---

## 🔄 8. Sao chép Object

### 8.1 Nông (Shallow Copy)

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1 }; // Spread operator
const obj3 = Object.assign({}, obj1);
```

### 8.2 Sâu (Deep Copy)

```js
const deep = JSON.parse(JSON.stringify(obj1));
// Hoặc (hiện đại hơn)
const clone = structuredClone(obj1);
```

---

## 🕵️‍♂️ 9. Mẹo & Best Practices

* Dùng `const` khi định nghĩa object để tránh gán lại.
* Dùng `Object.freeze()` để chống thay đổi object.
* Dùng `Object.hasOwn()` hoặc `hasOwnProperty()` để kiểm tra thuộc tính riêng.
* Tránh lạm dụng prototype trừ khi thật sự cần.

---

## 💪 10. Bài tập thực hành

1. Tạo object `student` có `name`, `age`, `grade`. Viết phương thức `introduce()`.
2. Dùng constructor `Car` để tạo 3 đối tượng khác nhau.
3. Thêm getter/setter để quản lý `speed`.
4. Tạo object `animal` kế thừa từ `livingBeing` bằng `Object.create()`.
5. Viết hàm so sánh nội dung hai object (deep comparison).

---

## 📗 Tài liệu tham khảo

* [MDN Web Docs: Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
* [JavaScript.info: Objects](https://javascript.info/object)

---

> Viết bởi: ChatGPT - Hướng dẫn học JavaScript cơ bản và nâng cao.
