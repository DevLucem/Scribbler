
const express = require('express');
const cors = require('cors');
const app = express();
const ws = require('express-ws')(app);

const port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));
app.use(cors({
    origin: '*'
}));

app.ws('/', socket => {

    const clients = () => {return Array.from(ws.getWss().clients)};
    socket.id = Math.random().toString(36).slice(2, 7);
    console.log("New Client Connection all clients", clients.length);

    socket.on('message', data => {
        let message =  JSON.parse(data.toString());
        message.data.user = socket.id;
        clients().forEach(client => {
            if (client.id !== socket.id)
                client.send(JSON.stringify(message))
        })
    });

    socket.on("close", event => {
        console.log(socket.id, 'Disconnected')
    })

});

app.listen(port, () => console.error('listening on http://localhost:3001/'));
