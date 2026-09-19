const net = require("net");

const socket = net.createConnection({ host: "localhost", port: 8050 }, () => {
  const head = Buffer.from("504f5354202f6372656174652d706f737420485454502f312e310d0a636f6e74656e742d747970653a206170706c69636174696f6e2f6a736f6e0d0a486f73743a206c6f63616c686f73743a383035300d0a436f6e6e656374696f6e3a206b6565702d616c6976650d0a436f6e74656e742d4c656e6774683a2033380d0a0d0a", "hex");
  // buff[0] = 0x12;
  // buff[1] = 0b1101;

  const body = Buffer.from("7b226d657373616765223a2254686973206973206d79206c617374206d65737361676521227d", "hex")

  socket.write(Buffer.concat([head, body]));

  socket.on("data", (chunk) => {
    console.log("Received Response");
    console.log(chunk.toString("utf-8"));
    socket.end();
  } )
});


socket.on("end", () => {
  console.log("Connection Closed");
});

/*
0000   50 4f 53 54 20 2f 63 72 65 61 74 65 2d 70 6f 73   POST /create-pos
0010   74 20 48 54 54 50 2f 31 2e 31 0d 0a 63 6f 6e 74   t HTTP/1.1..cont
0020   65 6e 74 2d 74 79 70 65 3a 20 61 70 70 6c 69 63   ent-type: applic
0030   61 74 69 6f 6e 2f 6a 73 6f 6e 0d 0a 48 6f 73 74   ation/json..Host
0040   3a 20 6c 6f 63 61 6c 68 6f 73 74 3a 38 30 35 30   : localhost:8050
0050   0d 0a 43 6f 6e 6e 65 63 74 69 6f 6e 3a 20 6b 65   ..Connection: ke
0060   65 70 2d 61 6c 69 76 65 0d 0a 43 6f 6e 74 65 6e   ep-alive..Conten
0070   74 2d 4c 65 6e 67 74 68 3a 20 33 38 0d 0a 0d 0a   t-Length: 38....

0000   7b 22 6d 65 73 73 61 67 65 22 3a 22 54 68 69 73   {"message":"This
0010   20 69 73 20 6d 79 20 6c 61 73 74 20 6d 65 73 73    is my last mess
0020   61 67 65 21 22 7d                                 age!"}


HEX Stream
504f5354202f6372656174652d706f737420485454502f312e310d0a636f6e74656e742d747970653a206170706c69636174696f6e2f6a736f6e0d0a486f73743a206c6f63616c686f73743a383035300d0a436f6e6e656374696f6e3a206b6565702d616c6976650d0a436f6e74656e742d4c656e6774683a2033380d0a0d0a
7b226d657373616765223a2254686973206973206d79206c617374206d65737361676521227d
*/
