/*import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8088 });

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("something");
});
console.log("The WebSocket server is running on port 8088");*/
const WebSocket = require('ws')
const PORT = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: PORT })
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  ws.send('Hello! Message From Server!!')
})
