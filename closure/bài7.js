// Tạo thuộc tính “private” (ẩn) bằng closure — không dùng #field (ES2022).
function createAccount(owner, balance) {
  // code ở đây
  let total = balance;
  return {
    getBalance(){
        return total;
    },
    deposit(x){
        total = total + x; 
    }
  }
}

const acc = createAccount("Hà", 1000);
console.log(acc.getBalance()); // 1000
acc.deposit(500);
console.log(acc.getBalance()); // 1500
console.log(acc.balance); // undefined