const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    billID: {
        type: Schema.Types.ObjectId,
        ref: 'Bill',
        required: true,
    },
    paymentFee: {
        type: Number,
        required: true,
    },

    paymentCreatedDateTime: {
        type: Date,
        default: new Date(),
    },

    paymentCreatedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;
