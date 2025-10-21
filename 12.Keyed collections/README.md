# Map, Set, WeakMap, WeakSet
---

## 1. Tổng quan ngắn gọn (tính chất chính)
- **Map**: lưu cặp *key → value*. Key có thể là bất cứ giá trị nào (object, function, primitive). Duy trì **thứ tự chèn** khi lặp. Có `.size`.
- **Set**: tập hợp các giá trị **duy nhất** (unique). Duy trì **thứ tự chèn**. Có `.size`.
- **WeakMap**: giống Map nhưng **chỉ chấp nhận key là object (hoặc non-registered symbol)**, tham chiếu tới key là **yếu** (weak) → key có thể bị GC, không hỗ trợ lặp/`.size`.
- **WeakSet**: giống Set nhưng chỉ chứa objects (hoặc non-registered symbols), tham chiếu yếu, không thể lặp.

- **Quy tắc so sánh key/value**: Map key equality và Set value equality dùng **SameValueZero**:
  - Tương tự `===` cho hầu hết trường hợp.
  - **Khác**: `NaN` được coi là bằng chính nó (NaN == NaN trong SameValueZero).
  - `+0` và `-0` được coi là **bằng nhau**.

---

## 2. Map — chi tiết API & ví dụ

### Tạo Map
```js
const m = new Map();            // rỗng
const m2 = new Map([["a",1]]);  // khởi tạo từ array of [key, value]
```

### Phương thức quan trọng
- `m.set(key, value)` — thêm hoặc ghi đè.
- `m.get(key)` — trả giá trị (hoặc `undefined` nếu không tồn tại).
- `m.has(key)` — boolean.
- `m.delete(key)` — xóa, trả về true/false.
- `m.clear()` — xóa toàn bộ.
- `m.size` — số cặp trong Map.
- `m.keys()`, `m.values()`, `m.entries()` — trả iterator.
- `m.forEach((value, key) => {})` — duyệt.

### Ví dụ
```js
const sayings = new Map();
sayings.set("dog", "woof");
sayings.set("cat", "meow");
sayings.set("elephant", "toot");

console.log(sayings.size);        // 3
console.log(sayings.get("dog"));  // "woof"
console.log(sayings.get("fox"));  // undefined

for (const [k, v] of sayings) {
  console.log(`${k} -> ${v}`);
}
// Lặp theo thứ tự chèn
```

### Key không phải string
```js
const objKey = {id: 1};
const fKey = () => {};
const map = new Map();
map.set(objKey, "object value");
map.set(fKey, "function value");

console.log(map.get(objKey)); // "object value"
```
**Chú ý**: object keys so sánh theo **tham chiếu** (reference). Hai object có cùng nội dung nhưng khác reference là khác key.

---

## 3. Set — chi tiết API & ví dụ

### Tạo Set
```js
const s = new Set();
const s2 = new Set([1,2,3]);
```

### Phương thức quan trọng
- `s.add(value)` — thêm giá trị (nếu chưa tồn tại).
- `s.has(value)` — kiểm tra.
- `s.delete(value)` — xóa phần tử.
- `s.clear()` — xóa hết.
- `s.size` — số phần tử.
- `s.keys()` / `s.values()` — iterator (vì Set chỉ chứa value, keys == values).
- `s.entries()` — iterator trả `[value, value]` (tương thích với Map-style).
- `s.forEach(v => {})` — duyệt.

### Ví dụ
```js
const mySet = new Set();
mySet.add(1);
mySet.add("some text");
mySet.add("some text"); // không thêm lần 2
console.log(mySet.size); // 2

for (const x of mySet) console.log(x);
```

### Chuyển đổi giữa Array ↔ Set
```js
const arr = [1,2,2,3];
const unique = new Set(arr);     // loại bỏ duplicate
const uniqueArr = Array.from(unique); // [1,2,3]
// hoặc: const uniqueArr = [...new Set(arr)];
```

---

## 4. WeakMap & WeakSet — vì sao và giới hạn

### WeakMap
- Key **phải** là objects (hoặc non-registered Symbol). Primitive (string, number, true...) **không được phép**.
- Tham chiếu đến key **yếu**: nếu không còn tham chiếu mạnh tới object key ở nơi khác, GC có thể thu dọn key và cặp tương ứng trong WeakMap.
- **Không** có `.size`, **không** thể lặp (`for..of`, `keys()`...), vì trạng thái phụ thuộc GC (không xác định).
- API: `set`, `get`, `has`, `delete` — giống Map nhưng không enumerate.

**Use-case**: lưu data "riêng tư/ẩn" liên quan tới object, ví dụ metadata cho DOM nodes mà không gây memory leak.

Ví dụ:
```js
const privates = new WeakMap();

function MyClass() {
  const secret = { counter: 0 };
  privates.set(this, secret);
}
MyClass.prototype.inc = function() {
  const s = privates.get(this);
  s.counter++;
};
```

### WeakSet
- Chỉ chứa objects (hoặc non-registered symbols).
- Tham chiếu yếu, không thể lặp, không `.size`.
- Dùng để đánh dấu (mark) object mà không gây leak:
```js
const seen = new WeakSet();
function track(node) {
  seen.add(node);
}
```

---

## 5. So sánh Map vs Object, Set vs Array

### Khi chọn **Map** thay **Object**:
- Key không phải string (ví dụ: object, function).
- Bạn cần `.size` dễ dàng.
- Bạn muốn duyệt theo **thứ tự chèn**.
- Bạn muốn tránh prototype inheritance pitfalls (`Object` có prototype keys trừ khi `Object.create(null)`).

### Khi chọn **Object**:
- Bạn cần toString/JSON dễ dàng (Map khi serialize cần xử lý đặc biệt).
- Key là chuỗi cố định (ví dụ cấu hình đơn giản).
- Bạn muốn prototype/POJO behavior (khi có logic per-property).

### Khi chọn **Set** thay **Array**:
- Bạn cần một tập hợp **duy nhất**.
- Xóa theo value thường xuyên (Set.delete faster conceptually).
- Kiểm tra tồn tại nhiều lần (Set.has O(1)).

### Khi dùng **Array**:
- Bạn cần **order + index** access, slicing, mapping/filtering, reduce... Array có công cụ phong phú hơn.

---

## 6. Quy tắc equality (SameValueZero) — các ví dụ quan trọng
- `NaN` === `NaN` ? **false**, nhưng trong Set/Map SameValueZero coi **NaN là bằng NaN**.
```js
const s = new Set();
s.add(NaN);
console.log(s.has(NaN)); // true
```
- `+0` và `-0` được coi là **bằng nhau** trong SameValueZero (như `===`).
- Object so sánh theo **tham chiếu**:
```js
const a = {};
const b = {};
const m = new Map();
m.set(a, 1);
console.log(m.get(b)); // undefined (a !== b)
```

---

## 7. Các “bẫy” (pitfalls) & best practices
- **Serializing Map/Set**: `JSON.stringify` không trực tiếp support. Nếu cần lưu, chuyển Map→Array (ví dụ `Array.from(map.entries())`) hoặc định nghĩa cách serialize.
- **Object keys vs Map keys**: số và chuỗi được khác xử lý trong Object (sẽ convert key sang string), nên nếu bạn làm số 1 vs "1" trong Map thì khác nhau; trong Object `obj[1]` tương đương `obj["1"]`.
- **WeakMap không thể enumerate** → không dùng nếu bạn cần liệt kê keys.
- **Không dùng primitives làm key trong WeakMap** → lỗi.
- **Performance**: Map/Set có thao tác cơ bản (get/set/has/delete) trung bình O(1). Với tập lớn, Map/Set thường nhanh hơn thao tác tìm/xóa trong Array (indexOf + splice).
- **Memory**: WeakMap/WeakSet giúp tránh memory leak khi lưu metadata liên quan object có vòng đời ngắn.

---

## 8. Các ví dụ thực tế / patterns

### 8.1 Lưu metadata cho object (WeakMap)
```js
const meta = new WeakMap();

function attachMeta(obj, data) {
  meta.set(obj, data);
}
function getMeta(obj) {
  return meta.get(obj);
}

const el = document.createElement('div');
attachMeta(el, { clicked: false });
// Khi el bị remove và không còn tham chiếu, meta entry sẽ có thể được GC
```

### 8.2 Implement set operations (union/intersection/difference)
```js
function union(setA, setB) { //Hợp của hai tập hợp
  return new Set([...setA, ...setB]);
}
const a = new Set([1, 2, 3]);
const b = new Set([3, 4, 5]);
console.log(union(a, b)); // Set(5) {1, 2, 3, 4, 5}

function intersection(setA, setB) { //Giao của hai tập hợp
  return new Set([...setA].filter(x => setB.has(x)));
}
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);
console.log(intersection(a, b)); // Set(2) {2, 3}

function difference(setA, setB) { //Hiệu của hai tập hợp
  return new Set([...setA].filter(x => !setB.has(x)));
}
const a = new Set([1, 2, 3]);
const b = new Set([2, 4]);
console.log(difference(a, b)); // Set(2) {1, 3}
```

---

## 9. Bài tập nhỏ (thực hành)
1. **Tạo một `Map` lưu điểm (score) của học sinh theo đối tượng `{id, name}` làm key.**  
   - Viết function `addScore(map, studentObj, score)` và `getScore(map, studentObj)`.  
   - Kiểm tra: hai object có cùng nội dung nhưng khác reference => khác key.

2. **Loại bỏ duplicate từ mảng string, nhưng giữ thứ tự ban đầu.**  
   - Viết function `uniquePreserveOrder(arr)` trả về mảng mới.

3. **Dùng WeakSet để đánh dấu DOM nodes đã được xử lý.**  
   - Viết `process(node)` chỉ xử lý node nếu `!seen.has(node)` và lưu vào `seen` sau khi xử lý.

---

## 10. Mini-test (tự kiểm tra)
Trả lời rồi đối chiếu đáp án bên dưới.

**Q1.** Khi nào dùng `Map` thay vì `Object`? (nêu 2 lý do)

**Q2.** Kết quả của đoạn mã sau là gì?
```js
const m = new Map();
m.set(NaN, "not a number");
console.log(m.has(NaN));
```

**Q3.** Có thể dùng `string` làm key trong `WeakMap` không? Tại sao?

**Q4.** Viết 1 dòng code chuyển `Set` thành `Array`.

---

## 11. Đáp án mini-test
**A1.** Ví dụ: (1) khi key không phải string (ví dụ object/function), (2) khi cần `.size` và duy trì thứ tự chèn / cần lặp rõ ràng. (Còn nhiều lý do khác: key là primitives nhưng cần phân biệt types; performance khi thao tác nhiều….)

**A2.** `true` — vì Map dùng SameValueZero, NaN được coi là bằng chính nó.

**A3.** **Không**. WeakMap chỉ chấp nhận object (hoặc non-registered symbols) làm key. Primitives (string, number, boolean) không thể làm key vì WeakMap phải giữ reference yếu tới object để GC hoạt động.

**A4.** `const arr = Array.from(mySet);`  hoặc `const arr = [...mySet];`

---

## 12. Tài nguyên tham khảo (tự tìm khi cần)
- MDN: Map, Set, WeakMap, WeakSet — để tra API chi tiết và ví dụ.
- ECMAScript spec — để hiểu SameValueZero chi tiết.

---

## 13. Muốn tiếp tục?
Nếu bạn muốn, tôi có thể:
- Làm **bài giải chi tiết** cho 3 bài tập ở mục 9 (viết code hoàn chỉnh + giải thích).
- Viết **bài kiểm tra** 8 câu để ôn lại (có đáp án).
- Hoặc soạn **1 buổi học dạng slide/cheatsheet** để in ra.

Bạn muốn mình làm gì tiếp theo? 😊



# 🧭 Tổng hợp: Map, WeakMap, Set, WeakSet trong JavaScript

## 🗺️ **Map**
- 🔑 **Key**: bất kỳ (string, number, object, symbol)
- 💾 **Lưu trữ**: cặp `key → value`
- ⚙️ **API**: `.set()`, `.get()`, `.has()`, `.delete()`, `.clear()`, `.keys()`, `.values()`, `.entries()`
- 🔍 **Duyệt được** (`for..of`, `.keys()`, `.values()`)
- 📏 Có `.size`
- 🧱 **Giữ tham chiếu mạnh** (key không tự xóa)
- 🧠 **Dùng khi** cần lưu cặp khóa–giá trị giống Object nhưng linh hoạt hơn (key không giới hạn kiểu)

🧩 WeakMap
- 🔑 Key: chỉ object (hoặc symbol đặc biệt)
- 💾 Lưu trữ: cặp object → value
- ♻️ GC tự dọn: khi object key bị xóa, entry trong WeakMap biến mất
- ❌ Không thể duyệt, không có .size()
- ⚙️ API: .set(), .get(), .has(), .delete()
- 🧱 Giữ tham chiếu yếu (weak reference)
- 🧠 Dùng khi cần gắn data "ẩn" vào object mà không lo rò rỉ bộ nhớ.

🧮 Set
- 💾 Lưu trữ: giá trị duy nhất
- 🔑 Không có key, value chính là key
- ⚙️ API: .add(), .has(), .delete(), .clear(), .keys(), .values(), .entries()
- 🔍 Duyệt được (for..of)
- 📏 Có .size
- 🧱 Giữ tham chiếu mạnh
- 🧠 Dùng khi cần danh sách không trùng lặp.

WeakSet

💾 Lưu trữ: chỉ object, không phải primitive
- ♻️ GC tự dọn: khi object bị xóa, entry biến mất
- ❌ Không thể duyệt, không có .size()
- ⚙️ API: .add(), .has(), .delete()
- 🧱 Giữ tham chiếu yếu (weak reference)
- 🧠 Dùng khi cần theo dõi object tạm thời (đánh dấu, cache tạm...).


Loại	       Key	            Value        	      Duyệt được	    GC tự dọn	   Giữ mạnh/yếu
Map	✅       Bất kỳ	        ✅ Bất kỳ	          ✅ Có	         ❌ Không	    🔒 Mạnh
WeakMap	     ⚠️ Chỉ object	 ✅ Bất kỳ	           ❌ Không	      ✅ Có	       🧩 Yếu
Set	         ❌	            ✅ Giá trị duy nhất	✅ Có	         ❌ Không	    🔒 Mạnh
WeakSet	     ⚠️ Chỉ object	 ❌	                 ❌ Không	      ✅ Có	       🧩 Yếu