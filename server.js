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
  let { interval = 5000, launchAlias, dataset = "default", order = "random" } = url.parse(req.url, true).query;
  interval = parseInt(interval);
  launchAlias = launchAlias?.trim();
  dataset = dataset.trim();
  order = order.trim();
  console.warn("connection url params", interval, launchAlias, dataset, order);

  ws.id = Date.now();
  ws.on("message", function (message) {
    message = JSON.parse(message);
    //console.log('message from client', message, ws.id);
    if (message.setContextRequest) {
      // on create context
      ws.contextSnapshot = message.setContextRequest;
      console.log("contextSnapshot", ws.contextSnapshot);
      createContextResponce(ws.id);
    } else if (message.subscribeRequest) {
      // on subscribe request
      let subscriptionId = uuid();
      createSubscribeResponce(ws.id, message.correlationId, subscriptionId);
      const dataSnapshot = updatingData.getFilteredDataSnapshot(subscriptionId, dataset, launchAlias);
      console.log("dataSnapshot length", dataSnapshot.length);
      // console.log("dataSnapshot", dataSnapshot);
      broadcastUpdatingDataByInterval(ws.id, dataSnapshot, interval, order);
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

function broadcastUpdatingDataByInterval(userId, snapshot, interval, order) {
  setInterval(() => {
    wss.clients.forEach((client) => {
      if (client.id == userId) {
        //let data = updatingData.getOneUpdatingDataEntry(subscriptionId, dataSet, launchAlias);
        let data = updatingData.getFilteredData(snapshot, order);
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
      //console.log("contextResponseMessage", contextResponseMessage);
      client.send(JSON.stringify(contextResponseMessage));
    }
  });
}

function createSubscribeResponce(userID, correlationID, subscriptionId) {
  let subscribeResponceMessage = subscriptionData.updateSubscription(correlationID, subscriptionId);
  wss.clients.forEach((client) => {
    if (client.id == userID) {
      //console.log("subscribeResponceMessage", subscribeResponceMessage);
      client.send(JSON.stringify(subscribeResponceMessage));
    }
  });
}
