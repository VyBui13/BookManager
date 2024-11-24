const mongoose = require('mongoose');
const { create } = require('./Customer');
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    customerName: {
        type: String,
        default: '',
    },
    customerPhone: {
        type: String,
        default: '',
    },
    bookList: [
        {
            bookName: {
                type: String,
                default: '',
            },
            bookKind: {
                type: Array,
                default: '',
            },

            bookAuthor: {
                type: Array,
                default: '',
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

    createdDate: {
        type: String,
        default: '',
    },

    createdTime: {
        type: String,
        default: '',
    },

    totalPrice: {
        type: Number,
        default: 0,
    },

    payment: {
        type: Number,
        default: 0,
    },

    staff: {
        type: String,
        default: '',
    },
});

const Bill = mongoose.model('Bill', BillSchema);
module.exports = Bill;
