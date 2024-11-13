
// Promise
// two function -> resolve, reject

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("Promise executed")
  }, 1000)
})

promise.then((result) => {
  console.log(result);
})

//
function task(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (time > 2500) {
        reject("Task failed: " + time)
      }
      resolve("Task executed: " + time)
    }, time)
  })
}

let promises = [task(1000), task(2000), task(3000)]

Promise.all(promises).then((results) => {
  console.log("All promises get executed: ", results);
}).catch((error) => {
  console.log("Promise.all failed: ", error)
})

// Promise.myAll polyfill starts here

Promise.__proto__.myAll = function(promiseList) {
  let result = []
  return new Promise((resolve, reject) => {
    promiseList.forEach((promise) => {
      promise.then((res) => {
        result.push(res)
        if (result.length === promiseList.length) { // Condition for resolving
          resolve(result)
        }
      }).catch((error) => {
        reject(error) // Rejecting the promise
      })
    })
  })
}

// Promise.myAll polyfill ends here

Promise.myAll(promises).then((results) => {
  console.log("MyAll promises get executed: ", results);
}).catch((error) => {
  console.log("Promise.MyAll failed: ", error)
})