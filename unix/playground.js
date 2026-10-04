const {spawn, exec} = require("node:child_process");
const {stdin, stdout, stderr } = require("node:process")


// stdin.on("data", (data) => {
//     // console.log("Got this data from standard in: ", data.toString("utf8"));
//     stdout.write(`Got this data from standard in: ${data.toString("utf8")}\n`);
// })

// stdout.write("This is some text I want.\n");
// stderr.write("This is some text I may not want.\n")


console.log(process.argv);
const subprocess = spawn("./playground", ["./scripts.sh"]);

subprocess.stdout.on("data", (data) => {
    console.log(data.toString("utf-8"));
});

subprocess.stderr.on("data", (data) => {
    console.log(data.toString("utf-8"));
})

subprocess.stdin.write("Hello");
subprocess.stdin.end();

// exec `spawns` a new non login shell

// exec("echo \"hello world\" | tr ' ' '\n'", (error, stdout, stderr) => {
//     if (error) {
//         console.error(error)
//         return;
//     }

//     console.log(stdout);

//     console.log(`stderr: ${stderr}`);
// })