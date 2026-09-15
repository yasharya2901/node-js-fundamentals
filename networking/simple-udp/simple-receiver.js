const dgram = require("dgram");

const receiver = dgram.createSocket('udp4');

receiver.on("message", (message, remoteInfo) => {
  console.log(`Server got: ${message} from ${remoteInfo.address}:${remoteInfo.port}`);
})

receiver.bind({
  address: "0.0.0.0",
  port: 8000
})

receiver.on("listening", () => {
  console.log(`Server listening ${JSON.stringify(receiver.address())}`)
})
