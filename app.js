
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , translate = require('./routes/translate')
  , path = require('path')

var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , http = require('http')

var Log = require('log')
  , fs = require('fs')
  , stream = fs.createWriteStream(__dirname + '/logs/talk.log')
  , log = new Log(Log.INFO, stream)

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
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

app.get('/', routes.index);
app.get('/translate/en2ja/:q', translate.en2ja)
app.get('/translate/ja2en/:q', translate.ja2en)

/** settings below should be changed, when read only server has deployed. */
var options = {
  hostname: "153.128.36.23",
  port: 80,
  path: "/talk",
  method: 'POST',
  headers: {
    "connection": "close",
    "content-type": "application/json"
  }
}

io.enable('browser client minification');
io.enable('browser client etag');
io.enable('browser client gzip');
io.set('log level', 1);


io.sockets.on('connection', function(socket){
  socket.on('talk', function(data){
    log.info(JSON.stringify(data));

    var req_ = http.request(options, function(res){})
    req_.on("error", function(e){
      log.warning("An error happened while posting readonly server : %s", e.message)
    })
    req_.write(JSON.stringify(data));
    req_.end()

    socket.broadcast.emit('talk', data);
  })
})

server.listen(app.get('port'), function(){
  log.notice("Translate server listening on port %d", app.get('port'));
});

// [ref] http://stackoverflow.com/questions/7310521/node-js-best-practice-exception-handling

// catch the uncaught errors that weren't wrapped in a domain or try catch statement
// do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
process.on('uncaughtException', function(err) {
    // handle the error safely
    log.error("uncaughtException happened : %s", err.message)
});
