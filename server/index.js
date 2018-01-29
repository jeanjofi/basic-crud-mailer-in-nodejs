'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const http = require('http');

const DB = require('./helpers/db/pg-dump-database');
require('./config');

const app = express();
const server = new http.Server(app);
const port = 8080;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const Routes = require('./routes');

app.use('/', Routes);


server.listen(port, function () {('Server started on port %d', port)});

exports.server = server;


