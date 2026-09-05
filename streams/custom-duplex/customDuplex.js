const {Duplex} = require("node:stream");

const fs = require("fs");


class DuplexStream extends Duplex {
    constructor({writableHighWaterMark, readableHighWaterMark, readFileName, writeFileName}) {
        super({writableHighWaterMark, readableHighWaterMark});
        this.readFileName = readFileName;
        this.writeFileName = writeFileName;
        this.readFd = null;
        this.writeFd = null;

        this.chunks = [];
        this.chunksSize = 0;
    }

    _construct(callback) {
        fs.open(this.readFileName, "r", (err , rfd)=> {
            if (err) return callback(err);
            this.readFd = rfd;
            fs.open(this.writeFileName, "w", (err, wfd) => {
                if (err) return callback(err);
                this.writeFd = wfd;
                callback();
            })
        })
    }

    _write(chunk, encoding, callback) {
        this.chunks.push(chunk);
        this.chunksSize += chunk.length;

        fs.write(this.writeFd, Buffer.concat(this.chunks), (err)=> {
            if (err) return callback(err);
            this.chunks = [];
            this.chunksSize = 0;
            callback();
        })
            
    }

    _read(size) {
        const buff = Buffer.alloc(size);
        fs.read(this.readFd, buff, 0, size, null, (err, bytesRead) => {
            if (err) return this.destroy(err);
            this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null);
        });
    }

    _final(callback) {
        fs.write(this.writeFd, Buffer.concat(this.chunks), (err) => {
            if (err) return callback(err);
            
            this.chunks = [];
            callback();
        })
    }

    _destroy(error, callback) {
        fs.close(this.readFd);
        fs.close(this.writeFd);
        callback(error);
    }
    
}

const duplex = new DuplexStream({
    readFileName: "read.txt",
    writeFileName: "write.txt"
});

// duplex.write(Buffer.from("this is a string 0\n"))
// duplex.write(Buffer.from("this is a string 1\n"))
// duplex.write(Buffer.from("this is a string 2\n"))
// duplex.write(Buffer.from("this is a string 3\n"))
// duplex.end(Buffer.from("end of write"))

duplex.on("data", (chunk)=> {
    console.log(chunk.toString("utf8"))
    duplex.write(chunk);
})

duplex.on("end", () => {
    duplex.end()
})