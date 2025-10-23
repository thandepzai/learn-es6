// Viết generator **vô hạn** sinh dãy `2, 4, 8, 16, ...`.
function* infinity() {
  for (let i = 2; ; i += 2) {
    yield i;
  }
}

for (const n of infinity()) {
  console.log(n);
  if (n > 100) break;
}
