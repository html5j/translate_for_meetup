
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , translate = require('./routes/translate')
  , path = require('path')
  , io = require('socket.io')

var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/translate/en2ja/:q', translate.en2ja)
app.get('/translate/ja2en/:q', translate.ja2en)


io.sockets.on('connection', function(socket){
  socket.on('talk', function(data){
    console.log(data)
    socket.broadcast.emit('talk', data);
  })
})

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// [ref] http://stackoverflow.com/questions/7310521/node-js-best-practice-exception-handling

// catch the uncaught errors that weren't wrapped in a domain or try catch statement
// do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log(err);
});