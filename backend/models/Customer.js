const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    BookList: [
        {
            BookName: {
                type: String,
                default: '',
            },
            BookKind: {
                type: String,
                default: '',
            },

            BookAuthor: {
                type: String,
                default: '',
            },

            Amount: {
                type: Number,
                default: '',
            },

            Price: {
                type: Number,
                default: '',
            },
        }
    ],

    CreatedDate: {
        type: String,
        default: '',
    },

    TotalPrice: {
        type: Number,
        default: 0,
    }
});

const FeeSchema = new Schema({
    Payment: {
        type: Number,
        default: 0,
    },

    CreatedDate: {
        type: String,
        default: '',
    }
});

const CustomerSchema = new Schema({
    Name: {
        type: String,
        default: '',
    },

    Address: {
        type: String,
        default: '',
    },

    Phone: {
        type: String,
        default: '',
    },

    Email: {
        type: String,
        default: '',
    },

    FirstDebt: {
        type: Number,
        default: 0,
    },

    PresentDebt: {
        type: Number,
        default: 0,
    },

    CreatedDate: {
        type: String,
        default: '',
    },

    UpdateDate: {
        type: String,
        default: '',
    },

    BillList: [BillSchema],
    FeeList: [FeeSchema]
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
