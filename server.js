const ws = require('ws');
const PORT = process.env.PORT || 3000;
const wss = new ws.Server({
    port: PORT,
}, () => console.log(`Server started on 3000`))


wss.on('connection', function connection(ws) {
    ws.id = Date.now();
    ws.on('message', function (message) {
        message = JSON.parse(message)
        console.log('message from client', message);
       /* switch (message.event) {
            case 'message':
                broadcastMessageByInterval(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }*/
        if (requestKeys.includes('setContextRequest')) {
        // on create context
            createSubscribeResponce(ws.id);
        
        } else if (requestKeys.includes('subscribeRequest')) {
        // on subscribe request
        
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

function createSubscribeResponce (id) {
     let contextResponseMessage = {
        "setContextResponse": {
            "result": {
                "errorType": 0
            },
            "contextId": id
        }
    };
    wss.clients.forEach(client => {
        if (client.id = id) {
            console.log("contextResponseMessage", contextResponseMessage);
            client.send(JSON.stringify(contextResponseMessage))
        }
    })

    
}
