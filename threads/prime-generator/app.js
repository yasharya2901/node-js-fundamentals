const {Worker, workerData} = require("worker_threads");
const path = require("path");
const { performance } = require("perf_hooks");

// async function generatePrimeNumber(count, startingNum) {
//     let promises = [];

//     let remainingCount = count;
//     let newStartingNum = startingNum;

//     while (remainingCount > 100) {
//         const thread = new Worker(path.join(__dirname, './calc.js'));
//         thread.postMessage({
//             count: remainingCount,
//             startingNum: newStartingNum
//         })
//         remainingCount -= 100;
//         startingNum += 100;
//         promises.push(new Promise((resolve, reject) => {
//             thread.once("message", resolve);
//             thread.once("error", reject);
//         }));
//     }

//     const chunks = await Promise.all(promises);

//     return chunks.flat();
// }

// (async () => {
//     let primes = await generatePrimeNumber(1_000, 1000);
//     console.log(primes)
// })()


let result = [];

const THREADS = 10;
let completed = 0;
const start = performance.now();
const count = 200; // number of primes numbers that we want

for (let i = 0; i < THREADS; ++i) {
    const worker = new Worker(path.join(__dirname, "calc.js"), {
        workerData: {
            count: count / THREADS, 
            start: 100_000_000_000_000 + i * 300
        }
    });

    const threadId = worker.threadId;
    console.log(`Worker ${threadId} started.`);
    worker.on("message", (primes) => {
        result = result.concat(primes);
    });

    worker.on("error", (err) => {
        console.error(err);
    })

    worker.on("exit", (code) => {
        if (code != 0) {
            console.log(`Worker ${threadId} exited with code ${code}`);
        }

        completed++;
        if (completed == THREADS){
            console.log(result.sort());
            console.log(`Time Taken: ${performance.now() - start}ms`);
        }
    })
}