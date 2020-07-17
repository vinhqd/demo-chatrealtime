const express = require('express');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(3000, () => console.log('Listening port 3000.'));

app.get('/', (req, res) => {
    res.render('index');
});