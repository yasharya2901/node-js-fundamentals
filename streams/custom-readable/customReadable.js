const {Readable} = require("node:stream")
const fs = require("node:fs")

class FileReadStream extends Readable {
    constructor({highWaterMark, fileName}){
        super({highWaterMark})
        this.fileName = fileName;
        this.fd = null;
    }

    _construct(callback) {
        fs.open(this.fileName, "r", (err, fd) => {
            if (err) return callback(err)
            this.fd = fd;
            callback();
        })
    }

    _read(size) {
        const buff = Buffer.alloc(size)
        fs.read(this.fd, buff, 0, size, null, (err, bytesRead) => {
            
        })
    }


}