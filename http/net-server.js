const net = require("net");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    console.log(data.toString("utf-8"));
  });
});


server.listen(8000, "localhost", () => {
  console.log("Opened server on", server.address());
})
