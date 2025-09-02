function mapSeries(arr, asyncIteratee) {
  return new Promise((resolve, reject) => {
    let output = []
    arr.map(a => {
      asyncIteratee(a, (isError, modVal) => {
        if (isError) {
          reject()
        } else {
          output.push(modVal)
          if (output.length == arr.length) {
            resolve(output)
          }
        }
      })
    })

  })
}

let numPromise = mapSeries([1, 2, 3, 4, 5], function (num, callback) {
  setTimeout(function () {
    num = num * 2;
    console.log(num);
    // throw error
    if (num === 12) {
      callback(true);
    } else {
      callback(null, num);
    }
  }, 1000);
});

numPromise
  .then((result) => console.log("success:" + result))
  .catch(() => console.log("no success"));
