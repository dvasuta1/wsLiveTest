const ws = require('ws');
const PORT = process.env.PORT || 3000;
const wss = new ws.Server({
    port: PORT,
}, () => console.log(`Server started on 3000`));
const uuid = require('uuid-random');
const updateData = require('./data.js');
const subscriptionData = require('./subscriptionData.js')
//console.log('data', data.updatingData);

wss.on('connection', function connection(ws) {
    ws.id = Date.now();
    ws.on('message', function (message) {
        message = JSON.parse(message)
        let requestKeys = Object.keys(message);
        console.log('message from client', message, requestKeys, ws.id);
        if (requestKeys.includes('setContextRequest')) {
        // on create context
            createContextResponce(ws.id);
        
        } else if (requestKeys.includes('subscribeRequest')) {
        // on subscribe request
            let subscriptionId = uuid();
            createSubscribeResponce(ws.id, message.correlationId, subscriptionId);
        }
    });
    ws.on("close", () => {
        console.log("the client has connected");
    });
    ws.onerror = (e) => {
        console.log(e);
        ws.close();
    };
})

function broadcastMessageByInterval(message, id){
    setInterval(() => {
        wss.clients.forEach(client => {
            client.send(JSON.stringify(message))
        })
  }, 5000)
}

function broadcastMessage(message, id) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

function createContextResponce (id) {
     let contextResponseMessage = `{
        "setContextResponse": {
            "result": {
                "errorType": 0
            },
            "contextId": ${id}
        }
    }`;
    wss.clients.forEach(client => {
        if (client.id = id) {
            console.log("contextResponseMessage", contextResponseMessage);
            client.send(JSON.stringify(contextResponseMessage))
        }
    })   
}

function createSubscribeResponce(id, correlationID, subscriptionId) {
    let SubscribeResponceMessage = subscriptionData.updateSubscription(correlationID, subscriptionId);`    
    wss.clients.forEach(client => {
    if (client.id = id) {
        console.log("SubscribeResponceMessage", SubscribeResponceMessage);
        client.send(JSON.stringify(SubscribeResponceMessage))
    }
    }) 
}
