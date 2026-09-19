const http = require("node:http");

const server = http.createServer();

server.on("request", (request, response) => {
  console.log(`METHOD: ${request.method}`)
  console.log(`URL: ${request.url}`)
  console.log(`HEADERS: ${request.headers}`)

  let data = "";
  request.on("data", (chunk) => {
    data += chunk.toString("utf8")
  });


  request.on("end", () => {
    data = JSON.parse(data);
    console.log(data)
    response.writeHead(200, {
      "content-type": "application/json"
    })

    response.end(JSON.stringify({
      message: `Post with title ${data.message} created`
    }))
  })
});

server.listen(8050, () => {
  console.log("Server listening on http://localhost:8050");
});
