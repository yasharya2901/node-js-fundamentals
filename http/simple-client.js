const http = require("node:http");

const agent = new http.Agent({ keepAlive: true });

const request = http.request({
  agent: agent,
  hostname: "localhost",
  port: 8050,
  method: "POST",
  path: "/create-post",
  headers: {
    "content-type": "application/json",
  }
});

// This event is emitted only once
request.on("response", (response) => {
  console.log(response.statusCode);
  response.on("data", (chunk) => {
    console.log(chunk.toString());
  })
});

request.end(JSON.stringify({
  message: "This is my last message!"
}));
