
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    return next();
  });
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.del('/v1/user/:id/searches/:term', routes.v1.user.searchdel);
app.post('/v1/user/:id/searches/:term', routes.v1.user.searchadd);
app.get('/v1/user/:id/searches', routes.v1.user.searches);
app.get('/v1/search/:term', routes.v1.search);
app.get('/v1/suggest/:query', routes.v1.suggest);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
