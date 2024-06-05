// Importing the required modules
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8088 });
// Creating a new websocket server
// Creating connection using websocket
wss.on("connection", (ws) => {
  console.log("new client connected"); // sending message to client
  ws.send("Welcome, you are connected!"); //on message from client
  ws.on("message", (data) => {
    console.log(`Client has sent us: ${data}`);
  }); // handling what to do when clients disconnects from server
  ws.on("close", () => {
    console.log("the client has connected");
  }); // handling client connection error
  ws.onerror = function () {
    console.log("Some Error occurred");
  };
});
console.log("The WebSocket server is running on port 8088");
