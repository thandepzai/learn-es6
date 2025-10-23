// Viết generator **đếm từ 1 đến n** và **dừng lại khi nhận `true` từ next()`.

function* dem() {
  for (let i = 1; ; i++) {
    const result = yield i;
    if (result) break;
  }
}

const chay = dem();
console.log(chay.next().value);
console.log(chay.next().value);
console.log(chay.next().value);
console.log(chay.next().value);
console.log(chay.next().value);
console.log(chay.next().value);
console.log(chay.next().value);
console.log(chay.next(true).value);
