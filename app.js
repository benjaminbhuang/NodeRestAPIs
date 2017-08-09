var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db;

if(process.env.ENV == 'Test') {
    db = mongoose.connect('mongodb://localhost/libraryApp_test');
}
else {
    db = mongoose.connect('mongodb://localhost/libraryApp');
}


var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);
app.use('/api/authors', bookRouter);

app.get('/', function (req, res) {
    res.send('welcome to my API');
});

app.listen(port, function () {
    console.log('Gulp is running my app on on PORT: ' + port);
});

module.exports = app;