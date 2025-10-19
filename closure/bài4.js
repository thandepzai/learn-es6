function createCounters() {
  let x = 0;
  return {
    inc: () => ++x,
    dec: () => --x,
  };
}

const c = createCounters();
console.log(c.inc());
console.log(c.dec());
console.log(c.inc());

// ➡️ Cả inc và dec có dùng chung x không? Vì sao?

// In ra 1
// Có vì cả cả 2 hàm ý cùng tham chiếu vào mà

// Lời giải: Cả hai hàm inc và dec chia sẻ cùng một closure environment (một vùng nhớ chứa x).