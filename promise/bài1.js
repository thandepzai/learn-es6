//1. Viết `delay(ms)` trả về Promise chờ `ms` ms.

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Chờ " + ms + " ms");
    }, ms);
  });
}

delay(1000).then((value) => console.log(value));

async function run() {
  console.log("Bắt đầu");
  await delay(2000);
  console.log("2 giây sau...");
}

run();
