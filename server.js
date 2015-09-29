var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
app.use(session({secret: '1234567890QWERTY'}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, './client')));
require('./config/mongoose.js');
require('./config/routes.js')(app);
var server = app.listen(8000, function(){
	console.log('sportStuff on port 8000')
})
var io = require('socket.io').listen(server)
require('./config/sockets.js')(io)