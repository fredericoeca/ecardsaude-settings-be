var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = module.exports = express();

app.use(morgan('dev'));

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

