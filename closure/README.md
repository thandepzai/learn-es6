# 🧠 Hiểu về **Closure** trong JavaScript

## 🔹 Định nghĩa (dịch từ MDN)

> **Closure** là sự kết hợp giữa một **hàm** và các **tham chiếu đến môi trường bao quanh nó** (lexical environment).  
> Nói cách khác, **closure** cho phép một hàm **truy cập vào các biến trong phạm vi bên ngoài của nó**.  
> Trong JavaScript, **một closure được tạo ra mỗi khi một hàm được tạo**, tức là tại **thời điểm khai báo hàm**.

---

## 🔹 Giải thích dễ hiểu

Trong JavaScript, **mỗi hàm “nhớ” nơi nó được tạo ra** — tức là nó nhớ những biến có sẵn ở phạm vi bên ngoài nó.  
→ Cái khả năng “ghi nhớ phạm vi” này chính là **closure**.

---

## 🔹 Ví dụ minh họa

```js
function outer() {
  let counter = 0; // biến trong phạm vi outer

  function inner() {
    counter++; // inner vẫn có thể dùng biến counter của outer
    console.log(counter);
  }

  return inner;
}

const count = outer(); // outer chạy xong, trả về hàm inner

count(); // 👉 1
count(); // 👉 2
count(); // 👉 3
```

## 🔹 Giải thích ví dụ trên tại sao lại hoạt động được như thế

Lúc mà hàm **outer()** chạy:

- JavaScript tạo ra một vùng nhớ chứa **counter**.
- Hàm **inner** được tạo ra, và nó **giữ một tham chiếu (reference)** đến vùng nhớ đó.
- Khi **outer()** kết thúc, bình thường vùng nhớ của **counter** sẽ bị thu hồi (vì hết phạm vi).
- Nhưng — do **inner** vẫn đang giữ tham chiếu đến vùng đó, và bạn còn gán **inner** vào biến **count** ở ngoài, nên:
  - **inner** vẫn tồn tại trong bộ nhớ,
  - và vùng nhớ chứa **counter** cũng chưa bị xóa, vì nó vẫn đang được closure **inner** dùng.
- JavaScript chỉ thu hồi (GC — garbage collect) khi không còn bất kỳ tham chiếu nào đến vùng nhớ đó nữa.
- Khi bạn gán **count = null**, lúc này **inner** không còn được tham chiếu, và **counter** cũng sẽ bị xóa theo.

````markdown
# 🧠 1. Lexical Scoping là gì?

**Lexical scoping** (hay còn gọi là **static scoping**) là quy tắc xác định **phạm vi biến (variable scope)** dựa trên **vị trí viết trong mã nguồn**
— chứ không phải dựa vào nơi hàm được gọi.

**Nói dễ hiểu:**

> Hàm con luôn “biết” những biến nào tồn tại trong phạm vi mà nó được **viết ra**, không quan trọng nó được **gọi ở đâu**.

---

# 📘 2. Phân tích ví dụ

```js
function init() {
  var name = "Mozilla"; // name là biến cục bộ (local) trong init

  function displayName() {
    // displayName() là hàm con được định nghĩa bên trong init
    console.log(name); // dùng biến name của hàm cha
  }

  displayName();
}

init();
```
````

### 🔍 Giải thích từng bước

1. Khi `init()` chạy, JS tạo ra một **phạm vi (scope)** riêng cho nó.  
   Trong scope này có biến:  
   `name = "Mozilla"`

2. Bên trong `init()`, ta định nghĩa hàm `displayName()`.  
   Tại thời điểm định nghĩa, JS **ghi nhớ** rằng `displayName` được viết bên trong `init`,  
   nên nó có quyền truy cập tới tất cả biến của `init`.

3. Khi `displayName()` được gọi, JS tìm biến `name`:

   - Tìm trong scope riêng của `displayName` → không có.
   - Leo lên scope cha (`init`) → tìm thấy `name`.  
     👉 In ra `"Mozilla"`.

4. Dù `displayName` không có biến cục bộ nào, nó vẫn truy cập được biến của hàm cha nhờ **lexical scoping**.  
   (Biến cục bộ chỉ sống trong phạm vi mà nó được khai báo.)

---

# ⚙️ var, let, const và phạm vi

```js
function test() {
  if (true) {
    var x = 10;
  }
  console.log(x); // ✅ 10 — vẫn thấy được
}
test();

if (true) {
  let y = 20;
  console.log(y); // ✅ 20
}
console.log(y); // ❌ ReferenceError
```

- `var` có **function scope** (toàn hàm) hoặc **global scope** nếu nằm ngoài hàm.
- `let` và `const` có **block scope** (chỉ sống trong `{}`).

→ Vì thế `var` bị “rò” ra ngoài `if`, còn `let/const` thì không.

---

# 🔍 3. Vì sao gọi là “lexical”?

Từ **lexical** nghĩa là “liên quan đến cấu trúc code, nơi từ ngữ được viết ra”.

JS phân tích phạm vi biến **ngay từ lúc đọc mã nguồn (compile phase)** —  
nó nhìn xem mỗi hàm được viết ở đâu để quyết định hàm đó thấy được những biến nào.

Điều này **không phụ thuộc vào**:

- nơi hàm được gọi (call site),
- hay thứ tự thực thi (runtime order).

---

# 🧩 4. So sánh “scope theo vị trí” và “scope theo thời điểm gọi”

```js
var name = "Global";
function outer() {
  var name = "Outer";

  function inner() {
    console.log(name);
  }

  return inner;
}
const fn = outer();
fn(); // In ra "Outer", KHÔNG phải "Global"
```

👉 Dù `fn()` được gọi ở **global scope**,  
nhưng `inner` được định nghĩa **bên trong `outer`**,  
nên nó luôn “nhìn thấy” biến `name` của `outer`,  
chứ không phải biến toàn cục.

> Đó là **lexical scoping**: phạm vi của biến được xác định theo **vị trí định nghĩa hàm**, chứ không phải nơi gọi hàm.

---

# 🔒 5. Lexical Scope & Closure

Lexical scope là nền tảng giúp **closure** hoạt động.  
Closure giữ lại các biến trong lexical scope của hàm tại **thời điểm nó được định nghĩa**.

Nghĩa là:

- Khi hàm con được trả ra ngoài (`return`),
- Nó **vẫn nhớ** được những biến của hàm cha,
- Vì lexical scope **không bị “mất”** khi hàm cha kết thúc.

````



# 📘 Closure trong JavaScript

## 1. Closure là gì?

**Closure = Hàm + Môi trường từ vựng (lexical environment) của nó.**

Nói cách khác:
Khi một hàm được tạo ra, **JavaScript lưu lại tất cả biến trong phạm vi mà hàm đó được định nghĩa.**
Nếu hàm đó được **trả ra ngoài**, nó vẫn **giữ tham chiếu tới các biến đó.**

---

## 2. Ví dụ cơ bản

```js
function outer() {
  let counter = 0;

  function inner() {
    counter++;
    console.log(counter);
  }

  return inner;
}

const count = outer();
count(); // 1
count(); // 2
count(); // 3
````

**Giải thích ngắn:**

- `outer` tạo biến `counter` và định nghĩa `inner`.
- Khi `outer` kết thúc, `inner` vẫn _giữ tham chiếu_ tới môi trường chứa `counter`.
- Vì vậy gọi `count()` vẫn tăng và in được `counter`.

---

## 3. Ví dụ trả về hàm (tương tự init)

```js
function makeFunc() {
  const name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

const myFunc = makeFunc();
myFunc(); // "Mozilla"
```

**Điểm thú vị:** `displayName` được trả về **trước** khi được gọi, nhưng vẫn truy cập được `name` — vì `displayName` mang theo môi trường (closure) nơi nó được tạo.

---

## 4. Ví dụ makeAdder (function factory)

```js
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12
```

**Giải thích:**

- `makeAdder` tạo ra các hàm mới có cùng thân hàm nhưng khác **lexical environment**:
  - `add5` nhớ `x = 5`
  - `add10` nhớ `x = 10`
- Mỗi closure giữ **state riêng** của mình.

---

## 5. Tại sao closure hữu ích (practical closures)

- Cho phép **gắn dữ liệu** vào một hàm (giống object giữ property + method).
- Tạo **state riêng tư** (private variables) mà không cần class.
- Rất tiện cho **callbacks / event handlers** trong frontend — mỗi callback có thể giữ config riêng.

---

## 6. Ví dụ ứng dụng: thay đổi kích cỡ chữ (button handlers)

### CSS

```css
body {
  font-family: "Helvetica", "Arial", sans-serif;
  font-size: 12px;
}

h1 {
  font-size: 1.5em;
}
h2 {
  font-size: 1.2em;
}
```

### JavaScript

```js
function makeSizer(size) {
  return () => {
    document.body.style.fontSize = `${size}px`;
  };
}

const size12 = makeSizer(12);
const size14 = makeSizer(14);
const size16 = makeSizer(16);

document.getElementById("size-12").onclick = size12;
document.getElementById("size-14").onclick = size14;
document.getElementById("size-16").onclick = size16;
```

### HTML

```html
<button id="size-12">12</button>
<button id="size-14">14</button>
<button id="size-16">16</button>
<p>This is some text that will change size when you click the buttons above.</p>
```

**Ý tưởng:** mỗi hàm `makeSizer(size)` giữ riêng `size` trong closure, nên mỗi nút gọi đúng giá trị đã đóng gói.





# 🔗 Closure Scope Chain trong JavaScript

## 1. Khái niệm

Một hàm lồng nhau (nested function) có thể **truy cập vào scope của hàm cha**, và **scope của hàm cha có thể truy cập tiếp ra ngoài**, tạo thành **một chuỗi phạm vi (scope chain)**.

---

## 2. Ví dụ: chuỗi hàm lồng nhau

```js
// global scope
const e = 10;

function sum(a) {
  return function (b) {
    return function (c) {
      // outer functions scope
      return function (d) {
        // local scope
        return a + b + c + d + e;
      };
    };
  };
}

console.log(sum(1)(2)(3)(4)); // 20
```

**Giải thích:**
- Biến `e` nằm ở **global scope**.  
- `a`, `b`, `c`, `d` nằm ở các **scope hàm khác nhau**.  
- Nhờ vào **closure**, hàm trong cùng (`sum` cuối cùng) vẫn có thể truy cập tất cả các biến bên ngoài nó — `a`, `b`, `c`, `d`, và `e`.  
- Đây là ví dụ hoàn hảo của **scope chain**.

---

## 3. Viết lại có tên hàm rõ ràng

```js
// global scope
const e = 10;

function sum(a) {
  return function sum2(b) {
    return function sum3(c) {
      // outer functions scope
      return function sum4(d) {
        // local scope
        return a + b + c + d + e;
      };
    };
  };
}

const sum2 = sum(1);
const sum3 = sum2(2);
const sum4 = sum3(3);
const result = sum4(4);
console.log(result); // 20
```

**Giải thích:**  
- Mỗi hàm con đều **“đóng”** (close over) các biến của hàm cha.  
- `sum4` có quyền truy cập đến toàn bộ chuỗi: `a → b → c → d → e`.  
- **Mọi closure đều có thể truy cập tất cả scope bên ngoài nó.**

---

## 4. Closure trong block scope

Closures không chỉ hoạt động với function scope mà còn với **block scope (let, const)**.

```js
function outer() {
  let getY;
  {
    const y = 6;
    getY = () => y;
  }
  console.log(typeof y); // undefined
  console.log(getY());   // 6
}

outer();
```

**Giải thích:**
- Biến `y` chỉ tồn tại trong block `{ ... }`.  
- Nhưng `getY` được tạo **bên trong block**, nên nó **đóng gói (close over)** `y`.  
- Dù block kết thúc, `getY()` vẫn nhớ và truy cập được giá trị `y`.

---

## 5. Closure trong Module Scope

Closures cũng có thể hoạt động với **module scope**, tạo ra “biến riêng tư” bên trong module.

### 📦 `myModule.js`
```js
let x = 5;
export const getX = () => x;
export const setX = (val) => {
  x = val;
};
```

- `x` không được export, nên không thể truy cập trực tiếp từ bên ngoài.  
- Nhưng `getX()` và `setX()` **đóng gói** biến `x`, cho phép đọc/ghi gián tiếp.

### 📂 Dùng module
```js
import { getX, setX } from "./myModule.js";

console.log(getX()); // 5
setX(6);
console.log(getX()); // 6
```

**Ý nghĩa:** Closure giúp module **bảo vệ biến nội bộ**, chỉ lộ ra các hàm truy cập hợp lệ.

---

## 6. Closure với Live Binding (import giá trị thay đổi được)

Các giá trị được `import` trong ES Modules là **live bindings** —  
tức là nếu giá trị gốc thay đổi, closure import cũng thấy được thay đổi đó.

### 📦 `myModule.js`
```js
export let x = 1;
export const setX = (val) => {
  x = val;
};
```

### 📦 `closureCreator.js`
```js
import { x } from "./myModule.js";

export const getX = () => x; // Close over imported live binding
```

### 📂 Main file
```js
import { getX } from "./closureCreator.js";
import { setX } from "./myModule.js";

console.log(getX()); // 1
setX(2);
console.log(getX()); // 2
```

**Giải thích:**  
- `getX` là closure đóng gói giá trị `x` được import.  
- Vì `x` là **live binding**, khi `setX` thay đổi `x`, closure cũng thấy giá trị mới.

---

## 7. Tóm tắt

| Phạm vi (Scope) | Closure có truy cập được không? | Ví dụ |
|-----------------|----------------------------------|--------|
| Function Scope  | ✅ Có                           | `sum(a)(b)(c)(d)` |
| Block Scope     | ✅ Có                           | `{ const y = 6 }` |
| Module Scope    | ✅ Có                           | `getX()`, `setX()` |

➡️ **Kết luận:**  
Closures trong JS tạo ra **chuỗi phạm vi (scope chain)** cho phép hàm con truy cập **mọi biến của các scope cha**, từ local → block → module → global.





# 🧠 Tạo Closure Trong Vòng Lặp

## ⚠️ Vấn đề: Closure trong vòng lặp với `var`

Trước khi từ khóa `let` được giới thiệu trong **ES6**, một lỗi rất phổ biến xảy ra khi tạo **closure** bên trong vòng lặp.

---

### ❌ Ví dụ lỗi:

```html
<p id="help">Gợi ý sẽ hiển thị ở đây</p>
<p>Email: <input type="text" id="email" name="email" /></p>
<p>Họ tên: <input type="text" id="name" name="name" /></p>
<p>Tuổi: <input type="text" id="age" name="age" /></p>
```

```js
function showHelp(help) {
  document.getElementById("help").textContent = help;
}

function setupHelp() {
  var helpText = [
    { id: "email", help: "Nhập địa chỉ email của bạn" },
    { id: "name", help: "Nhập họ tên đầy đủ" },
    { id: "age", help: "Nhập tuổi (phải trên 16)" },
  ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = function () {
      showHelp(item.help);
    };
  }
}

setupHelp();
```

🧩 **Kết quả:**  
Khi bạn focus vào **bất kỳ ô nào (email, name, age)**, luôn hiển thị cùng một gợi ý:  
👉 “Nhập tuổi (phải trên 16)”.

---

## 🧠 Giải thích chi tiết

### Hiểu rõ “vòng đời” của `item` (với `var`)

#### ✅ Bước 1: Khi JavaScript đọc function `setupHelp()`
- Biến `helpText` được khai báo trong phạm vi của `setupHelp`.
- Biến `item` cũng được khai báo trong cùng phạm vi đó (vì `var` có phạm vi **function-scope**).

#### ✅ Bước 2: Khi chạy vòng for

**Lần 1:**
- `i = 0`
- `item = helpText[0]` → `{ id: "email", help: "Nhập email" }`
- Gán `onfocus` cho phần tử `#email`:
  ```js
  document.getElementById("email").onfocus = function () {
    showHelp(item.help);
  };
  ```
  ⚠️ Chưa gọi hàm này, chỉ mới **định nghĩa** một hàm — nó sẽ chạy **sau này** khi người dùng focus.

**Lần 2:**
- `i = 1`
- `item = helpText[1]` → `{ id: "name", help: "Nhập họ tên" }`
- Gán `onfocus` cho `#name`
  → Tạo thêm 1 function mới, **nhưng vẫn dùng cùng biến `item`** với lần 1.

**Lần 3:**
- `i = 2`
- `item = helpText[2]` → `{ id: "age", help: "Nhập tuổi" }`
- Gán `onfocus` cho `#age`
  → Lại tạo thêm 1 function, **cũng dùng cùng biến `item`**.

#### ✅ Bước 3: Khi vòng lặp kết thúc
- `item` trỏ đến phần tử cuối cùng `{ id: "age", help: "Nhập tuổi" }`.
- Các hàm `onfocus` vẫn còn “sống” (chúng là **closure**) và vẫn **nhìn thấy cùng một biến `item`**.
- Khi người dùng focus, tất cả chúng đều lấy `item.help` hiện tại → “Nhập tuổi”.

---

## ✅ Cách khắc phục 1: Dùng “Function Factory”

Tạo thêm một hàm sinh closure riêng cho từng vòng lặp.

```js
function showHelp(help) {
  document.getElementById("help").textContent = help;
}

function makeHelpCallback(help) {
  return function () {
    showHelp(help);
  };
}

function setupHelp() {
  var helpText = [
    { id: "email", help: "Nhập địa chỉ email của bạn" },
    { id: "name", help: "Nhập họ tên đầy đủ" },
    { id: "age", help: "Nhập tuổi (phải trên 16)" },
  ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
  }
}

setupHelp();
```

➡️ Mỗi lần lặp, `makeHelpCallback` tạo ra **một môi trường closure mới**, giữ giá trị `help` riêng biệt.

---

## ✅ Cách khắc phục 2: Dùng IIFE (Hàm tự chạy)

```js
function setupHelp() {
  var helpText = [
    { id: "email", help: "Nhập địa chỉ email của bạn" },
    { id: "name", help: "Nhập họ tên đầy đủ" },
    { id: "age", help: "Nhập tuổi (phải trên 16)" },
  ];

  for (var i = 0; i < helpText.length; i++) {
    (function () {
      var item = helpText[i];
      document.getElementById(item.id).onfocus = function () {
        document.getElementById("help").textContent = item.help;
      };
    })();
  }
}

setupHelp();
```

✅ Mỗi lần vòng lặp chạy, hàm IIFE tạo ra **một scope riêng biệt**, giữ đúng `item` tại thời điểm đó.

---

## ✅ Cách khắc phục 3: Dùng `let` hoặc `const` (Cách hiện đại nhất)

```js
function showHelp(help) {
  document.getElementById("help").textContent = help;
}

function setupHelp() {
  const helpText = [
    { id: "email", help: "Nhập địa chỉ email của bạn" },
    { id: "name", help: "Nhập họ tên đầy đủ" },
    { id: "age", help: "Nhập tuổi (phải trên 16)" },
  ];

  for (let i = 0; i < helpText.length; i++) {
    const item = helpText[i];
    document.getElementById(item.id).onfocus = () => {
      showHelp(item.help);
    };
  }
}

setupHelp();
```

➡️ `let` và `const` có **phạm vi block**, nên **mỗi vòng lặp có một bản sao riêng của `item`**.  
Không cần closure phụ hay IIFE nữa.

---

## ⚡ Về hiệu năng (Performance)

Mỗi **closure** đều tạo ra một **phạm vi riêng trong bộ nhớ**.  
Nếu không cần closure, việc tạo quá nhiều sẽ làm chậm hiệu suất.

### ❌ Ví dụ KHÔNG nên làm:
```js
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();

  this.getName = function () {
    return this.name;
  };
  this.getMessage = function () {
    return this.message;
  };
}
```

➡️ Mỗi lần tạo `new MyObject()`, 2 hàm mới (`getName`, `getMessage`) lại được tạo lại → **tốn bộ nhớ**.

---

### ✅ Cách đúng: Dùng `prototype`
```js
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}

MyObject.prototype.getName = function () {
  return this.name;
};

MyObject.prototype.getMessage = function () {
  return this.message;
};
```

➡️ Mọi instance của `MyObject` **chia sẻ chung** 2 hàm trong prototype → **tiết kiệm bộ nhớ, chạy nhanh hơn**.
