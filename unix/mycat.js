const fs = require("fs/promises");
const {stdout, stderr} = require("node:process");

(async () => {
    const args = process.argv;
    
    const fileName = args[2];
    if (!fileName) {
        stderr.write(`Usage: node cat.js <fileName | absolute filePath>\n`);
        process.exit();
    }
    
    let fileHandle;

    try {
        fileHandle = await fs.open(fileName, "r");
    } catch (error) {
        stderr.write(`Error opening the file ${fileName}: ${error}\n`);
        process.exit();
    }

    const fileStream = fileHandle.createReadStream();
    fileStream.pipe(stdout);
})()




