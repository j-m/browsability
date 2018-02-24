'use strict';

var listenOnPort = 8084
var logger = require('morgan')
var bodyParser = require('body-parser')
var express = require('express')

let app = express();
var http = require('http').Server(app)

app.use(logger('dev'));

var GithubWebHook = require('express-github-webhook');
var webhookHandler = GithubWebHook({ path: '/webhook' });

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.render('index.html');
});

// use in your express app
app.use(bodyParser.json()); // must use bodyParser in express
app.use(webhookHandler); // use our middleware

// Now could handle following events
webhookHandler.on('*', function (event, repo, data) {
    console.log("\n\nevent:");
    console.log(event);
    console.log("\n\nrepo:");
    console.log(repo);
    console.log("\n\ndata:");
    console.log(data);
});

webhookHandler.on('event', function (repo, data) {
    console.log("event");
});

webhookHandler.on('error', function (err, req, res) {
    console.log("error");
});

app.set('port', process.env.PORT || listenOnPort);
http.listen(app.get('port'));
