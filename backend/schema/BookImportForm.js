const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookImprotFormSchema = new Schema({
    bookList: [
        {
            bookID: {
                type: Schema.Types.ObjectId,
                ref: 'Book',
                required: true
            },

            bookImportAmount: {
                type: Number,
                required: true
            },
        }
    ],
    importDateTime: {
        type: Date,
        default: new Date()
    },
    importUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const BookImportForm = mongoose.model('BookImportForm', BookImprotFormSchema);
module.exports = BookImportForm;