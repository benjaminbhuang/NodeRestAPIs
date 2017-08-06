var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/libraryApp');
var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;


var bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function (req, res) {
        var query = {};

        if(req.query.genre){
            query.genre = req.query.genre;
        }

        if(req.query.author){
            query.author = req.query.author;
        }

        Book.find(query, function (err, books) {
            if(err)
                console.log(err);
            else
                res.json(books);
        });
        

    });

bookRouter.route('/Books/:bookId')
    .get(function (req, res) {

        Book.findById(req.params.bookId, function (err, book) {
            if(err)
                console.log(err);
            else
                res.json(book);
        });


    });

app.use('/api', bookRouter);

app.get('/', function (req, res) {
    res.send('welcome to my API');
});

app.listen(port, function () {
console.log('Gulp is running my app on on PORT: '+ port);
});