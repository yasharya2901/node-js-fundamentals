const Burger = require("./burger");


const PORT = 4995;
const server = new Burger();

server.route("GET", "/", (req, res) =>  {
    res.status(200).end();
})

server.route("GET", "/me", (req, res) => {
    res.status(200).setContentType("application/json").send(JSON.stringify({name: "Yash"}))
})

server.route("POST", "/data", (req, res) => {
    // take the body
    res.status(201).setContentType("application/json").send(JSON.stringify({message: "Created"}))
})

console.log(server.urlMethodPathMap)

server.listen(PORT, () => {
    console.log("Server started at", PORT);
})

