const fs = require("node:fs/promises");

(async () => {
    const fileHandleRead = await fs.open("src.txt", "r");
    const fileHandleWrite = await fs.open("dest.txt", "w");
    
    const streamWrite = fileHandleWrite.createWriteStream();
    const streamRead = fileHandleRead.createReadStream({
        highWaterMark: streamWrite.writableHighWaterMark
    });

    let num = ""
    streamRead.on("data", (chunk) => {
        let transformedBufferString = ""
        // chunk is buffer
        for (let i = 0; i < chunk.length; i++) {
            const data = Buffer.from([chunk[i]]).toString("utf-8")
            let number;
            if (data != " ") {
                number = Number(data);
            }
            if (data == " " && num !== "") { // cast the string to Number
                number = Number(num.trim())
                if (typeof number === 'number') {
                    if ((number & 1) == 0) { // is Even
                        transformedBufferString += num + " "
                    }
                    num = ""
                }
            } else {
                num += number 
            }
        }
        let newBuff = Buffer.from(transformedBufferString);
        
        if(!streamWrite.write(newBuff)){
            streamRead.pause();
        }
    });

    streamWrite.on("drain", () => {
        streamRead.resume();
    })
})()