const fs = require("node:fs/promises");

(async () => {
    const fileHandleRead = await fs.open("src.txt", "r");
    const fileHandleWrite = await fs.open("dest.txt", "w");
    
    const streamWrite = fileHandleWrite.createWriteStream();
    const streamRead = fileHandleRead.createReadStream({
        highWaterMark: streamWrite.writableHighWaterMark
    });

    streamRead.on("data", (chunk) => {
        const data = chunk.toString("utf-8")
        if(!Number(data)) {
            console.log("not a number")
        }
        
        if(!streamWrite.write(chunk)){
            streamRead.pause();
        }
    });

    streamWrite.on("drain", () => {
        streamRead.resume();
    })
})()