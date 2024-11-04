const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeeSchema = new Schema({
    payment: {
        type: Number,
        default: 0,
    },

    createdDate: {
        type: String,
        default: '',
    },
});

const BillSchema = new Schema({
    bookList: [
        {
            bookName: {
                type: String,
                default: '',
            },
            bookKind: {
                type: String,
                default: '',
            },

            bookAuthor: {
                type: String,
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

    totalPrice: {
        type: Number,
        default: 0,
    },
});

const CustomerSchema = new Schema({
    customerName: {
        type: String,
        default: '',
    },

    customerAddress: {
        type: String,
        default: '',
    },

    customerPhone: {
        type: String,
        default: '',
    },

    customerEmail: {
        type: String,
        default: '',
    },

    customerBeginningDebt: {
        type: Number,
        default: 0,
    },

    customerCurrentDebt: {
        type: Number,
        default: 0,
    },

    customerInfoCreatedDate: {
        type: String,
        default: '',
    },

    updateDate: {
        type: String,
        default: '',
    },

    billList: [BillSchema],
    feeList: [FeeSchema],
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
