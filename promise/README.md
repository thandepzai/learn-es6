# ✅ Học Promise (JavaScript) — Hướng dẫn chi tiết, chính xác

## 1. Khái niệm cơ bản
Promise là một **object** đại diện cho kết quả **tương lai** của một phép toán bất đồng bộ — có thể **fulfilled** (thành công), **rejected** (thất bại) hoặc **pending** (chưa xong).  
Promise **trả về** một đại diện, và ta **gắn callback** vào nó qua `.then()` / `.catch()` / `.finally()` thay vì truyền callback vào hàm.

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) resolve('thành công!');
    else reject(new Error('thất bại'));
  }, 1000);
});

p.then(value => console.log(value))
 .catch(err => console.error(err.message));
```

---

## 2. `.then()` trả về Promise mới — Chaining
`.then()` luôn trả về **Promise mới**, cho phép chain các bước liên tiếp:

```js
doSomething()
  .then(result => doSomethingElse(result))
  .then(newResult => doThirdThing(newResult))
  .then(final => console.log('Kết quả cuối:', final))
  .catch(err => console.error('Lỗi:', err));
```

**Lưu ý:** luôn `return` Promise bên trong `.then()`, nếu không sẽ bị “floating promise”.

---

## 3. Xử lý lỗi (`.catch()`)
`catch` bắt tất cả lỗi từ các bước trước nó, tương tự như `try/catch` trong code đồng bộ.

```js
doSomething()
  .then(() => doSomethingElse())
  .then(() => doThirdThing())
  .catch(error => console.error('Lỗi:', error));
```

```js
doA()
  .then(() => doB())
  .catch(err => console.error("Lỗi ở A hoặc B:", err))
  .then(() => doC())
  .catch(err => console.error("Lỗi ở C:", err));
```
📘 Nghĩa là:
Cái .catch() đầu chỉ bắt lỗi của doA() hoặc doB().
Cái .catch() sau chỉ bắt lỗi từ phần sau nó (doC()).


Bạn có thể “hồi phục” lỗi bằng cách trả về giá trị khác:

```js
doSomething()
  .catch(err => {
    console.warn('Lỗi, dùng giá trị mặc định', err);
    return defaultValue;
  })
  .then(val => console.log(val));
```

---

## 4. Nesting vs Flattening
- Tránh nesting nếu không cần — nên giữ chain **phẳng**.
- Nesting chỉ nên dùng khi cần **giới hạn phạm vi catch**.
- Nesting (lồng nhau) nghĩa là bạn viết Promise ở bên trong .then() của một Promise khác,
và không trả (return) Promise đó ra ngoài chain chính.
- Flattening nghĩa là giữ chuỗi Promise phẳng, bằng cách return Promise ở mỗi .then() thay vì lồng .then() mới.

```js
doSomethingCritical()
  .then(result =>
    doOptional(result)
      .then(opt => doExtra(opt))
      .catch(e => { /* bỏ qua lỗi optional */ })
  )
  .then(() => moreCriticalStuff())
  .catch(e => console.error('Critical failure:', e));
```

Nhược điểm của nesting:
Gây rối mắt, code bị “thụt vào” nhiều cấp.
.catch() bên ngoài không bắt được lỗi trong Promise lồng trong nếu không return.
Mất khả năng chain mượt giữa các bước.

---

## 5. Composition (chạy song song)

### Promise.all
```js
Promise.all([fetch(url1), fetch(url2)])
  .then(([r1, r2]) => Promise.all([r1.json(), r2.json()]))
  .then(([data1, data2]) => console.log(data1, data2))
  .catch(err => console.error('Một trong các promise bị lỗi', err));
```

### Promise.allSettled
Chờ **tất cả hoàn thành**, kể cả bị reject.

### Promise.any / Promise.race
Chạy đua giữa các promise, lấy kết quả đầu tiên settle.

Promise.any([...]) sẽ: Kết quả đầu tiên thành công
Bắt đầu chạy tất cả các Promise cùng lúc (song song)
Ngay khi một cái đầu tiên resolve (thành công) → nó resolve luôn cả Promise.any()
Các Promise còn lại (dù thành công hay lỗi sau đó) bị bỏ qua, không ảnh hưởng nữa.

Promise.race([...]) sẽ chạy tất cả Promise cùng lúc (song song)
**Resolve hoặc reject ngay khi Promise nào kết thúc đầu tiên, dù thành công hay lỗi.
Các Promise còn lại bị bỏ qua (kết quả của chúng không ảnh hưởng gì).

### Sequential composition
Sequential Composition với Promise — tức là chạy các async function theo thứ tự, chứ không song song.
```js
[func1, func2, func3].reduce((p, f) => p.then(f), Promise.resolve(initial));
```
1️⃣ Ý tưởng cơ bản

Giả sử bạn có các async function:
function func1(x) {
  return new Promise(resolve => setTimeout(() => resolve(x + 1), 1000));
}
function func2(x) {
  return new Promise(resolve => setTimeout(() => resolve(x * 2), 500));
}
function func3(x) {
  return new Promise(resolve => setTimeout(() => resolve(x - 3), 200));
}


Bạn muốn chạy func1, rồi func2, rồi func3
Và truyền kết quả của cái trước sang cái sau

2️⃣ Dùng .reduce() để xâu chuỗi
const initial = 5;
[func1, func2, func3].reduce(
  (promise, fn) => promise.then(fn), 
  Promise.resolve(initial)
).then(result => console.log("Kết quả cuối:", result));

---

## 6. Cancellation (hủy Promise)
Promise không hỗ trợ cancel trực tiếp.  
Dùng `AbortController` nếu API hỗ trợ (ví dụ `fetch`).

```js
const controller = new AbortController(); // tạo controller
const signal = controller.signal;         // lấy signal từ controller

fetch(url, { signal })                     // truyền signal vào fetch
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Đã hủy');             // bắt lỗi hủy
    } else {
      console.error(err);                 // lỗi khác
    } 
  });

// Hủy request bất cứ lúc nào
controller.abort();
```
Giải thích:
AbortController() tạo ra một signal dùng để kiểm soát tác vụ.
Khi gọi controller.abort(), signal sẽ gửi tín hiệu hủy tới API (nếu nó hỗ trợ).
Trong fetch, khi bị hủy, promise sẽ reject với lỗi AbortError.
Các promise khác vẫn hoạt động bình thường nếu không bị hủy.

---

## 7. Tạo Promise từ API callback cũ

```js
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

Hoặc promisify API kiểu Node.js:

```js
const fs = require('fs');

function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
```

---

## 8. Timing — microtasks vs tasks

`.then()` callback luôn được xếp vào **microtask queue**, nên chạy **sau** call stack hiện tại nhưng **trước** `setTimeout`.

```js
Promise.resolve().then(() => console.log(2));
console.log(1);
// Logs: 1, 2
```

```js
const wait = ms => new Promise(r => setTimeout(r, ms));

wait(0).then(() => console.log(4));
Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));
console.log(1); // Logs: 1, 2, 3, 4
```

---

## 9. Unhandled rejections
Khi nào xảy ra unhandled rejection?
Khi một Promise bị reject mà không có .catch() hay handler nào
JavaScript sẽ gửi event ra toàn bộ context, thay vì im lặng.
Mục đích: tránh Promise “bị bỏ quên” → lỗi tiềm ẩn.

### Browser:
```js
window.addEventListener('unhandledrejection', e => {
  console.error('Unhandled rejection:', e.reason);
});
```

### Node.js:
```js
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});
```

---

## 10. Best Practices (Tóm tắt)
1. Luôn `return` Promise trong `.then()` nếu sau nó có `.then()`.
2. Luôn `.catch()` để tránh lỗi không được xử lý.
3. Tránh nesting không cần thiết.
4. `.then()` luôn trả về Promise mới.
5. Dùng `Promise.all` cho chạy song song, chain cho chạy nối tiếp.
6. Biết rằng Promise không thể hủy (cần AbortController).
7. Dùng `async/await` để code rõ ràng hơn.

---

## 11. async/await
`async` function luôn trả về Promise.  
`await` giúp code trông đồng bộ nhưng vẫn không chặn luồng.

```js
async function main() {
  try {
    const result = await doSomething();
    const x = await doSomethingElse(result);
    await doThirdThing(x);
  } catch (err) {
    console.error(err);
  }
}
```

---

## 12. Ví dụ thực tế

```js
async function fetchUserData(userId) {
  try {
    const userRes = await fetch(`/api/user/${userId}`);
    if (!userRes.ok) throw new Error('User fetch failed');
    const user = await userRes.json();

    const postsPromise = fetch(`/api/posts?user=${userId}`).then(r => r.json());
    const avatarPromise = fetch(user.avatarUrl).then(r => r.blob());

    const [posts, avatarBlob] = await Promise.all([postsPromise, avatarPromise]);

    return { user, posts, avatarBlob };
  } catch (err) {
    console.error('fetchUserData error', err);
    throw err;
  }
}
```

---

## 13. Bài tập thực hành
1. Viết `delay(ms)` trả về Promise chờ `ms` ms.
2. Viết `retry(fn, times)` — gọi `fn` lại tối đa `times` lần nếu reject.
3. Dùng `Promise.allSettled` để gọi 5 API song song và in kết quả.
4. Viết `promisify(fn)` cho API callback `(err, data) => {}`.

---

## 14. Tóm tắt ngắn gọn (Cheat Sheet)
| Mệnh lệnh | Mô tả |
|------------|--------|
| `.then(onFulfilled, onRejected)` | Xử lý kết quả hoặc lỗi |
| `.catch(fn)` | Bắt lỗi |
| `.finally(fn)` | Chạy cuối cùng |
| `Promise.all([...])` | Chờ tất cả thành công |
| `Promise.allSettled([...])` | Chờ tất cả hoàn thành |
| `Promise.race([...])` | Kết quả đầu tiên settle |
| `Promise.any([...])` | Kết quả đầu tiên thành công |
| `async/await` | Cú pháp tiện lợi của Promise |

---

© 2025 — Học Promise chi tiết by ChatGPT GPT-5
