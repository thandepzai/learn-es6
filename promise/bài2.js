//2. Viết `retry(fn, times)` — gọi `fn` lại tối đa `times` lần nếu reject.

async function retry(fn, times) {
  for (let i = 0; i < times; i++) {
    try {
      const value = await fn(); // ✅ gọi fn() mỗi lần (nếu là function)
      console.log("Thành công lần", i + 1, "→", value);
      return value;
    } catch (err) {
      console.log("Lỗi lần", i + 1);
    }
  }
  throw new Error("Thất bại sau " + times + " lần thử");
}

const hehe = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) resolve("thành công!");
      else reject(new Error("thất bại"));
    }, 100);
  });

retry(hehe, 5);

// Promise.any
[hehe, hehe, hehe, hehe]
  .reduce((prev, fn) => prev.catch(() => fn()), hehe())
  .then((value) => console.log("✅ Thành công:", value))
  .catch(() => console.log("❌ Hết lượt, thất bại"));
