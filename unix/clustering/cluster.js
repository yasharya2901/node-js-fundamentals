const cluster = require("cluster");
const os = require("os");

if (cluster.isPrimary) {
    console.log("This is the parent process");
    for (let i = 0; i < os.availableParallelism(); i++) {
        const worker = cluster.fork();
        console.log(`The parent spawned a new child process with PID ${worker.process.pid}`)
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.id} died with signal ${signal} and code ${code}. Restarting...`);
        cluster.fork();
    })
} else {
    require("./server.js")
}