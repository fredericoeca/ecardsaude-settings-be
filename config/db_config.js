var mongoose = require('mongoose');

var urlString = 'mongodb://localhost/vacinatech';

mongoose.connect(urlString, function (err, res) {
    if(err){
        console.log(err);
    }else{
        console.log('connected a: ' + urlString);
    }
});