const Burger = require("../burger");


const PORT = 4995;
const server = new Burger();

server.route("GET", "/", (req, res) =>  {
    res.sendFile("./public/index.html", "text/html");
})


server.route("GET", "/styles.css", (req, res) => {
    res.sendFile("./public/styles.css", "text/css");
})

server.route("GET", "/script.js", (req, res) => {
    res.sendFile("./public/script.js", "text/javascript");
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

