const ws = require("ws");
const url = require("url");
const PORT = process.env.PORT || 3000;
const wss = new ws.Server(
  {
    port: PORT,
  },
  () => console.log(`Server started on 3000`)
);
const uuid = require("uuid-random");
const updatingData = require("./updatingData.js");
const subscriptionData = require("./subscriptionData.js");
//console.log('data', data.updatingData);

wss.on("connection", function connection(ws, req) {
  console.log(url.parse(req.url, true).query);

  ws.id = Date.now();
  ws.on("message", function (message) {
    message = JSON.parse(message);
    let requestKeys = Object.keys(message);
    //console.log('message from client', message, requestKeys, ws.id);
    if (message.setContextRequest) {
      // on create context
      createContextResponce(ws.id);
    } else if (message.subscribeRequest) {
      // on subscribe request
      let subscriptionId = uuid();
      createSubscribeResponce(ws.id, message.correlationId, subscriptionId);
      broadcastUpdatingDataByInterval(ws.id, subscriptionId);
    }
  });
  ws.on("close", () => {
    console.log("the client has disconnected");
  });
  ws.onerror = (e) => {
    console.error(e);
    ws.close();
  };
});

function broadcastUpdatingDataByInterval(userId, subscriptionId) {
  setInterval(() => {
    wss.clients.forEach((client) => {
      if (client.id == userId) {
        let data = updatingData.getOneUpdatingDataEntry(subscriptionId);
        console.log("updateData", data);
        console.log("client.id", client.id);
        client.send(JSON.stringify(data));
      }
    });
  }, 5000);
}

/*function broadcastUpdatingData(userId, subscriptionId) {
  if (client.id == userId) {
    let data = updatingData.updateData(subscriptionId);
    console.log("updateData ", data);
    client.send(JSON.stringify(data));
  }
}*/

function createContextResponce(userId) {
  let contextResponseMessage = {
    setContextResponse: {
      result: {
        errorType: 0,
      },
      contextId: userId,
    },
  };
  wss.clients.forEach((client) => {
    if (client.id == userId) {
      console.log("contextResponseMessage", contextResponseMessage);
      client.send(JSON.stringify(contextResponseMessage));
    }
  });
}

function createSubscribeResponce(userID, correlationID, subscriptionId) {
  let subscribeResponceMessage = subscriptionData.updateSubscription(correlationID, subscriptionId);
  wss.clients.forEach((client) => {
    if (client.id == userID) {
      console.log("subscribeResponceMessage", subscribeResponceMessage);
      client.send(JSON.stringify(subscribeResponceMessage));
    }
  });
}

/*
var loop

// The function startStreaming starts streaming data to all the users
function startStreaming() {
  loop = setInterval(() => {
    fetch('https://www.foo.com/api/v2/searchAssets')
      .then(res => res.json())
      .then(json => {
        // The emit function of io is used to broadcast a message to
        // all the connected users
        io.emit('news', {json});
        console.log(json);
      } ,5000);
  });
}

// The function stopStreaming stops streaming data to all the users
function stopStreaming() {
  clearInterval(loop);
}

io.on('connection',function() {
  console.log("Client connected");

  // On connection we check if this is the first client to connect
  // If it is, the interval is started
  if (io.sockets.clients().length === 1) {
    startStreaming();
  }
});

io.on('disconnetion',function() {
  console.log("disconnected");

  // On disconnection we check the number of connected users
  // If there is none, the interval is stopped
  if (io.sockets.clients().length === 0) {
    stopStreaming();
  }
});

*/
