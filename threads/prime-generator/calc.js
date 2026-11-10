const {workerData, parentPort} = require("worker_threads");

const generatePrimes = require("./prime-generator");



// parentPort.on("message", (msg) => {
//     const {count, startingNum} = msg;
//     parentPort.postMessage(generatePrimes(count, startingNum));
//     parentPort.close();
// })

const primes = generatePrimes(workerData.count, workerData.start);

parentPort.postMessage(primes);