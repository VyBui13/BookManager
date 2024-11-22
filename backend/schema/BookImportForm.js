const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookImprotFormSchema = new Schema({
    bookList: [
        {
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
            bookAmount: {
                type: Number,
                default: 0
            },
        }
    ],
    createdDate: {
        type: String,
    },
    createdTime: {
        type: String,
    },
    staff: {
        type: String,
    },
});

const BookImportForm = mongoose.model('BookImportForm', BookImprotFormSchema);
module.exports = BookImportForm;