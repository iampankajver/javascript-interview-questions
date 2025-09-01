const createPromise = function ( i ) {
    return new Promise (( resolve, reject ) => {
        setTimeout( () => resolve( `Completing ${i}` ), 1000 *i)
    });
}

const promises = [
    createPromise(10),
    createPromise(9),
    createPromise(7),
    createPromise(1),
    createPromise(2)
]

const asyncParallelExecuter = function ( promises ) {
    let count = 0
    return new Promise((resolve, reject) => {
           promises.map(p => {
            p.then(r => {
                console.log(r);
                count++;
                if (count == promises.length) {
                    resolve()
                }
            })
        }) 
    }) 
    
}

asyncParallelExecuter(promises)
