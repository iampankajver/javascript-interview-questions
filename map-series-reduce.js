function mapSeries(arr, asyncIteratee) {
  return new Promise((resolve, reject) => {
    let finalVal = arr.reduce((acc, val) => {
      return acc.then((av) => {
        return new Promise((r, e) => {
          asyncIteratee(val, (isError, finalVal) => {
            if (isError) {
              reject();
            } else {
              let out = [...av, finalVal];
              if (out.length == arr.length) {
                resolve(out);
              }
              r(out)
            }
          });
        });
      });
    }, Promise.resolve([]));
    resolve(finalVal);
  });
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

