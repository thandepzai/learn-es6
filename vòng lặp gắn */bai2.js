// Viết **generator** trả về các số chẵn từ 0 đến 10.

function* evenNumber(max) {
  for (let i = 0; i <= max; i += 2) {
    yield i;
  }
}

for (const n of evenNumber(10)) {
  console.log(n);
}
