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
    request = require('request'),
    url = require('url'),
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
    var query = url.parse(req.url, true).query;
    if (query.code) {
        var u = 'https://github.com/login/oauth/access_token'
            + '?client_id=' + process.env.CLIENT_ID
            + '&client_secret=' + process.env.CLIENT_SECRET
            + '&code=' + query.code;
        request.get({ url: u, json: true }, function (error, response, body) {
            console.log("ERROR:",error);
            //console.log("RESPONSE:",response);
            //console.log("BODY", body);
            res.redirect('/list.html?token=' + body.access_token);
        });   
    } else {
        console.log("ERROR: No code returned");
        res.redirect('/');
    }
});
app.get('/assess', function (req, res) {
    /*Insert old logic*/
});