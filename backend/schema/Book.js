const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    bookName: {
        type: String,
        required: true
    },

    bookKind: {
        type: Array,
        required: true
    },

    bookAuthor: {
        type: Array,
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
    updateime: {
        type: String,
    },
    beginningDate: {
        type: String,
    },
    beginningTime: {
        type: String,
    },
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;