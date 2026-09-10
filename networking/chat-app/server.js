const net = require("net");

const server = net.createServer();

let idStart = 0;
const clients = [];

server.on("connection", (socket) => {
    clients.push({id: ++idStart, socket});
    
    clients.map((client) => {
        client.socket.write(`User ${idStart} joined!`)
    })
    socket.write(`id-${idStart}`)
    socket.on("data", (data) => {
        const dataString = data.toString("utf-8")
        const id = dataString.substring(0, dataString.indexOf("-"));
        const message = dataString.substring(dataString.indexOf("-message-") + 9);
        

        clients.map((client) => {
            client.socket.write(`> User ${id}: ${message}`);
        })
    })


    socket.on("end", () => {
        clients.map((client) => {
            client.socket.write(`User ${idStart} left!`);
        })
    })
})



server.listen(3008, "127.0.0.1", () => {
    console.log("Opened server on ", server.address())
})

