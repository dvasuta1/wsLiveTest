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
  let { interval = 5000, launchAlias, dataset = "default", order = "normal" } = url.parse(req.url, true).query;
  interval = parseInt(interval);
  launchAlias = launchAlias?.trim();
  dataset = dataset.trim();
  order = order.trim();
  console.warn("----connection url params----", interval, launchAlias, dataset, order);

  ws.id = Date.now();
  ws.on("message", function (message) {
    message = JSON.parse(message);
    //console.log('message from client', message, ws.id);
    if (message.setContextRequest) {
      // on create context
      ws.contextSnapshot = message.setContextRequest;
      console.log("----contextSnapshot:: ", ws.contextSnapshot);
      createContextResponce(ws.id);
    } else if (message.subscribeRequest) {
      // on subscribe request
      let subscriptionId = uuid();
      createSubscribeResponce(ws.id, message.correlationId, subscriptionId, ws.contextSnapshot.casino);
      const dataSnapshot = updatingData.getFilteredDataSnapshot(
        subscriptionId,
        dataset,
        launchAlias,
        ws.contextSnapshot.casino
      );
      console.log("----dataSnapshot length:: ", dataSnapshot.length);
      broadcastUpdatingDataByInterval(ws.id, dataSnapshot, interval, order);
    }
  });
  ws.on("close", () => {
    console.log("The client has disconnected!");
  });
  ws.onerror = (e) => {
    console.error(e);
    ws.close();
  };
});

function broadcastUpdatingDataByInterval(userId, snapshot, interval, order) {
  if (order == "normal") {
    let getNextElement = updatingData.getTheNormalEntry(snapshot);
    setInterval(() => {
      wss.clients.forEach((client) => {
        if (client.id == userId) {
          let data = getNextElement();
          /*console.log("updateData:: ", data.updateNotification.updatedTables);
          console.log("client.id:: ", client.id);
          console.log("----entry end----");*/
          client.send(JSON.stringify(data));
        }
      });
    }, interval);
  } else {
    setInterval(() => {
      wss.clients.forEach((client) => {
        if (client.id == userId) {
          let data = updatingData.getTheRandomEntry(snapshot);
          /* console.log("updateData:: ", data.updateNotification.updatedTables);
          console.log("client.id:: ", client.id);
          console.log("----entry end----");*/
          client.send(JSON.stringify(data));
        }
      });
    }, interval);
  }
}

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

function createSubscribeResponce(userID, correlationID, subscriptionId, context) {
  let subscribeResponceMessage = subscriptionData.updateSubscription(correlationID, subscriptionId, context);
  wss.clients.forEach((client) => {
    if (client.id == userID) {
      //console.log("subscribeResponceMessage", subscribeResponceMessage);
      client.send(JSON.stringify(subscribeResponceMessage));
    }
  });
}
