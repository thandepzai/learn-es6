const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) resolve("thành công!");
    else reject(new Error("thất bại"));
  }, 100);
});

p.then((value) => console.log(value)).catch((err) =>
  console.error(err.message)
);

const testThen = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Thành công");
  }, 1000);
});

testThen
  .then((value) => {
    console.log(value + 1);
    return value + 1;
  })
  .then((value) => {
    console.log(value + 2);
    return value + 2;
  })
  .then((value) => {
    console.log(value + 3);
    return value + 3;
  })
  .then((value) => {
    console.log(value + 4);
    return value + 4;
  });

p.catch((err) => {
  console.log(err.message);
  return "Lại thành cong";
}).then((value) => console.log(value));

const p1 = new Promise((resolve) => setTimeout(() => resolve("🍎 Táo"), 1000));
const p2 = new Promise((resolve) =>
  setTimeout(() => resolve("🍌 Chuối"), 2000)
);
const p3 = new Promise((resolve) => setTimeout(() => resolve("🍇 Nho"), 1500));

Promise.all([p1, p2, p3])
  .then((values) => {
    console.log("Tất cả xong:", values);
  })
  .catch((err) => console.error("Có lỗi:", err));

const p4 = new Promise((resolve) => setTimeout(() => resolve("🍎 Táo"), 1000));
const p5 = new Promise((_, reject) =>
  setTimeout(() => reject("🍌 Chuối"), 2000)
);
const p6 = new Promise((resolve) => setTimeout(() => resolve("🍇 Nho"), 1500));

Promise.all([p4, p5, p6])
  .then((values) => {
    console.log("Tất cả xong-all:", values);
  })
  .catch((err) => console.error("Có lỗi-all:", err));

/* const getUser = () => fetch("/api/user").then(res => res.json());
const getPosts = () => fetch("/api/posts").then(res => res.json());
const getComments = () => fetch("/api/comments").then(res => res.json());

Promise.all([getUser(), getPosts(), getComments()])
  .then(([user, posts, comments]) => {
    console.log("👤 User:", user);
    console.log("📝 Posts:", posts);
    console.log("💬 Comments:", comments);
  })
  .catch(err => console.error("Lỗi khi tải dữ liệu:", err)); */

Promise.allSettled([p1, p2, p3])
  .then((values) => {
    console.log("Tất cả xong-allSettled:", values);
  })

Promise.allSettled([p4, p5, p6]).then((values) => {
  console.log("Tất cả xong:-allSettled", values);
});

Promise.any([p1, p2, p3]).then((values) => {
  console.log("Tất cả xong-any:", values);
});


function func1(x) {
  return new Promise(resolve => setTimeout(() => resolve(x + 1), 1000));
}
function func2(x) {
  return new Promise(resolve => setTimeout(() => resolve(x * 2), 500));
}
function func3(x) {
  return new Promise(resolve => setTimeout(() => resolve(x - 3), 200));
}
const initial = 5;
[func1, func2, func3].reduce(
  (promise, fn) => promise.then(fn), 
  Promise.resolve(initial)
).then(result => console.log("Kết quả cuối-Sequential composition:", result));



const controller = new AbortController();
const signal = controller.signal;

fetch('https://jsonplaceholder.typicode.com/todos/1', { signal })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === 'AbortError') console.log('Request bị hủy');
  });

setTimeout(() => controller.abort(), 10); // hủy sau 0.01s