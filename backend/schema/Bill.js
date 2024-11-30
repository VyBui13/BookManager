const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    customerID: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    billBookList: [
        {
            bookID: {
                type: Schema.Types.ObjectId,
                ref: 'Book',
                required: true,
            },

            amountBought: {
                type: Number,
                default: '',
            },

            bookPrice: {
                type: Number,
                default: '',
            },
        }
    ],

    billCreatedDateTime: {
        type: Date,
        default: new Date(),
    },

    billTotalPrice: {
        type: Number,
        default: 0,
    },

    billPayment: {
        type: Number,
        default: 0,
    },

    billCreatedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Bill = mongoose.model('Bill', BillSchema);
module.exports = Bill;
