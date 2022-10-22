const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io  = socketio(server)


app.use(express.static(path.join(__dirname, 'public')))
const PORT = 3000;

io.on('connection', (socket)=>{
    socket.emit('message',{message : 'Welcome to chat!',sender : "Bot"})
    // On webchat connection
    socket.broadcast.emit('message',{message : 'Welcome to chat!',sender : "Bot"})

    socket.on('disconnect', ()=>{
        io.emit('message',{message : 'Someone Left',sender : "Bot"})
    })

    socket.on('chatMsg',(msg)=>{
        io.emit('message',msg)
    })
})

//socket.emit  send to client
// socket.broadcast.emit send to everyone except client (person has joined)
// io.emit send to every one (message)
server.listen(PORT,()=>{
    console.log('listening on port '+ PORT);
})