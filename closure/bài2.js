const a = "global";
function outer() {
  const a = "outer";
  function inner() {
    const a = "inner";
    console.log(a);
  }
  inner();
}
outer();
// ➡️ In ra gì? Giải thích vì sao JS chọn đúng biến đó?

// In ra: "inner"
// Vì nó sẽ tìm từ phạm vi chính nó, nếu k có thì tiếp tục lan ra ngoài cha và global