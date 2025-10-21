const car = {
  make: "Toyota",
  model: "Corolla",
  year: 2020,
};
console.log("🚀 ~ car:", car);

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const myCar = new Car("Honda", "Civic", 2022);
console.log("🚀 ~ myCar:", myCar);

class CarClass {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
}
const myCar2 = new CarClass("Mazda", "CX-5", 2021);

const animal = {
  name: "Dog",
  setName(name) {
    this.name = name;
  },
  getName() {
    console.log(this.name);
  },
};

animal.setName("Cat");
animal.getName();

console.log("myCar2.make", myCar2.make);
console.log(`myCar2["make"]`, myCar2["make"]);

car.course = 100;
console.log("🚀 ~ car.course-create:", car.course);
car.course = 200;
console.log("🚀 ~ car.course-update:", car.course);
delete car.course;
console.log("🚀 ~ car.course-delete:", car.course);


for (const key in car) {
  console.log(key, car[key]);
}

console.log("🚀 ~ Object.keys(car):", Object.keys(car))
console.log("🚀 ~ Object.values(car):", Object.values(car))
console.log("🚀 ~ Object.entries(car):", Object.entries(car))
