var mongoose = require('mongoose');

var bookModel = mongoose.Schema({
    title:{
        type: String
    },
    author:{
        type: String
    },
    genre:{
        type: String
    },
    bookId:{
        type: Number
    },
    read: {
        type: Boolean, default: false
    }
});

module.exports = mongoose.model('Book', bookModel);