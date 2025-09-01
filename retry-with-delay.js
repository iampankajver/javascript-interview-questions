
const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });

function retryWithDelay(operation, count) {
  let delay = 1000;
  return new Promise((resolve, reject) => {
    operation()
      .then(resolve)
      .catch((e) => {
        if (count > 0) {
            console.log(`Operation failed. Retrying in ${delay}ms... (${count} retries left)`);
          return wait(delay)
            .then(retryWithDelay.bind(null, operation, count - 1))
            .then(resolve)
            .catch(reject);
        } else {
            return reject("Final Rejected");    
        }
      });
  });
}

const getTestFunc = () => {
  let callCounter = 0;
  return async () => {
    callCounter += 1;
    console.log("calling " + callCounter);
    // if called less than 5 times
    // throw error
    if (callCounter < 5) {
      throw new Error("Not yet");
    }
  };
};

// Test the code
const test = async () => {
  await retryWithDelay(getTestFunc(), 10);
  console.log("success");
  await retryWithDelay(getTestFunc(), 3);
  console.log("will fail before getting here");
};

// Print the result
test().catch(console.error);
