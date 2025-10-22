class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHello() {
    console.log(
      `Xin chào tôi tên là ` + this.name + ", tôi " + this.age + "tuổi"
    );
  }
}

const person1 = new Person("Thân", "25");
person1.sayHello();

class Account {
  #password;

  setPassword(value) {
    this.#password = value;
  }
  getPassword() {
    console.log("Mật khẩu: ", this.#password);
  }
}
const newAccount1 = new Account();
newAccount1.setPassword("1234");
newAccount1.getPassword();

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  get area() {
    return this.width * this.height;
  }

  set width(value) {
    if (value <= 0) throw new Error("Width must be positive");
    this._width = value;
  }

  get width() {
    return this._width;
  }
}

class MathTool {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathTool.add(2, 3)); // ✅ 5
console.log(MathTool.multiply); // ❌ undefined
const a = new MathTool();
console.log("🚀 ~ a:", a);

const rect = new Rectangle(10, 5);
console.log(rect.area);
rect.width = 123; // gọi setter
console.log(rect.width); // gọi getter không lấy this.width vì nó xác nhận tìm get trước

class Animal {
  speak() {
    console.log("Some sound...");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Woof!");
  }
}

const d = new Dog();
d.speak(); // Woof!

class Animal2 {
  constructor(name) {
    this.name = name;
  }
}

class Dog2 extends Animal2 {
  constructor(name, breed) {
    super(name); // ✅ gọi constructor của Animal
    this.breed = breed;
  }
}

const d2 = new Dog2("Buddy", "Husky");
console.log(d.name); // 👉 Buddy
console.log(d.breed); // 👉 Husky
