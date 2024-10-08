const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Kind: {
        type: String,
        required: true
    },
    Author: {
        type: String,
    },
    StoredAmount: {
        type: Number,
        default: 0
    },
    PresentAmount: {
        type: Number,
        default: 0
    },
    UpdateDate: {
        type: String,
    },
    CreatedDate: {
        type: String,
    },
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;