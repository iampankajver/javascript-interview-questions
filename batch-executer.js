
function seriesExecuter(promises) {
  return new Promise((resolve, reject) => {
    let output = []
    let i = 0;
    function nextTask(p) {
      if (i >= promises.length) {
        resolve(output)
      }
      console.log(`Executing series executer ${i}`)
      p().then(result => {
        i++;
        output.push(result)
        nextTask(promises[i])
      }).catch(err => {
        reject(err)
      })
    }
    
    nextTask(promises[i])
  })
}

function parallelExecuter(promises) {
  let executed = 0;
  let output = []
  return new Promise((resolve, reject) => {
    promises.forEach((p, i) => {
      console.log(`Executing parallel executer ${i}`)
      p().then(result => {
        output.push(result)
        executed++
        if (executed == promises.length) {
          resolve(output)
        }
      }).catch(err => {
        reject(err)
      })
    })
  })
}

function createPromise(i) {
  return () => new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Executed ${i}`)
      resolve(i)
    }, i * 1000)
  })
}


function mapLimit(arr, limit, executer) {
  let modifiedArray = arr.reduce((acc, item, index) => {
    if (index % limit == 0) {
      acc.push([item])
    } else {
      acc[acc.length - 1].push(item)
    }
    return acc;
  }, []);

  

  return new Promise((resolve, reject) => {
    seriesExecuter(modifiedArray.map(item => {
      return () => parallelExecuter(item.map(e => {
        console.log(`Executing items ${e}`)
        return () => new Promise((resolve) => {
          executer(e, (isError, result) => {
            if (isError) {
              reject(result)
            } else {
              console.log(`Executed ${e}`)
              resolve(result)
            }
          })
        })
      }))
    }))
  });
}

let numPromise = mapLimit([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, function (num, callback) {
  // i am async iteratee function
  // do async operations here
  setTimeout(function () {
    num = num * 2;
    console.log(num);
    callback(null, num);
  }, 1000);
});

numPromise
  .then((result) => console.log("success:" + result))
  .catch(() => console.log("no success"));

