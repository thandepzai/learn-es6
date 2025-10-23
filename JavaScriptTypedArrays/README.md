# 🧠 Buổi học: Giới thiệu từ đầu về JavaScript Typed Arrays

---

## 🎯 Mục tiêu
Sau buổi này bạn sẽ:
- Hiểu **vì sao JavaScript cần có TypedArray**.
- Biết TypedArray **giúp máy tính thao tác với dữ liệu nhị phân** như thế nào.
- Biết cách tạo và dùng `ArrayBuffer`, `TypedArray`, và `DataView`.
- Hiểu ý nghĩa của từ “Buffer” và “View”.

---

## 🚀 1. Vì sao có TypedArray?

JavaScript ban đầu sinh ra để xử lý **dữ liệu web (text, DOM, số)** — chứ không phải **dữ liệu nhị phân** (ảnh, âm thanh, video...).

Nhưng rồi web hiện đại có:
- WebGL (đồ họa 3D),
- WebAudio,
- WebSocket gửi file,
- xử lý file `.png`, `.wav`, `.dat`...

→ Cần **truy cập trực tiếp vào byte trong bộ nhớ** — điều mà `Array` bình thường không làm được.

### 🧩 Vấn đề của Array thường
```js
const arr = [10, 20, 30];
arr.push("abc"); // OK! JS cho phép phần tử lẫn lộn
```

➡ Mỗi phần tử trong Array có thể là **object**, **string**, **number**, nên trình duyệt phải quản lý linh hoạt → **tốn bộ nhớ và chậm**.

---

## ⚡ 2. Giải pháp: Typed Arrays

**Typed Arrays** cho phép bạn:
- Làm việc với **dữ liệu dạng nhị phân (byte-level)**.
- Mỗi phần tử có **kiểu dữ liệu cố định** (ví dụ: Int8, Float32...).
- Tốc độ truy cập cực nhanh (gần như C/C++).

```js
const arr = new Uint8Array([10, 20, 30]);
console.log(arr[1]); // 20
```

| Kiểu dữ liệu          | Kích thước (byte/phần tử)  | Khoảng giá trị                         | Mô tả |
|-----------------------|----------------------------|----------------------------------------|--------|
| `Int8Array`           | 1                          | -128 → 127                             | Số nguyên 8-bit có dấu |
| `Uint8Array`          | 1                          | 0 → 255                                | Số nguyên 8-bit không dấu |
| `Uint8ClampedArray`   | 1                          | 0 → 255 (giới hạn, không tràn)         | Dùng trong ảnh pixel (Canvas) |
| `Int16Array`          | 2                          | -32,768 → 32,767                       | Số nguyên 16-bit có dấu |
| `Uint16Array`         | 2                          | 0 → 65,535                             | Số nguyên 16-bit không dấu |
| `Int32Array`          | 4                          | -2,147,483,648 → 2,147,483,647         | Số nguyên 32-bit có dấu |
| `Uint32Array`         | 4                          | 0 → 4,294,967,295                      | Số nguyên 32-bit không dấu |
| `Float32Array`        | 4                          | ~1.2×10⁻³⁸ → ~3.4×10³⁸                 | Số thực 32-bit IEEE 754 |
| `Float64Array`        | 8                          | ~5×10⁻³²⁴ → ~1.8×10³⁰⁸                 | Số thực 64-bit IEEE 754 |
| `BigInt64Array`       | 8                          | -(2⁶³) → 2⁶³-1                         | Số nguyên 64-bit có dấu (`BigInt`) |
| `BigUint64Array`      | 8                          | 0 → 2⁶⁴-1                              | Số nguyên 64-bit không dấu (`BigInt`) |


---

## 🧱 3. Kiến trúc: Buffer ↔ View

Đây là **trái tim của Typed Array**.  
Hãy tưởng tượng như thế này:

> **Buffer** là “ổ cứng” chứa dữ liệu thô.  
> **View** là “cặp kính” giúp bạn nhìn dữ liệu theo định dạng bạn muốn.

**ArrayBuffer**: Là **vùng nhớ thô** (raw binary memory). Nó chỉ lưu các byte, chưa có định dạng hay kiểu dữ liệu.
  Ví dụ:`const buffer = new ArrayBuffer(16);` → tạo 16 byte trống
**TypedArray (View)**: Là **lớp nhìn (view)** đặt lên vùng nhớ đó, quy định **kiểu dữ liệu và cách đọc/ghi**. 
  Ví dụ: `new Int16Array(buffer)` đọc vùng nhớ dưới dạng các số nguyên 16-bit |

### Minh họa
```
[ArrayBuffer] — vùng nhớ 8 byte
       ↑
       │ chia sẻ vùng nhớ
       ↓
[Int16Array] View → đọc theo cặp 2 byte
[Float32Array] View → đọc theo 4 byte
```
### 🔍 Cách hoạt động
Khi bạn tạo:

```js
const buffer = new ArrayBuffer(8); // 8 byte = 64 bit
const view = new Int32Array(buffer); // mỗi phần tử = 4 byte
```
Thì view sẽ chia buffer ra thành 2 ô (mỗi ô 4 byte)
và khi bạn gán: view[0] = 42;

→ 42 được lưu trực tiếp vào vùng nhớ dưới dạng nhị phân 4 byte (IEEE hoặc two’s complement, tùy kiểu).
Không có cách nào để lưu "hello" hoặc { name: "A" } ở đây,vì View chỉ hiểu và đọc/ghi số trong định dạng nhị phân cố định.
---

Chuỗi (string): bạn phải chuyển chuỗi thành mã nhị phân (byte) trước, ví dụ:

```js
const encoder = new TextEncoder();
const bytes = encoder.encode("Hello"); // Uint8Array [72, 101, 108, 108, 111]
```

```js
const decoder = new TextDecoder();
console.log(decoder.decode(bytes)); // "Hello"
```

## 🧩 4. ArrayBuffer – vùng nhớ thô

`ArrayBuffer` là **kho chứa dữ liệu dạng byte**.  
Bạn không thể đọc/ghi trực tiếp — chỉ tạo vùng nhớ.

```js
const buffer = new ArrayBuffer(8); // tạo vùng nhớ 8 byte
console.log(buffer.byteLength); // 8
```

Hiện tại `buffer` chỉ là chỗ trống.  
Muốn “nhìn thấy” dữ liệu trong đó, bạn cần một **View**.

---

## 👁 5. View: TypedArray

Giả sử bạn muốn xem vùng nhớ này như là 4 số nguyên 16-bit:

```js
const view = new Int16Array(buffer); // mỗi phần tử = 2 byte
view[0] = 100;
view[1] = 200;

console.log(view); // [100, 200, 0, 0]
```

> Vì buffer có 8 byte → `Int16Array` có 8 / 2 = 4 phần tử.

---

## 🔄 6. Nhiều View cùng nhìn 1 Buffer

```js
const int16 = new Int16Array(buffer);
const uint8 = new Uint8Array(buffer);

int16[0] = 256;
console.log(uint8[0]); // 0
console.log(uint8[1]); // 1
```

➡ Cả hai cùng “nhìn” vào **cùng vùng nhớ**, chỉ khác **cách diễn giải byte**.

---

## 🔬 7. DataView – điều khiển byte từng chút

Nếu bạn cần linh hoạt hơn (`đọc từ byte 3`, `ghi Float32 ở byte 10`...),  
hãy dùng `DataView`.

```js
const buffer = new ArrayBuffer(8);
const dv = new DataView(buffer);

dv.setInt16(0, 300); // ghi 300 tại byte 0-1
dv.setFloat32(2, 3.14); // ghi float tại byte 2-5

console.log(new Uint8Array(buffer)); // Uint8Array(8) [1,  44, 64, 72, 245, 195,  0,  0]
console.log(dv.getInt16(0)); // 300
console.log(dv.getFloat32(3)); // 3.14
```
Phân tích từng phần
✅ dv.setInt16(0, 300)
Int16 = số nguyên 16-bit = 2 byte.
300 trong hệ 10 = 0x012C trong hệ 16.
Tùy hệ thống endianness, JavaScript (mặc định big-endian) sẽ lưu:
Byte 0 = 0x01 = 1
Byte 1 = 0x2C = 44

✅ dv.setFloat32(2, 3.14)
Float32 = số thực IEEE 754 32-bit (4 byte).
Số 3.14 được mã hoá trong binary như sau (ở dạng big-endian):0x4048F5C3
Chia ra:
Byte 2 = 0x40 = 64
Byte 3 = 0x48 = 72
Byte 4 = 0xF5 = 245
Byte 5 = 0xC3 = 195

✅ `DataView` cho phép:
- Đọc/ghi tại **vị trí byte bất kỳ**.
- Chọn **endianness** (`littleEndian`, `bigEndian`).

---

## 🧠 8. Khi nào dùng cái nào?

| Trường hợp | Dùng gì |
|-------------|----------|
| Cần vùng nhớ nhị phân | `ArrayBuffer` |
| Làm việc với mảng kiểu cố định (số nguyên, số thực...) | `TypedArray` |
| Đọc/ghi dữ liệu nhị phân hỗn hợp, byte-level | `DataView` |

---

## 🧩 9. Ví dụ thực tế

### 💡 Đọc dữ liệu ảnh pixel:
```js
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

console.log(imgData.data instanceof Uint8ClampedArray); // true
```

### 💡 Nhận dữ liệu nhị phân qua WebSocket:
```js
socket.binaryType = "arraybuffer";
socket.onmessage = (event) => {
  const data = new Uint8Array(event.data);
};
```

---

## 🧩 10. Mini Test

| Câu hỏi                                                | Đáp án      |
|--------------------------------------------------------|-------------|
| `Array.isArray(new Uint8Array())` → ?                  | ❌ false    |
| `ArrayBuffer` có thể thay đổi kích thước sau khi tạo?  | ❌ Không    |
| `Int32Array` mỗi phần tử chiếm mấy byte?               | 4 bytes     |
| Dùng đối tượng nào để thao tác từng byte?              | `DataView`  |
| Nhiều View có thể dùng chung một Buffer không?         | ✅ Có       |

---

## 🧪 Bài tập nhỏ

### Bài 1 — Xem vùng nhớ
```js
const buf = new ArrayBuffer(8);
const i16 = new Int16Array(buf);
i16.set([100, 200, 300, 400]);

const u8 = new Uint8Array(buf);
console.log(Array.from(u8)); // xem dữ liệu byte thô
```

### Bài 2 — Giải mã chuỗi từ byte
```js
const bytes = new Uint8Array([228, 189, 160, 229, 165, 189]);
const text = new TextDecoder().decode(bytes);
console.log(text); // "你好"
```

---

## 🔚 Tổng kết

| Thành phần | Vai trò |
|-------------|----------|
| `ArrayBuffer` | Bộ nhớ thô |
| `TypedArray` | View có kiểu cố định (Int8, Float32, ...) |
| `DataView` | View tùy chỉnh, điều khiển từng byte |
| `SharedArrayBuffer` | Dùng chia sẻ bộ nhớ giữa threads |

---

## 🧩 Tóm lại

- **TypedArray = tốc độ + kiểm soát bộ nhớ**
- Dữ liệu → `ArrayBuffer`  
- Cách đọc → `View` (`TypedArray` hoặc `DataView`)
- Rất hữu ích khi làm việc với **binary data**, **đồ họa**, **âm thanh**, **WebGL**, **WebSocket**, **file nhị phân**.
