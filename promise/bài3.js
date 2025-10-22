const callApi = (index) =>
  fetch(`https://jsonplaceholder.typicode.com/todos/${index}`)
    .then(res => res.json());

Promise.allSettled([callApi(1), callApi(2)]).then((results) => {
  console.log("Tất cả xong-allSettled:", results);
});