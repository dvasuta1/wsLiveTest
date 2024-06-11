const ws = require('ws');
const PORT = process.env.PORT || 3000;
const wss = new ws.Server({
    port: PORT,
}, () => console.log(`Server started on 3000`))


wss.on('connection', function connection(ws) {
    ws.id = Date.now();
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                broadcastMessageByInterval(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
})

function broadcastMessageByInterval(message){
    setInterval(() => {
        wss.clients.forEach(client => {
            client.send(JSON.stringify(message))
        })
  }, 3000)
}

function broadcastMessage(message, id) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}
