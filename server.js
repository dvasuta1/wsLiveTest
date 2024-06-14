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
const updatingData = require("./helpers/updating.js");
const subscriptionData = require("./helpers/subscription.js");

wss.on("connection", function connection(ws, req) {
  //console.log(url.parse(req.url, true).query);
  const { interval = 5000, launchAlias, dataSet = "default" } = url.parse(req.url, true).query;

  ws.id = Date.now();
  ws.on("message", function (message) {
    message = JSON.parse(message);
    //console.log('message from client', message, ws.id);
    if (message.setContextRequest) {
      // on create context
      createContextResponce(ws.id);
    } else if (message.subscribeRequest) {
      // on subscribe request
      let subscriptionId = uuid();
      createSubscribeResponce(ws.id, message.correlationId, subscriptionId);
      // broadcastUpdatingDataByInterval(ws.id, subscriptionId, dataSet, launchAlias, interval);
      updatingData.getFilteredGames(subscriptionId, dataSet, launchAlias, order);
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

/*function broadcastUpdatingDataByInterval(userId, subscriptionId, dataSet, launchAlias, interval) {
  setInterval(() => {
    wss.clients.forEach((client) => {
      if (client.id == userId) {
        let data = updatingData.getOneUpdatingDataEntry(subscriptionId, dataSet, launchAlias);
        console.log("updateData", data);
        console.log("client.id", client.id);
        client.send(JSON.stringify(data));
      }
    });
  }, interval);
}*/
function broadcastUpdatingDataByInterval(userId, subscriptionId, dataSet, launchAlias, interval, order) {
  setInterval(() => {
    wss.clients.forEach((client) => {
      if (client.id == userId) {
        //let data = updatingData.getOneUpdatingDataEntry(subscriptionId, dataSet, launchAlias);
        let data = updatingData.getFilteredGames(subscriptionId, dataSet, launchAlias, order);
        console.log("updateData", data);
        console.log("client.id", client.id);
        client.send(JSON.stringify(data));
      }
    });
  }, interval);
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
