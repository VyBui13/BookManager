const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    bookName: {
        type: String,
        required: true
    },

    bookKind: {
        type: String,
        required: true
    },

    bookAuthor: {
        type: String,
    },

    bookBeginningAmount: {
        type: Number,
        default: 0
    },

    bookCurrentAmount: {
        type: Number,
        default: 0
    },

    bookPrice: {
        type: Number,
        default: 0
    },

    updateDate: {
        type: String,
    },

    createdDate: {
        type: String,
    },
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;