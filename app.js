'use strict';

/*==Includes & variables==*/
require('dotenv-safe').config();
var listenOnPort = 8084,
    express = require('express'),
    app = express(),
    http = require('http').Server(app),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    path = require('path'),
    git = require("nodegit"),
    glob = require("glob"),
    compat = require("./compat.js");

/*===Express app config===*/
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.set('port', process.env.PORT || listenOnPort);
http.listen(app.get('port'));

/*=========Routes=========*/
app.get('/', function (req, res) {
    res.render('index.html');
});
app.get('/login', function (req, res) {
    res.redirect('https://github.com/login/oauth/authorize?client_id=' + process.env.CLIENT_ID + '&scope=repo');
});
app.get('/list', function (req, res) {
	console.log(req);
    res.render('list.html');
});
app.get('/assess', function (req, res) {
    /*Insert old logic*/
});