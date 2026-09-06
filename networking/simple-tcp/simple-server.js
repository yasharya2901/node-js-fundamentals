const net = require("net");


const server = net.createServer((socket) => {
    socket.on("data", (data) => {
        console.log(data.toString("utf-8"));
        
    })
});


server.listen("3099", "127.0.0.1", () => {
    console.log(`Server is listening on ${JSON.stringify(server.address())}`);
    
})