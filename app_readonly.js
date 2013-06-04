
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , path = require('path')

var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)

var Log = require('log')
  , fs = require('fs')
  , stream = fs.createWriteStream(__dirname + '/logs/talk_readonly.log')
  , log = new Log(Log.INFO, stream)

app.configure(function(){
  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('default'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.readonly);
app.post('/talk', function(req, res){
  log.info(JSON.stringify(req.body))
  io.sockets.emit('talk', req.body)
  res.send("")
})

var count = function(obj){
  var c = 0;
  for(var k in obj) if(obj.hasOwnProperty(k)) {
    c++;
  }
  return c;
}

io.enable('browser client minification');
io.enable('browser client etag');
io.enable('browser client gzip');
io.set('log level', 1);

io.sockets.on('connection', function(socket){
  log.notice("io-event:connection, num of conn = %d", count(io.sockets.manager.connected));

  socket.on('disconnect', function(){
    log.notice("io-event:disconnect, num of conn = %d", count(io.sockets.manager.connected));
  })
})

server.listen(app.get('port'), function(){
  log.notice("Express server listening on port " + app.get('port'));
});

// [ref] http://stackoverflow.com/questions/7310521/node-js-best-practice-exception-handling

// catch the uncaught errors that weren't wrapped in a domain or try catch statement
// do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
process.on('uncaughtException', function(err) {
    // handle the error safely
    log.error(err.message);
});