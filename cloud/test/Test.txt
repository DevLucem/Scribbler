/**
 * Node Packages
 * cors
 * express
 * express-ws
 */

const express = require('express');
const cors = require('cors');
const app = express();
const ws = require('express-ws')(app);

const port = process.env.PORT || 3001;

app.use(cors({
    origin: '*'
}));

app.ws('/', (socket, req) => {

    console.log('New Client Connection', req.socket.id || req.id);
    socket.send(`You are now connected! at ${new Date().getMinutes()}:${new Date().getSeconds()}`);

    socket.on('message', message => {
        console.log('Received from client:', message.toString())
    });

    // Send 5 tests every 10 seconds to confirm it is working
    let tests = 0; const test = () => setTimeout(()=> {
        tests++;
        console.log('sent: ', tests);
        socket.send("Testing " + tests);
        if (tests<5) test();
    }, 10000)
    test();

});

app.listen(port, () => console.error('listening on http://localhost:3001/'));