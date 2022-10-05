
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http,  {
    /**
     * @param cors - please disable for security
     * Good for testing locally and making remote connections from different places
     */
    cors: {
        origin: '*',
    }
});

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

const clients = [];
function onConnection(socket) {
    clients.push(socket);

    socket.emit("Damn this is all I have got")
    console.log('New Client', socket.id, "all Clients are ", clients.length);
    socket.on('drawing', (data) => {
        clients.forEach(client => {
            if (client.id !== socket.id)
                client.emit('drawing', data)
        })
    });

    socket.on('message', message => {
        clients.forEach(client => {
            if (client.id !== socket.id)
                client.emit('message', { user: socket.id, message: message })
        })
    });

    socket.on('disconnect', socket => {
        clients.pop(socket);
        console.log("Disconnected Client, all Clients are", clients.length);
    });

}

io.on('connection', onConnection);
io.on('disconnect', socket => console.log('Disconnect Server', socket.id));
// io.listen(port) // for local testing
http.listen(port, () => console.log('listening on port ' + port));
