var express = require('express');
var exphbs  = require('express-handlebars');
var app     = require('express')();
var server  = require('http').Server(app);

var io = require('socket.io')(server);

var serialPort = require( 'serialport' );
var SerialPort = serialPort.SerialPort;
var serial;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res) {
  res.render('home', { data : 'Prototyping Lab' });
});

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

io.on('connection', function (socket) {
  socket.emit('call', { hello: 'world' });
  socket.on('response', function (data) {
    console.log(data);
  });
});

serialPort.list(function(err, ports){
  ports.forEach(function(port){
    if(! serial && port.comName.indexOf( "cu.usb" ) != -1){
      console.log('\nConnecting to: "' + port.comName);
      serial = new SerialPort(port.comName, {
        baudrate: 115200,
        parser: serialPort.parsers.readline('\n')
      });

      serial.on('open', function(){
        serial.on('data', function(data){
          var data = data.toString().trim();
          if(data.length == 2){
            io.emit('play', data);
          }
        });
      });
    }
  });
});
