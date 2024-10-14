const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    BookName: {
        type: String,
    },

    BookKind: {
        type: String,
    },

    BookAuthor: {
        type: String,
    },

    Amount: {
        type: Number,
        required: true
    },
    Price: {
        type: Number,
    },

    CreatedDate: {
        type: String,
    }
});

const FeeSchema = new Schema({
    PresentDebt: {
        type: Number,
    },
    Payment: {
        type: Number,
    },
    CreatedDate: {
        type: String,
        required: true
    }
});

const CustomerSchema = new Schema({
    Name: {
        type: String,
    },

    Address: {
        type: String,
    },

    FirstDebt: {
        type: Number,
        default: 0,
    },

    PresentDebt: {
        type: Number,
        default: 0,
    },

    BillList: [BillSchema],
    FeeList: [FeeSchema]
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
