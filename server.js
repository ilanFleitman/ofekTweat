var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var dataReader = require('./dataReader');
var routs = require('./routerRouts');

app.use(session({secret: '1234567890QWERTY'}));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('./public'));

routs(app);

app.listen(2020);