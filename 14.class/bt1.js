class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  get area() {
    console.log(this.radius * this.radius * Math.PI);
  }
  static compare(c1, c2) {
    return c1 > c2 ? "Hình 1" : c1 === c2 ? "Bằng nhao" : "Hình 2";
  }
}
const hinhtron = new Circle(5);
hinhtron.area;
console.log(Circle.compare(3, 4));
