const {Worker, workerData, parentPort} = require("worker_threads");

const port = parentPort
// const thread = workerData.thread

// port.on('message', (msg) => {
//     console.log(`Message on thread${thread}:`, msg)
// })

// port.postMessage(`Some message from thread${thread}`);


port.on('message', (msg) => {
    console.log(`Message on child thread:`, msg)
})

port.postMessage(`Message from child`);