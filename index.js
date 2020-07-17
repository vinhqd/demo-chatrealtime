const express = require('express');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(3000, () => console.log('Listening port 3000.'));

var users = [];

io.on('connection', (socket) => {
    console.log('Co nguoi ket noi: ' + socket.id);
    socket.on('client-send-username', data => {
        if (users.indexOf(data) >= 0) {
            socket.emit('server-send-fail');
        } else {
            users.push(data);
            socket.userName = data;
            socket.emit('server-send-success', data);
            io.sockets.emit('server-send-users', users);
        }
    })

    socket.on('logout', () => {
        users.splice(users.indexOf(socket.userName), 1);
        socket.broadcast.emit('server-send-users', users)
    })
});

app.get('/', (req, res) => {
    res.render('index');
});