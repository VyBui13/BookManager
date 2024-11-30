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
        }
    ],
    importDateTime: {
        type: Date,
        default: Date.now(),
    },
    importUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const BookImportForm = mongoose.model('BookImportForm', BookImprotFormSchema);
module.exports = BookImportForm;