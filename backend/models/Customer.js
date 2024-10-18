const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    bookList: [
        {
            _bookName: {
                type: String,
                default: '',
            },
            _bookKind: {
                type: String,
                default: '',
            },

            _bookAuthor: {
                type: String,
                default: '',
            },

            _amount: {
                type: Number,
                default: '',
            },

            _price: {
                type: Number,
                default: '',
            },
        }
    ],

    _createdDate: {
        type: String,
        default: '',
    },

    _totalPrice: {
        type: Number,
        default: 0,
    }
});

const FeeSchema = new Schema({
    _payment: {
        type: Number,
        default: 0,
    },

    _createdDate: {
        type: String,
        default: '',
    }
});

const CustomerSchema = new Schema({
    _customerName: {
        type: String,
        default: '',
    },

    _customerAddress: {
        type: String,
        default: '',
    },

    _customerPhone: {
        type: String,
        default: '',
    },

    _customerEmail: {
        type: String,
        default: '',
    },

    _customerFirstDebt: {
        type: Number,
        default: 0,
    },

    _customerPresentDebt: {
        type: Number,
        default: 0,
    },

    _customerInfoCreatedDate: {
        type: String,
        default: '',
    },

    _updateDate: {
        type: String,
        default: '',
    },

    _billList: [BillSchema],
    _feeList: [FeeSchema]
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
