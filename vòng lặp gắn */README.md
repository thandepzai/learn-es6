# 🧠 Iterators và Generators trong JavaScript

## 📘 Mục tiêu buổi học
Sau buổi này bạn sẽ:
- Hiểu **Iterator protocol** và **Iterable protocol** là gì.  
- Biết cách **tự tạo iterator** bằng tay.  
- Sử dụng **generator function** (`function*`) để viết iterator dễ dàng hơn.  
- Biết cách dùng `for...of`, `yield`, `yield*`, và `next(value)` đúng chuẩn.  
- Làm chủ cơ chế **pause / resume** trong JavaScript.  
- Viết được **generator nâng cao** (ví dụ: Fibonacci, async tasks).  

---

## 📖 1. Iterator là gì?
> Một **iterator** là một đối tượng có phương thức `next()`, dùng để **duyệt tuần tự** qua các phần tử trong một dãy giá trị.
Iterator là một đối tượng (object) cung cấp cơ chế duyệt qua (iterate) các phần tử từng cái một trong một tập hợp (như mảng, chuỗi, Map, Set, v.v.).

Mỗi lần gọi `next()`, iterator trả về:
```js
{ value: <giá trị>, done: <true/false> }
```

- `value`: giá trị hiện tại  
- `done`: `true` khi hết dữ liệu để duyệt

### 🧩 Ví dụ 1 — Tạo iterator thủ công
```js
function makeRangeIterator(start, end, step) {
  let nextIndex = start;
  return {
    next() {
      if (nextIndex < end) {
        const result = { value: nextIndex, done: false };
        nextIndex += step;
        return result;
      }
      return { value: undefined, done: true };
    },
  };
}

const it = makeRangeIterator(1, 5, 1);
console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: 2, done: false }
console.log(it.next()); // { value: 3, done: false }
console.log(it.next()); // { value: undefined, done: true }
```

---

## 📖 2. Iterable là gì?
> Một **Iterable** là đối tượng có phương thức đặc biệt `[Symbol.iterator]()`, trả về một iterator.

Tức là, để có thể dùng với `for...of`, `...spread`, `Array.from`, v.v. thì object phải *tuân thủ Iterable protocol*.

```js
const myIterable = {
  *[Symbol.iterator]() {
    yield 10;
    yield 20;
    yield 30;
  },
};

for (const value of myIterable) {
  console.log(value); // 10, 20, 30
}
```

---

## ⚙️ 3. Generator Functions — Cách viết Iterator dễ nhất

Generator là **hàm đặc biệt** có thể *tạm dừng* và *tiếp tục chạy*.

```js
function* countUpTo3() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = countUpTo3();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

> Mỗi lần `next()` → code chạy đến `yield` → tạm dừng → trả giá trị → lần sau `next()` lại tiếp tục từ chỗ dừng.

---

## 🔁 4. Gọi `next(value)` để truyền dữ liệu ngược vào generator

```js
function* example() {
  const name = yield "Nhập tên của bạn:";
  console.log("Xin chào", name);
}

const gen = example();
console.log(gen.next().value);  // "Nhập tên của bạn:"
console.log(gen.next("Thân"));   // "Xin chào Thân"
```
1️⃣ const gen2 = example();
Khi bạn gọi hàm generator, nó KHÔNG chạy ngay lập tức.
Thay vào đó, nó trả về một iterator đặc biệt (gen2) mà bạn có thể điều khiển bằng next().

2️⃣ gen2.next()
Lệnh này bắt đầu chạy generator từ đầu đến khi gặp yield đầu tiên.
Gặp yield "Nhập tên của bạn:", generator tạm dừng lại và trả ra giá trị "Nhập tên của bạn:".
{ value: "Nhập tên của bạn:", done: false }
Vì vậy dòng: console.log(gen.next().value); => Nhập tên của bạn:

3️⃣ gen2.next("Thân")
Lần này, khi gọi next("Thân"), giá trị "Thân" sẽ được truyền ngược lại vào nơi generator bị dừng trước đó — chính là dòng:
const name = yield "Nhập tên của bạn:";
Nghĩa là name lúc này nhận giá trị "Thân".
Rồi generator tiếp tục chạy phần còn lại: console.log("Xin chào", name); In ra: Xin chào Thân

Giải thích cơ chế nội bộ:
🔹 Bước 1: gen.next()
Khi bạn gọi next() lần đầu, hàm generator bắt đầu chạy từ đầu
Nó chạy đến lệnh yield "Nhập tên của bạn:".
Tại đây:
Generator tạm dừng (pause).
Giá trị "Nhập tên của bạn:" được trả ra ngoài (chính là value trong { value, done }).
Và nó ghi nhớ vị trí đang dừng lại.
Lúc này, dòng này chưa được thực hiện xong:
const name = yield "Nhập tên của bạn:";
→ Vì generator bị tạm dừng giữa chừng, nên chưa có giá trị nào gán cho name cả.

🔹 Bước 2: gen.next("Thân")
Khi bạn gọi next("Thân"), generator tiếp tục chạy từ chỗ nó bị dừng.
Giá trị bạn truyền vào ("Thân") sẽ được gán làm kết quả của biểu thức yield.
Nói cách khác:
const name = yield "Nhập tên của bạn:";
sau khi resume, đoạn này được hiểu là:
const name = "Thân";
➡️ Vì yield trả về giá trị mà bạn gửi vào qua next() lần sau.
---

## 🔀 5. `yield*` — Lồng nhiều generator vào nhau
```js
function* genA() {
  yield 1;
  yield 2;
}

function* genB() {
  yield* genA();
  yield 3;
}

for (const val of genB()) {
  console.log(val); // 1, 2, 3
}
```

---

## 💡 6. Generator = Iterable + Iterator cùng lúc
Trong JavaScript, generator object (được tạo ra khi bạn gọi một hàm generator) vừa là Iterable, vừa là Iterator.

Khái niệm	Mô tả ngắn
Iterable	Là đối tượng có phương thức Symbol.iterator() trả về một iterator.
Iterator	Là đối tượng có phương thức next() để duyệt qua từng giá trị.

🔹 Bình thường, hai cái này không phải là một.

Ví dụ với mảng:

```js
const arr = [1, 2]; // Iterable
const iter = arr[Symbol.iterator](); //Iterator

console.log(iter === arr); // false → iterator KHÁC iterable
```
arr là Iterable (vì có [Symbol.iterator]()).
iter là Iterator (vì có next()).
Nhưng chúng là hai đối tượng khác nhau.


Generator thì đặc biệt hơn

Khi bạn tạo một generator:
```js
function* g() {
  yield 1;
  yield 2;
}

const iter = g();
```
Lúc này:
iter có thể duyệt bằng next() → là Iterator
iter cũng có [Symbol.iterator]() → là Iterable

Và điều thú vị là:
console.log(iter[Symbol.iterator]() === iter); // true ✅

Ý nghĩa thực tế
Nhờ vậy, bạn có thể dùng generator trực tiếp trong các cấu trúc cần “iterable”, như for...of, Array.from(), hoặc toán tử spread ...:
```js
function* g() {
  yield 1;
  yield 2;
}

for (const x of g()) {
  console.log(x);
}
// Output: 1, 2
```
Không cần tạo iterator riêng bằng [Symbol.iterator](), vì generator đáp ứng cả hai giao thức (protocol).

---

## 🚀 7. Ứng dụng thực tế

### 1. Sinh dữ liệu vô hạn
```js
function* idGenerator() {
  let id = 1;
  while (true) yield id++;
}

const gen = idGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
```

### 2. Tối ưu bộ nhớ khi đọc dữ liệu lớn  
→ Chỉ đọc phần cần, không load toàn bộ vào RAM.

### 3. Xử lý tuần tự bất đồng bộ (async generators)  
→ Dùng trong `for await...of`.

---

## 🧩 8. Generator nâng cao — Fibonacci
```js
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    const reset = yield a;
    [a, b] = [b, a + b];
    if (reset) [a, b] = [0, 1];
  }
}

const seq = fibonacci();
console.log(seq.next().value); // 0
console.log(seq.next().value); // 1
console.log(seq.next().value); // 1
console.log(seq.next(true).value); // reset -> 0
```

---

## 🧩 9. Mini Test
1️⃣ Khi `done` là `true` nghĩa là gì?  // Khi done: true nghĩa là generator (hoặc iterator) đã chạy xong hoàn toàn,
không còn giá trị nào để yield ra nữa.

2️⃣ Generator function khác function thường ở điểm nào?  // Generator function có thêm dấu *, và có thể tạm dừng (pause) bằng yield,
rồi tiếp tục chạy (resume) bằng .next() — điều mà hàm thường không làm được.
3️⃣ `yield*` dùng để làm gì?   // yield* không phải để gán giá trị, mà để ủy quyền (delegate) việc yield cho một iterable khác (ví dụ: mảng, generator khác...).
4️⃣ Generator có thể dùng trong `for...of` không? Vì sao? // Có, vì generator object vừa là Iterable, vừa là Iterator. 
5️⃣ `next(value)` giúp ta làm gì? // next(value) tiếp tục thực thi generator từ chỗ nó dừng ở yield, và nếu truyền value, thì giá trị đó sẽ được gán vào biểu thức yield trước đó.

---

## 🧠 10. Bài tập thực hành
1. Viết **iterator thủ công** duyệt qua mảng `["a", "b", "c"]`.  
2. Viết **generator** trả về các số chẵn từ 0 đến 10.  
3. Viết generator **vô hạn** sinh dãy `2, 4, 8, 16, ...`.  
4. Viết generator **đếm từ 1 đến n** và **dừng lại khi nhận `true` từ next()`.  


