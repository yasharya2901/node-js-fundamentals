const net = require("net");
const readLine = require("readline/promises");

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

const clearLine = (dir) => {
    return new Promise((resolve, reject) => {
        process.stdout.clearLine(dir, () => {
            resolve();
        });
    });
}

const moveCursor = (dx, dy) => {
    return new Promise((resolve, reject)=> {
        process.stdout.moveCursor(dx, dy, () => {
            resolve();
        })
    })
}
let id;
const client = net.createConnection({
    host: "127.0.0.1",
    port: 3008
}, async () => {
    // console.log("A connection to the server is made.");

    const ask = async () => {
        const message = await rl.question("Enter a message > ");
        await moveCursor(0, -1);
        await clearLine(0);
        client.write(`${id}-message-${message}`);
    }
    client.on("data", async (data) => {
        console.log();
        const dataAsString = data.toString("utf-8");
        await moveCursor(0, -1);
        await clearLine(0);
        // console.log(`Message from server: ${data.toString("utf-8")}`);
        if (dataAsString.substring(0, 3) === "id-") {
            id = dataAsString.substring(3); // everything from the 3rd character
            console.log(`Your id is ${id}\n`)
        } else {
            console.log(dataAsString);
        }
        ask();


    })

    ask();
});




client.on("end", () => {
    console.log("Ended!");
});


