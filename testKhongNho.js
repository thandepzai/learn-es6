const a = () => {
  console.log("Vào đây");
  var x = 10;
  const b = () => {
    console.log(x);
  };
  return b;
};

// console.log(x) K chạy đc
a()();
