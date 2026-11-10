const {Worker, MessageChannel} = require("worker_threads");


// const channel = new MessageChannel();

// console.log(channel)

// const port1 = channel.port1;
// const port2 = channel.port2;

// port1.postMessage({
//     name: "Joe"
// })
// port1.on("message", (msg) => {
//     console.log(`Message on port1:`, msg);
    
// })

// port2.on("message", (msg) => {
//     console.log(`Message on port2:`, msg)
// })

/* Communication between two worker threads */


// const {port1, port2} = new MessageChannel();

// const thread1 = new Worker("./calc.js", {
//     workerData: {port: port1}, transferList: [port1]
// })
// const thread2 = new Worker("./calc.js", {
//     workerData: {port: port2}, transferList: [port2]
// })

/* Communication between main thread and 2 worker threads */

// const channel1 = new MessageChannel();
// const channel2 = new MessageChannel();

// const thread1 = new Worker("./calc.js", {
//     workerData: {port: channel1.port2, thread: 1}, transferList:[channel1.port2]
// })

// const thread2 = new Worker("./calc.js", {
//     workerData: {port: channel2.port2, thread: 2}, transferList: [channel2.port2]
// })


// channel1.port1.on("message", (msg) => {
//     console.log(msg)
// })

// channel2.port1.on("message", (msg) => {
//     console.log(msg);
// })

const thread1 = new Worker("./calc.js");
thread1.on("message", (msg) => {
    console.log("Main thread got this: ", msg)
})

thread1.postMessage("hello")