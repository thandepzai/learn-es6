
# 🧠 **Buổi học: JavaScript Typed Arrays**

## 🎯 Mục tiêu buổi học

Sau buổi này, bạn sẽ hiểu được:

1. Sự khác biệt giữa `Array` và `TypedArray`.
2. Cấu trúc **Buffer ↔ View** trong bộ nhớ.
3. Cách dùng `ArrayBuffer`, `TypedArray` (như `Int8Array`, `Float32Array`...), và `DataView`.
4. Thực hành tạo nhiều view cùng xem chung 1 vùng bộ nhớ.
5. Ứng dụng thực tế: xử lý file, ảnh, WebGL, text nhị phân.

---

## 🧩 Phần 1: Lý thuyết

### 1. Typed Array là gì?

> 🔹 **Typed Arrays** là "mảng kiểu dữ liệu cố định" cho phép bạn đọc/ghi **dữ liệu nhị phân (binary data)** trực tiếp trong bộ nhớ.

Khác với mảng thường (`Array`), các phần tử trong `TypedArray`:
- Có **kích thước cố định** (1, 2, 4, 8 byte...),
- Lưu **dưới dạng nhị phân thực tế**, không phải kiểu dynamic JS object,
- **Không thể thay đổi độ dài**.

### Ví dụ:

```js
const arr = [1, 2, 3]; // mảng bình thường
const typed = new Uint8Array([1, 2, 3]); // typed array
```

So sánh:

| Tính năng                        | Array thường                 | TypedArray |
|----------------------------------|------------------------------|-------------|
| Độ dài                           | Thay đổi được                | Cố định |
| Kiểu dữ liệu                     | Hỗn hợp (number, string, …)  | Một kiểu cố định |
| push/pop                         | ✅ Có                        | ❌ Không có |
| Hiệu năng xử lý số liệu nhị phân | Chậm                         | ⚡ Rất nhanh |

---

### 2. Kiến trúc: **Buffer** và **View**

TypedArray được chia làm 2 tầng:

```
ArrayBuffer  ← chứa vùng nhớ thô (raw memory)
     ↑
   View (TypedArray hoặc DataView)  ← đọc/ghi dữ liệu theo kiểu
```

👉 `ArrayBuffer` chỉ là **vùng nhớ trống**, bạn không thể thao tác trực tiếp.  
Muốn đọc/ghi, bạn cần tạo **View**.

---

### 3. `ArrayBuffer`

Tạo vùng nhớ trống (đơn vị: byte):

```js
const buffer = new ArrayBuffer(16); // 16 bytes
console.log(buffer.byteLength); // 16
```

---

### 4. `TypedArray` (View)

Dùng `Int8Array`, `Uint8Array`, `Float32Array`, v.v. để xem (view) dữ liệu trong buffer:

```js
const view = new Int32Array(buffer);
for (let i = 0; i < view.length; i++) {
  view[i] = i * 2;
}
console.log(view); // [0, 2, 4, 6]
```

> Vì `Int32Array` dùng **4 bytes mỗi phần tử**, nên 16 bytes = 4 phần tử.

---

### 5. Nhiều View cùng nhìn 1 Buffer

```js
const int32View = new Int32Array(buffer);
const int16View = new Int16Array(buffer);

int32View[0] = 32;
console.log(int16View[0]); // 32
```

➡ Cả hai **chia sẻ cùng vùng nhớ** → sửa bên này, bên kia cũng đổi.

---

### 6. `DataView` – quyền năng thấp nhất nhưng linh hoạt nhất

Cho phép đọc/ghi dữ liệu ở vị trí bất kỳ, với **endianness (byte order)** tuỳ chọn.

```js
const buffer = new ArrayBuffer(4);
const view = new DataView(buffer);
view.setInt16(0, 500); // ghi 2 bytes đầu
console.log(view.getInt16(0)); // đọc lại: 500
```

---

### 7. Chuyển đổi qua lại

```js
const typed = new Uint8Array([1, 2, 3]);
const normal = Array.from(typed); // [1, 2, 3]
```

---

## 🧠 Mini test (Flashcard)

| Câu hỏi | Đáp án |
|----------|---------|
| `Array.isArray(new Uint8Array())` trả về gì? | ❌ `false` |
| Dùng đối tượng nào để quản lý vùng nhớ thô? | `ArrayBuffer` |
| Có thể dùng `push()` trên `TypedArray` không? | ❌ Không |
| `DataView` cho phép điều khiển byte-order (Endianness)? | ✅ Có |
| `Int32Array` mỗi phần tử chiếm bao nhiêu byte? | 4 bytes |

---

## 🧪 Bài tập nhỏ

### 🧩 Bài 1 — Ghi và đọc lại vùng nhớ

Tạo vùng nhớ 8 byte, dùng `Int16Array` để ghi `[100, 200, 300, 400]` vào đó, rồi dùng `Uint8Array` để in ra dữ liệu byte theo hệ 16.

👉 Gợi ý:
```js
const buf = new ArrayBuffer(8);
const int16 = new Int16Array(buf);
int16.set([100, 200, 300, 400]);

const uint8 = new Uint8Array(buf);
console.log(uint8.map(x => x.toString(16)));
```

---

### 🧩 Bài 2 — Đọc text từ buffer

Tạo một `Uint8Array` chứa chuỗi `"你好"` (theo mã UTF-8 `[228, 189, 160, 229, 165, 189]`)  
→ Dùng `TextDecoder` để chuyển lại thành chuỗi gốc.

---

## 💡 Ứng dụng thực tế

- Xử lý ảnh (`Canvas` – `Uint8ClampedArray`)
- Nhận dữ liệu nhị phân qua mạng (`WebSocket`, `fetch`)
- Làm việc với WebGL, WebAudio
- Đọc file `.wav`, `.png` hoặc `.dat` nhị phân

---

## 🔚 Tổng kết

| Thành phần | Chức năng |
|-------------|------------|
| `ArrayBuffer` | Bộ nhớ thô (raw memory) |
| `TypedArray` | View cấp cao, kiểu cố định (Int8, Float32, …) |
| `DataView` | View cấp thấp, tùy chỉnh kiểu và endianness |
| `SharedArrayBuffer` | Cho phép chia sẻ bộ nhớ giữa worker threads |
