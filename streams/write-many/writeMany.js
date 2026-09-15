// const fs = require("fs/promises");

// (async () => {
    //     const fileHandler = await fs.open("test.txt", "w");
//     console.log((await fileHandler.stat()).size)
//     console.time("writeMany");
//     for (let i = 0; i < 1_000_000; i++) {
//         await fileHandler.write(`${i} `);
//     }
//     console.timeEnd("writeMany");

//     fileHandler.close();
// })()

// const fs = require("fs");

// (async () => {
//     console.time("writeMany");
//     fs.open("test.txt", "w", (error, fd) => {
//         const buff = Buffer.from(`a`, "utf-8");
//         for (let i = 0; i < 1_000_000; i++) {
//             fs.writeSync(fd, buff)
//         }
//         console.timeEnd("writeMany");
//     });

// })()

// const fs = require("fs/promises");

// (async () => {
//     console.time("writeMany");
//     const fileHandler = await fs.open("test.txt", "w");

//     const stream = fileHandler.createWriteStream();

//     for (let i = 0; i < 1_000_000; i++) {
//         const buff = Buffer.from(`${i} `, "utf8");
//         stream.write(buff)
//     }
//     console.timeEnd("writeMany");

//     fileHandler.close();
// })()

const fs = require("fs/promises");

(async () => {
    console.time("writeMany");
    const fileHandler = await fs.open("test.txt", "w");

    const stream = fileHandler.createWriteStream();

    const STREAM_SIZE = stream.writableHighWaterMark
    const buff = Buffer.alloc(STREAM_SIZE);
    let i = 0;
    let numOfWrites = 500_000_000

    const continueWrite = () => {
        while (i <= numOfWrites) {
            const buff = Buffer.from(`${i} `, "utf8");
            if (i == numOfWrites - 1) {
                stream.end(buff);
                return;
            }
            if (!stream.write(buff)) {
                ++i;
                return;
            }
            ++i;
        }
    }
    continueWrite();
    stream.on("drain", () => {
        console.log("draining");
        continueWrite();
    })

    stream.on("finish", () => {
        console.timeEnd("writeMany");
        fileHandler.close();
    })

})()
