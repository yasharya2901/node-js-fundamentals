const net = require("net")
const fs = require("fs/promises")

const server = net.createServer(() => { });
server.on("connection", async (socket) => {
  console.log("New connection!");

  let fileHandle, fileStream;
  socket.on("data", async (data) => {
    if (!fileHandle) {
      socket.pause();
      const stringData = data.toString("utf-8");
      const indexOfDivider = stringData.indexOf("\r\n");
      const fileName = stringData.substring("fileName: ".length, indexOfDivider);
      console.log(`FileName: ${fileName}`)
      fileHandle = await fs.open(`storage/${fileName}`, "w");
      fileStream = fileHandle.createWriteStream();

      socket.resume();
    } else {
      fileStream.write(data);
    }

  })

  socket.on("end", () => {
    console.log("Connection Ended");
    fileHandle.close();
    fileHandle = undefined;
    fileStream = undefined;
  })
});


server.listen(5050, "::1", () => {
  console.log("Uploader server opened on", server.address());
})
