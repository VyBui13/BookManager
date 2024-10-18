const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    _bookName: {
        type: String,
        required: true
    },

    _bookKind: {
        type: String,
        required: true
    },

    _bookAuthor: {
        type: String,
    },

    _bookStoredAmount: {
        type: Number,
        default: 0
    },

    _bookPresentAmount: {
        type: Number,
        default: 0
    },

    _bookPrice: {
        type: Number,
        default: 0
    },

    _updateDate: {
        type: String,
    },

    _createdDate: {
        type: String,
    },
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;