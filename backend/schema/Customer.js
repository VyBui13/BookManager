const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

    customerUpdatedDateTime: {
        type: Date,
        default: Date.now(),
    },

});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
