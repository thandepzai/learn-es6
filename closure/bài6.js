function slowSquare(n) {
  console.log("Computing...");
  return n * n;
}

function makeCached(fn) {
  const cache = {}; // closure giữ cache trong bộ nhớ
  return function (x) {
    if (cache[x] !== undefined) {
      return cache[x]; // lấy từ cache
    }
    const result = fn(x); // gọi hàm thật
    cache[x] = result; // lưu vào cache
    return result;
  };
}

const cachedSquare = makeCached(slowSquare);

console.log(cachedSquare(5)); // "Computing..." 25
console.log(cachedSquare(5)); // 25 (không in "Computing..." nữa)
console.log(cachedSquare(6));