# 🧩 Indexed Collections trong JavaScript

## 1. Giới thiệu

**Indexed Collections** là những kiểu dữ liệu có **thứ tự (ordered)** và **được truy cập thông qua chỉ số (index)**.  
Hai loại chính:
- `Array` — mảng chuẩn trong JavaScript.
- `TypedArray` — mảng kiểu cố định, thường dùng cho xử lý dữ liệu nhị phân.

👉 Bài này tập trung vào **Array** — mảng cơ bản nhất trong JS.

---

## 2. Khái niệm về Array

Một **array** là một **danh sách có thứ tự** các giá trị (elements), truy cập qua **chỉ số (index)** bắt đầu từ `0`.

```js
const fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]); // "apple"
console.log(fruits[2]); // "cherry"
```

### ⚙️ Bản chất
- JS không có “kiểu dữ liệu mảng” riêng biệt.  
  → `Array` thực ra là **một đối tượng (object)** với **key là số**.
- Mỗi phần tử trong array là một thuộc tính (property).
- Array có thuộc tính đặc biệt là `.length`.

---

## 3. Cách tạo Array

### Cách 1: Dùng `[]` (array literal) ✅ **(Cách phổ biến nhất)**

```js
const arr = [1, 2, 3];
```

### Cách 2: Dùng `new Array()`

```js
const arr = new Array(1, 2, 3);
```

### Cách 3: Dùng hàm `Array()`

```js
const arr = Array(1, 2, 3);
```

> Cả 3 cách trên đều cho cùng kết quả. Tuy nhiên, có một điểm **quan trọng**:

#### ⚠️ Khi chỉ truyền 1 tham số dạng số:
```js
const arr1 = Array(3); // tạo mảng rỗng có length = 3 (3 empty slots)
const arr2 = [3];      // tạo mảng có 1 phần tử là 3
```

#### Tạo mảng rỗng có độ dài sẵn:
```js
const arr = [];
arr.length = 5;
console.log(arr); // [ <5 empty items> ]
```

#### Sử dụng `Array.of()` để an toàn hơn
```js
const arr = Array.of(9.3); // [9.3]
const arr2 = Array.of(9.3, 9.4); // [ 9.3, 9.4 ]
```

---

## 4. Truy cập phần tử

Truy cập bằng chỉ số (0-based):
```js
const arr = ["Wind", "Rain", "Fire"];
console.log(arr[0]); // Wind
console.log(arr[2]); // Fire
```

Truy cập thuộc tính như object:
```js
arr["length"]; // 3
```

---

## 5. Gán giá trị / Thêm phần tử

```js
const emp = [];
emp[0] = "Casey Jones";
emp[1] = "Phil Lesh";
```

Nếu gán **chỉ số không nguyên (non-integer)**:
```js
const arr = [];
arr[3.4] = "Oranges";
console.log(arr.length); // 0
console.log(Object.hasOwn(arr, 3.4)); // true

Object.hasOwn(obj, prop): 
- obj: đối tượng cần kiểm tra
- prop: tên thuộc tính (string hoặc symbol)
Trả về: true hoặc false
```
→ Không tạo phần tử mảng mà là **thuộc tính object**.

---

## 6. Thuộc tính `length`

- `length` luôn **lớn hơn chỉ số lớn nhất + 1**.
- Có thể **rút ngắn hoặc làm trống** mảng bằng cách gán lại `length`.

```js
const cats = ["Dusty", "Misty", "Twiggy"];
cats.length = 2;
console.log(cats); // ["Dusty", "Misty"]

cats.length = 0;
console.log(cats); // []
```

---

## 7. Duyệt mảng (Iteration)

### Cách 1: `for` cổ điển
```js
const colors = ["red", "green", "blue"];
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}
```

### Cách 2: `forEach()`
```js
colors.forEach(color => console.log(color));
```

### ⚠️ Không dùng `for...in` để duyệt mảng
Vì nó sẽ lặp qua **cả thuộc tính không phải phần tử**.

---

## 8. Các phương thức thao tác mảng

### 🔸 Thêm / Xoá

| Phương thức | Mô tả | Ví dụ |
|--------------|-------|--------|
| `push()` | Thêm cuối mảng | `arr.push(5)` |
| `pop()` | Xoá cuối mảng | `arr.pop()` |
| `shift()` | Xoá đầu mảng | `arr.shift()` |
| `unshift()` | Thêm đầu mảng | `arr.unshift(1,2)` |
| `splice(start, deleteCount, ...items)` | Xoá/thay thế chèn | `arr.splice(1,2,"x","y")` |

---

### 🔸 Trích xuất / Sao chép

| Phương thức | Mô tả |
|--------------|-------|
| `slice(start, end)` | Cắt mảng (không ảnh hưởng mảng gốc) |
| `concat()` | Nối nhiều mảng |
| `flat(depth)` | Làm phẳng mảng con |
| `at(index)` | Truy cập phần tử, hỗ trợ chỉ số âm |

---

### 🔸 Tìm kiếm / Kiểm tra

| Phương thức | Mô tả |
|--------------|-------|
| `indexOf(value)` | Tìm vị trí đầu tiên |
| `lastIndexOf(value)` | Tìm từ cuối |
| `find(callback)` | Trả về phần tử đầu thỏa |
| `findLast(callback)` | Phần tử cuối thỏa |
| `findIndex(callback)` | Index đầu thỏa |
| `findLastIndex(callback)` | Index cuối thỏa |
| `includes(value)` | Có chứa giá trị không |

---

### 🔸 Biến đổi nội dung

| Phương thức | Kết quả |
|--------------|----------|
| `map()` | Tạo mảng mới từ giá trị trả về |
| `filter()` | Tạo mảng mới chỉ gồm phần tử thỏa |
| `flatMap()` | `map()` rồi `flat(1)` |
| `reduce()` | Gộp mảng thành một giá trị |
| `reduceRight()` | Gộp từ phải sang trái |
| `reverse()` | Đảo ngược |
| `sort(compareFn)` | Sắp xếp tại chỗ |
| `join(separator)` | Ghép thành chuỗi |

---

## 9. Sparse Arrays (Mảng thưa)

Mảng có **khe trống (empty slots)**:
```js
const a = [1, , 3];
console.log(a.length); // 3
```

⚠️ Một số hàm **bỏ qua slot trống**, ví dụ:
```js
a.forEach(v => console.log(v)); // chỉ log phần có giá trị
```
Nhưng `for...of` hoặc `spread` sẽ coi slot trống là `undefined`.

---

## 10. Mảng nhiều chiều (Nested Arrays)

```js
const matrix = new Array(3);
for (let i = 0; i < 3; i++) {
  matrix[i] = new Array(3);
  for (let j = 0; j < 3; j++) {
    matrix[i][j] = `[${i},${j}]`;
  }
}
console.log(matrix[1][2]); // "[1,2]"
```

---

## 11. Mảng có thể chứa thuộc tính khác

Mảng là object, nên có thể thêm property riêng:
```js
const arr = [1, 2, 3];
arr.owner = "Cu Than";
console.log(arr.owner); // "Cu Than"
```

---

## 12. Array-like Objects

Một số đối tượng “giống mảng” (có `length` và chỉ số) nhưng **không có phương thức của Array**, ví dụ:
- `arguments`
- `NodeList`

```js
function printArgs() {
  // arguments.forEach(...) ❌ không dùng được
  Array.prototype.forEach.call(arguments, arg => console.log(arg)); // ✅
}
```

---

## 13. Nhóm phần tử trong mảng

### `Object.groupBy()` — nhóm theo key chuỗi

```js
const inventory = [
  { name: "asparagus", type: "vegetables" },
  { name: "bananas", type: "fruit" },
  { name: "goat", type: "meat" },
  { name: "cherries", type: "fruit" },
  { name: "fish", type: "meat" },
];

const result = Object.groupBy(inventory, ({ type }) => type);
console.log(result.fruit);
// [
//   { name: "bananas", type: "fruit" },
//   { name: "cherries", type: "fruit" }
// ]
```

### `Map.groupBy()` — nhóm theo key phức tạp

```js
const mapResult = Map.groupBy(inventory, ({ type }) => type);
console.log(mapResult.get("meat"));
```

---

## 🧠 Mini Test

1. `Array(3)` và `[3]` khác nhau thế nào? [ <3 empty items> ] và [3]
2. Kết quả của:
   ```js
   const a = [1, 2, 3];
   a.length = 1;
   console.log(a); [1]
   ```
3. `for...in` và `for...of` khác nhau ra sao?
const arr = ["A", "B", "C"];

for (const index in arr) {
  console.log(index, arr[index]);
}
for (const value of arr) {
  console.log(value);
}

4. Cho `const nums = [1,2,3,4]`.  
   Viết 1 dòng code tạo mảng `["1","2","3","4"]`.
nums2 = nums.map(value => String(value))

---

## 🏋️ Bài tập nhỏ

**Bài 1:** Tạo một mảng gồm 10 số ngẫu nhiên (1–100)  
→ Lọc ra các số chẵn, rồi tính tổng của chúng.

**Bài 2:** Tạo mảng 2 chiều 3x3, trong đó phần tử = tổng của `i + j`.

Kết quả mong muốn:
```js
[
  [0,1,2],
  [1,2,3],
  [2,3,4]
]
```

---

## 🔚 Tổng kết

- `Array` là **object đặc biệt có chỉ số và length**.  
- Có rất nhiều **phương thức biến đổi, duyệt, tìm kiếm, lọc, gộp**.  
- Cẩn thận khi thao tác với **sparse arrays**.  
- Biết phân biệt **array** và **array-like object**.  
- Sử dụng `Array.of`, `Array.from` khi cần tạo mảng an toàn.

---
