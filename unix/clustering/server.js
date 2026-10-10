const cpeak = require("cpeak");

const server = new cpeak();

server.route("get", "/", (req, res) => {
    res.json({message: "This is some text."});
})

server.route("get", "/heavy", (req, res) => {
    for (let i = 0; i < 100_000_000_000; i++) {

    }
    res.json({
        message: "The operation is done."
    })
});

const PORT = 5000;

server.listen(PORT, () => {
    console.log("Server has started at the port", PORT)
});